import {
	ApolloClient,
	createHttpLink,
	gql,
	InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
	uri: "https://apptrack-server.onrender.com/query",
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	typeDefs: gql`
		enum Status {
			APPLY
			REJECT
			OA
			PHONE
			FINAL
			OFFER
		}
	`,
});

export default client;
