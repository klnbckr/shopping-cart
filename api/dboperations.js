var config = require('./dbconfig');
const sql = require('mssql');

const DEFAULT_CART = 1;
const DEFAULT_FETCH = 10;

async function getProducts(searchTerm = '', offset = 0, fetch = DEFAULT_FETCH) {

    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('searchTerm', sql.VarChar(20), searchTerm)
            .input('offset', sql.Int, offset)
            .input('fetch', sql.Int, fetch)
            .query("SELECT * from Products WHERE Title LIKE '%' + @searchTerm + '%' ORDER BY ProductID OFFSET @offset ROWS FETCH NEXT @fetch ROWS ONLY");
        return products.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('ProductID', sql.Int, order.ProductID)
            .input('Quantity', sql.Int, order.Quantity)
            .input('CartID', sql.Int, order.CartID)
            .execute('InsertOrder');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function getOrders(CartID = DEFAULT_CART) {

    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('CartID', sql.Int, CartID)
            .execute('getOrders');
        return products.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function deleteOrder(OrderID) {

    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .execute('deleteOrder');
        return products.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function updateOrder(OrderID, Quantity) {
    
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .input('Quantity', sql.Int, Quantity)
            .execute('updateOrder');
        return products.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts: getProducts,
    addOrder: addOrder,
    getOrders: getOrders,
    deleteOrder: deleteOrder,
    updateOrder: updateOrder
}