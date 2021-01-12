const express = require("express");
const app = express();
const compression = require("compression");

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
    express.static("./src"),
    express.urlencoded({
        extended: false,
    })
);

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("server listening.");
});
