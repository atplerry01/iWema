
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import ApplicationRouter from '../api-module/applications/routes';
import BankAccountsRouter from '../api-module/bankAccount/route';
import ClassificationRouter from '../api-module/classifications/routes';
import GraphRouter from "../api-module/graphs/routes";
// import ApplicationRouter from './application';
import ReportRouter from '../api-module/reports/routes';
import { loginADExternal } from '../api-module/users/login/service';
import UsersRouter from '../api-module/users/routes';
import { checkAuthorized } from '../util/checkAuthorized';
import { isAuthenticated } from '../util/isAuthenticated';
import { redis } from '../util/redis';
import { DeleteMultipleFiles, DeleteSingleFile, multiUpload, singleUpload } from '../util/upload';
import LogRouter from './log';

export default class AppRouter {

    app: any;
    usersRouter: any;
    bankAccountsRouter: any;
    reportRouter: any;
    classificationRouter: any;
    applicationRouter: any;
    logRouter: any;
    graphRouter: any;

    constructor(app) {

        this.app = app;

        this.usersRouter = new UsersRouter();
        this.bankAccountsRouter = new BankAccountsRouter();
        this.reportRouter = new ReportRouter();
        this.graphRouter = new GraphRouter();
        this.classificationRouter = new ClassificationRouter();
        this.applicationRouter = new ApplicationRouter();
        this.logRouter = new LogRouter(app);

        this.setupRouter = this.setupRouter.bind(this);

        this.setupRouter();
    }

    setupRouter() {
        const app = this.app;

        this.usersRouter.setupRouter(app, jwt);
        this.reportRouter.setupRouter(app, jwt, redis);
        this.graphRouter.setupRouter(app, jwt, redis);
        this.bankAccountsRouter.setupRouter(app, jwt, redis);
        this.applicationRouter.setupRouter(app, jwt, redis);
        this.classificationRouter.setupRouter(app);
        this.logRouter.setupRouter(app);

        // testing purpose
        app.post('/api/v1/uploadfile', async (req: any, res: any) => {

            try {
                const result = await singleUpload(req, res) as any;
                return res.status(200).json(result);
            } catch (error) {
                return res.status(400).json(error);
            }

        });

        app.post('/api/v1/uploadfiles', async (req, res) => {
            try {
                const result = await multiUpload(req, res);
                return res.status(200).json(result);
            } catch (error) {
                return res.status(400).json(error);
            }
        });

        app.post('/api/v1/deletefile', async (req: any, res: any) => {
            try {
                const result = await DeleteSingleFile(req.body.filePath);
                return res.status(200).json(result);
            } catch (error) {
                return res.status(400).json(error);
            }

        });

        app.post('/api/v1/deletefiles', async (req, res) => {
            try {
                const result = await DeleteMultipleFiles(req.body.filePaths);
                return res.status(200).json(result);
            } catch (error) {
                return res.status(400).json(error);
            }
        });

        app.post('/api/v1/isAuthenticated', async (req, res) => {
            try {
                const result = await isAuthenticated(req, jwt);
                return res.status(200).json(result);
            } catch (error) {
                return res.status(401).json(error);
            }
        });

        app.post('/api/v1/ADLogin', async (req, res) => {
            try {
                const { username, password } = req.body;
                const result = await loginADExternal(app, username, password);
                return res.status(200).json(result);
            } catch (error) {
                return res.status(401).json(error);
            }
        });

        app.post('/api/v1/checkAuthorized', async (req, res) => {
            checkAuthorized(req, res, jwt, { accessname: req.body.accessname, methodname: req.body.methodname, fromBody: true });
        });

        this.app.get('*', (_req, res) => {
            res.sendFile(path.join(__dirname, '../www/index.html'), err => {
                if (err) {
                    res.status(500).send(err);
                }
            });
        });

    }
}













