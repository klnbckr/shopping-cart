CREATE PROCEDURE getOrders @CartID int AS BEGIN
SELECT
    Orders.OrderID,
    Orders.ProductID,
    Orders.Quantity,
    Orders.CartID,
    Products.Title,
    Products.Imagepath,
    Products.Quantity AS MaxQuantity,
    Products.Price,
    Products.Vat
FROM
    Orders
    INNER JOIN Products ON Orders.ProductID = Products.ProductID
WHERE
    CartID = @CartID
END
GO