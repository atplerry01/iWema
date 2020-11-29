
import * as _ from 'lodash';
import { isAuthenticated } from "../../../util/isAuthenticated";

export const meRouter = (req, res, jwt: any) => {
    isAuthenticated(req, jwt).then((decoded_token) => {
        return res.status(200).json(decoded_token);
    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
