import { gql } from "@apollo/client";

const ADD_USER = gql`
	mutation CreateUser($userId: String!, $email: String!) {
		createUser(userId: $userId, input: { email: $email }) {
			id
			email
		}
	}
`;

const ADD_APP = gql`
	mutation AddApplication(
		$userId: String!
		$company: String!
		$location: String!
		$role: String!
		$status: Status!
		$dateApplied: String!
		$notes: String
	) {
		createApplication(
			input: {
				company: $company
				location: $location
				role: $role
				status: $status
				dateApplied: $dateApplied
				notes: $notes
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

const DEL_APP = gql`
	mutation DeleteApplication($userId: String!, $appId: String!) {
		deleteApplication(userId: $userId, appId: $appId) {
			id
			company
			role
			location
			status
			dateApplied
			dateUpdated
			notes
		}
	}
`;

const UPDATE_APP = gql`
	mutation UpdateApplication(
		$userId: String!
		$appId: String!
		$company: String
		$location: String
		$role: String
		$status: Status
		$dateApplied: String
		$notes: String
	) {
		updateApplication(
			userId: $userId
			appId: $appId
			input: {
				company: $company
				role: $role
				location: $location
				status: $status
				dateApplied: $dateApplied
				notes: $notes
			}
		) {
			id
			company
			role
			location
			status
			dateApplied
			dateUpdated
			notes
		}
	}
`;

export { ADD_USER, ADD_APP, UPDATE_APP, DEL_APP };
