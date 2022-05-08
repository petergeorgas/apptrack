import { DeleteIcon } from "@chakra-ui/icons";
import {
	Badge,
	Box,
	Heading,
	HStack,
	Spacer,
	Text,
	useColorMode,
	VStack,
} from "@chakra-ui/react";
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
	const { company, role, status, location, dateApplied, dateUpdated, notes } =
		props;
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
			<VStack align="left" spacing={1}>
				<HStack>
					<VStack spacing={0} align="left">
						<Heading size="sm">{company}</Heading>
						<Text>{role}</Text>
					</VStack>
					<Spacer />
					<VStack spacing={0} align="top">
						<Text>May 5, 2022</Text>
					</VStack>
				</HStack>
				<VStack align="flex-start">
					<Text>{location}</Text>
					<Badge
						colorScheme={
							status === "APPLY"
								? "green"
								: status === "OA" || status === "PHONE" || status === "FINAL"
								? "orange"
								: status === "OFFER"
								? "blue"
								: "red"
						}
					>
						{status}
					</Badge>
				</VStack>
				<Spacer />
				<HStack>
					<Spacer />

					<DeleteIcon
						as="button"
						color={colorMode === "light" ? "gray.200" : "gray.700"}
						_hover={{ color: colorMode === "light" ? "gray.400" : "gray.500" }}
						onClick={() => {}}
					/>
				</HStack>
			</VStack>
		</Box>
	);
}

export default ApplicationCard;
