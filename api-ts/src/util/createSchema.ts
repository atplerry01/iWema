import { buildSchema } from "type-graphql";
import { HelloResolver } from "../gql-modules/hello.resolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      HelloResolver
    ],
    // authChecker: ({ context: { req } }) => {
    //   return !!req.session.userId;
    // }
  });
