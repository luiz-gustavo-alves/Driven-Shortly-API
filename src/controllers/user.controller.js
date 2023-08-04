import userService from "../services/user.service.js";

export const getUserPage = async (req, res) => {

    const { userId } = res.locals.session;

    try {
        const userPageData = await userService.getUserPage(userId);
        res.send(userPageData);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getRanking = async (req, res) => {
    
    try {
        const usersRanking = await userService.getUsersRanking();
        res.send(usersRanking);

    } catch (err) {
        res.status(500).send(err.message);
    }
}