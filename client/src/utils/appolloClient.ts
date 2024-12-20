import { ApolloClient, InMemoryCache } from "@apollo/client";

function createApolloClient() {
    return new ApolloClient({
        uri: 'http://localhost:8000/graphql',
        cache: new InMemoryCache(),
    });

}

export default createApolloClient;