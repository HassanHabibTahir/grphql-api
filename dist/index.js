"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
require("dotenv/config");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const express = require("express");
const path = require("path");
let HelloResponse = class HelloResponse {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], HelloResponse.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], HelloResponse.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], HelloResponse.prototype, "age", void 0);
HelloResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], HelloResponse);
//resolver
let HelloResolver = class HelloResolver {
    constructor() { }
    async helloWorld() {
        return {
            message: "Hello World",
            name: "Hello",
            age: 30,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => HelloResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HelloResolver.prototype, "helloWorld", null);
HelloResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [])
], HelloResolver);
const main = async () => {
    const app = express();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [HelloResolver],
        emitSchemaFile: {
            path: path.resolve(__dirname, "../graphql/schema.graphql"),
            sortedSchema: false,
        },
    });
    const server = new apollo_server_express_1.ApolloServer({ schema });
    await server.start();
    await server.applyMiddleware({ app });
    //   const httpServer = await http.createServer(app);
    app.listen({ port: process.env.PORT || 4000 }, () => console.log(`Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`));
};
main();
//# sourceMappingURL=index.js.map