import { ApolloError, ApolloServer } from "apollo-server-express";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import "dotenv/config"; // for keeping secret seperate from the code. it uses .env file which should not be git igore
import * as express from 'express';
import * as RateLimit from "express-rate-limit";
import { GraphQLError } from "graphql";
import * as helmet from 'helmet';
import * as path from 'path';
import "reflect-metadata";
import { v4 } from "uuid";
import { createTypeormConn } from "./createTypeormConn";
import DBConnections from './db/dbconnections';
import AppRouter from './routes/app-router';
import * as config from './util/config';
import { createSchema } from "./util/createSchema";
import { redis } from "./util/redis";
const RateLimitRedisStore = require("rate-limit-redis");

export const startServer = async () => {
  // console.log('environment:', config.environment.production);
  const PORT = config.ports.port;
  const app = express();

  app.set("trust proxy", 1);

  if (process.env.NODE_ENV === "development") {
    const morgan = require('morgan');
    app.use(morgan('dev'));
  }


  app.use(cors({
    exposedHeaders: process.env.NODE_ENV === "development" ? process.env.IWEMA_BASE_URL_DEV_CORS : process.env.IWEMA_BASE_URL_CORS
  }));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({
    limit: '50mb'
  }));

  app.use(helmet());

  const apiLimiter = new RateLimit({
    store: new RateLimitRedisStore({
      client: redis
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // limit each IP to 500 requests per windowMs
    message: 'Too many accounts created from this IP, please try again after 15 minutes'
  });

  app.use("/api/", apiLimiter);
  app.use("/graphql", apiLimiter);

  // static www files use express
  // const wwwPath = path.join(__dirname, 'www');
  // app.use('/', express.static(wwwPath));
  app.use(express.static(path.join(__dirname, 'www')));
  app.set('view engine', 'html');

  // Connect to Active Directory
  new DBConnections().connectAD().then((ad) => {

    if (process.env.NODE_ENV !== "test") {
      console.log("Successful connected to AD.");
    }

    app.set('ad', ad);

  }).catch((_err) => {
    console.log("connection to AD FAILED.");
    // throw(err);
  });

  await createTypeormConn();

  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      redis,
      url: req ? req.protocol + "://" + req.get("host") : '',
      session: req ? req.session : undefined,
      req,
      res
    }),
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      const errId = v4();
      console.log("errId: ", errId);
      console.log(error);

      return new GraphQLError(`Internal Error: ${errId}`);
    },
  });

  server.applyMiddleware({
    app,
    cors: false
  });


  app.routes = new AppRouter(app);


  // handle global exceptions
  process.on('uncaughtException', function (err) {
    console.error('global exception:', err.message);
  });
  process.on('unhandledRejection', function (reason: any, _promise) {
    console.error('unhandled promise rejection:', reason.message || reason);
  });


  const _port = process.env.PORT || PORT;

  // app.listen(_port, () => {
  //     console.log(`App is running on port ${_port}`);
  // });

  // if (process.env.NODE_ENV === "production") {

  //   https.createServer({
  //     // key: fs.readFileSync('./key.pem'),
  //     // cert: fs.readFileSync('./cert.pem'),
  //     pfx: fs.readFileSync(path.join(__dirname, 'cert.pfx')),
  //     passphrase: process.env.certPassphrase
  //   }, app).listen(_port, () => {
  //     console.log(`🚀 Server ready at https://localhost:${_port} for REST APIs`);
  //     console.log(`🚀 Server ready at https://localhost:${_port}${server.graphqlPath} for GRAPHQL`);
  //   });

  // } else {
     app.listen(_port, () => {
      console.log(`🚀 Server ready at http://localhost:${_port} for REST APIs`);
      console.log(`🚀 Server ready at http://localhost:${_port}${server.graphqlPath} for GRAPHQL`);
    });
  //}

  return app;

};

startServer();
// module.exports = app;
// export default app;
