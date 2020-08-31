import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Items() {
    const [item, setItem] = useState("");
    const [count, setCount] = useState(0);
    const [items, setItems] = useState("");

    useEffect(() => {
        (async () => {
            const getItems = await axios.get(`/getItems`);
            console.log(getItems.data.rows);
            setItems(getItems.data.rows);
        })();
    }, [count]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const newItem = item;
            if (!item.startsWith("http")) {
                axios
                    .post(`/addItem/` + newItem)
                    .then((item) => {
                        setCount(count + 1);
                        setItem("");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } else {
            console.log("wrong.");
        }
    };

    const deleteItem = (e) => {
        if (e.type === "mousedown") {
            const deleteItem = e.target.id;
            axios
                .post(`/deleteItem/` + deleteItem)
                .then((item) => {
                    setCount(count - 1);
                    console.log(item);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const check = (e) => {
        const checkItem = e.target.id;
        if (e.target.checked == true) {
            axios
                .post(`/checkItem/` + checkItem)
                .then((checkItem) => {
                    setCount(count - 1);
                    console.log("checkItem:", checkItem);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .post(`/uncheckItem/` + checkItem)
                .then((uncheckItem) => {
                    setCount(count + 1);
                    console.log("uncheckItem:", uncheckItem);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div>
            {items &&
                items.map((element) => (
                    <p key={element.id}>
                        <i
                            id={element.id}
                            onMouseDown={deleteItem}
                            className="far fa-trash-alt"
                        ></i>
                        &nbsp;&nbsp;
                        <span>{element.items}</span>
                        &nbsp;&nbsp;
                        <input
                            id={element.id}
                            onClick={check}
                            type="checkbox"
                            defaultChecked={
                                element.checked == true ? true : false
                            }
                        />
                        {element.checked == true ? (
                            <span className="checked"></span>
                        ) : (
                            ""
                        )}
                    </p>
                ))}
            <input
                type="text"
                className="input"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
}
