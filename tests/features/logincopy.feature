@apiLogin2
Feature: Login User

  Scenario: Successful user login-2
     Given I Send a POST request to the user endpoint with the following payload:
        | username | password |
        | Leanne   | Graham  |
     When The response status code should be 201
     Then The response body should contain "Leanne Graham"
  