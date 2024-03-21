@e2e
Feature: BAV Journey - E2E

    Scenario: BAV Journey - E2E Happy Path and DB Validation
        Given a user has navigated to the BAV Landing Page
        When the user clicks on Continue button
        Then the user is directed to the Account Details screen
        Given the user has entered a Sort Code of "123456"
        And the user has entered an Account Number of "00111111"
        When the user clicks the Continue button
        And they click on the Continue to account details check button
        When the users session details are fetched the sessionTable
        And the userInfo endpoint is initiated
        Then the Verifiable Credential is stored as expected
        And all TxMA events are recorded as expected
