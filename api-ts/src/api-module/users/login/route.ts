import * as _ from 'lodash';
import { login } from './service';
import { logMessage } from '../../../util/utility';

export const loginRouter = (app, req, res) => {

    // const body = _.get(req, 'body');
    const username = _.get(req.body, 'username', '');
    const password = _.get(req.body, 'password', '');

    login(app, username, password).then((user) => {

        logMessage(req, username, 'Login Successful', username, 'N/A'); // JSON.stringify(user));

        return res.status(200).json(user);

    }).catch(err => {
        logMessage(req, username, 'Login Failed', username, JSON.stringify(err));
        return res.status(401).json({
            error: err
        });
    });

};
