var Db = require('./dboperations');
var models = require('./models');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((req, res, next) => {
    /* Middleware */
    next();
})

router.route('/shop').get((req, res) => {

    //Query Params
    var q = req.query.q;
    var p = parseInt(req.query.p);
    var num = parseInt(req.query.num);

    if (isNaN(p) || p < 0) {
        p = undefined;
    }
    if (isNaN(num) || num < 0) {
        num = undefined;
    }

    dboperations.getProducts(q, p, num).then(result => {
        res.json(result[0]);
    })
})

router.route('/cart').post((req, res) => {
    let order = { ...req.body }

    if (isNaN(parseInt(order.ProductID)) || isNaN(parseInt(order.Quantity)) || isNaN(parseInt(order.CartID)) || order.Quantity < 1) {
        res.status(400).json();
    }
    else {
        dboperations.addOrder(order).then(result => {
            switch (result[0][0].Status) {
                case 1: res.status(201).json(result[0]); break;
                case 2: res.status(200).json(result[0]); break;
                default: res.status(400).json(result[0]); break;
            }


        })
    }
})

router.route('/cart').get((req, res) => {
    dboperations.getOrders().then(result => {
        res.json(result[0]);
    })
})

router.route('/cart').delete((req, res) => {
    let order = { ...req.body }
    let OrderID = parseInt(order.Id)
    if (isNaN(OrderID)) {
        res.status(400).json();
    }
    else {
        dboperations.deleteOrder(OrderID).then(result => {
            res.status(200).json(result[0]);
        })

    }

})

router.route('/cart').patch((req, res) => {
    let order = { ...req.body }
    let OrderID = parseInt(order.Id);
    let Quantity = parseInt(order.Quantity);
    if (isNaN(OrderID) || isNaN(Quantity) || Quantity < 1) {
        res.status(400).json();
    }
    else {
        dboperations.updateOrder(OrderID, Quantity).then(result => {
            switch (result[0][0].Status) {
                case 2: res.status(200).json(result[0]); break;
                default: res.status(400).json(result[0]); break;
            }
        })

    }

})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);
