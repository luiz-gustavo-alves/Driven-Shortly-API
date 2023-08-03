import db from "../database/db.connection.js";

import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (payload) => {

    const { name, email, password } = payload;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    await db.query(
        `INSERT INTO users
            (name, email, password)
            VALUES ($1, $2, $3);
        `, [name, email, encryptedPassword]
    );
}

const login = async (payloadPassword, reqUserPassword) => {
    return bcrypt.compareSync(payloadPassword, reqUserPassword);
}

const createToken = async (id) => {

    const token = uuid();

    await db.query(
        `DELETE FROM sessions
            WHERE "userId" = $1;
        `, [id]
    );

    await db.query(
        `INSERT INTO sessions
            ("userId", token)
            VALUES ($1, $2);
        `, [id, token]
    );

    return token;
}

const getToken = async (token) => {

    const session = await db.query(
        `SELECT *
            FROM sessions
            WHERE token = $1;
        `, [token]
    );

    return session;
}

const logout = async (token) => {

    await db.query(
        `DELETE FROM sessions
            WHERE token = $1;
        `, [token]
    );
}

const authService = {
    register,
    login,
    createToken,
    getToken,
    logout
};

export default authService;