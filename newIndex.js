const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql')
const app = express();
const port = 3000;
app.use(express.static(__dirname + "./public2/"));

app.use(bodyparser.urlencoded({ extended: false }))
app.set('view engine', 'pug')

//var app1 = express.Router();
app.get('/', function (req, res) {
    res.sendFile('NewShippingDetails.html', { root: 'D:/Aasim data/Software/Node.js_program/First.Node/public2' })
});
app.listen(port, () => console.log('Listening on port number 3000'));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aasim_database"

});

con.connect(function (err) {
    if (err) throw err;
    console.log('database connected successfully');
});

app.post('/submit', function (req, res) {
    console.log(req.body)

    var Productname = req.body.ProductName ;
    var Fname = req.body.FirstName;
    var Lname =req.body.LastName;
    var MobNo = req.body.inputContactNo;
    var Addr = req.body.inputAddress;
    var Addr2 = req.body.inputAddress2;
    var city = req.body.inputCity;
    var state =   req.body.inputState;
    var zip = req.body.inputZip;

    var insertQuery = 'insert into `orderdetails` (`Productname`,`Fname`,`Lname`,`MobNo`,`Addr`,`Addr2`,`city`,`state`,`zip`) VALUES (?,?,?,?,?,?,?,?,?)';
    var query = mysql.format(insertQuery, [Productname, Fname, Lname, MobNo, Addr, Addr2, city, state, zip]);
    con.query(query, function (err, response) {
        if (err) throw err;
        console.log(response.insertId);
       // res.sendFile('success.html', { root: 'D:/Aasim data/Software/Node.js_program/First.Node/public2' })
       
       
        res.render('index', {title : 'Order Confirmation',
        message: 'Your order has been placed successfully for ',
        ProductName: req.body.ProductName
    })
    });

    
});
