import { useEffect, useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Slide, UserType } from "./screens/Slide";
import { Report } from "./screens/Report";

export type Screen = "slide" | "report";

export const App = (): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("slide");
  const [userType, setUserType] = useState<UserType>("normal");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState<number>(0);

  const loadingMessages = useMemo(
    () => [
      "Reports can take up to five minutes—careful verification is worth the wait.",
      "Great reporting takes time; we're double-checking every claim.",
      "Cross-referencing sources and scoring credibility... almost there."
    ],
    []
  );

  const navigateToReport = (query: string, type: UserType) => {
    setIsTransitioning(true);
    setSearchQuery(query);
    setUserType(type);
    setCurrentScreen("report");
  };

  const navigateToHome = () => {
    setIsTransitioning(false);
    setCurrentScreen("slide");
  };

  const handleReportReady = () => {
    setIsTransitioning(false);
  };

  useEffect(() => {
    if (!isTransitioning) {
      setLoadingMessageIndex(0);
      return;
    }

    setLoadingMessageIndex(0);

    const intervalId = window.setInterval(() => {
      setLoadingMessageIndex((previous) => (previous + 1) % loadingMessages.length);
    }, 3500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isTransitioning, loadingMessages.length]);

  return (
    <div className="relative min-h-screen">
      {currentScreen === "report" ? (
        <Report
          onBackClick={navigateToHome}
          onReady={handleReportReady}
          searchQuery={searchQuery}
          userType={userType}
        />
      ) : (
        <Slide onSearchClick={navigateToReport} />
      )}

      {isTransitioning && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#FDFBF7]/85 text-[#1F2937] backdrop-blur-sm transition dark:bg-[#1F2937]/85 dark:text-[#F3F4F6]">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1F2937]/20 border-t-[#1F2937] dark:border-[#F3F4F6]/20 dark:border-t-[#F3F4F6]" aria-hidden />
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em]">Preparing report</p>
            <p className="max-w-sm text-sm leading-relaxed" aria-live="polite">
              {loadingMessages[loadingMessageIndex]}
            </p>
          </div>
        </div>
      )}

      <Analytics />
    </div>
  );
};