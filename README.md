# Finance Tracker API
This is a REST API for finance tracking app, functionality:
- login/sign in
- get, create, edit and delete categories of spendings
- get, create, edit and delete expenses

The api is deployed and running on host https://finance-tracker-v31w.onrender.com

## Tech Stack
- Nest.js
- Node.js
- TypeOrm
- Postgres Db
- Typescript
- JWT

## How to start
1) Check if you have installed node.js and npm by entering ```node -v``` ```npm -v``` in your terminal
2) Open project and in the project root add file ```.env```, enter and fill such variables with your values:
```
DB_HOST = 
DB_PORT = 
DB_USERNAME = 
DB_PASSWORD = 
DB_NAME = 
JWT_SECRET = 
ENV = (If you can connect to database with ssl, use production, if no - any other string)
```
3) Check your postgres databse for the database name you entered
4) In terminal enter ```npm install```, ```npm run build```
5) Then enter ```npm run migration:generate``` and ```npm run migration:run```
6) Then enter ```npm start run```
7) By default application is running on port 3000

## Postman collection
You can import my postman collection.
Put variables:
- host (put your host addres)
- token (put token you get during authorization)
  
[Finance tracker.postman_collection.json](https://github.com/BohdanStarunskyi/finance-tracker/files/14179659/Finance.tracker.postman_collection.json)


## API Documentation
Authorization (API Token)

Key: "authorization"

Value: [token from auth]

### GET /ping

response:
```
Pong
```

### POST /api/auth/sign-up

```
{
    "email": string,
    "password": string
}
```
response:
```
{
    "token": string
}
```

### POST /api/auth/login

request: 
```
{
    "email": string,
    "password": string
}
```
response:
```
{
    "token": string
}
```

### POST /api/category/add

request:
```
{
    "name": string,
    "emoji": string | optional,
    "color": string (format and default: "FFFFFF")
}
```
response:
```
{
    "id": int,
    "name": string,
    "emoji": string | optional,
    "color": string (format and default: "FFFFFF")
}
```

### PUT /api/category/update

request:
```
{
    "id": int,
    "name": string,
    "emoji": string | optional,
    "color": string (format and default: "FFFFFF")
}
```
response:
```
{
    "id": int,
    "name": string,
    "emoji": string | optional,
    "color": string (format and default: "FFFFFF")
}
```

### DELETE /api/category/delete/:id

response:
```
{
    "id": int
}
```

### GET /api/category/:id

response:
```
{
    "id": int,
    "name": string,
    "emoji": string | optional,
    "color": string (format and default: "FFFFFF")
}
```

### GET /api/categories

query:
```
offset: int
```
```
limit: int
```
response:
```
[
    {
        "id": int,
        "name": string,
        "emoji": string | optional,
        "color": string (format and default: "FFFFFF")
    }
]
```


### POST /api/expense/add

request:
```
{
    "name":string,
    "amount": int,
    "note": sting | optional,
    "categoryId": int
}
```
response:
```
{
    "name": sting,
    "user": {
        "id": int
    },
    "amount": int,
    "note": string,
    "category": {
        "id": int
    },
    "id": int,
    "createdDate": string
}
```

### PUT /api/expense/update

request:
```
{
    "name":string,
    "amount": int,
    "note": sting | optional,
    "categoryId": int
}
```
response:
```
{
    "id": int,
    "amount": int,
    "name": string,
    "note": string,
    "user": {
        "id": int
    },
    "category": {
        "id": int
    }
}
```

### DELETE /api/expense/delete/:id

response:
```
{
    "id": int
}
```

### GET /api/expense/:id

response:
```
{
    "id": int,
    "name": string,
    "amount": int,
    "createdDate": string,
    "note": string,
    "category": {
        "id": int,
        "name": string
    }
}
```

### GET /api/expenses

query:
```
offset: int
```
```
limit: int
```
```
categoryId: int | optional
```
response:
```
[
  {
    "id": int,
    "name": string,
    "amount": int,
    "createdDate": string,
    "note": string,
    "category": {
        "id": int,
        "name": string
    }
  }
]
```

## Database Schema
<img width="967" alt="image" src="https://github.com/BohdanStarunskyi/finance-tracker/assets/91286770/dba0f0d5-2b29-46ed-941d-2fe0338579c6">
