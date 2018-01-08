var express = require("express");
// Requiring our models
var db = require("../models");

var router = express.Router();

router.get("/", function (req, res) {
    db.sBurger.findAll({}).then(function (dbBurger) {
        // We have access to the todos as an argument inside of the callback function
        res.render("index", dbBurger);
    });
});

router.put("/api/burgers/:id", function (req, res) {
    db.sBurger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(function (dbBurger) {
            res.json(dbBurger);
        });

});

router.post("/api/burgers", function (req, res) {
    db.sBurger.create({
        burger_name: req.body.name,
        devoured: req.body.devoured
    }).then(function(dbBurger) {
        res.json(dbBurger);
        //res.json({id: result.id});
    });
});

module.exports = router;

