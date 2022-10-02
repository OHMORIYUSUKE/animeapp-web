import { Box, Image, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  image: string;
  productCompanies: string;
}

export const Card = (props: Props) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
    >
      <Link to={"/anime/" + props.title}>
        <Center>
          <Image src={props.image} alt={props.title} maxHeight="200px" />
        </Center>

        <Box p="6">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {props.title}
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {props.productCompanies}
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
