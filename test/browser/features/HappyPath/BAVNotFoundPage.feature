@success @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Navigate to Not Found Page

   Background:
      Given a user has navigated to the BAV Landing Page

   Scenario: User routed to Not Found Page
      When the user navigates to a URL that does not exist
      Then the user is directed to the Not Found screen



            
