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
	Spinner,
	Text,
	useColorMode,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { MoonIcon, Search2Icon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { auth, logout } from "../firebase/firebase";
import ApplicationCard from "../components/ApplicationCard/ApplicationCard";
import SignOutAlert from "../components/SignOutAlert/SignOutAlert";
import { GET_APPLICATIONS } from "../gql/queries/query";
import { useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";

type Application = {
	id: string;
	company: string;
	role: string;
	location?: string;
	status: string;
	dateApplied: string;
	notes?: string;
};

const Dashboard: NextPage = () => {
	const router = useRouter();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { colorMode, toggleColorMode } = useColorMode();

	const [user, authLoading, authErr] = useAuthState(auth);

	// TODO: ONLY QUERY IF USER IS NOT NULL !!
	const { loading, error, data } = useQuery(GET_APPLICATIONS, {
		variables: { userId: "VD7s8woYbpOyRsAEoT9oJzvtoiQ2" },
	});

	useEffect(() => {
		if (!user) {
			router.push("/");
		}

		if (localStorage.getItem("apptrack-ui-color-mode") === "dark") {
			setTimeout(() => toggleColorMode(), 500);
		}
	}, [user, router, data]);

	if (error) {
		console.log(error.message);
	}

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
						onClick={() => {
							if (colorMode === "dark")
								localStorage.setItem("apptrack-ui-color-mode", "light");
							else {
								localStorage.setItem("apptrack-ui-color-mode", "dark");
							}
							toggleColorMode();
						}}
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
					{loading ? (
						<Flex w="full" h="full" align="center" justify="center">
							<Spinner size="xl" />
						</Flex>
					) : (
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
								{data && (
									<>
										{data.applications.map((app: Application) => {
											if (app.status === "APPLY") {
												return (
													<ApplicationCard
														id={app.id}
														company={app.company}
														location={app.location}
														role={app.role}
														status={app.status}
														notes={app.notes}
														dateApplied={app.dateApplied}
													/>
												);
											}
										})}
									</>
								)}
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
								{data && (
									<>
										{data.applications.map((app: Application) => {
											if (
												app.status === "OA" ||
												app.status === "PHONE" ||
												app.status === "FINAL"
											) {
												return (
													<ApplicationCard
														id={app.id}
														company={app.company}
														location={app.location}
														role={app.role}
														status={app.status}
														notes={app.notes}
														dateApplied={app.dateApplied}
													/>
												);
											}
										})}
									</>
								)}
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
								{data && (
									<>
										{data.applications.map((app: Application) => {
											if (app.status === "OFFER") {
												return (
													<ApplicationCard
														id={app.id}
														company={app.company}
														location={app.location}
														role={app.role}
														status={app.status}
														notes={app.notes}
														dateApplied={app.dateApplied}
													/>
												);
											}
										})}
									</>
								)}
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
								{data && (
									<>
										{data.applications.map((app: Application) => {
											if (app.status === "REJECT") {
												return (
													<ApplicationCard
														id={app.id}
														company={app.company}
														location={app.location}
														role={app.role}
														status={app.status}
														notes={app.notes}
														dateApplied={app.dateApplied}
													/>
												);
											}
										})}
									</>
								)}
							</GridItem>
						</Grid>
					)}
				</Box>
			</Flex>
		</Flex>
	);
};

export default Dashboard;
