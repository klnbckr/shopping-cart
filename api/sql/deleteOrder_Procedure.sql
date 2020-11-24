CREATE PROCEDURE deleteOrder @OrderID int AS BEGIN
DELETE FROM
    Orders
WHERE
    OrderID = @OrderID
END
GO