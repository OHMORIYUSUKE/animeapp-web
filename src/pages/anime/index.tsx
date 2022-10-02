import { useParams } from "react-router";

export const DetailPage = (): JSX.Element => {
  const params = useParams();
  return (
    <>
      <h1>{params.name}の詳細</h1>
    </>
  );
};
