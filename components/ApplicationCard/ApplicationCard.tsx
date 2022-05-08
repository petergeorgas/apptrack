import { Box, Heading, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

type ApplicationCardProps = {
	company: string;
	role: string;
	status: string;
	location?: string;
	dateApplied?: string;
	dateUpdated?: string;
	notes?: string;
};

function ApplicationCard(props: ApplicationCardProps) {
	const { company, role, location, dateApplied, dateUpdated, notes } = props;
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box
			color={colorMode === "light" ? "black" : "white"}
			cursor="pointer"
			bg={colorMode === "light" ? "white" : "gray.800"}
			boxShadow="md"
			w="100%"
			h="150px"
			borderWidth="1px"
			borderRadius="lg"
			p={2}
			mb={2}
		>
			<Heading size="sm">{company}</Heading>
			<Text>{role}</Text>
		</Box>
	);
}

export default ApplicationCard;
