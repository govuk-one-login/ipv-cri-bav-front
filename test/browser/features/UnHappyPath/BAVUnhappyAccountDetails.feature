@success
Feature: Enter Incorrect Bank Account Details


   Background:
      Given a user has navigated to the BAV Landing Page
      When the user clicks on Continue button
      Then the user is directed to the Account Details screen

   Scenario:  On-screen error when either field is empty
      When the user clicks the Continue button
      Then an error message is shown to the user

   Scenario: On-screen error when Sort Code in wrong format
      Given the user has entered a Sort Code of "12/34/56"
      Given the user has entered an Account Number of "31926819"
      When the user clicks the Continue button
      Then an error message is shown to the user

   Scenario:  On-screen error when Account Number in wrong format
      Given the user has entered a Sort Code of "123456"
      Given the user has entered an Account Number of "319268190"
      When the user clicks the Continue button
      Then an error message is shown to the user