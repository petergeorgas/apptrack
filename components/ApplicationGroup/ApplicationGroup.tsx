import {
	Box,
	Container,
	GridItem,
	Heading,
	useColorMode,
} from "@chakra-ui/react";
import App from "next/app";
import React from "react";
import { Application } from "../../types/types";
import ApplicationCard from "../ApplicationCard/ApplicationCard";
import { ApplicationGroupProps, Group } from "./types";

const groupMap: Record<Group, string> = {
	[Group.APPLY]: "Apply",
	[Group.IN_PROGRESS]: "In Progress",
	[Group.REJECT]: "Reject",
	[Group.OFFER]: "Offer",
};

function ApplicationGroup(props: ApplicationGroupProps) {
	const { group, applications, onApplicationClick } = props;

	const { colorMode } = useColorMode();

	const cards = applications?.map((app: Application) => {
		return (
			<ApplicationCard
				key={app.id}
				application={app}
				onclick={onApplicationClick}
			/>
		);
	});

	return (
		<Box w="full">
			<Box w="100%" borderWidth="2px" borderRadius="lg" p={4} marginBottom={4}>
				<Heading size="md">{groupMap[group]}</Heading>
			</Box>
			<Container
				h="560px"
				w="100%"
				bg={colorMode === "light" ? "gray.100" : "gray.700"}
				borderWidth="2px"
				borderRadius="lg"
				p={4}
				overflowY="auto"
			>
				{cards}
			</Container>
		</Box>
	);
}

export default ApplicationGroup;
