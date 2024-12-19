import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import "reflect-metadata";
import { buildSchema, Field, ObjectType, Query, Resolver } from "type-graphql";
import * as express from "express";
import * as path from "path";
@ObjectType()
class HelloResponse {
  @Field({ nullable: true })
  message!: string;

  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  age!: number;
}

//resolver
@Resolver()
class HelloResolver {
  constructor() {}
  @Query(() => HelloResponse)
  async helloWorld(): Promise<HelloResponse> {
    return {
      message: "Hello World",
      name: "Hello",
      age: 30,
    };
  }
}

const main = async () => {
  const app = express();
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    emitSchemaFile: {
        path: path.resolve(__dirname, "../graphql/schema.graphql"),        
        sortedSchema: false,
    },
  });

  const server = new ApolloServer({ schema });
  await server.start();
  await server.applyMiddleware({ app });

  //   const httpServer = await http.createServer(app);
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(
      `Server ready at http://localhost:${process.env.PORT || 4000}${
        server.graphqlPath
      }`,
    ),
  );
};
main();
