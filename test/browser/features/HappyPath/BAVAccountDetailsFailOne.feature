@success @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Provided Account Details Success

   Background:
        Given a user has navigated to the BAV Landing Page
        When the user clicks on Continue button
        Then the user is directed to the Account Details screen

    Scenario:  User routed to IPV Core
        Given the user has entered a Sort Code of "123456"
        Given the user has entered an Account Number of "99990086"
        When the user clicks the Continue button
        Then the user wishes to proceed
        When they click on the Continue to account details check button
        Then the user is directed to IPV Core