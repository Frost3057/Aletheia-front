import { useCallback, useEffect, useMemo, useState } from "react";import { useEffect, useState } from "react";

import type { UserType } from "../Slide";import { AnalysisResponse, generateReport } from "../../services/api";

import { AnalysisResponse, generateAnalysis, generateReport } from "../../services/api";const getBiasTone = (bias: string): string => {

  const normalized = bias.toLowerCase();

interface ReportProps {  if (normalized.includes("left")) return "bg-[#E0E7FF] text-[#3730A3]";

  searchQuery: string;  if (normalized.includes("right")) return "bg-[#FEE2E2] text-[#B91C1C]";

  userType: UserType;  if (normalized.includes("neutral")) return "bg-[#DCFCE7] text-[#166534]";

  onBackClick: () => void;  return "bg-[#E0E7FF] text-[#1F2937]";

}};



type RequestState = "idle" | "loading" | "resolved" | "error";const getScoreTone = (score: number): string => {

  if (score >= 75) return "text-[#166534]";

const clampPercentage = (value: number | undefined | null): number => {  if (score >= 50) return "text-[#B45309]";

  if (typeof value !== "number" || Number.isNaN(value)) {  return "text-[#B91C1C]";

    return 0;};

  }

const LoadingState = (): JSX.Element => (

  return Math.min(100, Math.max(0, value));  <div className="space-y-10 animate-pulse">

};    <div className="h-10 w-32 bg-[#E5E7EB] dark:bg-[#374151]" />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

const parseCitation = (citation: string) => {      {Array.from({ length: 4 }).map((_, index) => (

  const urlMatch = citation.match(/https?:\/\/\S+/);        <div

          key={index}

  if (!urlMatch) {          className="h-32 rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-white/60 dark:bg-[#111827]"

    return { label: citation, url: undefined };        />

  }      ))}

    </div>

  const url = urlMatch[0];    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">

  const label = citation.replace(url, "").trim();      <div className="h-80 rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-white/60 dark:bg-[#111827]" />

      <div className="h-80 rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-white/60 dark:bg-[#111827]" />

  return {    </div>

    label: label.length > 0 ? label : url,  </div>

    url,);

  };

};export const Report = ({

  userType = "normal",

export const Report = (props: ReportProps): JSX.Element => {  searchQuery = "Climate change impacts on global economy",

  const { onBackClick, searchQuery, userType } = props;  onBackClick

  const [reportData, setReportData] = useState<AnalysisResponse | null>(null);}: ReportProps): JSX.Element => {

  const [requestState, setRequestState] = useState<RequestState>("idle");  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);  const [loading, setLoading] = useState<boolean>(true);



  const loadReport = useCallback(async () => {  useEffect(() => {

    if (!searchQuery) {    const fetchAnalysis = async () => {

      setReportData(null);      try {

      setRequestState("idle");        setLoading(true);

      return;        const response = await generateReport(searchQuery);

    }        setAnalysisData(response);

      } catch (error) {

    setRequestState("loading");        console.error("Error loading analysis:", error);

    setErrorMessage(null);        setAnalysisData(userType === "journalist" ? journalistData : normalUserData);

      } finally {

    try {        setLoading(false);

      const data = userType === "journalist"      }

        ? await generateReport(searchQuery)    };

        : await generateAnalysis(searchQuery);

    fetchAnalysis();

      setReportData(data);  }, [searchQuery, userType]);

      setRequestState("resolved");

    } catch (error) {  const data = analysisData || (userType === "journalist" ? journalistData : normalUserData);

      setErrorMessage(error instanceof Error ? error.message : "Unable to generate report. Please try again.");  const overallScore = Math.round((data.author_cred_score + data.source_reliablity_score) / 2);

      setRequestState("error");

    }  return (

  }, [searchQuery, userType]);    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1F2937] font-body text-[#1F2937] dark:text-[#F3F4F6] transition-colors duration-300">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

  useEffect(() => {        };

    let isCancelled = false;  );

};

    const fetchData = async () => {                  className="flex items-start gap-3 p-3 rounded-lg"

      await loadReport();                  style={{

    };                    background: '#FEF2F2',

                    border: '1px solid #FECACA'

    if (!isCancelled) {                  }}

      void fetchData();                >

    }                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>

                  <span 

    return () => {                    style={{

      isCancelled = true;                      fontFamily: 'Hubot Sans, sans-serif',

    };                      fontWeight: 400,

  }, [loadReport]);                      fontSize: '14px',

                      lineHeight: '1.5',

  const sentimentBadges = useMemo(() => {                      color: '#3E3E3E'

    if (!reportData) {                    }}

      return [];                  >

    }                    {technique}

                  </span>

    return reportData.Bias_sentiment_report.sentiment_distribution.map((sentiment) => ({                </div>

      id: sentiment,              ))}

      label: sentiment,            </div>

    }));          </div>

  }, [reportData]);

          {/* Citations - Enhanced */}

  const toolsUsed = useMemo(() => {          <div 

    if (!reportData) {            className="p-6 rounded-lg"

      return [];            style={{

    }              background: '#FFFFFF',

              border: '2px solid #E5E5E5',

    return reportData.tools_used.map((tool) => ({              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'

      id: tool,            }}

      label: tool,          >

    }));            <div className="flex items-center gap-3 mb-4">

  }, [reportData]);              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">

                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

  const statCards = useMemo(() => {                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

    if (!reportData) {                  <path d="M14 2V8H20" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

      return [];                  <path d="M16 13H8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

    }                  <path d="M16 17H8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

                  <path d="M10 9H9H8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

    return [                </svg>

      {              </div>

        id: "author",              <h3 

        label: "Author Credibility",                style={{

        value: `${Math.round(reportData.author_cred_score)} / 100`,                  fontFamily: 'Hubot Sans, sans-serif',

        tone: "text-emerald-600 dark:text-emerald-400",                  fontWeight: 600,

      },                  fontSize: '24px',

      {                  lineHeight: '1.4',

        id: "source",                  letterSpacing: '0%',

        label: "Source Reliability",                  color: '#212529'

        value: `${Math.round(reportData.source_reliablity_score)} / 100`,                }}

        tone: "text-indigo-600 dark:text-indigo-400",              >

      },                Citations & Sources

      {              </h3>

        id: "bias",            </div>

        label: "Bias Classification",            

        value: reportData.Bias_sentiment_report.bias_classification,            <div className="space-y-3">

        tone: "text-amber-600 dark:text-amber-400",              {data.citations.map((citation: string, index: number) => (

      },                <div 

      {                  key={index}

        id: "confidence",                  className="p-3 rounded-lg"

        label: "Model Confidence",                  style={{

        value: `${Math.round(reportData.Model_score.Confidence_score)}%`,                    background: '#F9FAFB',

        tone: "text-rose-600 dark:text-rose-400",                    border: '1px solid #E5E7EB'

      },                  }}

    ];                >

  }, [reportData]);                  <div className="flex items-start gap-3">

                    <span 

  return (                      className="px-2 py-1 rounded text-xs font-medium"

    <div className="min-h-screen bg-[#F8F4EC] text-[#1F2937] dark:bg-[#0F172A] dark:text-[#E5E7EB] font-body">                      style={{

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">                        background: '#059669',

        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">                        color: '#FFFFFF',

          <button                        fontFamily: 'Hubot Sans, sans-serif',

            className="inline-flex w-max items-center gap-2 rounded-full border border-[#1F2937]/20 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#1F2937] transition hover:-translate-y-0.5 hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-[#E5E7EB]"                        minWidth: '24px',

            onClick={onBackClick}                        textAlign: 'center'

            type="button"                      }}

          >                    >

            <span aria-hidden className="text-lg">←</span>                      {index + 1}

            Back to Front Page                    </span>

          </button>                    <span 

                      style={{

          <div className="flex flex-col text-right">                        fontFamily: 'Hubot Sans, sans-serif',

            <span className="text-xs uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400">Investigation Query</span>                        fontWeight: 400,

            <span className="font-display text-xl md:text-2xl text-[#111827] dark:text-white">{searchQuery || "Untitled Inquiry"}</span>                        fontSize: '14px',

            <span className="text-sm text-gray-500 dark:text-gray-400">Prepared for {userType === "journalist" ? "Investigative Journalist" : "Reader"}</span>                        lineHeight: '1.5',

          </div>                        color: '#3E3E3E'

        </header>                      }}

                    >

        {requestState === "loading" && (                      {citation}

          <section className="space-y-6">                    </span>

            <div className="h-44 rounded-2xl border border-black/5 bg-white/70 p-6 shadow-[0_20px_45px_-30px_rgba(17,24,39,0.45)] backdrop-blur dark:border-white/10 dark:bg-white/10">                  </div>

              <div className="animate-pulse space-y-4">                </div>

                <div className="h-8 w-2/3 rounded bg-gray-200/70 dark:bg-white/10" />              ))}

                <div className="h-4 w-full rounded bg-gray-200/70 dark:bg-white/10" />            </div>

                <div className="h-4 w-5/6 rounded bg-gray-200/70 dark:bg-white/10" />          </div>

                <div className="h-4 w-4/5 rounded bg-gray-200/70 dark:bg-white/10" />

              </div>          {/* Evidence Summary Dashboard */}

            </div>          <div 

            className="p-6 rounded-lg"

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">            style={{

              {Array.from({ length: 4 }).map((_, index) => (              background: '#FFFFFF',

                <div              border: '2px solid #E5E5E5',

                  className="h-32 rounded-2xl border border-black/5 bg-white/70 p-6 shadow-[0_20px_45px_-30px_rgba(17,24,39,0.45)] backdrop-blur dark:border-white/10 dark:bg-white/10"              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'

                  key={`skeleton-${index}`}            }}

                >          >

                  <div className="animate-pulse space-y-3">            <div className="flex items-center gap-3 mb-4">

                    <div className="h-4 w-1/2 rounded bg-gray-200/70 dark:bg-white/10" />              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">

                    <div className="h-6 w-2/3 rounded bg-gray-200/70 dark:bg-white/10" />                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                  </div>                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

                </div>                </svg>

              ))}              </div>

            </div>              <h3 

          </section>                style={{

        )}                  fontFamily: 'Hubot Sans, sans-serif',

                  fontWeight: 600,

        {requestState === "error" && (                  fontSize: '24px',

          <section className="rounded-2xl border border-rose-200 bg-rose-50/80 p-6 text-rose-900 dark:border-rose-400/40 dark:bg-rose-900/10 dark:text-rose-100">                  lineHeight: '1.4',

            <h2 className="font-display text-2xl">Unable to produce the report</h2>                  letterSpacing: '0%',

            <p className="mt-2 text-sm leading-relaxed opacity-80">{errorMessage ?? "An unexpected error occurred."}</p>                  color: '#212529'

            <div className="mt-4 flex flex-wrap items-center gap-3">                }}

              <button              >

                className="rounded-full border border-rose-900 bg-rose-800 px-4 py-2 text-sm font-semibold text-rose-50 transition hover:bg-rose-900 dark:border-rose-200 dark:bg-rose-500 dark:text-white"                Analysis Summary

                onClick={loadReport}              </h3>

                type="button"            </div>

              >            

                Retry            <div className="grid grid-cols-3 gap-4">

              </button>              <div className="text-center p-4 bg-green-50 rounded-lg">

              <button                <div 

                className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-rose-800 underline decoration-dashed underline-offset-4 dark:text-rose-200"                  className="text-2xl font-bold mb-1"

                onClick={onBackClick}                  style={{

                type="button"                    fontFamily: 'Hubot Sans, sans-serif',

              >                    color: '#059669'

                Choose a different query                  }}

              </button>                >

            </div>                  {data.citations.length}

          </section>                </div>

        )}                <div 

                  style={{

        {requestState === "resolved" && reportData && (                    fontFamily: 'Hubot Sans, sans-serif',

          <div className="space-y-10">                    fontWeight: 400,

            <section className="rounded-2xl border border-black/5 bg-white/80 p-8 shadow-[0_25px_50px_-35px_rgba(30,41,59,0.65)] backdrop-blur-lg dark:border-white/10 dark:bg-white/5">                    fontSize: '14px',

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">                    lineHeight: '1.4',

                <div className="flex-1 space-y-4">                    letterSpacing: '0%',

                  <h2 className="font-display text-3xl text-[#111827] dark:text-white">Executive Overview</h2>                    color: '#666666'

                  <p className="text-lg leading-relaxed text-[#111827]/80 dark:text-[#E5E7EB]/90">                  }}

                    {reportData.general_overview || "No executive overview provided for this report."}                >

                  </p>                  Citations

                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400">                </div>

                    <span>Model: {userType === "journalist" ? "Investigative" : "Reader"} Mode</span>              </div>

                    <span>Scope: Comprehensive Audit</span>

                    <span>Last refreshed: Just now</span>              <div className="text-center p-4 bg-blue-50 rounded-lg">

                  </div>                <div 

                </div>                  className="text-2xl font-bold mb-1"

                  style={{

                <div className="max-w-sm flex-1 rounded-xl border border-black/10 bg-[#111827] p-6 text-white shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-[#F8FAFC]">                    fontFamily: 'Hubot Sans, sans-serif',

                  <h3 className="font-display text-2xl">Model Verdict</h3>                    color: '#4F46E5'

                  <p className="mt-2 text-sm leading-relaxed text-white/80 dark:text-[#F8FAFC]/80">                  }}

                    {reportData.Model_score.Key_features_influencing_decision || "The system did not supply feature importance notes."}                >

                  </p>                  {data.tools_used.length}

                  <div className="mt-6 space-y-3">                </div>

                    <div className="flex items-center justify-between text-sm font-semibold">                <div 

                      <span>Confidence</span>                  style={{

                      <span>{Math.round(clampPercentage(reportData.Model_score.Confidence_score))}%</span>                    fontFamily: 'Hubot Sans, sans-serif',

                    </div>                    fontWeight: 400,

                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/20">                    fontSize: '14px',

                      <div                    lineHeight: '1.4',

                        className="absolute inset-y-0 left-0 rounded-full bg-emerald-400"                    letterSpacing: '0%',

                        style={{ width: `${clampPercentage(reportData.Model_score.Confidence_score)}%` }}                    color: '#666666'

                      />                  }}

                    </div>                >

                  </div>                  Tools Used

                </div>                </div>

              </div>              </div>

            </section>

              <div className="text-center p-4 bg-red-50 rounded-lg">

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">                <div 

              {statCards.map((card) => (                  className="text-2xl font-bold mb-1"

                <article                  style={{

                  className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-[0_20px_45px_-30px_rgba(17,24,39,0.55)] backdrop-blur dark:border-white/10 dark:bg-white/5"                    fontFamily: 'Hubot Sans, sans-serif',

                  key={card.id}                    color: '#DC2626'

                >                  }}

                  <span className="text-xs uppercase tracking-[0.3em] text-gray-400">{card.label}</span>                >

                  <p className={`mt-3 font-display text-3xl ${card.tone}`}>{card.value}</p>                  {data.manupulation_techniques.length}

                </article>                </div>

              ))}                <div 

            </section>                  style={{

                    fontFamily: 'Hubot Sans, sans-serif',

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">                    fontWeight: 400,

              <article className="lg:col-span-3 space-y-4 rounded-2xl border border-black/5 bg-white/80 p-6 shadow-[0_20px_45px_-30px_rgba(17,24,39,0.55)] backdrop-blur dark:border-white/10 dark:bg-white/5">                    fontSize: '14px',

                <h3 className="font-display text-2xl">Bias & Sentiment Brief</h3>                    lineHeight: '1.4',

                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">                    letterSpacing: '0%',

                  The article leans toward <span className="font-semibold text-[#111827] dark:text-white">{reportData.Bias_sentiment_report.bias_classification}</span>. Sentiment samples recorded below.                    color: '#666666'

                </p>                  }}

                <div className="flex flex-wrap gap-2">                >

                  {sentimentBadges.map((sentiment) => (                  Issues Found

                    <span                </div>

                      className="rounded-full border border-[#111827]/15 bg-[#111827]/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#111827] transition dark:border-white/10 dark:bg-white/10 dark:text-white"              </div>

                      key={sentiment.id}            </div>

                    >          </div>

                      {sentiment.label}

                    </span>          {/* General Overview */}

                  ))}          <div 

                  {sentimentBadges.length === 0 && (            className="p-6 rounded-lg"

                    <span className="text-sm text-gray-500 dark:text-gray-400">No sentiment distribution provided.</span>            style={{

                  )}              background: '#F8F9FA',

                </div>              border: '2px solid #E5E5E5',

              </article>              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'

            }}

              <article className="lg:col-span-2 space-y-4 rounded-2xl border border-black/5 bg-white/80 p-6 shadow-[0_20px_45px_-30px_rgba(17,24,39,0.55)] backdrop-blur dark:border-white/10 dark:bg-white/5">          >

                <h3 className="font-display text-2xl">Manipulation Watchlist</h3>            <div className="flex items-center gap-3 mb-4">

                <ul className="space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">

                  {reportData.manupulation_techniques.length > 0 ? (                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    reportData.manupulation_techniques.map((technique) => (                  <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

                      <li className="flex items-start gap-3" key={technique}>                </svg>

                        <span className="mt-1 h-2 w-2 flex-none rounded-full bg-rose-400" />              </div>

                        <span>{technique}</span>              <h3 

                      </li>                style={{

                    ))                  fontFamily: 'Hubot Sans, sans-serif',

                  ) : (                  fontWeight: 600,

                    <li>No manipulation patterns detected.</li>                  fontSize: '24px',

                  )}                  lineHeight: '1.4',

                </ul>                  letterSpacing: '0%',

              </article>                  color: '#212529'

            </section>                }}

              >

            <section className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-[0_20px_45px_-30px_rgba(17,24,39,0.55)] backdrop-blur dark:border-white/10 dark:bg-white/5">                General Overview

              <h3 className="font-display text-2xl">Evidence-Based Contradictions</h3>              </h3>

              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-gray-200">            </div>

                {reportData.evidence_based_contradictions || "The system did not record any notable contradictions."}            

              </p>            <p 

            </section>              style={{

                fontFamily: 'Hubot Sans, sans-serif',

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">                fontWeight: 400,

              <article className="lg:col-span-3 space-y-4 rounded-2xl border border-black/5 bg-white/80 p-6 shadow-[0_20px_45px_-30px_rgba(17,24,39,0.55)] backdrop-blur dark:border-white/10 dark:bg-white/5">                fontSize: '16px',

                <h3 className="font-display text-2xl">Citations & Provenance</h3>                lineHeight: '1.6',

                <ul className="space-y-4">                letterSpacing: '0%',

                  {reportData.citations.length > 0 ? (                color: '#212529'

                    reportData.citations.map((citation, index) => {              }}

                      const { label, url } = parseCitation(citation);            >

              {data.general_overview}

                      return (            </p>

                        <li className="flex flex-col gap-1 text-sm text-[#111827]/80 dark:text-[#E5E7EB]/80" key={`${citation}-${index}`}>          </div>

                          <span>{label}</span>

                          {url && (          {/* Tools Used */}

                            <a          <div 

                              className="w-max text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600 underline decoration-dotted underline-offset-4 dark:text-indigo-300"            className="p-6 rounded-lg"

                              href={url}            style={{

                              rel="noopener noreferrer"              background: '#FFFFFF',

                              target="_blank"              border: '2px solid #E5E5E5',

                            >              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'

                              Visit source            }}

                            </a>          >

                          )}            <h3 

                        </li>              style={{

                      );                fontFamily: 'Hubot Sans, sans-serif',

                    })                fontWeight: 600,

                  ) : (                fontSize: '24px',

                    <li className="text-sm text-gray-500 dark:text-gray-400">No citations were returned for this query.</li>                lineHeight: '1.4',

                  )}                letterSpacing: '0%',

                </ul>                color: '#212529',

              </article>                marginBottom: '16px'

              }}

              <article className="lg:col-span-2 space-y-4 rounded-2xl border border-black/5 bg-white/80 p-6 shadow-[0_20px_45px_-30px_rgba(17,24,39,0.55)] backdrop-blur dark:border-white/10 dark:bg-white/5">            >

                <h3 className="font-display text-2xl">Tools Applied</h3>              Analysis Tools Used

                <div className="flex flex-wrap gap-2">            </h3>

                  {toolsUsed.length > 0 ? (            <div className="flex flex-wrap gap-2">

                    toolsUsed.map((tool) => (              {data.tools_used.map((tool: string, index: number) => (

                      <span                <span 

                        className="rounded-full border border-[#111827]/15 bg-[#111827]/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#111827] transition dark:border-white/10 dark:bg-white/10 dark:text-white"                  key={index}

                        key={tool.id}                  className="px-3 py-2 rounded-lg text-sm"

                      >                  style={{

                        {tool.label}                    background: '#E5E7EB',

                      </span>                    color: '#374151',

                    ))                    fontFamily: 'Hubot Sans, sans-serif',

                  ) : (                    fontWeight: 500

                    <span className="text-sm text-gray-500 dark:text-gray-400">No tools were listed.</span>                  }}

                  )}                >

                </div>                  {tool}

              </article>                </span>

            </section>              ))}

          </div>            </div>

        )}          </div>

      </div>        </div>

    </div>      </div>

  );

};      {/* Footer - Full Width */}
      <div 
        className="relative w-full flex items-center justify-center"
        style={{
          width: '100%',
          height: '200px',
          background: '#D9D9D9'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <span 
            className="select-none"
            style={{
              fontFamily: 'Hubot Sans Expanded, sans-serif',
              fontWeight: 600,
              fontStyle: 'italic',
              fontSize: '120px',
              lineHeight: '1.2',
              letterSpacing: '0%',
              color: 'rgba(33, 37, 41, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Aletheia
          </span>
        </div>
      </div>
    </div>
  );
};
