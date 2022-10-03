import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import { FormWhenState, YearAndCool } from "../lib/YearAndCool";

interface Props {
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  pulldownValue: FormWhenState;
}

export const PulldownYearAndCool = (props: Props): JSX.Element => {
  return (
    <>
      <Box mt={7} mb={7} ml={5} mr={5}>
        <FormControl id="when">
          <FormLabel>アニメの放送時期</FormLabel>
          <Select
            onChange={props.handleChange}
            placeholder="知りたい放送時期を選択してください"
          >
            {YearAndCool.getAll().map((data) => (
              <option value={String(data.year) + String(data.cool)}>
                {data.year} / {data.coolJapanese}アニメ
              </option>
            ))}
          </Select>
        </FormControl>
        <Alert status="success" mt={3}>
          <AlertIcon />
          {YearAndCool.getById(props.pulldownValue.id)?.year +
            "/" +
            YearAndCool.getJapaneseByCool(
              YearAndCool.getById(props.pulldownValue.id)?.cool!
            )}
          アニメ が表示されています。
        </Alert>
      </Box>
    </>
  );
};
