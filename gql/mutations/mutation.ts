import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation CreateUser($email: String!) {
		createUser(input: { email: $email }) {
			id
			email
		}
	}
`;
