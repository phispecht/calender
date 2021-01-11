import React, { useState, useEffect } from "react";
import axios from "axios";

let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

let count = 0;

export default function Get_Movies() {
    const [movie, setMovie] = useState();
    let [movieDetails, setMovieDetails] = useState("");
    let [hoverShow, setHoverShow] = useState(false);
    let [showModal, setShowModal] = useState(false);
    let [inputValue, setInputValue] = useState("");
    let [hoverID, setHoverID] = useState(0);
    let optionDetails;
    let optionDetailsHover;
    let trailerButton;

    const handleChange = (e) => {
        setHoverID(0);
        setInputValue(e.target.value);
    };

    if (inputValue == "") {
        setInputValue("lost");
    }

    //////// show modal on click ///////////

    const handleShowDetails = (id) => {
        setShowModal(!showModal);
        setMovieDetails("");

        if (id != undefined) {
            optionDetails = {
                method: "GET",
                url:
                    "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" +
                    id,
                headers: {
                    "x-rapidapi-key": secrets.key,
                    "x-rapidapi-host": secrets.host,
                },
            };

            axios
                .request(optionDetails)
                .then(function (response) {
                    setMovieDetails(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    };

    //////// end /////////////

    //////// show details on hover and change details on input ////////

    const handleHover = (id) => {
        count += 1;
        setHoverID(id);

        optionDetailsHover = {
            method: "GET",
            url:
                "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" +
                id,
            headers: {
                "x-rapidapi-key": secrets.key,
                "x-rapidapi-host": secrets.host,
            },
        };

        axios
            .request(optionDetailsHover)
            .then(function (response) {
                setHoverID(id);
                setHoverShow(true);
                setMovieDetails(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    if (movie != undefined && count == 0) {
        handleHover(movie.titles[0].id);
    }

    //////////// end //////////////

    ///////// search for movies ///////////

    let options = {
        method: "GET",
        url:
            "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/" +
            inputValue,
        headers: {
            "x-rapidapi-key": secrets.key,
            "x-rapidapi-host": secrets.host,
        },
    };

    useEffect(() => {
        axios
            .request(options)
            .then(function (response) {
                setMovie(response.data);
                handleHover(response.data.titles[0].id);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [inputValue]);

    //////////// end ///////////////

    const hideModalFunction = () => {
        setShowModal(false);
    };

    const defaultImg = (e) => {
        e.target.src = "/src/img/defaultImg.jpg";
    };

    if (movieDetails.trailer) {
        if (movieDetails.trailer.link != "") {
            trailerButton = (
                <a
                    href={movieDetails.trailer.link}
                    target="_blank"
                    rel="noopener"
                >
                    <div className="backgroundTrailerButton">Watch Trailer</div>
                </a>
            );
        } else {
            trailerButton = (
                <div className="trailerText">Trailer available soon</div>
            );
        }
    }

    return (
        <div className="movieContainer-parent">
            <nav>
                <div className="navElement">
                    <h1 id="logo">Watch this</h1>
                    <div id="search">
                        <input
                            placeholder="lost"
                            onChange={(e) => handleChange(e)}
                            id="search"
                            type="text"
                        />
                    </div>
                </div>
            </nav>

            {/* Show the background after loading the page and changing the input */}

            <div className="backgroundOnHover-parent">
                {movie && hoverID == 0 && (
                    <div className="backgroundOnHover">
                        <div className="backgroundChild">
                            <img
                                onClick={() =>
                                    handleShowDetails(movie.titles[0].id)
                                }
                                src={movie.titles[0].image}
                                onError={(e) => defaultImg(e)}
                            />
                        </div>

                        <div className="backgroundChild">
                            <div className="backgroundTitle">
                                {movie.titles[0].title}
                            </div>{" "}
                            <div className="moviePlot">
                                {" "}
                                {movieDetails.plot
                                    ? movieDetails.plot
                                    : "No description available"}
                            </div>
                            <div className="backgroundDetails">
                                <span>
                                    Rating:{" "}
                                    {movieDetails.rating
                                        ? movieDetails.rating
                                        : "-"}
                                </span>
                                <span>
                                    Lenght:{" "}
                                    {movieDetails.length
                                        ? movieDetails.length
                                        : "-"}
                                </span>
                                <span></span>
                                <span>
                                    Year:{" "}
                                    {movieDetails.year
                                        ? movieDetails.year
                                        : "-"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Change background on hover */}

                {movie &&
                    movie.titles.map((element) => (
                        <div key={element.id}>
                            {hoverShow && hoverID == element.id && (
                                <div className="backgroundOnHover">
                                    <div className="backgroundChild">
                                        <img
                                            onClick={() =>
                                                handleShowDetails(element.id)
                                            }
                                            src={element.image}
                                            onError={(e) => defaultImg(e)}
                                        />
                                    </div>

                                    <div className="backgroundChild">
                                        <div className="backgroundTitle">
                                            {element.title}
                                        </div>{" "}
                                        {!showModal && (
                                            <>
                                                <div className="moviePlot">
                                                    {" "}
                                                    {movieDetails.plot
                                                        ? movieDetails.plot
                                                        : "No description available"}
                                                </div>
                                                <div className="backgroundDetails">
                                                    <span>
                                                        Rating:{" "}
                                                        {movieDetails.rating
                                                            ? movieDetails.rating
                                                            : "-"}
                                                    </span>
                                                    <span>
                                                        Lenght:{" "}
                                                        {movieDetails.length
                                                            ? movieDetails.length
                                                            : "-"}
                                                    </span>
                                                    <span>
                                                        Year:{" "}
                                                        {movieDetails.year
                                                            ? movieDetails.year
                                                            : "-"}
                                                    </span>
                                                    {trailerButton}
                                                </div>
                                            </>
                                        )}
                                        {showModal && (
                                            <div className="backgroundDetails">
                                                LOADING...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                {/* Show search results on input */}

                <div className="movieContainer-subParent">
                    <h2>What you are looking for</h2>
                    {movie &&
                        movie.titles.map((element) => (
                            <div
                                onClick={() => handleShowDetails(element.id)}
                                onMouseOver={() => handleHover(element.id)}
                                className="movieContainer"
                                key={element.id}
                            >
                                <img
                                    src={element.image}
                                    onError={(e) => defaultImg(e)}
                                />
                                <div className="title-container">
                                    <div className="title">{element.title}</div>{" "}
                                    {hoverShow && hoverID == element.id && (
                                        <>
                                            <span className="hoverShow">
                                                <span>
                                                    Rating:{" "}
                                                    {movieDetails.rating
                                                        ? movieDetails.rating
                                                        : "-"}
                                                </span>
                                                <span>
                                                    Lenght:{" "}
                                                    {movieDetails.length
                                                        ? movieDetails.length
                                                        : "-"}
                                                </span>
                                                <span>
                                                    Year:{" "}
                                                    {movieDetails.year
                                                        ? movieDetails.year
                                                        : "-"}
                                                </span>
                                            </span>
                                            {/* <span className="arrow">
                        Click for &#9660; more Details
                      </span> */}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
                <div id="footer">
                    <span>by Philipp Specht</span>
                </div>
            </div>

            {/* Show modal on click */}

            {showModal && movieDetails != "" && movieDetails != undefined && (
                <>
                    <div
                        className="modal"
                        onClick={() => hideModalFunction(movieDetails.id)}
                    >
                        <h2 className="modalTitle">{movieDetails.title}</h2>
                        <img
                            src={movieDetails.poster}
                            onError={(e) => defaultImg(e)}
                        />
                        <div
                            onClick={() => handleShowDetails(movieDetails.id)}
                            className="movieText"
                        >
                            {movieDetails.plot
                                ? movieDetails.plot
                                : "No description available"}
                            <div className="modalDetails">
                                <h3>Movie Details</h3>
                                <span>
                                    Rating:{" "}
                                    {movieDetails.rating
                                        ? movieDetails.rating
                                        : "-"}
                                </span>
                                <span>
                                    Lenght:{" "}
                                    {movieDetails.length
                                        ? movieDetails.length
                                        : "-"}
                                </span>
                                <span>
                                    Year:{" "}
                                    {movieDetails.year
                                        ? movieDetails.year
                                        : "-"}
                                </span>
                                <div className="actors">
                                    <h3>Actors</h3>
                                    {movieDetails.cast.map((element) => (
                                        <span key={element.actor_id}>
                                            {element.actor}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {trailerButton}
                        </div>
                    </div>
                    <div
                        onClick={() => hideModalFunction()}
                        className="blurBackground"
                    ></div>
                </>
            )}
        </div>
    );
}
