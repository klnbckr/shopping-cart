CREATE TABLE Products (
    ProductID int IDENTITY(1, 1) PRIMARY KEY,
    Title varchar(255),
    Description varchar(255),
    Imagepath varchar(255),
    Quantity int,
    Price float,
    Vat float
);

CREATE TABLE Orders(
    OrderID int IDENTITY(1, 1) PRIMARY KEY,
    ProductID int NOT NULL,
    Quantity int NOT NULL,
    CartID int NOT NULL
);