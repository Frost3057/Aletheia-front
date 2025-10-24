const sanitizeBaseUrl = (value: string): string => value.replace(/\/+$/, "");

const resolveBaseUrl = (): string => {
  const meta = (typeof import.meta !== "undefined" ? import.meta : undefined) as
    | (ImportMeta & { env?: Record<string, string | undefined> })
    | undefined;

  const fromEnv = meta?.env?.VITE_API_BASE_URL;
  return sanitizeBaseUrl(fromEnv ?? "http://127.0.0.1:8000");
};

const API_BASE_URL = resolveBaseUrl();

const LLM_API_PREFIX = `${API_BASE_URL}/api/llm`;
const GENERATE_REPORT_ENDPOINT = `${LLM_API_PREFIX}/generate-report/`;

export interface ReportMetadata {
  author_credibility_score?: number;
  source_reliability_score?: number;
  confidence_score?: number;
  generated_at?: string;
  processing_time?: number;
  query?: string;
  response_type?: string;
  user_type?: string;
  sources_analyzed?: number;
  tools_used?: string[];
  record_id?: string;
}

export interface ReportServiceResult {
  report: AnalysisResponse;
  metadata: ReportMetadata | null;
  message?: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  credibilityScore: number;
  url?: string;
  category?: string;
  publishedAt?: string;
  source?: string;
}

export interface AnalysisResponse {
  author_cred_score: number;
  source_reliablity_score: number;
  citations: string[];
  Bias_sentiment_report: {
    sentiment_distribution: string[];
    bias_classification: string;
  };
  evidence_based_contradictions: string;
  manupulation_techniques: string[];
  Model_score: {
    Confidence_score: number;
    Key_features_influencing_decision: string;
  };
  general_overview: string;
  tools_used: string[];
}

// Fetch articles for homepage (max 5 articles)
export const fetchArticles = async (limit: number = 5): Promise<Article[]> => {
  const actualLimit = Math.min(limit, 5);
  console.log(`Fetching articles with limit: ${actualLimit}`);
  
  try {
  const url = `${API_BASE_URL}/articles?limit=${actualLimit}`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url);
    console.log('Articles response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Articles API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Raw articles response:', data);
    
    // Handle different possible response structures
    let articles = [];
    if (Array.isArray(data)) {
      articles = data;
    } else if (data.articles && Array.isArray(data.articles)) {
      articles = data.articles;
    } else if (data.data && Array.isArray(data.data)) {
      articles = data.data;
    } else {
      console.warn('Unexpected articles response structure:', data);
    }
    
    console.log('Extracted articles array:', articles);
    
    // Map and validate article structure
    const structuredArticles: Article[] = articles.map((article: any, index: number) => ({
      id: article.id || article._id || `article-${index}`,
      title: article.title || article.headline || `Article ${index + 1}`,
      description: article.description || article.summary || article.excerpt || "No description available",
      credibilityScore: article.credibilityScore || article.credibility_score || article.score || Math.floor(Math.random() * 40) + 60,
      url: article.url || article.link || undefined,
      category: article.category || article.topic || "General",
      publishedAt: article.publishedAt || article.published_at || article.date || undefined,
      source: article.source || article.publisher || "Unknown Source"
    }));
    
    // Ensure we never return more than 5 articles
    const finalArticles = structuredArticles.slice(0, 5);
    console.log('Final structured articles:', finalArticles);
    
    return finalArticles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return mock data as fallback (max 5)
    console.log('Falling back to mock articles');
    return getMockArticles(actualLimit);
  }
};

// Generate analysis for normal users
export const generateAnalysis = async (query: string, userType: "normal" | "journalist" = "normal"): Promise<AnalysisResponse> => {
  console.log('Calling /generate endpoint with query:', query);
  
  try {
    const requestBody = { query, user_type: userType };
    console.log('Request body:', requestBody);
    
  const response = await fetch(`${API_BASE_URL}/generate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data);
    
    // Validate and structure the response data
    const structuredData: AnalysisResponse = {
      author_cred_score: data.author_cred_score || data.authorCredScore || 75,
      source_reliablity_score: data.source_reliablity_score || data.sourceReliabilityScore || 68,
      citations: data.citations || [],
      Bias_sentiment_report: {
        sentiment_distribution: data.Bias_sentiment_report?.sentiment_distribution || data.sentimentDistribution || ["Neutral"],
        bias_classification: data.Bias_sentiment_report?.bias_classification || data.biasClassification || "Neutral"
      },
      evidence_based_contradictions: data.evidence_based_contradictions || data.contradictions || "",
      manupulation_techniques: data.manupulation_techniques || data.manipulationTechniques || [],
      Model_score: {
        Confidence_score: data.Model_score?.Confidence_score || data.confidenceScore || 80,
        Key_features_influencing_decision: data.Model_score?.Key_features_influencing_decision || data.keyFeatures || ""
      },
      general_overview: data.general_overview || data.overview || "",
      tools_used: data.tools_used || data.toolsUsed || []
    };
    
    console.log('Structured response:', structuredData);
    return structuredData;
  } catch (error) {
    console.error('Error generating analysis:', error);
    const message = error instanceof Error ? error.message : 'Unable to generate analysis.';
    throw new Error(message);
  }
};

// Generate detailed report for journalists
export const generateReport = async (
  query: string,
  userType: "normal" | "journalist" = "journalist"
): Promise<ReportServiceResult> => {
  console.log('Calling /generate-report endpoint with query:', query);
  
  try {
    const requestBody = { query, user_type: userType };
    console.log('Request body:', requestBody);
    
  const response = await fetch(GENERATE_REPORT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const payload = await response.json();
    console.log('Raw API response:', payload);

    if (!payload?.success) {
      const message = payload?.message ?? 'Report generation failed';
      throw new Error(message);
    }

    const rawReport = payload?.data?.report;
    if (!rawReport) {
      throw new Error('Report data missing from response');
    }
    
    // Validate and structure the response data for detailed journalist report
    const structuredData: AnalysisResponse = {
      author_cred_score: rawReport.author_cred_score || rawReport.authorCredScore || 75,
      source_reliablity_score: rawReport.source_reliablity_score || rawReport.sourceReliabilityScore || 68,
      citations: rawReport.citations || [],
      Bias_sentiment_report: {
        sentiment_distribution: rawReport.Bias_sentiment_report?.sentiment_distribution || rawReport.sentimentDistribution || ["Neutral"],
        bias_classification: rawReport.Bias_sentiment_report?.bias_classification || rawReport.biasClassification || "Neutral"
      },
      evidence_based_contradictions: rawReport.evidence_based_contradictions || rawReport.contradictions || "",
      manupulation_techniques: rawReport.manupulation_techniques || rawReport.manipulationTechniques || [],
      Model_score: {
        Confidence_score: rawReport.Model_score?.Confidence_score || rawReport.confidenceScore || 82,
        Key_features_influencing_decision: rawReport.Model_score?.Key_features_influencing_decision || rawReport.keyFeatures || ""
      },
      general_overview: rawReport.general_overview || rawReport.overview || "",
      tools_used: rawReport.tools_used || rawReport.toolsUsed || []
    };

    const rawMetadata = payload?.data?.metadata;
    const structuredMetadata: ReportMetadata | null = rawMetadata
      ? {
          author_credibility_score: rawMetadata.author_credibility_score ?? rawMetadata.authorCredScore,
          source_reliability_score: rawMetadata.source_reliability_score ?? rawMetadata.sourceReliabilityScore,
          confidence_score: rawMetadata.confidence_score ?? rawMetadata.confidenceScore,
          generated_at: rawMetadata.generated_at,
          processing_time: typeof rawMetadata.processing_time === 'number' ? rawMetadata.processing_time : undefined,
          query: rawMetadata.query,
          response_type: rawMetadata.response_type,
          user_type: rawMetadata.user_type,
          sources_analyzed: typeof rawMetadata.sources_analyzed === 'number' ? rawMetadata.sources_analyzed : undefined,
          tools_used: Array.isArray(rawMetadata.tools_used) ? rawMetadata.tools_used : undefined,
          record_id: rawMetadata.record_id,
        }
      : null;
    
    console.log('Structured response:', structuredData, structuredMetadata);
    return {
      report: structuredData,
      metadata: structuredMetadata,
      message: payload?.message,
    };
  } catch (error) {
    console.error('Error generating report:', error);
    const message = error instanceof Error ? error.message : 'Unable to generate report.';
    throw new Error(message);
  }
};

// Legacy function for backward compatibility
export const analyzeContent = async (query: string, userType: 'normal' | 'journalist'): Promise<AnalysisResponse> => {
  if (userType === 'journalist') {
    const result = await generateReport(query, userType);
    return result.report;
  } else {
    return generateAnalysis(query);
  }
};

// Mock data fallbacks
const getMockArticles = (limit: number): Article[] => {
  const mockArticles = [
    {
      id: '1',
      title: 'Climate Change Impacts on Global Economy',
      description: 'Analysis of economic effects from climate change across different sectors',
      credibilityScore: 87,
      category: 'Sustainability',
      source: 'Environmental Research Institute'
    },
    {
      id: '2',
      title: 'Political Trends in Democratic Institutions',
      description: 'Examining shifts in democratic participation and institutional trust',
      credibilityScore: 75,
      category: 'Politics',
      source: 'Political Science Quarterly'
    },
    {
      id: '3',
      title: 'Technology\'s Role in Modern Education',
      description: 'How digital transformation is reshaping learning environments',
      credibilityScore: 92,
      category: 'Academic',
      source: 'Educational Technology Review'
    },
    {
      id: '4',
      title: 'Global Sports Industry Financial Analysis',
      description: 'Economic trends and market dynamics in professional sports',
      credibilityScore: 68,
      category: 'Sports',
      source: 'Sports Business Journal'
    },
    {
      id: '5',
      title: 'Luxury Market Consumer Behavior Study',
      description: 'Understanding purchasing patterns in high-end consumer markets',
      credibilityScore: 81,
      category: 'Worlds of Luxury',
      source: 'Luxury Market Research'
    }
  ];
  
  return mockArticles.slice(0, limit);
};

