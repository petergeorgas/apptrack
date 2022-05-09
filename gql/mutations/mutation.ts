import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation CreateUser($userId: String!, $email: String!) {
		createUser(userId: $userId, input: { email: $email }) {
			id
			email
		}
	}
`;
