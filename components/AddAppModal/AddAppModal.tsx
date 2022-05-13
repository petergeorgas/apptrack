import { gql, useMutation } from "@apollo/client";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Textarea,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { ADD_APP } from "../../gql/mutations/mutation";
import { GET_APPLICATIONS } from "../../gql/queries/query";

function AddAppModal(props: any) {
	const { isOpen, onClose, uid, application } = props;

	const appKeyLen = Object.keys(application).length; // Used to keep track of if the application object is empty or not

	const [company, setCompany] = useState<string>(
		appKeyLen > 0 ? application.company : ""
	);
	const [role, setRole] = useState(appKeyLen > 0 ? application.role : "");
	const [location, setLocation] = useState(
		appKeyLen > 0 ? application.location : ""
	);
	const [status, setStatus] = useState(appKeyLen > 0 ? application.status : "");
	const [dateApplied, setDateApplied] = useState(
		appKeyLen > 0 ? application.dateApplied : ""
	);
	const [notes, setNotes] = useState(
		appKeyLen > 0 && application.notes ? application.notes : ""
	);

	const [companyInvald, setCompanyInvalid] = useState(false);
	const [roleInvalid, setRoleInvalid] = useState(false);
	const [statusInvalid, setStatusInvalid] = useState(false);
	const [dateInvalid, setDateInvalid] = useState(false);

	const initialRef = useRef(null);

	const resetState = () => {
		setCompany("");
		setRole("");
		setLocation("");
		setStatus("");
		setDateApplied("");
		setNotes("");
		setCompanyInvalid(false);
		setRoleInvalid(false);
		setStatusInvalid(false);
		setDateInvalid(false);
	};

	const [addApplication, { data, loading, error }] = useMutation(ADD_APP, {
		update(cache, { data: { addApplication } }) {
			cache.modify({
				fields: {
					applications(existingApps = []) {
						const newAppRef = cache.writeQuery({
							query: GET_APPLICATIONS,
							variables: {
								userId: uid,
							},
							data: addApplication,
						});

						return [...existingApps, newAppRef];
					},
				},
			});
		},
	});

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// TODO: Add notes to AddUser

		if (company === "") {
			setCompanyInvalid(true);
			return;
		}

		if (role === "") {
			setRoleInvalid(true);
			return;
		}

		if (dateApplied === "") {
			setDateInvalid(true);
			return;
		}

		if (status === "") {
			setStatusInvalid(true);
			return;
		}

		if (!application) {
			addApplication({
				variables: {
					userId: uid,
					company: company,
					role: role,
					location: location,
					status: status,
					dateApplied: dateApplied,
					notes: notes,
				},
			});
		} else {
			// UpdateApplication...
		}

		resetState();
		// TODO: MAKE SURE ERROR DOESN'T HAPPEN!!
		onClose();
	};

	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{appKeyLen !== 0 ? "Update" : "Add"} Application
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl isInvalid={companyInvald}>
						<FormLabel>Company</FormLabel>
						<Input
							required
							ref={initialRef}
							placeholder="Company"
							value={company}
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setCompany(e.currentTarget.value);
							}}
						/>
						<FormErrorMessage>Company is required.</FormErrorMessage>
					</FormControl>

					<FormControl mt={4} isInvalid={roleInvalid}>
						<FormLabel>Role</FormLabel>
						<Input
							required
							placeholder="Role"
							value={role}
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setRole(e.currentTarget.value);
							}}
						/>
						<FormErrorMessage>Role is required.</FormErrorMessage>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Location</FormLabel>
						<Input
							placeholder="Location"
							value={location}
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setLocation(e.currentTarget.value);
							}}
						/>
					</FormControl>
					<FormControl mt={4} isInvalid={dateInvalid}>
						<FormLabel>Date Applied</FormLabel>
						<Input
							required
							value={dateApplied}
							cursor="pointer"
							type="date"
							placeholder="Date Applied"
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setDateApplied(e.currentTarget.value);
							}}
						/>
						<FormErrorMessage>Date applied is required.</FormErrorMessage>
					</FormControl>
					<FormControl mt={4} isInvalid={statusInvalid}>
						<FormLabel>Status</FormLabel>
						<Select
							required
							cursor="pointer"
							placeholder="Select Status"
							value={status}
							onChange={(e: React.FormEvent<HTMLSelectElement>) => {
								setStatus(e.currentTarget.value);
							}}
						>
							<option value="APPLY">APPLY</option>
							<option value="OA">OA</option>
							<option value="PHONE">PHONE</option>
							<option value="FINAL">FINAL</option>
							<option value="OFFER">OFFER</option>
							<option value="REJECT">REJECT</option>
						</Select>
						<FormErrorMessage>Status is required.</FormErrorMessage>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Notes</FormLabel>
						<Textarea
							h="150px"
							placeholder="Notes"
							value={notes}
							onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
								setNotes(e.currentTarget.value);
							}}
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button w="100px" colorScheme="purple" mr={3} onClick={onSubmit}>
						{appKeyLen !== 0 ? "Update" : "Add"}
					</Button>
					<Button
						w="100px"
						onClick={() => {
							resetState();
							onClose();
						}}
					>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default AddAppModal;
