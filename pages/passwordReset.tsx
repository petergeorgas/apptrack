import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Text,
	VStack
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const PasswordReset: NextPage = () => {
	const router = useRouter();

	return (
		<Flex w="full" h="100vh" justify="center" align="center">
			<Box boxShadow="lg" w="md" borderWidth="1px" borderRadius="lg" p={4}>
				<VStack align="flex-start" w="full" h="full" spacing={4}>
					<Heading>Password Reset</Heading>
					<Text size="lg">
						If an account with the specified email exists, instructions have
						been sent to the mailbox.
					</Text>
					<Divider />
					<Button
						w="full"
						colorScheme="purple"
						onClick={() => router.push("/")}
					>
						Sign In
					</Button>
				</VStack>
			</Box>
		</Flex>
	);
};

export default PasswordReset;
