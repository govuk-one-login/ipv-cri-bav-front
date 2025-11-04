#!/usr/bin/env bash

set -eu

# The CFN variables seem to include quotes when used in tests these quotes must
# be removed before assigning these variable.
remove_quotes () {
  echo "$1" | tr -d '"'
}

export GITHUB_ACTIONS=true
echo "GITHUB_ACTIONS: $GITHUB_ACTIONS"

# shellcheck disable=SC2154
export API_BASE_URL=$(remove_quotes "$CFN_BAVBackEndURL")
echo "API_BASE_URL: $API_BASE_URL"
export IPV_STUB_URL=$(remove_quotes $CFN_BAVIPVStubExecuteURL)
echo "IPV_STUB_URL: $IPV_STUB_URL"
export TEST_HARNESS_URL=$(remove_quotes $CFN_BAVTestHarnessURL)
echo "TEST_HARNESS_URL: $TEST_HARNESS_URL"
export SESSION_TABLE=$(remove_quotes $CFN_BAVBackendSessionTableName)
echo "SESSION_TABLE: $SESSION_TABLE"
export LANGUAGE_TOGGLE_DISABLED=false
echo "LANGUAGE_TOGGLE_DISABLED: $LANGUAGE_TOGGLE_DISABLED"

declare error_code

# disabling error_check to allow report generation for successful + failed tests
set +e
cd /app; yarn run test:e2e:cd
error_code=$?
cp -rf /app/test/reports $TEST_REPORT_ABSOLUTE_DIR
if [ $error_code -ne 0 ]
then
  exit $error_code
fi

sleep 2m

set -e
apt-get install jq -y
cd /app; npm run test:pii
error_code=$?

exit $error_code