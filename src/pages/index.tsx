import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormLabel,
  Grid,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { z } from "zod";
import { Card } from "../components/Card";
import { Api, UrlParams } from "../lib/api";
import { apiSchema } from "../schema/apiSchema";
import NoImage from "../images/noimage.png";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import { FormWhen, FormWhenState, YearAndCool } from "../lib/YearAndCool";

export const TopPage = (): JSX.Element => {
  const [apiResponse, setApiResponse] = useState(
    [] as z.infer<typeof apiSchema>
  );
  const [pullDownValue, setPullDownValue] = useState({
    id: "20224",
  } as FormWhenState);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPullDownValue(YearAndCool.getById(event.target.value)!);
  };
  Api.get({
    year: YearAndCool.getById(pullDownValue.id)?.year,
    cool: YearAndCool.getById(pullDownValue.id)?.cool,
  } as UrlParams)
    .then((data) => {
      setApiResponse(data);
    })
    .catch((e) => {
      console.log(e);
    });
  return (
    <>
      <Header />
      <Box mt={7} mb={7} ml={5} mr={5}>
        <FormControl id="when">
          <FormLabel>アニメの放送時期</FormLabel>
          <Select
            onChange={handleChange}
            placeholder="知りたい放送時期を選択してください"
          >
            {YearAndCool.getAll().map((data) => (
              <option value={String(data.year) + String(data.cool)}>
                {data.year} / {data.coolJapanese}アニメ
              </option>
            ))}
          </Select>
        </FormControl>
        <Alert status="warning" mt={3}>
          <AlertIcon />
          {YearAndCool.getById(pullDownValue.id)?.year +
            "/" +
            YearAndCool.getJapaneseByCool(
              YearAndCool.getById(pullDownValue.id)?.cool!
            )}
          アニメ が選択されています。表示まで時間がかかることがあります。
        </Alert>
      </Box>
      <Box mt={7} mb={7} ml={5} mr={5}>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {apiResponse.map((data) => (
            <Card
              title={data.title}
              image={data.ogp_image_url === "" ? NoImage : data.ogp_image_url}
              productCompanies={data.product_companies}
            />
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};
