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
	Input,
	Link,
	Spacer,
	useToast,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
	const router = useRouter();

	const toast = useToast();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [invalid, setInvalid] = useState(false);
	const [invalidText, setInvalidText] = useState("");

	// We can ignore GQL errors, the only err
	const [addUser] = useMutation(ADD_USER, { errorPolicy: "ignore" });

	const [user, loading, err] = useAuthState(auth);

	const resetState = () => {
		setEmail("");
		setPass("");
		setInvalid(false);
		setInvalidText("");
	};

	const onEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};

	const onPassChange = (e: React.FormEvent<HTMLInputElement>) => {
		setPass(e.currentTarget.value);
	};

	const onForgetPass = async () => {
		if (email !== "")
			try {
				await sendPassReset(email);
			} catch (e: any) {}
		router.push("/passwordReset");
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await logInWithEmailAndPass(email, pass);
		} catch (e: any) {
			setInvalid(true);
			if (
				e.code === "auth/wrong-password" ||
				e.code === "auth/internal-error"
			) {
				setInvalidText("Incorrect password.");
			}
			return;
		}

		resetState();
	};

	const onSignInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			var { uid, email: userEmail } = await logInWithGoogle();
		} catch (e: any) {
			toast({
				title: "Sign In Error",
				description: `There was an issue signing in with google.\nCode:  ${e}`,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		if (uid && userEmail) {
			await addUser({ variables: { email: userEmail, userId: uid } });
		}
	};

	const onSignInAnon = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			var { uid, email: userEmail } = await logInAnonymously();
		} catch (e: any) {
			toast({
				title: "Sign In Error",
				description: `There was an issue signing in as guest.\nCode:  ${e}`,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		if (uid && userEmail) {
			await addUser({ variables: { email: userEmail, userId: uid } });
		}
	};

	if (user) {
		router.push("/dashboard");
	}

	return (
		<Flex w="full" h="100vh" justify="center" align="center">
			<Box
				boxShadow="lg"
				w="md"
				h="lg"
				borderWidth="1px"
				borderRadius="lg"
				p={4}
			>
				<form onSubmit={onSubmit}>
					<VStack align="flex-start" w="full" h="full" spacing={4}>
						<Heading>Log In</Heading>
						<Spacer />
						<Input value={email} placeholder="Email" onChange={onEmailChange} />
						<FormControl isInvalid={invalid}>
							<Input
								isInvalid={invalid}
								value={pass}
								placeholder="Password"
								type="password"
								onChange={onPassChange}
							/>
							<FormErrorMessage>{invalidText}</FormErrorMessage>
						</FormControl>
						<Link color="purple.400" onClick={onForgetPass}>
							Forgot password?
						</Link>
						<Spacer />
						<Divider />
						<Button colorScheme="purple" w="full" type="submit">
							Sign in with email
						</Button>
						<Button
							colorScheme="purple"
							w="full"
							variant="outline"
							leftIcon={<Image src="/GOOGLE_G.png" boxSize="20px" />}
							onClick={onSignInWithGoogle}
						>
							Sign in with Google
						</Button>
						<Button
							colorScheme="purple"
							w="full"
							variant="outline"
							onClick={onSignInAnon}
						>
							Try as guest
						</Button>
						<Button
							colorScheme="gray"
							w="full"
							onClick={() => {
								router.push("/register");
							}}
						>
							Create Account
						</Button>
					</VStack>
				</form>
			</Box>
		</Flex>
	);
};

export default Home;
