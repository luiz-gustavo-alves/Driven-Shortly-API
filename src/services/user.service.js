import db from "../database/db.connection.js";

const selectAllUsers = async () => {

    const users = await db.query(
        `SELECT *
            FROM users;
        `  
    );

    return users;
}

const getUserById = async (id) => {

    const user = await db.query(
        `SELECT *
            FROM users
            WHERE id = $1;
        `, [id]
    );

    return user;
}

const getUserByEmail = async (email) => {

    const user = await db.query(
        `SELECT *
            FROM users
            WHERE email = $1;
        `, [email]
    );

    return user;
}

const userService = {
    selectAllUsers,
    getUserById,
    getUserByEmail
};

export default userService;