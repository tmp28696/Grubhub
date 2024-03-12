var connection = require('../config');
var { mongoose } = require('.././db/mongoose');
var { Orders } = require('.././models/res_orders');
var kafka = require('../kafka/client')

module.exports.placeorder = function (req, res) {

    var orders = new Orders({
        "buyer_email": req.body.buyer_email,
        "buyer_add": req.body.buyer_add,
        "res_name": req.body.res_name,
        "r_id": req.body.r_id,
        "item_name": req.body.orders,
        "s_order": "active",
        "s_food": "new",
        "total": req.body.total

    });

    kafka.make_request('buyer_placeorder', req.body, function (err, result) {
        console.log("search")
        if (result) {
            console.log(result)
            res.status(200).json({
                statusCode: 200,
                data: result,
                message: 'Success'
            });
        }
        else {
            console.log("else");
            console.log(err);
            res.status(400).json({
                statusCODE: 400,
                data: err,
                message: 'No items'
            });

        }
    });

}
