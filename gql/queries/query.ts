import { gql } from "@apollo/client";

export const GET_APPLICATIONS = gql`
	query GetApplications($userId: ID!) {
		applications(userId: $userId) {
			id
			company
			role
			location
			status
			dateApplied
		}
	}
`;
