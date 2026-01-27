@success @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Navigate to Internal Error Page

   Background:
      Given a user has navigated to the BAV Landing Page
      When the user navigates to a URL that returns an Error

   Scenario: User routed to Not Found Page
      Then the user is directed to the Internal Error Page

   Scenario: User successfully sent to GOV.UK-homepage
      When the user clicks the Gov.UK Homepage button
      Then the user is routed to the Gov.UK Homepage

