const express = require("express");
const app = express();
const compression = require("compression");
const config = require("./config");
const https = require("https");
const axios = require("axios").default;

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

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized:false,
});

app.get("/getData", (req, res) => {
    const options = config.handleOptionSearch();

    console.log(options);

    axios
        .request(options)
        .then(function (response) {
            console.log(response);
            res.json(response.data);
        })
        .catch(function (error) {
            console.error("error:",error);
        });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("server listening.");
});
