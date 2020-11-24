CREATE PROCEDURE InsertOrder @ProductID int,
@Quantity int,
@CartID int AS BEGIN
/*Variables*/
DECLARE @id int,
@maxquantity int,
@orderquantity int,
/*Status Code*/
@status int IF (@Quantity > 0) BEGIN
/* check if ordered Product is already Part of existing Order and wheater the Sum of both quantities would be higher than max allowed */
SELECT
    @id = OrderID,
    @maxquantity = Products.Quantity,
    @orderquantity = Orders.Quantity
FROM
    Orders
    INNER JOIN Products ON Orders.ProductID = Products.ProductID
WHERE
    Orders.CartID = @CartID
    AND Orders.ProductID = @ProductID IF(@id is NOT NULL)
    /*Update existing Order with Sum of Orders*/
    IF(@maxquantity >= @orderquantity + @Quantity) BEGIN
UPDATE
    TOP (1) Orders
SET
    Quantity = Quantity + @Quantity
WHERE
    OrderID = @id;

SET
    @status = 2
END
ELSE
SET
    @status = 0;

ELSE
/*insert new Costumer with valid quantity*/
BEGIN
SET
    @maxquantity =(
        SELECT
            Quantity
        FROM
            Products
        WHERE
            @ProductID = ProductID
    ) IF(@Quantity <= @maxquantity) BEGIN
INSERT INTO
    Orders (ProductID, Quantity, CartID)
VALUES
    (@ProductID, @Quantity, @CartID);

SET
    @status = 1;

END
ELSE
SET
    @status = 0;

END
END
ELSE
SET
    @status = 0
SELECT
    @status as 'Status';

END
GO