import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Card } from "../components/Card";
import { Api, UrlParams } from "../lib/api";
import { apiSchema } from "../schema/apiSchema";
import NoImage from "../images/noimage.png";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import { FormWhenState, YearAndCool } from "../lib/YearAndCool";
import { PulldownYearAndCool } from "../components/PulldownYearAndCool";
import { Loading } from "../components/Loading";
import { useLocation } from "react-router-dom";

export const TopPage = (): JSX.Element => {
  const { state } = useLocation();
  useEffect(() => {}, [state]);
  const [apiResponse, setApiResponse] = useState(
    [] as z.infer<typeof apiSchema>
  );
  const [pulldownValue, setPulldownValue] = useState({
    id: state.pulldownValue === "" ? "20224" : state.pulldownValue,
  } as FormWhenState);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPulldownValue(YearAndCool.getById(event.target.value)!);
  };
  const [isLoading, setIsLoading] = useState(true as boolean);
  Api.get({
    year: YearAndCool.getById(pulldownValue.id)?.year,
    cool: YearAndCool.getById(pulldownValue.id)?.cool,
  } as UrlParams)
    .then((data) => {
      setApiResponse(data);
      setIsLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });

  if (isLoading) {
    return (
      <>
        <Header />
        <PulldownYearAndCool
          pulldownValue={pulldownValue}
          handleChange={handleChange}
        />
        <Box mt={7} mb={7} ml={5} mr={5}>
          <Loading />
        </Box>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header />
      <PulldownYearAndCool
        pulldownValue={pulldownValue}
        handleChange={handleChange}
      />
      <Box mt={7} mb={7} ml={5} mr={5}>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {apiResponse.map((data) => (
            <Card
              pulldownValue={pulldownValue.id}
              id={data.id}
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
