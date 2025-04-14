@e2e
Feature: BAV Journey - E2E

    Scenario: BAV Journey - E2E Happy Path and DB Validation
        Given a user has navigated to the BAV Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines
        When the user clicks on Continue button
        Then the user is directed to the Account Details screen
        Then the page should conform to WCAG 2.2 AA guidelines
        Given the user has entered a Sort Code of "123456"
        And the user has entered an Account Number of "99990086"
        When the user clicks the Continue button
        Then the page should conform to WCAG 2.2 AA guidelines
        And they click on the Continue to account details check button
        When the users session details are fetched the sessionTable using "authCode"
        And the userInfo endpoint is initiated
        Then the Verifiable Credential is stored as expected
        When I get 5 TxMA events from Test Harness
        Then the "BAV_CRI_START" event matches the "BAV_CRI_START_SCHEMA" Schema
        And the "BAV_EXPERIAN_REQUEST_SENT" event matches the "BAV_EXPERIAN_REQUEST_SENT_SCHEMA" Schema
        And the "BAV_EXPERIAN_RESPONSE_RECEIVED" event matches the "BAV_EXPERIAN_RESPONSE_RECEIVED_SCHEMA" Schema
        And the "BAV_CRI_VC_ISSUED" event matches the "BAV_CRI_VC_ISSUED_SCHEMA" Schema
        And the "BAV_CRI_END" event matches the "BAV_CRI_END_SCHEMA" Schema

    Scenario: BAV Journey - Abort Journey and DB Validation
        Given a user has navigated to the BAV Landing Page
        When the user clicks on Continue button
        Then the user is directed to the Account Details screen
        Given the user has entered a Sort Code of "12-34-56"
        Given the user has entered an Account Number of "99990086"
        When the user clicks the Continue button
        Then the user is directed to the Check Your Answers screen
        When the user clicks on 'I cannot provide UK account details' link
        Then the user is directed to the Escape Choice screen
        And the user wishes to exit the BAV process
        And the user is directed to the Abort screen
        When the user clicks the Continue button
        And the users session details are fetched the sessionTable using "state"
        When I get 2 TxMA events from Test Harness
        Then the "BAV_CRI_START" event matches the "BAV_CRI_START_SCHEMA" Schema
        And the "BAV_CRI_SESSION_ABORTED" event matches the "BAV_CRI_SESSION_ABORTED_SCHEMA" Schema

