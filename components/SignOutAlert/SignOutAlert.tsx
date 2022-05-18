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
	isOpen: boolean;
	onOpen: void;
	onClose: void;
};

function SignOutAlert(props: any) {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = props;
	const initialRef = useRef(null);

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
				<AlertDialogBody>
					Are you sure you would like to sign out?
				</AlertDialogBody>
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
							router.push("/");
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
