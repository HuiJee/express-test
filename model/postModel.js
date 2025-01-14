const db = require('../config/dbConfig');

exports.findAll = async () => {
    const [rows] = await db.promise().query('SELECT id, title, nick, content, created_at FROM posts');
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.promise().query('SELECT id, title, nick, content, created_at FROM posts WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

exports.create = async ({ title, content, nick, password }) => {
    const [result] = await db.promise().query('INSERT INTO posts (title, content, nick, password, created_at) VALUES (?, ?, ?, ?, NOW())', [title, content, nick, password]);
    return { id: result.insertId, title, content, nick };
};

exports.update = async (id, { title, content, password }) => {
    const [result] = await db.promise().query('UPDATE posts SET title = ?, content = ?, password = ? WHERE id = ?', [title, content, password, id]);
    return result.affectedRows > 0;
};

exports.delete = async (id) => {
    const [result] = await db.promise().query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

exports.findPassword = async (id) => {
    const [rows] = await db.promise().query('SELECT password FROM posts WHERE id = ?', [id]);
    return rows[0];
}
