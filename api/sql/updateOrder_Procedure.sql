CREATE PROCEDURE updateOrder @OrderID int,
@Quantity int AS BEGIN DECLARE @status int IF EXISTS(
    SELECT
        Orders.OrderID
    FROM
        Orders
        INNER JOIN Products ON Orders.ProductID = Products.ProductID
    WHERE
        OrderID = @OrderID
        AND Products.Quantity >= @Quantity
        AND @Quantity >= 1
) BEGIN
UPDATE
    Orders
SET
    Quantity = @Quantity
WHERE
    OrderID = @OrderID;

SET
    @status = 2;

END
ELSE BEGIN
SET
    @status = 0;

END
SELECT
    @status as 'Status';

END
GO