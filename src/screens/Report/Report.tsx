import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { UserType } from "../Slide";
import { AnalysisResponse, generateAnalysis, generateReport } from "../../services/api";

interface ReportProps {
	searchQuery: string;
	userType: UserType;
	onBackClick: () => void;
	onReady?: () => void;
	prefetchedData?: AnalysisResponse | null;
}

type RequestState = "idle" | "loading" | "resolved" | "error";

const clampPercentage = (value: number | undefined | null): number => {
	if (typeof value !== "number" || Number.isNaN(value)) {
		return 0;
	}

	return Math.max(0, Math.min(100, value));
};

const parseCitation = (citation: string) => {
	const urlMatch = citation.match(/https?:\/\/\S+/);

	if (!urlMatch) {
		return { label: citation, url: undefined };
	}

	const url = urlMatch[0];
	const label = citation.replace(url, "").trim();

	return {
		label: label.length > 0 ? label : url,
		url,
	};
};

const biasToneClassName = (biasClassification: string): string => {
	const normalized = biasClassification.toLowerCase();

	if (normalized.includes("left")) {
		return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200";
	}

	if (normalized.includes("right")) {
		return "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200";
	}

	if (normalized.includes("neutral")) {
		return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200";
	}

	return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-200";
};

const LoadingSkeleton = (): JSX.Element => (
	<div className="space-y-10">
		<div className="border border-slate-200/80 bg-white/70 p-8 shadow-sm backdrop-blur-md dark:border-slate-700/40 dark:bg-slate-900/40">
			<div className="space-y-4">
				<div className="h-8 w-2/3 rounded bg-slate-200/70 dark:bg-slate-700/50" />
				<div className="h-4 w-full rounded bg-slate-200/70 dark:bg-slate-700/50" />
				<div className="h-4 w-5/6 rounded bg-slate-200/70 dark:bg-slate-700/50" />
				<div className="h-4 w-4/5 rounded bg-slate-200/70 dark:bg-slate-700/50" />
			</div>
		</div>

		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					className="border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-slate-700/40 dark:bg-slate-900/40"
					key={`metric-skeleton-${index}`}
				>
					<div className="space-y-3">
						<div className="h-3 w-1/2 rounded bg-slate-200/70 dark:bg-slate-700/50" />
						<div className="h-6 w-2/3 rounded bg-slate-200/70 dark:bg-slate-700/50" />
					</div>
				</div>
			))}
		</div>

		<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
			<div className="h-48 border border-slate-200/80 bg-white/70 shadow-sm backdrop-blur-md dark:border-slate-700/40 dark:bg-slate-900/40" />
			<div className="h-48 border border-slate-200/80 bg-white/70 shadow-sm backdrop-blur-md dark:border-slate-700/40 dark:bg-slate-900/40 lg:col-span-2" />
			<div className="h-48 border border-slate-200/80 bg-white/70 shadow-sm backdrop-blur-md dark:border-slate-700/40 dark:bg-slate-900/40 lg:col-span-2" />
		</div>
	</div>
);

export const Report = ({ onBackClick, onReady, prefetchedData, searchQuery, userType }: ReportProps): JSX.Element => {
	const [requestState, setRequestState] = useState<RequestState>("idle");
	const [reportData, setReportData] = useState<AnalysisResponse | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const readyNotifiedRef = useRef<boolean>(false);
	const inFlightRequestKeyRef = useRef<string | null>(null);
	const lastSuccessfulRequestKeyRef = useRef<string | null>(null);

	const loadReport = useCallback(async () => {
		if (prefetchedData) {
			setReportData(prefetchedData);
			const trimmedPrefetch = searchQuery.trim();
			lastSuccessfulRequestKeyRef.current = trimmedPrefetch ? `${userType}:${trimmedPrefetch}` : "prefetched";
			inFlightRequestKeyRef.current = null;
			setRequestState("resolved");
			return;
		}

		const trimmedQuery = searchQuery.trim();

		if (!trimmedQuery) {
			setReportData(null);
			inFlightRequestKeyRef.current = null;
			lastSuccessfulRequestKeyRef.current = null;
			setRequestState("idle");
			return;
		}

		const requestKey = `${userType}:${trimmedQuery}`;

		if (inFlightRequestKeyRef.current === requestKey || lastSuccessfulRequestKeyRef.current === requestKey) {
			return;
		}

		inFlightRequestKeyRef.current = requestKey;

		setRequestState("loading");
		setErrorMessage(null);

		try {
			if (userType === "journalist") {
				const { report } = await generateReport(trimmedQuery, userType);
				setReportData(report);
			} else {
				const analysis = await generateAnalysis(trimmedQuery, userType);
				setReportData(analysis);
			}
			setRequestState("resolved");
			lastSuccessfulRequestKeyRef.current = requestKey;
		} catch (error) {
			setErrorMessage(error instanceof Error ? error.message : "Unable to generate the report. Please try again.");
			setRequestState("error");
			lastSuccessfulRequestKeyRef.current = null;
		} finally {
			inFlightRequestKeyRef.current = null;
		}
	}, [prefetchedData, searchQuery, userType]);

	useEffect(() => {
		void loadReport();
	}, [loadReport]);

	useEffect(() => {
		if (requestState === "loading") {
			readyNotifiedRef.current = false;
			return;
		}

		if ((requestState === "resolved" || requestState === "error") && !readyNotifiedRef.current) {
			readyNotifiedRef.current = true;
			onReady?.();
		}
	}, [onReady, requestState]);

	const sentimentBadges = useMemo(() => {
		if (!reportData) {
			return [];
		}

		return reportData.Bias_sentiment_report.sentiment_distribution.map((sentiment, index) => ({
			id: `${sentiment}-${index}`,
			label: sentiment,
		}));
	}, [reportData]);

	const metricCards = useMemo(() => {
		if (!reportData) {
			return [];
		}

		return [
			{
				id: "author",
				label: "Author Credibility",
				value: `${Math.round(reportData.author_cred_score)} / 100`,
				accent: "text-emerald-600 dark:text-emerald-300",
			},
			{
				id: "source",
				label: "Source Reliability",
				value: `${Math.round(reportData.source_reliablity_score)} / 100`,
				accent: "text-indigo-600 dark:text-indigo-300",
			},
			{
				id: "bias",
				label: "Bias Classification",
				value: reportData.Bias_sentiment_report.bias_classification,
				accent: biasToneClassName(reportData.Bias_sentiment_report.bias_classification),
			},
			{
				id: "confidence",
				label: "Model Confidence",
				value: `${Math.round(clampPercentage(reportData.Model_score.Confidence_score))}%`,
				accent: "text-rose-600 dark:text-rose-300",
			},
		];
	}, [reportData]);

	const toolsUsed = useMemo(() => {
		if (!reportData) {
			return [];
		}

		return reportData.tools_used.map((tool, index) => ({
			id: `${tool}-${index}`,
			label: tool,
		}));
	}, [reportData]);

	const hasQuery = searchQuery.trim().length > 0;

	useEffect(() => {
		if (!hasQuery && !prefetchedData) {
			onReady?.();
		}
	}, [hasQuery, onReady, prefetchedData]);

	return (
		<div className="min-h-screen bg-[#FDFBF7] text-[#1F2937] dark:bg-[#1F2937] dark:text-[#F3F4F6] font-body">
			<div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-10 sm:px-6 lg:px-10">
				<header className="flex flex-col gap-6 border-b border-slate-300/40 pb-6 dark:border-slate-700/60 md:flex-row md:items-center md:justify-between">
					<button
						className="inline-flex items-center gap-2 rounded-sm border border-[#1F2937]/20 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#1F2937] transition hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-[#E5E7EB]"
						onClick={onBackClick}
						type="button"
					>
						<span aria-hidden className="text-lg">←</span>
						Front Page
					</button>

					<div className="flex flex-col text-right">
						<span className="text-xs uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300">Investigation Query</span>
						<span className="font-display text-2xl text-[#0F172A] dark:text-white">{hasQuery ? searchQuery : "Awaiting Submission"}</span>
						<span className="text-sm text-slate-600/80 dark:text-slate-300/80">
							Prepared for {userType === "journalist" ? "Investigative Journalist" : "Reader"}
						</span>
					</div>
				</header>

				{!hasQuery && (
					<section className="mt-10 border border-amber-200/80 bg-amber-50/70 p-8 text-amber-900 shadow-sm backdrop-blur-md dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-100">
						<h2 className="font-display text-2xl">No brief to investigate yet</h2>
						<p className="mt-2 text-sm leading-relaxed">
							Provide a query from the front page to generate a full investigative digest.
						</p>
					</section>
				)}

				{hasQuery && (
					<main className="mt-10 flex-1 space-y-10">
						{requestState === "loading" && <LoadingSkeleton />}

						{requestState === "error" && (
							<section className="border border-rose-200/80 bg-rose-50/80 p-8 text-rose-900 shadow-sm backdrop-blur-md dark:border-rose-500/40 dark:bg-rose-500/15 dark:text-rose-100">
								<h2 className="font-display text-3xl">Unable to file this report</h2>
								<p className="mt-2 text-sm leading-relaxed opacity-85">
									{errorMessage ?? "An unexpected error occurred while assembling the report."}
								</p>
								<div className="mt-6 flex flex-wrap items-center gap-4">
									<button
										className="inline-flex items-center justify-center rounded-sm border border-rose-800 bg-rose-700 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-50 transition hover:bg-rose-800 dark:border-rose-200 dark:bg-rose-500 dark:text-white"
										onClick={loadReport}
										type="button"
									>
										Retry Report
									</button>
									<button
										className="inline-flex items-center justify-center rounded-sm border border-transparent px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-800 underline decoration-dashed underline-offset-4 dark:text-rose-200"
										onClick={onBackClick}
										type="button"
									>
										Choose Different Brief
									</button>
								</div>
							</section>
						)}

						{requestState === "resolved" && reportData && (
							<div className="space-y-10">
								<section className="border border-slate-200/80 bg-white/80 p-8 shadow-md backdrop-blur-lg dark:border-slate-700/40 dark:bg-slate-900/30">
									<div className="flex flex-col gap-8 lg:flex-row">
										<div className="flex-1 space-y-4">
											<h2 className="font-display text-3xl text-[#0F172A] dark:text-white">Executive Overview</h2>
											<p className="text-lg leading-relaxed text-[#111827]/80 dark:text-[#E5E7EB]/85">
												{reportData.general_overview || "The model did not return a general overview for this query."}
											</p>
											<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
												<span>Mode · {userType === "journalist" ? "Investigative" : "Reader"}</span>
												<span>Scope · Comprehensive Audit</span>
												<span>Refreshed · Moments ago</span>
											</div>
										</div>

										<div className="w-full max-w-sm border border-slate-900/10 bg-[#111827] p-6 text-white shadow-md dark:border-white/15 dark:bg-white/10 dark:text-[#F8FAFC]">
											<h3 className="font-display text-2xl">Model Verdict</h3>
											<p className="mt-2 text-sm leading-relaxed text-white/80 dark:text-[#F8FAFC]/85">
												{reportData.Model_score.Key_features_influencing_decision || "No feature explanations were provided for this decision."}
											</p>
											<div className="mt-6 space-y-3">
												<div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
													<span>Confidence</span>
													<span>{Math.round(clampPercentage(reportData.Model_score.Confidence_score))}%</span>
												</div>
												<div className="relative h-3 w-full overflow-hidden rounded-sm bg-white/15">
													<div
														className="absolute inset-y-0 left-0 rounded-sm bg-emerald-400"
														style={{ width: `${clampPercentage(reportData.Model_score.Confidence_score)}%` }}
													/>
												</div>
											</div>
										</div>
									</div>
								</section>

								<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
									{metricCards.map((card) => (
										<article
											className="border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-lg dark:border-slate-700/40 dark:bg-slate-900/30"
											key={card.id}
										>
											<span className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">{card.label}</span>
											{card.id === "bias" ? (
												<span className={`mt-3 inline-flex rounded-sm px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${card.accent}`}>
													{card.value}
												</span>
											) : (
												<p className={`mt-3 font-display text-3xl ${card.accent}`}>{card.value}</p>
											)}
										</article>
									))}
								</section>

								<section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
									<article className="lg:col-span-3 space-y-4 border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-lg dark:border-slate-700/40 dark:bg-slate-900/30">
										<h3 className="font-display text-2xl">Bias &amp; Sentiment Dispatch</h3>
										<p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
											Analysis indicates a <span className="font-semibold text-[#0F172A] dark:text-white">{reportData.Bias_sentiment_report.bias_classification}</span> stance with the following sentiment palette.
										</p>
										<div className="flex flex-wrap gap-2">
											{sentimentBadges.length > 0 ? (
												sentimentBadges.map((sentiment) => (
													<span
														className="rounded-sm border border-[#0F172A]/10 bg-[#0F172A]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0F172A] dark:border-white/15 dark:bg-white/10 dark:text-white"
														key={sentiment.id}
													>
														{sentiment.label}
													</span>
												))
											) : (
												<span className="text-sm text-slate-500 dark:text-slate-400">No sentiment distribution provided.</span>
											)}
										</div>
									</article>

									<article className="lg:col-span-2 space-y-4 border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-lg dark:border-slate-700/40 dark:bg-slate-900/30">
										<h3 className="font-display text-2xl">Manipulation Watchlist</h3>
										<ul className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
											{reportData.manupulation_techniques.length > 0 ? (
												reportData.manupulation_techniques.map((technique) => (
													<li className="flex items-start gap-3" key={technique}>
														<span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-rose-400" />
														<span>{technique}</span>
													</li>
												))
											) : (
												<li>No manipulation patterns recorded for this briefing.</li>
											)}
										</ul>
									</article>
								</section>

								<section className="border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-lg dark:border-slate-700/40 dark:bg-slate-900/30">
									<h3 className="font-display text-2xl">Evidence-Based Contradictions</h3>
									<p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
										{reportData.evidence_based_contradictions || "The analysis did not surface notable contradictions for this content."}
									</p>
								</section>

								<section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
									<article className="lg:col-span-3 space-y-4 border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-lg dark:border-slate-700/40 dark:bg-slate-900/30">
										<h3 className="font-display text-2xl">Citations &amp; Provenance</h3>
										<ul className="space-y-4 text-sm text-[#111827]/80 dark:text-[#E5E7EB]/85">
											{reportData.citations.length > 0 ? (
												reportData.citations.map((citation, index) => {
													const { label, url } = parseCitation(citation);

													return (
														<li className="flex flex-col gap-1" key={`${citation}-${index}`}>
															<span>{label}</span>
															{url && (
																<a
																	className="w-max text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600 underline decoration-dotted underline-offset-4 dark:text-indigo-300"
																	href={url}
																	rel="noopener noreferrer"
																	target="_blank"
																>
																	Visit Source
																</a>
															)}
														</li>
													);
												})
											) : (
												<li className="text-sm text-slate-500 dark:text-slate-400">No citations were provided for this analysis.</li>
											)}
										</ul>
									</article>

									<article className="lg:col-span-2 space-y-4 border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-lg dark:border-slate-700/40 dark:bg-slate-900/30">
										<h3 className="font-display text-2xl">Tools Applied</h3>
										<div className="flex flex-wrap gap-2">
											{toolsUsed.length > 0 ? (
												toolsUsed.map((tool) => (
													<span
														className="rounded-sm border border-[#0F172A]/10 bg-[#0F172A]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0F172A] dark:border-white/15 dark:bg-white/10 dark:text-white"
														key={tool.id}
													>
														{tool.label}
													</span>
												))
											) : (
												<span className="text-sm text-slate-500 dark:text-slate-400">No tooling metadata accompanied this report.</span>
											)}
										</div>
										</article>
									</section>
								</div>
							)}
					</main>
				)}
			</div>
		</div>
	);
};

