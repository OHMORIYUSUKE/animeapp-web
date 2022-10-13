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
import { useNavigate, useSearchParams } from "react-router-dom";

const urlQueryType = z.object({
  srcId: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
});

export const TopPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // url query
  const [urlQuery, setUrlQuery] = useState({
    srcId:
      searchParams.get("srcId") !== null
        ? searchParams.get("srcId")
        : String(YearAndCool.getNow().year) + String(YearAndCool.getNow().cool),
  } as z.infer<typeof urlQueryType>);
  // api
  const [apiResponse, setApiResponse] = useState(
    [] as z.infer<typeof apiSchema>
  );
  // 選択
  const [pulldownValue, setPulldownValue] = useState({
    id: urlQuery.srcId,
  } as FormWhenState);
  // 選択変更
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate("/?srcId=" + event.target.value);
    setPulldownValue({
      id:
        String(YearAndCool.getById(event.target.value)?.year) +
        String(YearAndCool.getById(event.target.value)?.cool),
    });
    setUrlQuery({ srcId: event.target.value });
  };
  // loading
  const [isLoading, setIsLoading] = useState(true as boolean);
  useEffect(() => {
    Api.get({
      year: YearAndCool.getById(urlQuery.srcId)?.year,
      cool: YearAndCool.getById(urlQuery.srcId)?.cool,
    } as UrlParams)
      .then((data) => {
        setApiResponse(apiSchema.parse(data));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        navigate("/500");
      });
  });

  if (isLoading) {
    return (
      <>
        <Header srcId={urlQuery.srcId} />
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
      <Header srcId={urlQuery.srcId} />
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
