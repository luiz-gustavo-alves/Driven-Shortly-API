import db from "../database/db.connection.js";

const getUsersRanking = async () => {

    const usersRanking = await db.query(
        `SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount",
            SUM(urls."visitCount") AS "visitCount"
            FROM urls
            JOIN users ON users.id=urls."userId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10
        `
    );

    return usersRanking.rows;
}

const getUserPage = async (id) => {

    const user = await db.query(
        `SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount"
            FROM users
            JOIN urls ON urls."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id
        `, [id]
    );

    if (!user.rows[0]) {
        return [];
    }

    const urls = await db.query(
        `SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount"
            FROM urls
            WHERE urls."userId" = $1    
            ORDER BY urls.id
        `, [id]
    );

    const { name, visitCount } = user.rows[0];
    const userPageData = {
        id,
        name,
        visitCount,
        shortenedUrls: urls.rows
    }

    return userPageData;
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
    getUsersRanking,
    getUserPage,
    getUserById,
    getUserByEmail
};

export default userService;