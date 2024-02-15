# Digital Identity Bank Account Verification

# di-ipv-cri-bav-front

Frontend for the identify proving and verification bank account verification CRI

This is the home for the front end user interface for a credential issuer as a part of the Identity Proofing and Verification (IPV) system within the GDS digital identity platform. Other repositories are used for core services or other credential issuers.

# Installation

Clone this repository and then run

```bash
yarn install
```

## Environment Variables

- `API_BASE_URL`: Externally accessible base url of the webserver. Used to generate the callback url as part of credential issuer oauth flows. See below to set this.
- `IPV_STUB_URL`: Mocks being sent to/from IPV Core to enable browser testing
- `PORT` - Default port to run webserver on. (Default to `5040`)

```bash
export API_BASE_URL=https://api-bav-cri-api.review-bav.dev.account.gov.uk
```

## Run front-end locally against deployed back-end

- Set `API_BASE_URL` as described above.
- Replace all instances of `x-govuk-signin-session-id` with a valid session ID from the dev environment
- Run `yarn build` followed by `yarn start`

# Deployment in own stack in DEV

To deploy a copy of the frontend infra from a local branch as a separate isolated stack in DEV:

- update the `Image:` tag in template.yaml to point to the container image to be deployed - this can be found by looking in ECR in the AWS Console for the latest image and tag.
- the run:

```shell
sam build --parallel --no-cached
sam deploy --resolve-s3 --stack-name "CUSTOM_STACK_NAME" --capabilities CAPABILITY_IAM --confirm-changeset --parameter-overrides \
"Environment=\"dev\" PermissionsBoundary=\"none\" VpcStackName=\"vpc-cri\" EnableScalingInDev=0"
```

Note the following parameters can be used to specify whether or not to deploy the autoscaling infra:

- `EnableScalingInDev` default to 0 which inhibits deployment of scaling infra in dev; set to 1 to deploy scaling infra
- `MinContainerCount` default is 3
- `MaxContainerCount` default is 12

# Request properties

In order to support consistent use of headers for API requests, [middleware](./src/lib/axios) is applied to add an instance of
[axios](https://axios-http.com/) on each request onto `req.axios`. This is then reused in any code that uses the API.

# Running Local Tests

Clone this repository and export "QA Environment Variables" in .env.sample and then run

```bash
yarn build
yarn install
yarn test:browser:ci
```

### Code Owners

This repo has a `CODEOWNERS` file in the root and is configured to require PRs to reviewed by Code Owners.

## Create and upload a custom image to ECR

Execute the following commands to create a custom image locally and push it up to ECR.
You need to have AWS credentials in your shell via `aws-vault` or `gds-cli` or similar.
`YOUR_REPO` needs to refer to an existing repo in ECR, you can create one in console if you don't have one already.

```shell
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 060113405249.dkr.ecr.eu-west-2.amazonaws.com
docker build --platform linux/amd64 -t di-ipv-cri-cic-front .
docker tag di-ipv-cri-cic-front:latest 060113405249.dkr.ecr.eu-west-2.amazonaws.com/dev-images-ddunford
docker push 060113405249.dkr.ecr.eu-west-2.amazonaws.com/dev-images-ddunford
```

Then to use this new image update the `Image:` tag in the template.yaml and redeploy your template locally in to your own stack in DEV.

## Pre-Commit Checking / Verification

Completely optional, there is a `.pre-commit-config.yaml` configuration setup in this repo, this uses [pre-commit](https://pre-commit.com/) to verify your commit before actually commiting, it runs the following checks:

- Check Json files for formatting issues
- Fixes end of file issues (it will auto correct if it spots an issue - you will need to run the git commit again after it has fixed the issue)
- It automatically removes trailing whitespaces (again will need to run commit again after it detects and fixes the issue)
- Detects aws credentials or private keys accidentally added to the repo
- runs cloud formation linter and detects issues
- runs checkov and checks for any issues.

### Dependency Installation

To use this locally you will first need to install the dependencies, this can be done in 2 ways:

#### Method 1 - Python pip

Run the following in a terminal:

```
sudo -H pip3 install checkov pre-commit cfn-lint
```

this should work across platforms

#### Method 2 - Brew

If you have brew installed please run the following:

```
brew install pre-commit ;\
brew install cfn-lint ;\
brew install checkov
```

### Post Installation Configuration

once installed run:

```
pre-commit install
```

To update the various versions of the pre-commit plugins, this can be done by running:

```
pre-commit autoupdate && pre-commit install
```

This will install / configure the pre-commit git hooks, if it detects an issue while committing it will produce an output like the following:

```
 git commit -a
check json...........................................(no files to check)Skipped
fix end of files.........................................................Passed
trim trailing whitespace.................................................Passed
detect aws credentials...................................................Passed
detect private key.......................................................Passed
AWS CloudFormation Linter................................................Failed
- hook id: cfn-python-lint
- exit code: 4
W3011 Both UpdateReplacePolicy and DeletionPolicy are needed to protect Resources/PublicHostedZone from deletion
core/deploy/dns-zones/template.yaml:20:3
Checkov..............................................(no files to check)Skipped
- hook id: checkov
```
