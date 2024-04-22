@success @failed-account-details
Feature: Enter Incorrect Bank Account Details

   Background:
      Given a user has navigated to the BAV Landing Page
      When the user clicks on Continue button
      Then the user is directed to the Account Details screen

   Scenario:  On-screen error when either field is empty
      When the user clicks the Continue button
      Then an error message is shown to the user

   Scenario Outline:  On-screen error when Account Number is the wrong length: <accountNumber>
      Given the user has entered a Sort Code of "123456"
      Given the user has entered an Account Number of <accountNumber>
      When the user clicks the Continue button
      Then an account number length error message is shown to the user

      Examples:
         | accountNumber |
         | "11111"       |

   Scenario Outline: On-screen error when Sort Code in the wrong format: <sortCode>
      Given the user has entered a Sort Code of <sortCode>
      Given the user has entered an Account Number of "31926819"
      When the user clicks the Continue button
      Then a sort code format error message is shown to the user

      Examples:
         | sortCode   |
         | "12/34/56" |
         | "12*34*56" |
         | "123 456"  |
         | "a23456" |

   Scenario Outline: On-screen error when Sort Code is wrong length: <sortCode>
      Given the user has entered a Sort Code of <sortCode>
      Given the user has entered an Account Number of "31926819"
      When the user clicks the Continue button
      Then a sort code length error message is shown to the user

      Examples:
         | sortCode   |
         | "1234-" |
         | "1234" |
         | "12 3 " |
         | "1234567" |
         | "1234567p" |
         | "12-34-567" |