@success
Feature: Check Details are Correct


  Background:
    Given a user has navigated to the BAV Landing Page
    When the user clicks on Continue button
    Then the user is directed to the Account Details screen
    Given the user has entered a Sort Code of "12-34-56"
    Given the user has entered an Account Number of "319268"
    When the user clicks the Continue button
    Then the user is directed to the Check Your Answers screen

  Scenario: User routed to loading Bank Details Check Screen
    When they click on the Continue to bank details check button
    Then the Loading Bank Details check Screen is served by the FE

  Scenario: User directed to Account details Screen with pre-populated data
    When the user clicks the Change button to change their Sort code or Account number
    Then the Account details screen is served by the FE
    When the user edits the sort code "010203" and the account number "34567890"
    Then the user is redirected to the check your details page