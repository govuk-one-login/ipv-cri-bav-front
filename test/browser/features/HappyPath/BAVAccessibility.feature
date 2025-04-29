@success
Feature: BAV Journey - Accessibility

    Scenario: BAV Journey - Accessibility Validation
        Given a user has navigated to the BAV Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines
        When the user clicks on Continue button
        Then the user is directed to the Account Details screen
        Then the page should conform to WCAG 2.2 AA guidelines
        Given the user has entered a Sort Code of "123456"
        And the user has entered an Account Number of "99990086"
        When the user clicks the Continue button
        Then the user is directed to the Check Your Answers screen
        Then the page should conform to WCAG 2.2 AA guidelines

    Scenario: BAV Journey - Abort Journey Accessibility Validation
        Given a user has navigated to the BAV Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines
        When the user clicks on Continue button
        Then the user is directed to the Account Details screen
        Then the page should conform to WCAG 2.2 AA guidelines
        Given the user has entered a Sort Code of "12-34-56"
        Given the user has entered an Account Number of "99990086"
        When the user clicks the Continue button
        Then the user is directed to the Check Your Answers screen
        Then the page should conform to WCAG 2.2 AA guidelines
        When the user clicks on 'I cannot provide UK account details' link
        Then the user is directed to the Escape Choice screen
        Then the page should conform to WCAG 2.2 AA guidelines
        And the user wishes to exit the BAV process
        And the user is directed to the Abort screen
        Then the page should conform to WCAG 2.2 AA guidelines

