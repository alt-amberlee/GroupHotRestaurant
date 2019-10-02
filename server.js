// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [{
        id: "yoda",
        name: "Yoda",
        email: "JediMaster@gmail.com",
        number: 900 - 999 - 9999
    },
    {
        id: "darthmaul",
        name: "Darth Maul",
        email: "SithLord@gmail.com",
        number: 200 - 222 - 2222
    }
];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/viewReservations", function(req, res) {
    res.sendFile(path.join(__dirname, "viewReservations.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

app.get("/api/reservations/:reservations", function(req, res) {
    var chosen = req.params.reservations;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].id) {
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
});

app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservations = req.body;

    // Using a RegEx Pattern to remove spaces from newReservations
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservations.id = newReservations.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservations);

    reservations.push(newReservations);

    res.json(newReservations);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});