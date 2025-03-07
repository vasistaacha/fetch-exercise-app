import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError(); // Hook to access the error details
  console.error(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{`${error.status} : ${error.statusText}`}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
