import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { logout } from "../../firebase/firebase";

type SignOutAlertProps = {
	readonly isOpen: boolean;
	readonly onOpen: void;
	readonly onClose: void;
	readonly isGuestAccount: boolean;
};

function SignOutAlert(props: any) {
	const router = useRouter();
	const { isOpen, onOpen, onClose, isGuestAccount } = props;
	const initialRef = useRef(null);

	const alertMessage = (
		<AlertDialogBody>
			{isGuestAccount
				? "You are currently signed in as a guest user. If you sign out, your data will not be accessible again. Are you sure you would like to sign out?"
				: "Are you sure you would like to sign out?"}
		</AlertDialogBody>
	);

	return (
		<AlertDialog
			leastDestructiveRef={initialRef}
			onClose={onClose}
			isOpen={isOpen}
			isCentered
		>
			<AlertDialogOverlay />

			<AlertDialogContent>
				<AlertDialogHeader>Confirm sign out</AlertDialogHeader>
				<AlertDialogCloseButton />
				{alertMessage}
				<AlertDialogFooter>
					<Button w="100px" onClick={onClose}>
						Cancel
					</Button>
					<Button
						w="100px"
						colorScheme="red"
						ml={3}
						onClick={() => {
							logout();
							router.push("/login");
						}}
						ref={initialRef}
					>
						Sign Out
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default SignOutAlert;
