import React, { useState } from "react";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import axios from "./axios";

export default function Register() {
    const [registerData, setRegisterData] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const submitRegistration = (e) => {
        e.preventDefault();

        axios
            .post(`/registration`, registerData)
            .then(function (registration) {
                setMessage("");
                console.log(registration);
                if (registration.data == "wrongMatch") {
                    setMessage("The password does not match, try it again.");
                } else {
                    setMessage("Email already in use, try another one.");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="registerContainer">
            <h1>My Shopping List</h1>
            <form onSubmit={(e) => submitRegistration(e)}>
                <input
                    required
                    placeholder="first name"
                    type="text"
                    name="prename"
                    className="inputRegister"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    required
                    placeholder="last name"
                    type="text"
                    name="lastname"
                    className="inputRegister"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    required
                    placeholder="email"
                    type="text"
                    name="email"
                    className="inputRegister"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    required
                    placeholder="password"
                    type="password"
                    name="password"
                    className="inputRegister"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    required
                    placeholder="repeat password"
                    type="password"
                    name="passwordRepeat"
                    className="inputRegister"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    className="registerButton"
                    type="submit"
                    value="Submit"
                />
                <p className="error">{message}</p>
            </form>
            <div className="welcomeContainerChild">
                {/* <HashRouter>
                    <div>
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter> */}
            </div>
        </div>
    );
}
