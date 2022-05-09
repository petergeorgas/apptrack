import { useMutation } from "@apollo/client";
import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	Spacer,
	useToast,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { registerWithEmailAndPass } from "../firebase/firebase";
import { ADD_USER } from "../gql/mutations/mutation";

const Register: NextPage = () => {
	const router = useRouter();

	const toast = useToast();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [invalidPass, setInvalidPass] = useState(false);
	const [invalidText, setInvalidText] = useState("");

	const [addUser, { data, loading, error }] = useMutation(ADD_USER);

	const onEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};
	const onPassChange = (e: React.FormEvent<HTMLInputElement>) => {
		setPass(e.currentTarget.value);
	};

	const resetState = () => {
		setEmail("");
		setPass("");
		setInvalidEmail(false);
		setInvalidPass(false);
		setInvalidText("");
	};

	const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		var uid;
		try {
			uid = await registerWithEmailAndPass(email, pass);
		} catch (e: any) {
			setInvalidEmail(false);
			setInvalidPass(false);
			if (e.code === "auth/email-already-in-use") {
				setInvalidEmail(true);
				setInvalidText("Email already in use.");
			} else if (e.code === "auth/invalid-email") {
				setInvalidEmail(true);
				setInvalidText("Invalid email.");
			} else if (e.code === "auth/weak-password") {
				setInvalidPass(true);
				setInvalidText("Password not strong enough.");
			} else {
				toast({
					title: "Account Error",
					description: `There was an issue creating your account.\nCode:  ${e.code}`,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}

			return;
		}

		if (uid) {
			//TODO: Update addUser mutation to take the UID and use that as the document ID
			// in Firestore.
			addUser({ variables: { email: email, userId: uid } });
		} else {
			return;
		}

		resetState();
		router.push("/success");
	};

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
					<Heading>Sign Up</Heading>
					<Spacer />
					<FormControl isInvalid={invalidEmail}>
						<Input
							type="email"
							value={email}
							placeholder="Email"
							onChange={onEmailChange}
						/>
						<FormErrorMessage>{invalidText}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={invalidPass}>
						<Input
							value={pass}
							placeholder="Password"
							type="password"
							onChange={onPassChange}
						/>
						<FormErrorMessage>{invalidText}</FormErrorMessage>
					</FormControl>
					<Spacer />
					<Divider />
					<Button colorScheme="purple" w="full" onClick={onSubmit}>
						Create Account
					</Button>
					<Button
						colorScheme="gray"
						w="full"
						onClick={() => {
							router.push("/");
						}}
					>
						Back
					</Button>
				</VStack>
			</Box>
		</Flex>
	);
};

export default Register;
