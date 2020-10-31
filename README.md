# Decrypto

## Building the Project

1. Clone the repo: `git clone https://github.com/daniellok/decrypto.git`
2. Open the directory: `cd decrypto`
3. Install dependencies: `npm install`
4. Build the client: `npm run build`
5. Run the server: `npm run start`

At this point the server should be started at `http://localhost:3000`!

If you modify the client files (i.e. anything inside `src/client`), make sure to run `npm run build` again in order to see the changes.

## Before Committing

1. Run the type-checker and fix any problems: `npm run flow`
2. Run the auto-formatter: `npm run prettier`

## Before you start, you may need to install some tools:

- npm and Node.js [here](https://nodejs.org/en/).
- prettier [here](https://prettier.io).
- flow [here](https://flow.org/).