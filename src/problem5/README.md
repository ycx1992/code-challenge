# Task

Develop a backend server with ExpressJS. You are required to build a set of CRUD interface that allow a user to interact with the service. You are required to use TypeScript for this task.

1. Interface functionalities:
   1. Create a resource.
   2. List resources with basic filters.
   3. Get details of a resource.
   4. Update resource details.
   5. Delete a resource.
2. You should connect your backend service with a simple database for data persistence.
3. Provide `README.md` for the configuration and the way to run application.

## Project

A simple API server that uses ExpressJS and TypeScript for entry of computer sales

### Project Structure

```
.
├── config.toml # Configuration file for the application
├── api # API folder
│   └── index.ts
├── helper # Helper function folder
│   └── index.ts
├── models # Models folder that declares data types
│   └── index.ts
├── sql # SQL folder for SQL files
├── index.ts # Entry point for the application
└── setup_db.ts # Database setup script
```

### Steps to run application

Step to run

1. [Install bun](`https://bun.sh/docs/installation`)
2. Install dependencies `bun install`
3. Setup database `bun setup_db.ts`
4. Start application `bun index.ts`

### API list

1. Create a sales

`POST /sales`

#### Parameters

| name         | type     | data type | description  |
| ------------ | -------- | --------- | ------------ |
| contact      | required | string    | Contact name |
| gender       | required | string    | "M" or "F"   |
| age          | required | integer   | -            |
| state        | required | string    | -            |
| product_code | required | string    | Product code |
| product_type | required | string    | Product type |
| price        | required | double    | Price        |
| profit       | required | double    | -            |
| lead         | required | string    | -            |
| month        | required | string    | -            |
| year         | required | integer   | -            |

##### Responses

| http code | content-type       | response                                   | description   |
| --------- | ------------------ | ------------------------------------------ | ------------- |
| `200`     | `application/json` | `{"code":0,"msg":"","data":{"lastID":40}}` | Insert status |

2. List sales with basic filters. Display 10 data each page

`GET /sales`

#### Parameters

| name  | type     | data type | description |
| ----- | -------- | --------- | ----------- |
| page  | optional | integer   | Page number |
| month | optional | string    | -           |
| year  | optional | integer   | -           |

##### Responses

| http code | content-type       | response | description   |
| --------- | ------------------ | -------- | ------------- |
| `200`     | `application/json` | `[]`     | List of sales |

3. Get details of sales

`GET /sales/:id`

#### Parameters

| name | type     | data type | description |
| ---- | -------- | --------- | ----------- |
| id   | required | integer   | Sales ID    |

##### Responses

| http code | content-type       | response | description |
| --------- | ------------------ | -------- | ----------- |
| `200`     | `application/json` | `{}`     | Sales data  |

4. Update sales

`PUT /sales/:id`

#### Parameters

| name         | type     | data type | description  |
| ------------ | -------- | --------- | ------------ |
| id           | required | integer   | Sales ID     |
| contact      | optional | string    | Contact name |
| gender       | optional | string    | "M" or "F"   |
| age          | optional | integer   | -            |
| state        | optional | string    | -            |
| product_code | optional | string    | Product code |
| product_type | optional | string    | Product type |
| price        | optional | double    | Price        |
| profit       | optional | double    | -            |
| lead         | optional | string    | -            |
| month        | optional | string    | -            |
| year         | optional | integer   | -            |

##### Responses

| http code | content-type       | response                                                          | description   |
| --------- | ------------------ | ----------------------------------------------------------------- | ------------- |
| `200`     | `application/json` | `{"code":0,"msg":"Update successful. Changed 1 rows.","data":{}}` | Update status |

5.  Delete sales

`DELETE /sales/:id`

#### Parameters

| name | type     | data type | description |
| ---- | -------- | --------- | ----------- |
| id   | required | integer   | Sales ID    |

##### Responses

| http code | content-type       | response                                          | description   |
| --------- | ------------------ | ------------------------------------------------- | ------------- |
| `200`     | `application/json` | `{"code":0,"msg":"Delete successful.","data":{}}` | Delete status |

#### Appendix

- For testing purpose, you can import [problem5.json](problem5.json) to [Hoppscotch](https://hoppscotch.io/) to see sample URL and data
