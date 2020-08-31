const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { user, pw } = require("./secrets.json");
    db = spicedPg(`postgres:${user}:${pw}@localhost:5432/shoppingList`);
}

exports.addItem = (newItem) => {
    return db.query(`INSERT INTO items (items) VALUES ($1) RETURNING *`, [
        newItem,
    ]);
};

exports.getItems = () => {
    return db.query(`SELECT * FROM items ORDER BY id`, []);
};

exports.deleteItem = (itemId) => {
    return db.query(`DELETE FROM items WHERE id = $1 RETURNING *`, [itemId]);
};

exports.checkItem = (checkItem) => {
    return db.query(`UPDATE items SET checked = $1 WHERE id = $2 RETURNING *`, [
        true,
        checkItem,
    ]);
};

exports.uncheckItem = (uncheckItem) => {
    return db.query(`UPDATE items SET checked = $1 WHERE id = $2 RETURNING *`, [
        false,
        uncheckItem,
    ]);
};
