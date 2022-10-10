import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";
import { MoonIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Link,
	PopoverFooter,
	Spacer,
	Spinner,
	Stack,
	Text,
	useBreakpointValue,
	useColorMode,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import App from "next/app";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AddAppModal from "../components/AddAppModal/AddAppModal";
import ApplicationCard from "../components/ApplicationCard/ApplicationCard";
import ApplicationGroup from "../components/ApplicationGroup/ApplicationGroup";
import { Group } from "../components/ApplicationGroup/types";
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

	const [isDataLoading, setDataLoading] = useState(true);

	const fullWidth = useBreakpointValue({
		base: true,
		sm: true,
		md: true,
		lg: true,
		xl: false,
		"2xl": false,
	});

	// TODO: ONLY QUERY IF USER IS NOT NULL !!
	const [getApps, { loading, error, data }] = useLazyQuery(GET_APPLICATIONS, {
		variables: { userId: user?.uid },
		onError: (e: ApolloError) => {
			if (!e.message.startsWith("rpc error: code = NotFound")) {
				toast({
					title: "Apollo Error",
					description: `There was an issue with Apollo: ${e.message}`,
					status: "error",
					duration: 6000,
					isClosable: true,
				});
			}
		},
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
		if (user && user.uid) {
			getApps();
			setDataLoading(false);
		}
	}, [getApps, user]);

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

	if (!authLoading && authErr) {
		toast({
			title: "Auth Error",
			description: `There was an issue with auth: ${authErr.message}, ${user?.uid}`,
			status: "error",
			duration: 9000,
			isClosable: true,
		});
	}

	const topBar = (
		<Stack mb={4} direction={["column", null, null, null, "row"]}>
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
			{user && user?.isAnonymous ? (
				<Alert status="warning">
					<AlertIcon />
					You are currently logged in as a guest user. Data is not synced.
				</Alert>
			) : null}
			<Spacer />
			<Stack direction="row">
				{fullWidth ? <Spacer /> : null}

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
	);

	const clearBitFooter = (
		<>
			<Divider w={["100%", null, null, null, "1500px"]} />
			<HStack>
				<Text fontSize="12" color="gray.500">
					Company logos courtesy of{" "}
					<Link color="purple.400" target="_blank" href="http://clearbit.com/">
						Clearbit
					</Link>
				</Text>
			</HStack>
		</>
	);

	return (
		<Flex w="100%" h="100vh" align="center" justify="center" direction="column">
			<SignOutAlert
				isOpen={isAlertOpen}
				onOpen={onAlertOpen}
				onClose={onAlertClose}
				isGuestAccount={user && user.isAnonymous ? true : false}
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
				{topBar}
				<Box
					boxShadow="lg"
					h="2xl"
					borderWidth="1px"
					borderRadius="lg"
					p={4}
					overflowY="auto"
				>
					{loading || isDataLoading ? (
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
							<ApplicationGroup
								group={Group.APPLY}
								applications={data?.applications?.filter(
									(app: Application) => app.status === "APPLY"
								)}
								onApplicationClick={onApplicationClick}
							/>
							<ApplicationGroup
								group={Group.IN_PROGRESS}
								applications={data?.applications?.filter(
									(app: Application) =>
										app.status === "PHONE" ||
										app.status === "OA" ||
										app.status === "ONSITE" ||
										app.status === "FINAL"
								)}
								onApplicationClick={onApplicationClick}
							/>
							<ApplicationGroup
								group={Group.OFFER}
								applications={data?.applications?.filter(
									(app: Application) => app.status === "OFFER"
								)}
								onApplicationClick={onApplicationClick}
							/>
							<ApplicationGroup
								group={Group.REJECT}
								applications={data?.applications?.filter(
									(app: Application) => app.status === "REJECT"
								)}
								onApplicationClick={onApplicationClick}
							/>
						</Grid>
					)}
				</Box>
			</Flex>
			{clearBitFooter}
		</Flex>
	);
};

export default Dashboard;
