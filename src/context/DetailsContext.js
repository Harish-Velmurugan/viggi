import React, { useState, createContext } from "react";

export const DetailsContext = createContext();

export const DetailsProvider = (props) => {
  const [sideBarOpen, handleSideBar] = useState(true);
  const [userDetails, setUserDetails] = useState({
    loginStatus: false,
    username: "",
    name: "",
    email: "",
    token: "",
    profileImage: "",
  });

  return (
    <DetailsContext.Provider
      value={[sideBarOpen, handleSideBar, userDetails, setUserDetails]}
    >
      {props.children}
    </DetailsContext.Provider>
  );
};
