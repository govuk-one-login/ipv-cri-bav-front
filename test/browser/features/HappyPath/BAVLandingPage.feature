@success
Feature: Continue on from landing page


   Background:
      Given a user has navigated to the BAV Landing Page

   Scenario: User routed to Account Details Screen
      When the user clicks on Continue button
      Then the user is directed to the Account Details screen

   Scenario: User shown 'How we use your bank details' information
      When the user clicks on 'How we use your bank details' link
      Then the 'How we use your bank details' information is presented to the user

   Scenario: User routed to Abort Screen
      When the user clicks on 'Find other ways to prove your identity' link
      Then the user is directed to the Abort screen


            
