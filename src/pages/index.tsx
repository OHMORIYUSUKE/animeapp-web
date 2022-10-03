import { Box, Grid } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Card } from "../components/Card";
import { Api, UrlParams } from "../lib/api";
import { apiSchema } from "../schema/apiSchema";
import NoImage from "../images/noimage.png";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const TopPage = (): JSX.Element => {
  const [apiResponse, setApiResponse] = useState(
    [] as z.infer<typeof apiSchema>
  );
  Api.get({ year: 2022, cool: 4 } as UrlParams)
    .then((data) => {
      setApiResponse(data);
    })
    .catch((e) => {
      console.log(e);
    });
  return (
    <>
      <Header />
      <h1>top</h1>
      <Link to={`/anime`}>詳細</Link>
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
