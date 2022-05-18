import {
	ApolloClient,
	createHttpLink,
	gql,
	InMemoryCache
} from "@apollo/client";

const httpLink = createHttpLink({
	uri: "https://app-track-gql-v3eqkiipcq-ue.a.run.app/query",
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
