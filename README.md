# adventure-capitali-ts
![](https://github.com/epiphone/adventure-capitali-ts/workflows/CI/badge.svg)

Simple React/TypeScript implementation of the Adventure Capitalist game. Check the live demo at https://epiphone.github.io/adventure-capitali-ts/.

Key parts of the game are found in the following modules:
- [`src/Model.ts`](src/Model.ts) defines the game state data model,
- [`src/action.ts`](src/action.ts) lists all the actions or events, and
- [`src/reducer.ts`](src/reducer.ts) describes how actions transform game state.

The app uses React's `useReducer` hook (supplemented with [`react-hook-thunk-reducer`](https://github.com/nathanbuchar/react-hook-thunk-reducer/)) for state management in favor of a more full-fledged solution like `redux`. The idea here was to keep dependencies and configuration at a minimum. As a tradeoff we have to lug game state and the `dispatch` method from the root component ([`App.ts`](src/components/App.ts)) down to lower-level components. In an app any bigger than this I'd probably consider biting the bullet and going with `redux`.

## Features
- Buy and upgrade businesses
  - Double income collection speed after 25x, 50x, etc upgrades
  - Use the upper-right corner multiplier to buy multiple upgrades with a single click
- Collect income from businesses
- Hire managers to automate income collection
  - Managers keep collecting income even after closing the tab
- Responsive UI
- Basic CI running on Github Actions
  - build, test and deploy to Github pages

## Future work
- Visual cues for income collection duration and collection speed doubling
- Smarter income collection when leaving and returning to the game:
  - Don't ignore partially finished collections
  - Pop-up noting how much income was collected while absent
- Cross-browser testing; only tested on Ubuntu/Android Firefox so far
- Performance optimization might be warranted (`useCallback` on event handlers etc)
- Extra features like sound effects and a tutorial would be neat too!

## Setup

[Install `yarn`](https://yarnpkg.com/en/docs/install) and run `yarn install` to setup dependencies.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Available scripts include
- **`yarn start`** runs the app in development mode in [http://localhost:3000](http://localhost:3000)
- **`yarn test`** launches the test runner in watch mode
- **`yarn build`** builds the app for production to the `/build` folder
