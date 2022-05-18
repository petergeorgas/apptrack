import { useQuery } from "@apollo/client";
import { MoonIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Spacer,
	Spinner,
	Stack,
	useBreakpointValue,
	useColorMode,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AddAppModal from "../components/AddAppModal/AddAppModal";
import ApplicationCard from "../components/ApplicationCard/ApplicationCard";
import SignOutAlert from "../components/SignOutAlert/SignOutAlert";
import { auth } from "../firebase/firebase";
import { GET_APPLICATIONS } from "../gql/queries/query";
import { Application } from "../types/types";

const Dashboard: NextPage = () => {
	const router = useRouter();
	const toast = useToast();

	const {
		isOpen: isAlertOpen,
		onOpen: onAlertOpen,
		onClose: onAlertClose,
	} = useDisclosure();
	const {
		isOpen: isAddModalOpen,
		onOpen: onAddModalOpen,
		onClose: onAddModalClose,
	} = useDisclosure();

	const { colorMode, toggleColorMode } = useColorMode();

	const [currentApp, setCurrentApp] = useState({});

	const [user, authLoading, authErr] = useAuthState(auth);

	const fullWidth = useBreakpointValue({
		base: true,
		sm: true,
		md: true,
		lg: true,
		xl: false,
		"2xl": false,
	});

	// TODO: ONLY QUERY IF USER IS NOT NULL !!
	const { loading, error, data } = useQuery(GET_APPLICATIONS, {
		variables: { userId: user?.uid },
	});

	const onApplicationClick = (app: Application) => {
		setCurrentApp({
			id: app.id,
			company: app.company,
			role: app.role,
			location: app.location,
			status: app.status,
			dateApplied: app.dateApplied,
			notes: app.notes,
		});

		onAddModalOpen();
	};

	const resetApp = () => {
		setCurrentApp({});
	};

	useEffect(() => {
		if (!user && !authLoading) {
			router.push("/");
		}
	}, [user, authLoading, router]);

	useEffect(() => {
		if (
			localStorage.getItem("apptrack-ui-color-mode") === "dark" &&
			colorMode === "light"
		) {
			setTimeout(() => toggleColorMode(), 500);
		}
		if (
			localStorage.getItem("apptrack-ui-color-mode") === "light" &&
			colorMode === "dark"
		) {
			setTimeout(() => toggleColorMode(), 500);
		}
	}, [colorMode, toggleColorMode]);

	if (!authLoading && !authErr && !loading && error) {
		toast({
			title: "Data Load Error",
			description: `There was an issue loading data: ${error?.networkError}, ${user?.uid}`,
			status: "error",
			duration: 9000,
			isClosable: true,
		});
	}

	return (
		<Flex w="100%" h="100vh" align="center" justify="center" direction="column">
			<SignOutAlert
				isOpen={isAlertOpen}
				onOpen={onAlertOpen}
				onClose={onAlertClose}
			/>
			<AddAppModal
				isOpen={isAddModalOpen}
				onOpen={onAddModalOpen}
				onClose={onAddModalClose}
				uid={user?.uid}
				application={currentApp}
				resetApp={resetApp}
			/>
			<Flex direction="column" w={["100%", null, null, null, "1500px"]} p={4}>
				<Stack mb={4} direction={["column", null, null, "row", "row"]}>
					<InputGroup mt={fullWidth ? "50px" : ""}>
						<InputLeftElement>
							<Search2Icon color="gray" />
						</InputLeftElement>
						<Input
							size="lg"
							w={["100%", null, null, null, "500px"]}
							placeholder="Search"
						></Input>
					</InputGroup>

					<Stack direction="row">
						{fullWidth ? <Spacer /> : null}
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
						<Button
							w="108px"
							size="lg"
							colorScheme="purple"
							onClick={onAddModalOpen}
						>
							Add
						</Button>
						<Button w="108px" size="lg" onClick={onAlertOpen}>
							Sign Out
						</Button>
						{fullWidth ? <Spacer /> : null}
					</Stack>
				</Stack>
				<Box
					boxShadow="lg"
					h="2xl"
					borderWidth="1px"
					borderRadius="lg"
					p={4}
					overflowY="auto"
				>
					{loading ? (
						<Flex w="full" h="full" align="center" justify="center">
							<Spinner size="xl" />
						</Flex>
					) : (
						<Grid
							templateRows={[
								"repeat(32, 1fr)",
								null,
								null,
								null,
								"repeat(8, 1fr)",
							]}
							templateColumns={[
								"repeat(1, 1fr)",
								null,
								null,
								null,
								"repeat(4, 1fr)",
							]}
							gap={5}
							h="full"
						>
							{!fullWidth ? (
								<>
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
																key={app.id}
																id={app.id}
																company={app.company}
																location={app.location}
																role={app.role}
																status={app.status}
																notes={app.notes}
																dateApplied={app.dateApplied}
																uid={user?.uid}
																onclick={onApplicationClick}
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
																key={app.id}
																id={app.id}
																company={app.company}
																location={app.location}
																role={app.role}
																status={app.status}
																notes={app.notes}
																dateApplied={app.dateApplied}
																uid={user?.uid}
																onclick={onApplicationClick}
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
																key={app.id}
																id={app.id}
																company={app.company}
																location={app.location}
																role={app.role}
																status={app.status}
																notes={app.notes}
																dateApplied={app.dateApplied}
																uid={user?.uid}
																onclick={onApplicationClick}
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
																key={app.id}
																id={app.id}
																company={app.company}
																location={app.location}
																role={app.role}
																status={app.status}
																notes={app.notes}
																dateApplied={app.dateApplied}
																uid={user?.uid}
																onclick={onApplicationClick}
															/>
														);
													}
												})}
											</>
										)}
									</GridItem>
								</>
							) : (
								<>
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
										bg={colorMode === "light" ? "gray.100" : "gray.700"}
										borderWidth="2px"
										borderRadius="lg"
										p={4}
										overflowY="auto"
										rowSpan={20}
									>
										{data && (
											<>
												{data.applications.map((app: Application) => {
													if (app.status === "APPLY") {
														return (
															<ApplicationCard
																key={app.id}
																id={app.id}
																company={app.company}
																location={app.location}
																role={app.role}
																status={app.status}
																notes={app.notes}
																dateApplied={app.dateApplied}
																uid={user?.uid}
																onclick={onApplicationClick}
															/>
														);
													}
												})}
											</>
										)}
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
										bg={colorMode === "light" ? "gray.100" : "gray.700"}
										borderWidth="2px"
										borderRadius="lg"
										p={4}
										overflowY="auto"
										rowSpan={20}
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
																key={app.id}
																id={app.id}
																company={app.company}
																location={app.location}
																role={app.role}
																status={app.status}
																notes={app.notes}
																dateApplied={app.dateApplied}
																uid={user?.uid}
																onclick={onApplicationClick}
															/>
														);
													}
												})}
											</>
										)}
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
										bg={colorMode === "light" ? "gray.100" : "gray.700"}
										borderWidth="2px"
										borderRadius="lg"
										p={4}
										overflowY="auto"
										rowSpan={20}
									>
										{data && (
											<>
												{data.applications.map((app: Application) => {
													if (app.status === "OFFER") {
														return (
															<ApplicationCard
																key={app.id}
																id={app.id}
																company={app.company}
																location={app.location}
																role={app.role}
																status={app.status}
																notes={app.notes}
																dateApplied={app.dateApplied}
																uid={user?.uid}
																onclick={onApplicationClick}
															/>
														);
													}
												})}
											</>
										)}
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
										rowSpan={20}
									>
										{data && (
											<>
												{data.applications.map((app: Application) => {
													if (app.status === "REJECT") {
														return (
															<ApplicationCard
																key={app.id}
																id={app.id}
																company={app.company}
																location={app.location}
																role={app.role}
																status={app.status}
																notes={app.notes}
																dateApplied={app.dateApplied}
																uid={user?.uid}
																onclick={onApplicationClick}
															/>
														);
													}
												})}
											</>
										)}
									</GridItem>
								</>
							)}
						</Grid>
					)}
				</Box>
			</Flex>
		</Flex>
	);
};

export default Dashboard;
