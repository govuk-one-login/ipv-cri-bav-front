@success
Feature: Exit out of BAV Journey

  Background:
    Given a user has navigated to the BAV Landing Page

  Scenario: User routed to BAV landing page from Escape Choice screen
    When the user clicks the 'I cannot provide UK current account details' link
    Then the user is directed to the Escape Choice screen
    Given the user wishes to continue with the BAV process
    Then they click on the Continue button to return to the landing page


  Scenario: User routed to BAV landing page from Escape Choice screen
    When the user clicks on Continue button
    Then the user is directed to the Account Details screen
    Given the user has entered a Sort Code of "12-34-56"
    Given the user has entered an Account Number of "99990086"
    When the user clicks the Continue button
    Then the user is directed to the Check Your Answers screen
     When the user clicks on 'I cannot provide UK account details' link
    Then the user is directed to the Escape Choice screen
    Given the user wishes to continue with the BAV process
    Then they click on the Continue button to return to the cya page
