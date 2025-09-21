import { useState } from "react";
import { Slide, UserType } from "./screens/Slide";
import { Report } from "./screens/Report";

export type Screen = "slide" | "report";

export const App = (): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("slide");
  const [userType, setUserType] = useState<UserType>("normal");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigateToReport = (query: string, type: UserType) => {
    setSearchQuery(query);
    setUserType(type);
    setCurrentScreen("report");
  };

  const navigateToHome = () => {
    setCurrentScreen("slide");
  };

  if (currentScreen === "report") {
    return <Report userType={userType} searchQuery={searchQuery} onBackClick={navigateToHome} />;
  }

  return <Slide onSearchClick={navigateToReport} />;
};