import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Api } from "../../lib/api";
import { YearAndCool } from "../../lib/YearAndCool";
import { apiContentSchema } from "../../schema/apiSchema";
import { useState } from "react";

import { RiBuildingFill } from "react-icons/ri";
import { BiLinkExternal, BiBadgeCheck } from "react-icons/bi";
import { BsHash } from "react-icons/bs";
import { GrUserManager, GrUserFemale } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";

import NoImage from "../../images/noimage.png";
import { Loading } from "../../components/Loading";

export const DetailPage = (): JSX.Element => {
  const { state } = useLocation();
  const [apiResponse, setApiResponse] = useState(
    {} as z.infer<typeof apiContentSchema>
  );
  const [isLoading, setIsLoading] = useState(true as boolean);
  Api.getById(state.id, {
    year: YearAndCool.getById(state.pulldownValue)?.year!,
    cool: YearAndCool.getById(state.pulldownValue)?.cool!,
  })
    .then((res) => {
      setApiResponse(apiContentSchema.parse(res));
      setIsLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <>
        <Header />
        <Center mt={30}>
          <Container minW="4xl" centerContent>
            <Box padding="4" bg="gray.100" minW="4xl" minH="4xl">
              <Center>
                <Loading />
              </Center>
            </Box>
          </Container>
        </Center>
        <Center mt={10}>
          <Button
            colorScheme="teal"
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
          >
            <AiOutlineCaretLeft
              style={{ display: "inline-flex", verticalAlign: "middle" }}
            />{" "}
            戻る
          </Button>
        </Center>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header />
      <Center mt={30}>
        <Container maxW="4xl" centerContent>
          <Box padding="4" bg="gray.100" maxW="4xl">
            <Center>
              <Image
                src={
                  apiResponse.ogp_image_url === ""
                    ? NoImage
                    : apiResponse.ogp_image_url
                }
                alt={apiResponse.title}
              />
            </Center>
            <Text fontSize="3xl" mt={3}>
              {apiResponse.title}
            </Text>
            <Text fontSize="md" color="gray.600" mb={3}>
              {apiResponse.title_en}
            </Text>
            <Divider />
            <Text fontSize="xl" mt={5} mb={5}>
              {apiResponse.ogp_description}
            </Text>
            <Flex>
              <Text fontSize="xl" mr={6}>
                <RiBuildingFill
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                />
                {apiResponse.product_companies !== ""
                  ? apiResponse.product_companies
                  : "制作会社不明"}
              </Text>
              <Text fontSize="xl" mr={6}>
                全 {apiResponse.sequel} 期
              </Text>
              {apiResponse.sex ? (
                <Text fontSize="xl">
                  <GrUserFemale
                    style={{
                      display: "inline-flex",
                      verticalAlign: "middle",
                    }}
                  />
                  女性向け
                </Text>
              ) : (
                <Text fontSize="xl">
                  <GrUserManager
                    style={{
                      display: "inline-flex",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  男性向け
                </Text>
              )}
            </Flex>
            <Flex mt={2}>
              <Text mr={6} fontSize="lg">
                <Link
                  href={
                    "https://twitter.com/hashtag/" +
                    apiResponse.twitter_hash_tag
                  }
                  color="teal.500"
                >
                  <BsHash
                    style={{
                      display: "inline-flex",
                      verticalAlign: "middle",
                    }}
                  />
                  {apiResponse.twitter_hash_tag}
                </Link>
              </Text>
              <Text mr={6} fontSize="lg">
                <Link
                  color="teal.500"
                  href={"https://twitter.com/" + apiResponse.twitter_account}
                >
                  <FaTwitter
                    style={{
                      display: "inline-flex",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  {apiResponse.title}{" "}
                  <BiBadgeCheck
                    style={{
                      display: "inline-flex",
                      verticalAlign: "middle",
                    }}
                  />
                </Link>
              </Text>
            </Flex>
            <Text fontSize="lg" mt={4}>
              <Link color="teal.500" href={apiResponse.public_url}>
                公式サイト
                <BiLinkExternal
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                />
              </Link>
            </Text>
          </Box>
        </Container>
      </Center>
      <Center mt={10}>
        <Button
          colorScheme="teal"
          variant="outline"
          size="lg"
          onClick={() =>
            navigate("/", { state: { pulldownValue: state.pulldownValue } })
          }
        >
          <AiOutlineCaretLeft
            style={{ display: "inline-flex", verticalAlign: "middle" }}
          />{" "}
          戻る
        </Button>
      </Center>
      <Footer />
    </>
  );
};
