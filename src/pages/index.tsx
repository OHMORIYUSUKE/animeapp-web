import { Box, Grid } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { Api, UrlParams } from "../lib/api";

export const TopPage = (): JSX.Element => {
  const [apiResponse, setApiResponse] = useState([]);
  Api.get({ year: 2022, cool: 4 } as UrlParams)
    .then((data) => {
      console.log(data);
      setApiResponse(data);
    })
    .catch((e) => {
      console.log(e);
    });
  return (
    <>
      <h1>top</h1>
      <Link to={`/anime`}>詳細</Link>
      {apiResponse.map((data) => (
        <p>{JSON.stringify(data)}</p>
      ))}
      <Box mt={7} mb={7} ml={5} mr={5}>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <Card
                title={"「艦これ」いつかあの海で"}
                image={
                  "https://kancolle-itsuumi.com/core_sys/images/others/ogp.jpg"
                }
                productCompanies={"ENGI"}
              />
            ))}
        </Grid>
      </Box>
    </>
  );
};
