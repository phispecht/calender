const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(compression());
app.use(express.json());

app.use(
    cookieSession({
        secret: "cookie",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(
    express.static("./src"),
    express.urlencoded({
        extended: false,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.get("/getItems", (req, res) => {
    db.getItems()
        .then((items) => {
            res.json(items);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/addItem/:newItem", (req, res) => {
    const newItem = req.params.newItem;

    db.addItem(newItem)
        .then((newItem) => {
            res.json(newItem);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/deleteItem/:deleteItem", (req, res) => {
    const itemId = req.params.deleteItem;

    db.deleteItem(itemId)
        .then((item) => {
            res.json(item);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/checkItem/:checkItem", (req, res) => {
    const checkItemId = req.params.checkItem;

    db.checkItem(checkItemId)
        .then((checkItem) => {
            res.json(checkItem);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/uncheckItem/:checkItem", (req, res) => {
    const uncheckItemId = req.params.checkItem;

    db.uncheckItem(uncheckItemId)
        .then((uncheckItem) => {
            res.json(uncheckItem);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/registration", (req, res) => {
    const first = req.body.prename;
    const last = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const passwordRepeat = req.body.passwordRepeat;

    if (password == passwordRepeat) {
        db.insertUser(first, last, email, password)
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                res.json(err);
            });
    } else {
        res.json("wrongMatch");
    }
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
