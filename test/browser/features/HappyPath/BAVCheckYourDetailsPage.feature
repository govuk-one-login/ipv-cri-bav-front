@success
Feature: Check Details are Correct

  Background:
    Given a user has navigated to the BAV Landing Page
    When the user clicks on Continue button
    Then the user is directed to the Account Details screen
    Given the user has entered a Sort Code of "123456"
    Given the user has entered an Account Number of "319268"
    When the user clicks the Continue button
    Then the user is directed to the Check Your Answers screen
    And the Check Your Answers screen has a sort code "123456" and account number "319268"


  Scenario: User directed to Check Details Screen with pre-populated data <sortCode> and <accountNumber>
    When the user clicks the Change button to change their Sort code or Account number
    Then the user is directed to the Loading Bank Details screen

  Scenario: User directed to Account details Screen with pre-populated data <sortCode> and <accountNumber>
    When the user clicks the Change button to change their Sort code or Account number
    Then the user is directed to the Loading Bank Details screen
    When the user is on the Account Details Screen
    Then the user edits the sort code <sortCode> and the account number <accountNumber>
    Then the user is directed to the Check Your Answers screen
    And the Check Your Answers screen has a sort code <sortCode> and account number <accountNumber>
    Then the user should see their full name on the confirm details page

    Examples:
      | sortCode   | accountNumber |
      | "01-02-03" | "99990086"    |
      | "01 02 03" | "99990086"    |
      | "010203"   | "99990086"    |

