import { Center } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { YearAndCool } from "../lib/YearAndCool";

export const Error500Page = (): JSX.Element => {
  return (
    <>
      <Header
        srcId={
          String(YearAndCool.getNow().year) + String(YearAndCool.getNow().cool)
        }
      />
      <Center mt={70}>
        <Center bg="teal" h="200px" w="400px" color="white" borderRadius="lg">
          <Text fontSize="4xl">問題が発生しました</Text>
        </Center>
      </Center>
      <Center mt={30} mb={20}>
        <Link to="/">
          TOPページへ{" "}
          <AiOutlineCaretRight
            style={{ display: "inline-flex", verticalAlign: "middle" }}
          />
        </Link>
      </Center>
      <Footer />
    </>
  );
};
