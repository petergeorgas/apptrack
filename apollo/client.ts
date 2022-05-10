import {
	ApolloClient,
	createHttpLink,
	gql,
	InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
	uri: "http://localhost:8080/query",
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
