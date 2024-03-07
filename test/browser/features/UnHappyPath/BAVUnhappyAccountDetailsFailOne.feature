@success
Feature: Provided Bank Details Failed

   Background:
        Given a user has navigated to the BAV Landing Page
        When the user clicks on Continue button
        Then the user is directed to the Account Details screen

    Scenario:  User routed to Fail 1 Screen
        Given the user has entered a Sort Code of "123456"
        Given the user has entered an Account Number of "00111111"
        When the user clicks the Continue button
        When they click on the Continue to account details check button
        Then the user is redirected to the fail 1 page

    Scenario:  User selected 1st radio to return to Account Details Screen
        Given the user has entered a Sort Code of "123456"
        Given the user has entered an Account Number of "00111111"
        When the user clicks the Continue button
        When they click on the Continue to account details check button
        When the user selects the 'Try Again' radio
        When the user clicks the Continue button
        Then the user is directed to the Confirm Details screen

    Scenario:  User selected 2nd radio to be returned to IPV Core
        Given the user has entered a Sort Code of "123456"
        Given the user has entered an Account Number of "00111111"
        When the user clicks the Continue button
        When they click on the Continue to account details check button
        When the user selects the 'Prove Another Way' radio
        When the user clicks the Continue button
        Then the user is directed to IPV Core

    Scenario:  User has no radio button selected and tries to continue
        Given the user has entered a Sort Code of "123456"
        Given the user has entered an Account Number of "00111111"
        When the user clicks the Continue button
        When they click on the Continue to account details check button
        When the user clicks the Continue button
        Then an error message is shown