import db from "../database/db.connection.js";

import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (payload) => {

    const { name, email, password } = payload;

    const encryptedPassword = bcrypt.hashSync(password, 10);
    const createdAt = dayjs().format();

    await db.query(
        `INSERT INTO users
            (name, email, password, "createdAt")
            VALUES ($1, $2, $3, $4);
        `, [name, email, encryptedPassword, createdAt]
    );
}

const login = async (payloadPassword, reqUserPassword) => bcrypt.compareSync(payloadPassword, reqUserPassword);

const createToken = async (id) => {

    const token = uuid();
    const createdAt = dayjs().format();

    await db.query(
        `DELETE FROM sessions
            WHERE "userId" = $1;
        `, [id]
    );

    await db.query(
        `INSERT INTO sessions
            ("userId", token, "createdAt")
            VALUES ($1, $2, $3);
        `, [id, token, createdAt]
    );

    return token;
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
    logout
};

export default authService;