var express = require('express');
var app = express();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:admin@localhost:5432/postgres");

app.get('/buscar', function (req, res) {
    //db.oneOrNone("SELECT * from registro where re_idtrans="+req.query.id+ "")
    db.oneOrNone("SELECT * from registro where re_idtrans="+req.query.id+ "")
        .then(function (data) {
            console.log("DATA:", data);
            res.send(data);
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
    
});

app.get('/validar', function (req, res) {
    db.any("UPDATE registro SET re_validado="+req.query.bool+" where re_idtrans="+ req.query.id +" ")
        .then(function (data) {
            console.log("DATA:", data);
            res.send(data);
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});