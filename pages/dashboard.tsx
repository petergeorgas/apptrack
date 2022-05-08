import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Spacer,
	Text,
	useColorMode,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { MoonIcon, Search2Icon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { logout } from "../firebase/firebase";
import ApplicationCard from "../components/ApplicationCard/ApplicationCard";
import SignOutAlert from "../components/SignOutAlert/SignOutAlert";

const Dashboard: NextPage = () => {
	const router = useRouter();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { colorMode, toggleColorMode } = useColorMode();

	// Applied
	// Rejected
	// In progress
	// Offer

	return (
		<Flex w="100%" h="100vh" align="center" justify="center" direction="column">
			<SignOutAlert isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			<Flex direction="column">
				<HStack mb={4}>
					<InputGroup>
						<InputLeftElement children={<Search2Icon color="gray" />} />
						<Input size="lg" w="500px" placeholder="Search"></Input>
					</InputGroup>
					<Spacer />
					<IconButton
						size="lg"
						aria-label={colorMode === "light" ? "light mode" : "dark mode"}
						icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
						onClick={toggleColorMode}
					/>
					<Button w="108px" size="lg" colorScheme="purple">
						Add
					</Button>
					<Button w="108px" size="lg" onClick={onOpen}>
						Sign Out
					</Button>
				</HStack>
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
							bg={colorMode === "light" ? "gray.100" : "gray.700"}
							borderWidth="2px"
							borderRadius="lg"
							p={4}
							overflowY="auto"
							rowSpan={7}
						>
							<Box>
								<ApplicationCard company="Amazon" status="APPLY" role="SDE I" />
								<ApplicationCard company="Amazon" status="APPLY" role="SDE I" />
								<ApplicationCard company="Amazon" status="APPLY" role="SDE I" />
								<ApplicationCard company="Amazon" status="APPLY" role="SDE I" />
								<ApplicationCard company="Amazon" status="APPLY" role="SDE I" />
							</Box>
						</GridItem>
						<GridItem
							w="100%"
							bg={colorMode === "light" ? "gray.100" : "gray.700"}
							borderWidth="2px"
							borderRadius="lg"
							p={4}
							overflowY="auto"
							rowSpan={7}
						/>
						<GridItem
							w="100%"
							bg={colorMode === "light" ? "gray.100" : "gray.700"}
							borderWidth="2px"
							borderRadius="lg"
							p={4}
							overflowY="auto"
							rowSpan={7}
						/>
						<GridItem
							w="100%"
							bg={colorMode === "light" ? "gray.100" : "gray.700"}
							borderWidth="2px"
							borderRadius="lg"
							p={4}
							overflowY="auto"
							rowSpan={7}
						/>
					</Grid>
				</Box>
			</Flex>
		</Flex>
	);
};

export default Dashboard;
