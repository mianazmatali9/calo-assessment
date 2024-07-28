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
   git clone https://github.com/mianazmatali9/calo-assessment.git
   ```
2. Go to directory
    ```sh
   cd calo-assessment
   ```

3. Install NPM packages
   ```sh
   pnpm install
   ```
4. Go to any application
   ```sh
   cd applications/backend
   or
   cd applications/backend
   ```
5. Copy .env file
   ```sh
   cp .env.example .env
   ```

6. Copy .env file
   ```sh
   pnpm dev
   ```
### Run Tests
Either on root or any specific application run:
   ```sh
   pnpm test
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
├── .husky
├── applications
    ├── backend
      ├── src
          ├── __tests__
          ├── config
          ├── controllers
          ├── jobs
          ├── middlewares
          ├── routes
          ├── services
          ├── types
          ├── utils
          ├── workers
          ├── app.ts
          ├── server.ts
          └── package.json
    ├── frontend
      ├── src
          ├── assets
          ├── components
          ├── hooks
          ├── routers
          ├── services
          ├── test-utils
          ├── types
          ├── utils
          ├── App.tsx
          └── package.json      
├── .gitignore
├── lerna.json
├── package.json
├── pnpm-workspace.yaml
└── README.md
  ```
