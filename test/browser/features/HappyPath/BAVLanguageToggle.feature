@success
Feature: Language Translation Toggle

    Scenario: Language toggle present on all FE screen
        Given a user has navigated to the BAV Landing Page
        Then the language toggle is present on the screen
        When the user clicks on Continue button
        Then the user is directed to the Account Details screen
        Then the language toggle is present on the screen
        Given the user has entered a Sort Code of "123456"
        And the user has entered an Account Number of "99990086"
        When the user clicks the Continue button
        Then the user is directed to the Check Your Answers screen
        Then the language toggle is present on the screen
        When the user clicks on 'I cannot provide UK account details' link
        Then the user is directed to the Escape Choice screen
        Then the language toggle is present on the screen

    Scenario: HTML Tag and Hyperlink updated when Language is changed
        Given a user has navigated to the BAV Landing Page
        Then the language toggle is present on the screen
        When the user switches language to "Cymraeg"
        Then The HTML Language Attribute is set to "cy"
        And the language toggle updates the "Cymraeg" hyperlink
        When the user switches language to "English"
        Then The HTML Language Attribute is set to "en"
        And the language toggle updates the "English" hyperlink
