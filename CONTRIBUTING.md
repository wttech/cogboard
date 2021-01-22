<p>
  <img src="docs/images/wtt_logo.png" alt="Wunderman Thompson Technology logo Logo"/>
</p>

# CogBoard contribution guide

First of all thank you for your interest in contributing to this project. We appreciate all the work that you plan to do to develop CogBoard

## How to start

To see how to setup local environment see our [Developer Setup Guide](https://github.com/wttech/cogboard/wiki#prerequisites).

Check existing issues to make sure you don't create a duplicate.

## CogBoard Contributor License Agreement

Project License: [Apache License 2.0](https://github.com/wttech/cogboard/blob/master/LICENSE)

- You will only submit contributions where you have authored 100% of the content.
- You will only submit contributions to which you have the necessary rights. This means that if you are employed you have received the necessary permissions from your employer to make the contributions.
- Whatever content you contribute will be provided under the Project License(s).

## Commit messages

To ensure commit messages are easy to read and descriptive enough please follow the [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) guideline.

## Pull requests

Pull requests need to follow provided [Pull Request Template](https://github.com/wttech/cogboard/blob/master/.github/PULL_REQUEST_TEMPLATE.md)

## Documentation

CogBoard's documentation can be found in [CogBoard Wiki](https://github.com/wttech/cogboard/wiki).

## Coding conventions

### Kotlin

[Detekt](https://github.com/arturbosch/detekt) is used to automatically check and format code on each build.
Avoid wildcard imports. Keep in mind Detect issue threshold during the build.

### JavaScript

#### Style guide

[Prettier](https://prettier.io/) is used to automatically format code before commiting changes (using pre-commit hook).

#### Import order

For the imports we use the order:

1. Libraries and absolute imports.
2. Helpers, utils, redux actions etc.
3. Components.

```javascript
import React from 'react';
import { func, object, string, bool, number } from 'prop-types';
import { useDispatch } from 'react-redux';

import { saveWidget } from '../actions/thunks';

import WidgetForm from './WidgetForm';
```

#### Prop Types

The project is using PropTypes to ensure that the data component receives is valid. Warning is shown in the JavaScript console when an invalid value is provided for a prop. Provide defaultProps for props that are not required.

```javascript
import { string, number, bool } from 'prop-types';

TheComponent.propTypes = {
  firstProperty: string.isRequired,
  secondProperty: number,
  thirdProperty: bool.isRequired
}

TheComponent.defaultProps = {
  secondProperty: 1
}

```

[More info](https://reactjs.org/docs/typechecking-with-proptypes.html)

#### Props

Destructure props in function's inputs declaration.

```javascript
const TheComponent = ({ firstProperty, secondProperty, thirdProperty }) -> {
  // Component's code
}
```

[More info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Automation - Cypress

All paths are relative to `$PROJECT_ROOT/functional/cypress-tests/`

### File structure

1. Testing data should be placed under `cypress/fixtures/`
2. Specs should be placed under `cypress/integration/`
3. Helper functions should be placed under `cypress/support/`
4. Configuration files should be placed under `cypress/config/`

### Coding convention

Existing ESLint rules:
- Unnecessary use of cy.wait(),
- No assigning of return values,
- Assertion before using cy.screenshot(),
- Single quotes,
- Newline per each chained call, for 2+ chained calls,
- Newline for each of argument if there 3+ arguments,
- 2 space indent
- Using semicolons
- Spacing after opening bracket and before closing bracket if they are on the same line
- Spaces between an after arrow function symbol
- Empty line on end of file
- Use const instead of let where possible
