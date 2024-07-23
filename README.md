# AHA Rewards Redemption

The American Heart Association (AHA) is a voluntary health organization supported by public contributions and the donated time of millions of volunteers dedicated to reducing disability and death from heart disease and stroke.  The mission of the Association is “To be a relentless force for a world of longer, healthier lives”. The Association is committed to supporting research, educating healthcare professionals and the public about risk factors, advocating for legislation that supports the mission, and providing educational programs for the community to help reduce disability and death from cardiovascular diseases and stroke. The Association’s primary areas of emphasis are cardiovascular and stroke research, education, advocacy, and revenue generation. 

The American Heart Association is a national organization comprised of the National Center located in Dallas, TX and five regions that cover the United States.  The National Center and the Regions are one legal 501(c)(3) not-for-profit corporation sharing one federal tax identification number.  The Association follows the standards of accounting and financial reporting for not-for-profit organizations as prescribed by the Financial Accounting Standards Board.  Support of the AHA mission is also provided by thousands of volunteers and donors. 

The money to support the programs of the Association is derived primarily from contributions by individuals and from other sources such as corporations and foundations.  With a few exceptions, dollars are raised at the regional level that operate independently but must abide by the Association’s bylaws, policies and standards. The AHA National Center supports the Regions by developing programs and materials, providing operations and support services, and ensuring accurate financial reporting. 

For additional information on the American Heart Association, please visit <a href="https://www.heart.org/">American Heart Association | To be a relentless force for a world of longer, healthier lives</a>.


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

