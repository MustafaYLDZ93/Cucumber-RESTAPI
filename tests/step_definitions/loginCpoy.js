const { Given, When, Then } = require("@cucumber/cucumber");
const axios = require('axios');
const assert = require('assert');

let response;


Given('I send a POST request to the user endpoint with the following payload:', async function (dataTable) {
  const payload = dataTable.rowsHash();
  response = await axios.post('https://jsonplaceholder.typicode.com/users', payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
});

When('the response status code should be {int}', function (expectedStatusCode) {
  const status = response.status;
  if (status !== expectedStatusCode) {
    throw new Error(`Expected status code ${expectedStatusCode} but got ${status}`);
  }
});

Then('The response body should contain {string}', function (expectedString) {
  console.log('Response Data:', response.data); // Yanıt verisini konsola yazdır
  const [key, value] = expectedString.split(' ');
  assert(response.data[key] === value, `Expected response body to include a key '${key}' with value '${value}'`);
});