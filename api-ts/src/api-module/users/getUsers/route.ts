
import * as _ from 'lodash';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getUserDetails } from './service';

export const usersRouter = (app: any, req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((_decoded_token) => {
        const username = _.get(req, 'params.username');

        // console.log('decoded_token:', decoded_token);

        getUserDetails(app, username).then((user) => {
            return res.status(200).json(user);
        }).catch(err => {
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({
            error: err
        });
    });

};
