import urlService from "../services/url.service.js";

export const getUrlById = async (req, res) => {

    const { id } = req.params;

    try {

        const shortenUrl = await urlService.getUrlById(id);
        if (!shortenUrl.rows[0]) {
            return res.sendStatus(404);
        }

        let shortenId = shortenUrl.rows[0].id;
        const { url, shortUrl } = shortenUrl.rows[0];

        res.send({ id: shortenId, shortUrl, url });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const openShortUrl = async (req, res) => {

    const { shortUrl } = req.params;

    try {

        const shortenUrl = await urlService.getShortUrlByName(shortUrl);
        if (!shortenUrl.rows[0]) {
            return res.sendStatus(404);
        }

        const { id, url } = shortenUrl.rows[0];
        await urlService.updateVisitCount(id);

        res.redirect(url);

    } catch (err) {
        res.status(500).send(err.message);
    }
    
    return;
}

export const createShortUrl = async (req, res) => {

    const { userId } = res.locals.session;

    try {
        const shortenUrl = await urlService.createShortUrl(req.body, userId);
        const { id, shortUrl } = shortenUrl.rows[0];

        res.status(201).send({ id, shortUrl });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const deleteUrlById = async (req, res) => {
    
    const { id } = req.params;
    const { userId } = res.locals.session;

    try {

        const shortenUrl = await urlService.getUrlById(id);
        if (!shortenUrl.rows[0]) {
            return res.sendStatus(404);
        }

        if (userId !== shortenUrl.rows[0].userId) {
            return res.sendStatus(401);
        }

        await urlService.deleteUrlById(id);
        res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    }
}