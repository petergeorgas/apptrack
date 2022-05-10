import { gql, useMutation } from "@apollo/client";
import {
	Button,
	FormControl,
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
import ApplicationCard from "../ApplicationCard/ApplicationCard";

type AllTasksResult = {
	allTasks: any;
};

function AddAppModal(props: any) {
	const [company, setCompany] = useState("");
	const [role, setRole] = useState("");
	const [location, setLocation] = useState("");
	const [status, setStatus] = useState("");
	const [dateApplied, setDateApplied] = useState("");
	const [notes, setNotes] = useState("");

	const initialRef = useRef(null);
	const { isOpen, onClose, uid } = props;

	const resetState = () => {
		setCompany("");
		setRole("");
		setLocation("");
		setStatus("");
		setDateApplied("");
		setNotes("");
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
		// TODO: Verify form input to make sure everything plays nice
		// TODO: Add notes to AddUser
		addApplication({
			variables: {
				userId: uid,
				company: company,
				role: role,
				location: location,
				status: status,
				dateApplied: dateApplied,
			},
		});

		resetState();
		// TODO: MAKE SURE ERROR DOESN'T HAPPEN!!
		onClose();
	};

	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Application</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Company</FormLabel>
						<Input
							ref={initialRef}
							placeholder="Company"
							value={company}
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setCompany(e.currentTarget.value);
							}}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Role</FormLabel>
						<Input
							placeholder="Role"
							value={role}
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setRole(e.currentTarget.value);
							}}
						/>
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
					<FormControl mt={4}>
						<FormLabel>Date Applied</FormLabel>
						<Input
							value={dateApplied}
							cursor="pointer"
							type="date"
							placeholder="Date Applied"
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setDateApplied(e.currentTarget.value);
							}}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Status</FormLabel>
						<Select
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
						Add
					</Button>
					<Button w="100px" onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default AddAppModal;
