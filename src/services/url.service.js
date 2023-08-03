import db from "../database/db.connection.js";
import { nanoid } from "nanoid";

const getUrlById = async (id) => {

    const url = await db.query(
        `SELECT *
            FROM urls
            WHERE id = $1;
        `, [id]
    );

    return url;
}

const getShortUrlByName = async (url) => {

    const shortenUrl = await db.query(
        `SELECT *
            FROM urls
            WHERE "shortUrl" = $1;
        `, [url]
    );

    return shortenUrl;
}

const createShortUrl = async (payload, userId) => {

    const { url } = payload;
    const shortUrl = nanoid(8);

    const createdUrl = await db.query(
        `INSERT INTO urls
            ("userId", url, "shortUrl")
            VALUES ($1, $2, $3)
            RETURNING id;
        `, [userId, url, shortUrl]
    );

    const { id } = createdUrl.rows[0];
    const shortenUrl = await getUrlById(id);

    return shortenUrl;
}

const updateVisitCount = async (id) => {

    await db.query(
        `UPDATE urls
            SET "visitCount" = "visitCount" + 1 WHERE id = $1
        `, [id]
    );
}

const deleteUrlById = async (id) => {

    await db.query(
        `DELETE FROM urls
            WHERE id = $1;
        `, [id]
    );
}

const urlService = {
    getUrlById,
    getShortUrlByName,
    createShortUrl,
    updateVisitCount,
    deleteUrlById
};

export default urlService;