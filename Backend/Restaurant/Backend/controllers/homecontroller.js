var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var { Orders } = require('.././models/res_orders');
var kafka = require('../kafka/client');

module.exports.orders = function (req, res) {
    order = req.body.s_order;
    res_name = req.body.res_name;
    console.log("orders")
    kafka.make_request('res_home', req.body, function (err, result) {
        if (err) {
            console.log("err")
            console.log(err)
            res.status(400).json({
                data: err,
                message: 'No active orders'
            });
        }
        else {
            console.log("result")
            console.log(result);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            console.log("orders : ", JSON.stringify(result));
            res.end(JSON.stringify(result));


        }
    });
}
module.exports.updatefoodstatus = function (req, res) {
    s_food = req.body.s_food;
    s_order = req.body.s_order;
    orderid = req.body.orderid;
    res_email = req.body.res_email;
    console.log(s_food)
    console.log(orderid)
    kafka.make_request('res_updatefoodstatus', req.body, function (err, result) {
        if (err) {
            console.log(err)
            res.status(400).json({
                data: err,
                message: 'No orders'
            });
        }
        else {
            console.log(result);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            console.log("orders : ", JSON.stringify(result));
            res.end(JSON.stringify(result));


        }
    });
}

module.exports.cancelorder = function (req, res) {
    orderid = req.body.orderid;
    res_name = req.body.res_name;
    Orders.remove({ "res_name": req.body.res_name, "_id": req.body.orderid })
        .then((result, err) => {
            if (err) {
                console.log(err)
                res.status(400).json({
                    data: err,
                    message: 'No orders'
                });
            }
            else {
                console.log(result);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("orders : ", JSON.stringify(result));
                res.end(JSON.stringify(result));


            }
        });
}