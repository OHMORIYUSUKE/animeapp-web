import React from "react";
import { Heading, Flex, Link } from "@chakra-ui/react";

interface Props {
  srcId: string;
}

export const Header = (props: Props): JSX.Element => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Link href={"/?srcId=" + props.srcId}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            Anime Library
          </Heading>
        </Link>
      </Flex>
    </Flex>
  );
};
