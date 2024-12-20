"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
require("dotenv/config");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const express = require("express");
const path = require("path");
const client_1 = require("./prisma/client");
const UserResolvers_1 = require("./resolvers/UserResolvers");
// @ObjectType()
// class HelloResponse {
//   @Field({ nullable: true })
//   message!: string;
//   @Field({ nullable: true })
//   name!: string;
//   @Field({ nullable: true })
//   age!: number;
// }
//resolver
// @Resolver()
// class HelloResolver {
//   constructor() {}
//   @Query(() => HelloResponse, { nullable: true })
//   async helloWorld(): Promise<HelloResponse> {
//     return {
//       message: "Hello World",
//       name: "Hello",
//       age: 30,
//     };
//   }
// }
const main = async () => {
    const app = express();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolvers_1.UserResolver],
        emitSchemaFile: {
            path: path.resolve(__dirname, "../graphql/schema.graphql"),
            sortedSchema: false,
        },
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: { prisma: client_1.default },
    });
    await server.start();
    await server.applyMiddleware({ app });
    //   const httpServer = await http.createServer(app);
    app.listen({ port: process.env.PORT || 4000 }, () => console.log(`Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`));
};
main();
//# sourceMappingURL=index.js.map