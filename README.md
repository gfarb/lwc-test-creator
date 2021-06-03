# LWC Test Creator
LWC Test Creator is an open-source VS Code extension built with JavaScript and the VS Code Extension API enabling users to quickly create boilerplate tests for Salesforce Lightning Web Components.

This extension creates a Lightning Web Component test template in the appropriate directory and only requires the user to enter the name of the Lightning Web Component as opposed to the path of the Lightning Web Component *.JS file or making the user change to the appropriate target directory while using the `force:lightning:lwc:test:create` CLI command.

Installation: [https://marketplace.visualstudio.com/items?itemName=MaxGoldfarb.lwc-test-creator](https://marketplace.visualstudio.com/items?itemName=MaxGoldfarb.lwc-test-creator)

![Demo](https://media.giphy.com/media/mmE8GRgrZUYTp1vUP8/giphy.gif)

## Features
* Create Jest Test
  * Creates a `__tests__` directory in the appropriate directory for the target Lightning Web Component.
  * Creates a `<Lightning Web Component Name>.test.js` file with boilerplate code in the `__tests__` directory.
  * How to use (after installation):
    1. Open VS Code Command Palette
    2. Search for & select the `Create Jest Test` LWC Test Creator command
    3. Type in the name of the target Lightning Web Component & press 'Enter'

## Requirements
* VS Code ^v1.56
* [text-encoding-polyfill](https://www.npmjs.com/package/text-encoding-polyfill)

## Known Issues
* Overwrites content in an existing test file for the target Lightning Web Component if the test file is named `<Lightning Web Component Name>.test.js`.

## Release Notes
### 1.0.0
Initial release of LWC Test Creator