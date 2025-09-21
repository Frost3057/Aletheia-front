import { useState } from "react";
import { Slide, UserType } from "./screens/Slide";
import { Report } from "./screens/Report";

export type Screen = "slide" | "report";

export const App = (): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("slide");
  const [userType, setUserType] = useState<UserType>("normal");

  const navigateToReport = (query: string, type: UserType) => {
    setUserType(type);
    setCurrentScreen("report");
  };

  if (currentScreen === "report") {
    return <Report userType={userType} />;
  }

  return <Slide onSearchClick={navigateToReport} />;
};