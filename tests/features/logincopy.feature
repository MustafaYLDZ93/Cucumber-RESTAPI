@apiLogin2
Feature: Login User

  Scenario: Successful user login
     Given I send a POST request to the user endpoint with the following payload:
        | username | password |
        | Leanne   | Graham  |
     When the response status code should be 201
     Then The response body should contain "Leanne Graham"
  