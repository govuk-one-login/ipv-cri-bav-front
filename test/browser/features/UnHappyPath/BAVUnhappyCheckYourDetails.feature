@success
Feature: Navigate away from the Check Your Details Screen


  Background:
    Given a user has navigated to the BAV Landing Page
    When the user clicks on Continue button
    Then the user is directed to the Account Details screen
    Given the user has entered a Sort Code of "12-34-56"
    Given the user has entered an Account Number of "319268"
    When the user clicks the Continue button
    Then the user is directed to the Check Your Answers screen

  Scenario: Back button routes user to Account Details Page
    When the user clicks the “Back” link on the CYA page
    Then they are routed to the Account Details Page

  Scenario: Browser back button routes user to Account Details  Page
    When the user clicks the browser Back button on the CYA page
    Then they are routed to the Account Details Page

  Scenario: Exit link routes to Escape choice Screen
    When they click on the “I do not want to continue to bank details check” link
    Then the user is directed to the Escape choice screen