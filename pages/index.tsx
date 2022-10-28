import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Container,
	Divider,
	Flex,
	Heading,
	HStack,
	IconButton,
	Image,
	Spacer,
	Text,
	useBreakpointValue,
	useColorMode,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

import ApplicationCard from "../components/ApplicationCard/ApplicationCard";

const Home: NextPage = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const router = useRouter();

	const stackBodyVertical = useBreakpointValue({
		base: true,
		sm: true,
		md: true,
		lg: false,
		xl: false,
		"2xl": false,
	});

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

	const onTryItClick = useCallback<
		React.MouseEventHandler<HTMLButtonElement>
	>(() => {
		router.push("/login");
	}, []);

	const topBar = (
		<HStack
			bg={colorMode === "light" ? "white" : "gray.800"}
			w="full"
			padding={5}
			px={[null, null, null, 100]}
		>
			<HStack>
				<Box>
					<Image
						boxSize={["40px", "50px", "75px"]}
						borderRadius="lg"
						src="/android-chrome-192x192.png"
						alt="apptrack-logo"
					/>
				</Box>
				<Heading size="2xl">apptrack</Heading>
			</HStack>
			<Spacer />
			<HStack>
				{/*<Button size="lg" w={["75px", "100px", "115px"]} variant="link">
					About
	</Button>*/}
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
					colorScheme="purple"
					size="lg"
					w={["75px", "100px", "115px"]}
					onClick={onTryItClick}
				>
					Try It!
				</Button>
			</HStack>
		</HStack>
	);

	const today = new Date();

	const cards = (
		<>
			<ApplicationCard
				application={{
					id: "ac",
					company: "Stripe",
					location: "San Francisco, CA",
					role: "L1 SWE",
					status: "OFFER",
					dateApplied: formatDate(today),
				}}
				onclick={() => {
					return;
				}}
				frontPageDummy={true}
			/>
			<ApplicationCard
				application={{
					id: "acd",
					company: "Amazon",
					location: "Seattle, WA",
					role: "L4 SDE",
					status: "ONSITE",
					dateApplied: formatDate(
						new Date(today.getTime() - 7 * 60 * 60 * 24 * 1000)
					),
				}}
				onclick={() => {
					return;
				}}
				frontPageDummy={true}
			/>
			<ApplicationCard
				application={{
					id: "acfd",
					company: "Microsoft",
					location: "Washington, D.C",
					role: "L59 SWE",
					status: "REJECT",
					dateApplied: formatDate(
						new Date(today.getTime() - 4 * 60 * 60 * 24 * 1000)
					),
				}}
				onclick={() => {
					return;
				}}
				frontPageDummy={true}
			/>
			<ApplicationCard
				application={{
					id: "acfd",
					company: "Apple",
					location: "Cupertino, CA",
					role: "ICT2 SWE",
					status: "APPLY",
					dateApplied: formatDate(
						new Date(today.getTime() - 60 * 60 * 24 * 1000)
					),
				}}
				onclick={() => {
					return;
				}}
				frontPageDummy={true}
			/>
		</>
	);

	return (
		<Flex
			w="full"
			h={stackBodyVertical ? "100%" : "100vh"}
			bg={colorMode === "light" ? "gray.50" : "gray.900"}
			alignItems="start"
			direction="column"
		>
			{topBar}
			<Flex
				direction={stackBodyVertical ? "column-reverse" : "row"}
				justifyContent="center"
				alignItems="center"
				w="full"
				h="full"
			>
				<Flex my={50} w="530px" h="530px">
					<Container
						h="100%"
						w="100%"
						bg={colorMode === "light" ? "gray.100" : "gray.700"}
						borderWidth="2px"
						borderRadius="lg"
						p={4}
						alignItems="center"
						display="flex"
						flexDirection="column"
						justifyContent="center"
						overflow="hidden"
					>
						{cards}
					</Container>
				</Flex>
				<Divider
					w={stackBodyVertical ? "600px" : "0px"}
					h={stackBodyVertical ? "0px" : "650px"}
					orientation={stackBodyVertical ? "horizontal" : "vertical"}
					mx={[null, null, 45, 50, 105]}
					mt={0}
				/>
				<Flex
					w="500px"
					h="500px"
					display="flex"
					flexDirection="column"
					justifyContent="center"
				>
					<Text fontWeight="bold" fontSize="5xl" mb="20px">
						Tracking made easy.
					</Text>
					<Text fontWeight="light" fontSize="4xl" mb={0}>
						apptrack makes keeping tabs on all of your job applications super
						simple.
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

const formatDate = (date: Date) => {
	var d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	return [year, month, day].join("-");
};

export default Home;
