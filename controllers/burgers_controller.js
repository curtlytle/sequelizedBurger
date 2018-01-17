var express = require("express");
// Requiring our models
var db = require("../models");

var router = express.Router();

router.get("/", function (req, res) {
    db.Burger.findAll({}).then(function (data) {
        var results = [];
        for (var i = 0; i < data.length; i++){
           results.push(data[i].dataValues);
        }
        var hbsObject = {
            burgers: results
        };
        //console.log("... hbsObject ....")
        //console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.put("/api/burgers/:id", function (req, res) {
    db.Burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(function (dbBurger) {
            if (dbBurger.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });

});

router.post("/api/burgers", function (req, res) {
    db.Burger.create({
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
    }).then(function (dbBurger) {
        //res.json(dbBurger);
        res.json({id: dbBurger.id});
    });
});

module.exports = router;

