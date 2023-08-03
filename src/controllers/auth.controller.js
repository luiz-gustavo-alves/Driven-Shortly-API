import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";

export const signUp = async (req, res) => {

    const { email, password, confirmPassword } = req.body;

    if (confirmPassword !== password) {
        return res.sendStatus(422);
    }
    delete req.body.confirmPassword

    try {

        const users = await userService.getUserByEmail(email);
        if (users.rows[0]) {
            return res.sendStatus(409);
        }

        await authService.register({...req.body});
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const signIn = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await userService.getUserByEmail(email);
        if (!user.rows[0]) {
            return res.sendStatus(401);
        }

        const loginRequest = await authService.login(password, user.rows[0].password);
        if (!loginRequest) {
            return res.sendStatus(401);
        }

        const token = await authService.createToken(user.rows[0].id);
        res.send(token);

    } catch (err) {
        res.status(500).send(err.message);
    }
}