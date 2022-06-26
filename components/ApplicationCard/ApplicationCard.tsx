import { useMutation } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { DEL_APP } from "../../gql/mutations/mutation";
import { GET_APPLICATIONS } from "../../gql/queries/query";

type ApplicationCardProps = {
  id: string;
  company: string;
  role: string;
  status: string;
  location?: string;
  dateApplied: string;
  dateUpdated?: string;
  notes?: string;
  uid?: string;
  onclick: Function;
};

function ApplicationCard(props: ApplicationCardProps) {
  const {
    id,
    company,
    role,
    status,
    location,
    dateApplied,
    dateUpdated,
    notes,
    uid,
    onclick,
  } = props;

  const { colorMode, toggleColorMode } = useColorMode();

  const [deleteApplication, { data, loading, error }] = useMutation(DEL_APP, {
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

  return (
    <Box
      color={colorMode === "light" ? "black" : "white"}
      cursor="pointer"
      bg={colorMode === "light" ? "white" : "gray.800"}
      boxShadow="md"
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      p={2}
      mb={2}
      onClick={() => {
        onclick({
          id: id,
          company: company,
          role: role,
          location: location,
          status: status,
          dateApplied: dateApplied,
          notes: notes,
        });
      }}
    >
      <VStack align="left" spacing={1}>
        <HStack>
          <VStack spacing={0} align="left">
            <HStack>
              <Image
                borderRadius="full"
                boxSize="20px"
                src="https://logo.clearbit.com/spotify.com?size=20"
                alt="Dan Abramov"
              />
              <Heading size="sm">{company}</Heading>
            </HStack>
            <Text>{role}</Text>
          </VStack>
          <Spacer />
          <VStack spacing={0} align="top">
            <Text>
              {new Date(dateApplied).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </VStack>
        </HStack>
        <VStack align="flex-start">
          <Text>{location}</Text>
          <HStack w="full">
            <Badge
              colorScheme={
                status === "APPLY"
                  ? "green"
                  : status === "OA" || status === "PHONE" || status === "FINAL"
                  ? "orange"
                  : status === "OFFER"
                  ? "blue"
                  : "red"
              }
            >
              {status}
            </Badge>
            <Spacer />
            <DeleteIcon
              as="button"
              color={colorMode === "light" ? "gray.200" : "gray.700"}
              _hover={{
                color: colorMode === "light" ? "gray.400" : "gray.500",
              }}
              onClick={(e: React.MouseEvent<SVGAElement>) => {
                e.stopPropagation();
                deleteApplication({
                  variables: { userId: uid, appId: id },
                });
              }}
            />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}

export default ApplicationCard;
