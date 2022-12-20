# ethereum-lite-explorer-backend

## Description
This project is an open-source block explorer on EVM chain. If you follow this repository, you can run explorer in localhost. This repository provides backend code. This server uses a RESTful API to access the database and fetch data.

## Getting Started

### Installing
- If you have not built a crawling server, please follow the link below first.
  - <https://github.com/Generation-Foundation/ethereum-lite-explorer-crawling>

- Git clone this repo
```bash
git clone https://github.com/Generation-Foundation/ethereum-lite-explorer-back.git
```
- Create ``.env`` to update MySQL database settings.
```env
DB_HOST="host"
DB_USER="user"
DB_PASSWORD="password"
DB_DATABASE="explorer_db"
```
- Run it local with the following command
```bash
npm install --save
node server.js
```
- Go to the following link to build your frontend server
  - <https://github.com/Generation-Foundation/ethereum-lite-explorer-front>

### Api Reference
This is GENERATION's rpc url api documentation. ([API Docs](https://documenter.getpostman.com/view/22780180/2s8YszMpBe#intro))
</br>Use your blockchain rpc url. Access the endpoint and check the data.

## Contributors
Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<table>
  <tr>
    <td align="center"><a href="https://github.com/Booyoun-Kim"><img src="https://avatars.githubusercontent.com/u/34641838?v=4" width="100px;" alt=""/><br /><sub><b>Ben</b></sub></a><br /><a>🧑‍🏫</a> <a>🤔</a> <a>📆</a> <a>💬</a></td>
    <td align="center"><a href="https://github.com/Jaewoneeee"><img src="https://avatars.githubusercontent.com/u/93761302?v=4" width="100px;" alt=""/><br /><sub><b>Danny</b></sub></a><br /><a>💻</a> <a>🤔</a> <a>🔣</a> <a>📖</a> <a>🚧</a></td> 
  </tr>
</table>

## Developed
Developing by [Generation Foundation](https://github.com/Generation-Foundation)
<br>
  
<img width="270" alt="" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e385adbc-8b74-45c6-ab5e-92b1b0510748/Generation_01.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221220T052307Z&X-Amz-Expires=86400&X-Amz-Signature=5b6d663784a1f7362e75ba4bf831fc01e2ce290660ac88a86e04c744ae9dd9a8&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Generation_01.png%22&x-id=GetObject" />

## Our Services and Community
- [Official Website](https://gen.foundation/)
- [Generation Explorer](https://dev-explorer.gen.foundation/)
