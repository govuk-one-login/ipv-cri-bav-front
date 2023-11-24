@success
Feature: Enter Incorrect Bank Account Details


   Background:
      Given a user has navigated to the BAV Landing Page
      When the user clicks on Continue button
      Then the user is directed to the Account Details screen

   Scenario:  On-screen error when either field is empty
      Given the user has left either the account number or sort code field empty
      When the user clicks the Continue button
      Then an error message is shown to the user

    Scenario: On-screen error when Sort Code in wrong format
      Given the user has entered a sort code in the wrong format
      When the user clicks the Continue button
      Then an error message is shown to the user

    Scenario:  On-screen error when Account Number in wrong format
       Given the user has entered an account number in the wrong format
       When the user clicks the Continue button
       Then an error message is shown to the user

