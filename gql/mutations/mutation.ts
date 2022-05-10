import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation CreateUser($userId: String!, $email: String!) {
		createUser(userId: $userId, input: { email: $email }) {
			id
			email
		}
	}
`;

export const ADD_APP = gql`
	mutation AddApplication(
		$userId: String!
		$company: String!
		$location: String!
		$role: String!
		$status: Status!
		$dateApplied: String!
	) {
		createApplication(
			input: {
				company: $company
				location: $location
				role: $role
				status: $status
				dateApplied: $dateApplied
			}
			userId: $userId
		) {
			id
			company
			location
			role
			status
			dateApplied
			dateUpdated
		}
	}
`;
