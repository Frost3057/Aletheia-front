const API_BASE_URL = 'https://alethia-back.vercel.app';

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

// Fetch articles for homepage
export const fetchArticles = async (limit: number = 5): Promise<Article[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.articles || data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return mock data as fallback
    return getMockArticles(limit);
  }
};

// Analyze content
export const analyzeContent = async (query: string, userType: 'normal' | 'journalist'): Promise<AnalysisResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: query,
        user_type: userType
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing content:', error);
    // Return mock data as fallback
    return getMockAnalysis(userType);
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

const getMockAnalysis = (userType: 'normal' | 'journalist'): AnalysisResponse => {
  if (userType === 'normal') {
    return {
      author_cred_score: 75,
      source_reliablity_score: 68,
      citations: [
        "Climate Change 2023: Synthesis Report. IPCC, 2023.",
        "Global Economic Impact of Climate Change. World Bank, 2022.",
        "McKinsey Global Institute. Climate risk and response in Asia. 2023."
      ],
      Bias_sentiment_report: {
        sentiment_distribution: ["Neutral", "Concern"],
        bias_classification: "Moderate Left-leaning"
      },
      evidence_based_contradictions: "The article presents strong data on climate impacts but may underestimate technological solutions that could mitigate some negative effects.",
      manupulation_techniques: [
        "Cherry-picking of data points",
        "Appeal to fear scenarios"
      ],
      Model_score: {
        Confidence_score: 82,
        Key_features_influencing_decision: "High-quality scientific citations and transparent methodology, but limited perspective on solutions."
      },
      general_overview: "This analysis shows the content has strong factual grounding with credible sources, though it shows a moderate bias toward emphasizing negative impacts while underemphasizing adaptive solutions.",
      tools_used: ["Sentiment Analysis", "Bias Detection", "Fact Verification"]
    };
  } else {
    // Journalist detailed data
    return {
      author_cred_score: 75,
      source_reliablity_score: 68,
      citations: [
        "Climate Change 2023: Synthesis Report. IPCC, 2023. https://www.ipcc.ch/report/ar6/syr/",
        "Global Economic Impact of Climate Change. World Bank, 2022. https://www.worldbank.org/climate-report",
        "McKinsey Global Institute. Climate risk and response in Asia. 2023."
      ],
      Bias_sentiment_report: {
        sentiment_distribution: ["Neutral", "Concern", "Urgency"],
        bias_classification: "Moderate Left-leaning"
      },
      evidence_based_contradictions: "While the article presents compelling data on climate impacts, it understates the role of technological innovation in mitigation efforts. Recent studies show renewable energy costs have dropped 70% faster than predicted, which contradicts the pessimistic timeline presented.",
      manupulation_techniques: [
        "Cherry-picking of data points",
        "Appeal to fear through catastrophic scenarios", 
        "False dichotomy between economic growth and environmental protection",
        "Selective citation of studies"
      ],
      Model_score: {
        Confidence_score: 82,
        Key_features_influencing_decision: "High-quality scientific citations, peer-reviewed sources, transparent methodology, but limited perspective on technological solutions and economic adaptation strategies."
      },
      general_overview: "This analysis examines claims about climate change impacts on the global economy. The content demonstrates strong factual grounding with credible scientific sources, though it shows a moderate bias toward emphasizing negative impacts while underemphasizing adaptive capacity and technological solutions. The author's credentials are solid, and the source reliability is above average.",
      tools_used: ["Sentiment Analysis", "Bias Detection", "Fact Verification", "Source Credibility Assessment", "Citation Analysis"]
    };
  }
};