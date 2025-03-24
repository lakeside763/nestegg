### Loan application api

### Author
- Moses Idowu

### Overview
Create a small nodejs backend service using expressjs providing
- POST/loan-applications
- GET/loan-applications/:id

### Prerequisites
The solution was built using the following
- Nodejs/Typescript
- Express framework
- Sequelize
- PostgreSQL

### Installation, Deployment, Testing
Easily run on docker
- Clone the repo
```
git clone https://github.com/lakeside763/nestegg.git
```
- Setup the application, run and test
```
- pnpm install
- pnpm start:- run the application in prod mode
- pnpm dev:- run the application in dev mode
- pnpm test
```

- Run with docker
```
- docker compose up
- docker compose build --no-cache
```

### API documentation
- Get Global Price Index

1. http://localhost:5500/v1/customers/signup - POST
- request data

```
{
    "first_name": "Lakeside",
    "last_name": "James",
    "email": "james@yahoo.com",
    "password": "password"
}
```

- response data

```
{
    "success": true,
    "message": "Customer account created successfully",
    "data": {
        "id": "4110c832-700c-4274-8514-469577aa1842",
        "first_name": "Lakeside",
        "last_name": "James",
        "role": "customer"
    }
}
```

2. http://localhost:5500/v1/auth/login - POST
- request 

```
{
    "email": "james@yahoo.com",
    "password": "password"
}
```
- response data

```
{
    "success": true,
    "message": "Login successfully",
    "data": {
        "user": {
            "id": "4110c832-700c-4274-8514-469577aa1842",
            "first_name": "Lakeside",
            "last_name": "James"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxMTBjODMyLTcwMGMtNDI3NC04NTE0LTQ2OTU3N2FhMTg0MiIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0MjgwNTIyNSwiZXhwIjoxNzQzNDEwMDI1fQ.H5A6-4vKBc98BevbrQoymzkdW0tAHv5HFpQXspMyMys"
    }
}
```

3. http://localhost:5500/v1/loan/applications - POST
request data

```
{
    "amount": 5000,
    "term_months": 36
}
```
response data

```
{
    "success": true,
    "message": "Loan application created successfully",
    "data": {
        "id": "004ba9ae-9dce-4071-9184-2f4a7aa8908c",
        "status": "pending_approval",
        "created_at": "2025-03-24T08:34:13.262Z",
        "updated_at": "2025-03-24T08:34:13.262Z",
        "customer_id": "4110c832-700c-4274-8514-469577aa1842",
        "amount": 5000,
        "term_months": 36,
        "annual_interest_rate": 5,
        "monthly_interest_rate": 0.4167,
        "monthly_repayment": 149.85,
        "monthly_interest": 20.83
    }
}
```

4. http://localhost:5500/v1/loan/applications/004ba9ae-9dce-4071-9184-2f4a7aa8908c - GET
response data

```
{
    "success": true,
    "message": "Loan application fetched successfully",
    "data": {
        "id": "004ba9ae-9dce-4071-9184-2f4a7aa8908c",
        "customer_id": "4110c832-700c-4274-8514-469577aa1842",
        "amount": 5000,
        "term_months": 36,
        "annual_interest_rate": 5,
        "monthly_repayment": 149.85,
        "monthly_interest_rate": 0.4167,
        "monthly_interest": 20.83,
        "status": "pending_approval",
        "created_at": "2025-03-24T08:34:13.262Z",
        "updated_at": "2025-03-24T08:34:13.262Z"
    }
}
```