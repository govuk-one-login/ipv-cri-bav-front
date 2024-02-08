@success
Feature: Provided Bank Details Failed

   Background:
        Given a user named Nigel has navigated to the BAV Landing Page
        When the user clicks on Continue button
        Then the user is directed to the Account Details screen

    Scenario:  User failed on first attempt then failed on second attempt and is directed to IPV
        Given the user has entered a Sort Code of "123456"
        Given the user has entered an Account Number of "31926819"
        When the user clicks the Continue button
        When they click on the Continue to account details check button
        When the user selects the 'Try Again' radio
        When the user clicks the Continue button
        Then the user is directed to the Confirm Details screen
        When they click on the Continue to account details check button
        Then the user is directed to IPV Core

    