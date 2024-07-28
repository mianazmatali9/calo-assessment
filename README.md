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

### Time Report
1. Requirement Analysis and Planning
Description: Understanding the requirements, planning the approach, and outlining the necessary tasks.
Time Spent: 1.5 hours
2. API Implementation
Description: Developing the API endpoints, including GET /jobs, POST /jobs, and GET /jobs/:id.
Time Spent: 3 hours
2. Handling Highload
Description: It was the most tricky part of this assessment, I've used worker threads to handle multiple requests on the servers.
Time Spent: 4 hours
3. Modularization and Refactoring
Description: Refactoring the code to ensure it follows modular principles, improving maintainability.
Time Spent: 1.5 hours
4. Test Cases Development
Description: Writing test cases for each API endpoint using Jest and Sinon, including setting up stubs and mocks.
Time Spent: 4 hours
5. Jest Configuration
Description: Configuring Jest to work with ES6 modules and TypeScript, including setting up Babel if needed.
Time Spent: 1 hour
6. User interface using ReactJS
Description: Created an interactive UI using ReactJS and Tailwind, also used Flowbite components and integrated UI with backend.
Time Spent: 4 hours
6. Documentation
Description: Documenting the code, including comments, setup instructions, and test execution guidelines.
Time Spent: 1 hour
7. Testing and Debugging
Description: Running tests, debugging issues, and ensuring all functionalities work as expected.
Time Spent: 2 hours
8. Final Review and Delivery Preparation
Description: Reviewing the code and tests, preparing the final delivery.
Time Spent: 1 hour
