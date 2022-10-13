import { useMutation } from "@apollo/client";
import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	HStack,
	Image,
	Img,
	Input,
	Link,
	Spacer,
	Text,
	useColorMode,
	useToast,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	auth,
	logInAnonymously,
	logInWithEmailAndPass,
	logInWithGoogle,
	sendPassReset,
} from "../firebase/firebase";
import { ADD_USER } from "../gql/mutations/mutation";

const Home: NextPage = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const router = useRouter();

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
				<Button size="lg" w={["75px", "100px", "115px"]} variant="link">
					About
				</Button>
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

	return (
		<Flex
			w="full"
			h="100vh"
			bg={colorMode === "light" ? "gray.50" : "gray.900"}
			alignItems="start"
			direction="column"
		>
			{topBar}
			<Flex
				direction="row"
				justifyContent="space-around"
				alignItems="center"
				w="full"
				h="full"
			>
				<Box bg="tomato" w="500px" h="500px"></Box>
				<Divider h="600px" orientation="vertical" />
				<Flex
					w="500px"
					h="500px"
					display="flex"
					flexDirection="column"
					justifyContent="center"
				>
					<Text fontWeight="bold" fontSize="6xl" mb="20px">
						Track it easy.
					</Text>
					<Text fontWeight="light" fontSize="4xl">
						apptrack makes keeping tabs on all of your job applications super
						simple.
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Home;
