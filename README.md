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

- 'BASE_URL': Externally accessible base url of the webserver. Used to generate the callback url as part of credential issuer oauth flows
- `IPV_STUB_URL`: Mocks being sent to/from IPV Core to enable browser testing
- `PORT` - Default port to run webserver on. (Default to `5040`)

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
