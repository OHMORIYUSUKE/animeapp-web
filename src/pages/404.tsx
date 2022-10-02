import { Link } from "react-router-dom";

export const Error404Page = (): JSX.Element => {
  return (
    <>
      <h1>404</h1>
      <Link to={`/`}>Topに戻る</Link>
    </>
  );
};
