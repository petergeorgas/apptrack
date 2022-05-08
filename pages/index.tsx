import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	Link,
	Spacer,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	auth,
	logInWithEmailAndPass,
	logout,
	sendPassReset,
} from "../firebase/firebase";

const Home: NextPage = () => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [invalid, setInvalid] = useState(false);
	const [invalidText, setInvalidText] = useState("");

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

	const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			await logInWithEmailAndPass(email, pass);
		} catch (e: any) {
			setInvalid(true);
			if (e.code === "auth/wrong-password") {
				setInvalidText("Incorrect password.");
			}
			return;
		}

		resetState();
	};

	if (user) {
		router.push("/dashboard");
	}

	return (
		<Flex w="full" h="100vh" justify="center" align="center">
			<Box
				boxShadow="lg"
				w="md"
				h="sm"
				borderWidth="1px"
				borderRadius="lg"
				p={4}
			>
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
					<Button colorScheme="purple" w="full" onClick={onSubmit}>
						Sign In
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
			</Box>
		</Flex>
	);
};

export default Home;
