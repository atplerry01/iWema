import { Resolver, Query } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
   hello2(): String {
   return 'hello world';
  }
}
