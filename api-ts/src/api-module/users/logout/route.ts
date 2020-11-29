
import { redis } from '../../../util/redis';
import { isAuthenticated } from "../../../util/isAuthenticated";

export const logoutRouter = (req, res, jwt: any) => {
    isAuthenticated(req, jwt).then( async(decoded_token: any) => {
        await redis.del(`${decoded_token.data.mail.toLowerCase()}SecurityControl`);
        await redis.del(`${decoded_token.data.mail.toLowerCase()}token`);
        return res.status(200).json(true);
    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
