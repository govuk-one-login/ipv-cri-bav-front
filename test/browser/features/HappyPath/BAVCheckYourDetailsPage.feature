@success
Feature: Check Details are Correct

  Background:
    Given a user has navigated to the BAV Landing Page
    When the user clicks on Continue button
    Then the user is directed to the Account Details screen
    Given the user has entered a Sort Code of "12-34-56"
    Given the user has entered an Account Number of "319268"
    When the user clicks the Continue button
    Then the user is directed to the Check Your Answers screen
    Then Check Your Answers screen has a sort code '12-34-56' and account number '319268'


  Scenario: User directed to Account details Screen with amended data <sortCode> and <accountNumber>
    When the user clicks the Change button to change their Sort code or Account number
    Then the user is directed to the Loading Bank Details screen

  Scenario: User directed to Account details Screen with pre-populated data <sortCode> and <accountNumber>
    When the user clicks the Change button to change their Sort code or Account number
    Then the user is directed to the Loading Bank Details screen
    When the user edits the sort code <sortCode> and the account number <accountNumber>
    Then the Check Your Answers screen displays the amended sort code and account number

    Examples:
      | sortCode   | accountNumber |
      | "01-02-03" | "319268"      |
      | "01 02 03" | "3192681"     |
      | "010203"   | "31926819"    |

  