import {
	Box,
	Flex,
	Grid,
	GridItem,
	Heading,
	Text,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Dashboard: NextPage = () => {
	const router = useRouter();
	// Applied
	// Rejected
	// In progress
	// Offer

	return (
		<Flex w="100%" h="100vh" align="center" justify="center">
			<Box
				boxShadow="lg"
				w="1500px"
				h="2xl"
				borderWidth="1px"
				borderRadius="lg"
				p={4}
			>
				<Grid
					templateRows="repeat(8, 1fr)"
					templateColumns="repeat(4, 1fr)"
					gap={5}
					h="full"
				>
					<GridItem
						w="100%"
						borderWidth="2px"
						borderRadius="lg"
						p={4}
						rowSpan={1}
					>
						<Heading size="md">Apply</Heading>
					</GridItem>
					<GridItem
						w="100%"
						borderWidth="2px"
						borderRadius="lg"
						p={4}
						rowSpan={1}
					>
						<Heading size="md">In Progress</Heading>
					</GridItem>
					<GridItem
						w="100%"
						borderWidth="2px"
						borderRadius="lg"
						p={4}
						rowSpan={1}
					>
						<Heading size="md">Offer</Heading>
					</GridItem>
					<GridItem
						w="100%"
						borderWidth="2px"
						borderRadius="lg"
						p={4}
						rowSpan={1}
					>
						<Heading size="md">Reject</Heading>
					</GridItem>
					<GridItem
						w="100%"
						bg="gray.100"
						borderWidth="2px"
						borderRadius="lg"
						p={4}
						overflowY="auto"
						rowSpan={7}
					>
						<Box>
							<Box
								cursor="pointer"
								bg="white"
								boxShadow="md"
								w="100%"
								h="150px"
								borderWidth="1px"
								borderRadius="lg"
								p={2}
								mb={2}
							>
								<Heading size="sm">Amazon</Heading>
								<Text>SDE I</Text>
							</Box>
							<Box
								cursor="pointer"
								bg="white"
								boxShadow="md"
								w="100%"
								h="150px"
								borderWidth="1px"
								borderRadius="lg"
								p={2}
								mb={2}
							>
								<Heading size="sm">Amazon</Heading>
								<Text>SDE I</Text>
							</Box>
							<Box
								cursor="pointer"
								bg="white"
								boxShadow="md"
								w="100%"
								h="150px"
								borderWidth="1px"
								borderRadius="lg"
								p={2}
								mb={2}
							>
								<Heading size="sm">Amazon</Heading>
								<Text>SDE I</Text>
							</Box>
							<Box
								cursor="pointer"
								bg="white"
								boxShadow="md"
								w="100%"
								h="150px"
								borderWidth="1px"
								borderRadius="lg"
								p={2}
								mb={2}
							>
								<Heading size="sm">Amazon</Heading>
								<Text>SDE I</Text>
							</Box>
							<Box
								cursor="pointer"
								bg="white"
								boxShadow="md"
								w="100%"
								h="150px"
								borderWidth="1px"
								borderRadius="lg"
								p={2}
								mb={2}
							>
								<Heading size="sm">Amazon</Heading>
								<Text>SDE I</Text>
							</Box>
						</Box>
					</GridItem>
					<GridItem
						w="100%"
						bg="gray.100"
						borderWidth="2px"
						borderRadius="lg"
						p={4}
						overflowY="scroll"
						rowSpan={7}
					/>
					<GridItem
						w="100%"
						bg="gray.100"
						borderWidth="2px"
						borderRadius="lg"
						p={4}
						overflowY="scroll"
						rowSpan={7}
					/>
					<GridItem
						w="100%"
						bg="gray.100"
						borderWidth="2px"
						borderRadius="lg"
						p={4}
						overflowY="scroll"
						rowSpan={7}
					/>
				</Grid>
			</Box>
		</Flex>
	);
};

export default Dashboard;
