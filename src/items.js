import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Items() {
    const [item, setItem] = useState("");
    const [count, setCount] = useState(0);
    const [items, setItems] = useState("");

    useEffect(() => {
        (async () => {
            const getItems = await axios.get(`/getItems`);
            setItems(getItems.data.rows);
        })();
    }, [count]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const newItem = item;
            axios
                .post(`/addItem/` + newItem)
                .then((item) => {
                    setCount(count + 1);
                    console.log(item);
                })
                .catch((err) => {
                    console.log(err);
                });
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

    return (
        <div>
            {items &&
                items.map((element) => (
                    <p key={element.id}>
                        <i
                            id={element.id}
                            onMouseDown={deleteItem}
                            className="fas fa-minus-circle deleteItem"
                        ></i>
                        &nbsp;&nbsp;
                        {element.items}
                    </p>
                ))}
            <input
                onChange={(e) => setItem(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
}
