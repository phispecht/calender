const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./src/bc");

/* const { s3Url } = require("./config.json"); */
/* const s3 = require("./s3.js"); */
/* const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");*/
const { json } = require("express");

/* const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
}); */

/* const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
}); */

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

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
