let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./src/secrets.json");
}

exports.handleOptionDetails = (id) => {
    return (optionDetails = {
        method: "GET",
        url:
            "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" +
            id,
        headers: {
            "x-rapidapi-key": secrets.key,
            "x-rapidapi-host": secrets.host,
        },
    });
};

exports.handleOptionDetailsHover = (id) => {
    return (optionDetailsHover = {
        method: "GET",
        url:
            "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" +
            id,
        headers: {
            "x-rapidapi-key": secrets.key,
            "x-rapidapi-host": secrets.host,
        },
    });
};

exports.handleOptions = (inputValue) => {
    return (options = {
        method: "GET",
        url:
            "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/" +
            inputValue,
        headers: {
            "x-rapidapi-key": secrets.key,
            "x-rapidapi-host": secrets.host,
        },
    });
};
