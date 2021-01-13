let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./src/secrets.json");
}

exports.handleOptionSearch = () => {
    return (options = {
        method: "GET",
        url: secrets.path
    });
};
