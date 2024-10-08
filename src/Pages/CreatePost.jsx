import React, { Fragment, useContext } from "react";
import Create from "../Components/Create/Create";
import { AuthContext } from "../contextStore/AuthContext";
import Login from "../Components/Login/Login";

const CreatePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Fragment>
      {user ? (
        <Create />
      ) : (
        <>
          <Login />
        </>
      )}
    </Fragment>
  );
};

export default CreatePage;
