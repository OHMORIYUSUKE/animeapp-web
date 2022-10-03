import { Box, Stack, Text } from "@chakra-ui/react";
import { SocialMediaLinks } from "./SocialMediaLinks";

export const Footer = (): JSX.Element => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    maxW="7xl"
    py="10"
    px={{ base: "4", md: "8" }}
  >
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Text fontSize="xl">Anime Library</Text>
        <SocialMediaLinks />
      </Stack>
      <Text fontSize="sm" alignItems="start">
        &copy; {new Date().getFullYear()} Anime Library. All rights reserved.
      </Text>
    </Stack>
  </Box>
);
