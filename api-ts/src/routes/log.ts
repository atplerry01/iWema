import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import LogService from '../util/LogService';
import { isAuthenticated } from "../util/isAuthenticated";

export default class LogRouter {

    logService: any;

    constructor(app) {
        this.logService = new LogService(app);
    }

    setupRouter(app) {

        // /**
        //  * @endpoint: /api/v1/logExternalLinkStat
        //  * @method: POST
        //  **/

      

        app.post('/api/v1/logUrlClick', (req, res, _next) => {

            isAuthenticated(req, jwt).then((decoded_token: any) => {
                const submenu_id = _.get(req.body, 'submenu_id');

                if (!submenu_id) {
                    return res.status(401).json({
                        logged: false
                    });
                }


                const email = decoded_token.data.mail;

               // await this.log.logUrlClick(submenu_id, email); //
                this.logService.logUrlClick(submenu_id, email); // do not await it bcos we don't care about the result
                return res.status(200).json({
                    logged: true
                });

            }).catch(err => {
                return res.status(401).json({
                    error: err
                });
            });

        });


        app.post('/api/v1/logExternalLinkStat', (req, res, _next) => {

            isAuthenticated(req, jwt).then((decoded_token: any) => {
                const name = _.get(req.body, 'name');
                const url = _.get(req.body, 'url');

                this.logService.logExternalLinkStat(decoded_token.data.sAMAccountName, name, url);
                return res.status(200).json({
                    logged: true
                });

            }).catch(err => {
                return res.status(401).json({
                    error: err
                });
            });

        });


        // /**
        //  * @endpoint: /api/v1/readlogs?filename=''
        //  * @method: GET
        //  **/

        app.get('/api/v1/readLogs', (req, res, _next) => {

            const filename = _.get(req.query, 'filename', '');
            this.logService.readLogs(filename).then((result) => {
                return res.status(200).json(result);

            }).catch(err => {
                return res.status(400).json({
                    error: err
                });
            });

        });

        // /**
        //  * @endpoint: /api/v1/getUserFavLinks
        //  * @method: GET
        //  **/

        app.get('/api/v1/getUserFavLinks', (req, res, _next) => {

            isAuthenticated(req, jwt).then((decoded_token: any) => {

                this.logService.getUserFavLinks(decoded_token.data.sAMAccountName).then((result) => {
                    return res.status(200).json(result);
                }).catch(err => {
                    return res.status(400).json({
                        error: err
                    });
                });

            }).catch(err => {
                return res.status(401).json({
                    error: err
                });
            });


        });


    }
}
