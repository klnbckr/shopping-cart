# shopping-cart
A Shopping Cart using Angular as frontend and a Node Express API with SQL Server 

## Content

This project is made up of 2 packages.

- api (Node Express API)
- angular (Angular app)

## Installation

1. Clone project

```
git clone https://github.com/klnbckr/shopping-cart.git
```

2. cd into api folder

```
cd api
```

3. install dependencies

```
npm install
```

4. Start SQL server
- TCP/IP has to be enabled 
- SQL Server Browser has to be running (Sql Server Configuration Manager)

5. Create database called `shopping`

6. Setup database: 
  - api/sql
  - Create Tables Orders and Products: 
    * Tables_Init.sql
  - Create Procedures:
    * getOrders_Procedure.sql
    * deleteOrder_Procedure.sql 
    * insertOrder_Procedure.sql 
    * updateOrder_Procedure.sql
  - Insert Products and Orders: 
    * Products_Seeder.sql
    * Orders_Seeder.sql

7. Edit Config of api to connect to your database
dbconfig.js


8. cd into angular folder 

```
cd angular/shopping
```

9. Install dependencies

```
npm install
```

## Usage

1. Start server `npm start` in `api`

2. Now you can run `ng serve --open` in `angular/shopping` to start the app.


## Features

1. Get list of products from SQL database by search term 
2. Insert product into cart
3. See cart details
4. Change quantity of product of cart
5. Remove order from cart