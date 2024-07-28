# CALO Assessment

<!-- GETTING STARTED -->
## Getting Started

These are the instructions how you can setup the app at your local server.

### Prerequisites

_Required Node.js version: >18.16.0

* lerna
  ```sh
    npm install --global lerna
  ```
  Here is the link of <a href="https://lerna.js.org/docs/getting-started">lerna.js.org</a> documentation.

* pnpm
  ```sh
    npm install -g pnpm
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/crushlovely/aha-rewards-redemption.git
   ```
2. Go to directory
    ```sh
   cd aha-rewards-redemption
   ```

3. Install NPM packages
   ```sh
   pnpm install
   ```

### Lerna commands
* run parallel
  ```sh
    lerna run start --parallel
  ```
* run specific workspace
  ```sh
    lerna run --scope=<workspace-name> start
  ```
* add new dependency to root
  ```sh
    pnpm install <package-name> -w
  ```
* add new dependency in a specific workspace
  ```sh
    cd applications/workspace-name
    pnpm install <package-name>
  ```

### Directory structure
  ```
├── applications
    ├── backend-admin
      ├── db
         └── sequelize.js
      ├── index.js
      ├── package.json
      ├── package-lock.json
      └── README.md
    ├── backend-shop
      ├── db
         └── sequelize.js
      ├── index.js
      ├── package.json
      ├── package-lock.json
      └── README.md
    ├── frontend-admin
    ├── frontend-shop
├── .gitignore
├── lerna.json
├── package.json
└── README.md
  ```
