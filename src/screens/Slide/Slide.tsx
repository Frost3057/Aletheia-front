import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { fetchArticles, generateAnalysis, generateReport, Article } from "../../services/api";

export type UserType = "normal" | "journalist";

interface SlideProps {
  onSearchClick?: (query: string, userType: UserType) => void;
}

// Normal user simplified data - will be replaced by API data
const normalUserDataTemplate = {
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

export const Slide = ({ onSearchClick }: SlideProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userType, setUserType] = useState<UserType>("normal");
  const [showResponse, setShowResponse] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  // Fetch articles on component mount
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await fetchArticles(5);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleSearchClick = async () => {
    if (searchQuery.trim()) {
      if (userType === "normal") {
        // For normal users, show response below on same page using /generate endpoint
        setAnalysisLoading(true);
        try {
          const analysis = await generateAnalysis(searchQuery);
          setAnalysisData(analysis);
          setShowResponse(true);
        } catch (error) {
          console.error('Error generating analysis:', error);
          // Fallback to template data
          setAnalysisData(normalUserDataTemplate);
          setShowResponse(true);
        } finally {
          setAnalysisLoading(false);
        }
      } else if (userType === "journalist" && onSearchClick) {
        // For journalists, navigate to detailed report page using /generate-report endpoint
        onSearchClick(searchQuery, userType);
      }
    }
  };
  const navigationCategories = [
    "Opinion",
    "Business Trends", 
    "Politics",
    "Sports",
    "Sustainability",
    "Academic",
    "Worlds of Luxury",
    "Performance",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h1 
              className="text-black"
              style={{
                fontFamily: 'Hubot Sans SemiCondensed, sans-serif',
                fontWeight: 600,
                fontStyle: 'italic',
                fontSize: '64px',
                lineHeight: '1.1',
                letterSpacing: '0%',
                color: '#212529'
              }}
            >
              Aletheia
            </h1>
          </div>
          
          <div className="flex items-center gap-6 flex-shrink-0">
            <h2 
              className="text-black text-right max-w-sm"
              style={{
                fontFamily: 'Hubot Sans SemiExpanded, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '1.2',
                letterSpacing: '0%',
                color: '#000000'
              }}
            >
              Navigating a World of Shifting Trends And Traditions
            </h2>
            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 rounded-full bg-green-50 border border-green-200">
              <svg width="32" height="32" viewBox="0 0 202 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1017 137.212C14.2889 130.62 24.3651 118.704 43.1622 106.986" stroke="#46E556" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M144.648 63.6906C166.308 59.0582 181.689 59.2042 184.502 65.7975" stroke="#46E556" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M100.802 159.404C132.779 159.404 158.701 133.482 158.701 101.505C158.701 69.5281 132.779 43.6057 100.802 43.6057C68.8252 43.6057 42.9028 69.5281 42.9028 101.505C42.9028 133.482 68.8252 159.404 100.802 159.404Z" stroke="#212529" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M80.6029 100.418C88.7625 100.418 95.3772 93.8035 95.3772 85.6439C95.3772 77.4843 88.7625 70.8696 80.6029 70.8696C72.4433 70.8696 65.8286 77.4843 65.8286 85.6439C65.8286 93.8035 72.4433 100.418 80.6029 100.418Z" stroke="#212529" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M126.956 85.6434C131.036 85.6434 134.344 82.3361 134.344 78.2563C134.344 74.1765 131.036 70.8691 126.956 70.8691C122.877 70.8691 119.569 74.1765 119.569 78.2563C119.569 82.3361 122.877 85.6434 126.956 85.6434Z" stroke="#212529" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M108.274 147.853C111.175 147.853 113.527 145.501 113.527 142.6C113.527 139.699 111.175 137.346 108.274 137.346C105.372 137.346 103.02 139.699 103.20 142.6C103.20 145.501 105.372 147.853 108.274 147.853Z" stroke="#212529" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.1045 137.214C21.8919 148.44 63.2463 141.552 109.474 121.832C115.812 119.13 121.912 116.322 127.705 113.469" stroke="#46E556" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M145.157 104.197C171.665 89.0017 187.936 73.8416 184.502 65.797" stroke="#46E556" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M136.482 118.814C141.939 118.814 146.362 114.391 146.362 108.934C146.362 103.477 141.939 99.0537 136.482 99.0537C131.025 99.0537 126.602 103.477 126.602 108.934C126.602 114.391 131.025 118.814 136.482 118.814Z" stroke="#46E556" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-1 mb-6 w-full">
          {/* Home bar */}
          <div 
            className="flex items-center justify-between w-full"
            style={{
              border: '2px solid #212529',
              height: '50px',
              padding: '0 20px'
            }}
          >
            <span 
              className="text-black"
              style={{
                fontFamily: 'Hubot Sans, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.4',
                color: '#212529'
              }}
            >
              Home
            </span>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2517 24.2714C14.9124 24.2714 17.3659 23.4193 19.3733 21.9989L26.9251 29.4792C27.2756 29.8264 27.7377 30 28.2315 30C29.2671 30 30 29.2109 30 28.2009C30 27.7275 29.8407 27.2699 29.4902 26.9385L21.9862 19.4897C23.5635 17.4382 24.5035 14.8974 24.5035 12.1357C24.5035 5.46028 18.991 0 12.2517 0C5.52841 0 0 5.4445 0 12.1357C0 18.8112 5.51248 24.2714 12.2517 24.2714ZM12.2517 21.6518C6.99416 21.6518 2.64472 17.3435 2.64472 12.1357C2.64472 6.92793 6.99416 2.61967 12.2517 2.61967C17.5093 2.61967 21.8587 6.92793 21.8587 12.1357C21.8587 17.3435 17.5093 21.6518 12.2517 21.6518Z" fill="#212529"/>
              </svg>
              <span 
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '1.4',
                  color: '#212529'
                }}
              >
                What are you looking for ?
              </span>
            </div>
          </div>

          {/* Categories bar */}
          <div 
            className="flex items-center w-full"
            style={{
              border: '2px solid #212529',
              height: '50px',
              padding: '0 20px'
            }}
          >
            <div 
              className="flex flex-wrap gap-2 w-full"
              style={{
                fontFamily: 'Hubot Sans, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '1.4',
                color: '#212529'
              }}
            >
              {navigationCategories.map((category, index) => (
                <React.Fragment key={category}>
                  <span className="hover:text-blue-600 cursor-pointer whitespace-nowrap">
                    {category}
                  </span>
                  {index < navigationCategories.length - 1 && (
                    <span className="text-gray-400">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mb-8">
          <h3 
            className="mb-4"
            style={{
              fontFamily: 'Hubot Sans Expanded, sans-serif',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '1.4',
              color: '#212529'
            }}
          >
            Trending Topics
          </h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div 
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontSize: '16px',
                  color: '#666666'
                }}
              >
                Loading trending articles...
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* First row - 2 large cards */}
                {articles.slice(0, 2).map((article, index) => (
              <Card key={index} className="border-none rounded-none overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="aspect-[4/3]"
                    style={{ background: '#D9D9D9' }}
                  />
                  <div className="p-3">
                    <h4 
                      style={{
                        fontFamily: 'Hubot Sans, sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '1.4',
                        color: '#212529',
                        marginBottom: '4px'
                      }}
                    >
                      {article.title}
                    </h4>
                    <p 
                      style={{
                        fontFamily: 'Hubot Sans, sans-serif',
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '1.4',
                        color: '#212529',
                        marginBottom: '8px'
                      }}
                    >
                      {article.description}
                    </p>
                    <div 
                      style={{
                        width: 'auto',
                        height: '28px',
                        background: article.credibilityScore >= 70 ? 'rgba(70, 229, 86, 0.2)' : 'rgba(229, 70, 70, 0.2)',
                        border: article.credibilityScore >= 70 ? '1px solid #46E556' : '1px solid #E54646',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        borderRadius: '4px'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Hubot Sans, sans-serif',
                          fontWeight: 400,
                          fontSize: '11px',
                          lineHeight: '1.4',
                          color: article.credibilityScore >= 70 ? '#007D0C' : '#7D0000'
                        }}
                      >
                        Credibility Score: {article.credibilityScore}% →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Second row - 3 smaller cards */}
            {articles.slice(2, 5).map((article, index) => (
              <Card key={index + 2} className="border-none rounded-none overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="aspect-[4/3]"
                    style={{ background: '#D9D9D9' }}
                  />
                  <div className="p-2">
                    <h4 
                      style={{
                        fontFamily: 'Hubot Sans, sans-serif',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '1.4',
                        color: '#212529',
                        marginBottom: '6px'
                      }}
                    >
                      {article.title}
                    </h4>
                    <div 
                      style={{
                        width: 'auto',
                        height: '24px',
                        background: article.credibilityScore >= 70 ? 'rgba(70, 229, 86, 0.2)' : article.credibilityScore >= 50 ? 'rgba(229, 218, 70, 0.2)' : 'rgba(229, 70, 70, 0.2)',
                        border: article.credibilityScore >= 70 ? '1px solid #46E556' : article.credibilityScore >= 50 ? '1px solid #E5E546' : '1px solid #E54646',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        borderRadius: '4px'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Hubot Sans, sans-serif',
                          fontWeight: 400,
                          fontSize: '10px',
                          lineHeight: '1.4',
                          color: article.credibilityScore >= 70 ? '#007D0C' : article.credibilityScore >= 50 ? '#7D7800' : '#7D0000'
                        }}
                      >
                        Credibility Score: {article.credibilityScore}% →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </>
        )}
        </div>

        {/* News Credibility Section */}
        <div className="text-center mb-16 mt-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 
              style={{
                fontFamily: 'Hubot Sans, sans-serif',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '1.4',
                color: '#212529'
              }}
            >
              News Credibility, Simplified.
            </h2>
            <div className="flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.9707 46.0294C44.0174 51.076 52.1995 51.076 57.2461 46.0294L70.5901 32.6854C75.6367 27.6388 75.6367 19.4567 70.5901 14.41C65.5434 9.36333 57.3613 9.36333 52.3146 14.41L38.9707 27.7539" stroke="#212529" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M46.0294 38.9705C40.9827 33.9239 32.8006 33.9239 27.7539 38.9705L14.41 52.3145C9.36333 57.3611 9.36333 65.5432 14.41 70.5899C19.4567 75.6366 27.6388 75.6366 32.6854 70.5899L46.0294 57.246" stroke="#46E556" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="w-full max-w-2xl mx-auto mb-6">
            <div className="flex items-center justify-center gap-2">
              <span 
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1.4',
                  color: '#666666',
                  marginRight: '12px'
                }}
              >
                I am a:
              </span>
              <button
                onClick={() => setUserType("normal")}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  userType === "normal" 
                    ? "shadow-md" 
                    : "hover:shadow-sm"
                }`}
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  background: userType === "normal" ? '#212529' : '#F8F9FA',
                  color: userType === "normal" ? '#FFFFFF' : '#212529',
                  border: `2px solid ${userType === "normal" ? '#212529' : '#E5E7EB'}`
                }}
              >
                General Reader
              </button>
              <button
                onClick={() => setUserType("journalist")}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  userType === "journalist" 
                    ? "shadow-md" 
                    : "hover:shadow-sm"
                }`}
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  background: userType === "journalist" ? '#212529' : '#F8F9FA',
                  color: userType === "journalist" ? '#FFFFFF' : '#212529',
                  border: `2px solid ${userType === "journalist" ? '#212529' : '#E5E7EB'}`
                }}
              >
                Journalist
              </button>
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto mb-4">
            <div 
              className="flex items-center gap-3 w-full cursor-text"
              style={{
                maxWidth: '600px',
                height: '48px',
                background: '#ECECEC',
                border: '2px solid #3E3E3E',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
                borderRadius: '4px',
                paddingLeft: '16px',
                margin: '0 auto'
              }}
              onClick={handleSearchClick}
            >
              <svg width="16" height="16" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2517 24.2714C14.9124 24.2714 17.3659 23.4193 19.3733 21.9989L26.9251 29.4792C27.2756 29.8264 27.7377 30 28.2315 30C29.2671 30 30 29.2109 30 28.2009C30 27.7275 29.8407 27.2699 29.4902 26.9385L21.9862 19.4897C23.5635 17.4382 24.5035 14.8974 24.5035 12.1357C24.5035 5.46028 18.991 0 12.2517 0C5.52841 0 0 5.4445 0 12.1357C0 18.8112 5.51248 24.2714 12.2517 24.2714ZM12.2517 21.6518C6.99416 21.6518 2.64472 17.3435 2.64472 12.1357C2.64472 6.92793 6.99416 2.61967 12.2517 2.61967C17.5093 2.61967 21.8587 6.92793 21.8587 12.1357C21.8587 17.3435 17.5093 21.6518 12.2517 21.6518Z" fill="#3E3E3E"/>
              </svg>
              <Input
                className="border-none bg-transparent focus-visible:ring-0 p-0 flex-1"
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: '14px',
                  lineHeight: '1.4',
                  color: '#3E3E3E'
                }}
                placeholder="Type your query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchClick();
                  }
                }}
              />
            </div>
          </div>

          <p 
            style={{
              fontFamily: 'Hubot Sans, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '1.4',
              color: '#212529'
            }}
          >
            Get an AI-powered Credibility Score for any headline, topic, or claim.
          </p>

          {/* Loading indicator for analysis */}
          {analysisLoading && (
            <div className="w-full max-w-4xl mx-auto mt-8 text-center">
              <div 
                className="p-6 rounded-lg"
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E5E5E5',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span 
                    style={{
                      fontFamily: 'Hubot Sans, sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#212529'
                    }}
                  >
                    Analyzing content...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Simplified Response for Normal Users */}
          {showResponse && userType === "normal" && analysisData && !analysisLoading && (
            <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
              {/* Overall Score Card */}
              <div 
                className="p-6 rounded-lg text-center"
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E5E5E5',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    color: '#46E556'
                  }}
                >
                  {Math.round((analysisData.author_cred_score + analysisData.source_reliablity_score) / 2)}
                </div>
                <div 
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#212529'
                  }}
                >
                  Overall Credibility Score
                </div>
                <div 
                  className="mt-2"
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#666666'
                  }}
                >
                  Based on source reliability and author credibility
                </div>
              </div>

              {/* Key Insights */}
              <div 
                className="p-6 rounded-lg"
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E5E5E5',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3 
                  className="mb-4"
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#212529'
                  }}
                >
                  Key Analysis
                </h3>
                
                <div className="space-y-4">
                  {/* Bias Classification */}
                  <div>
                    <div 
                      className="mb-2"
                      style={{
                        fontFamily: 'Hubot Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#212529'
                      }}
                    >
                      Bias Detection:
                    </div>
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-sm"
                      style={{
                        background: '#E0E7FF',
                        color: '#3730A3',
                        fontFamily: 'Hubot Sans, sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      {analysisData.Bias_sentiment_report.bias_classification}
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div>
                    <div 
                      className="mb-2"
                      style={{
                        fontFamily: 'Hubot Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#212529'
                      }}
                    >
                      AI Confidence:
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        style={{
                          fontFamily: 'Hubot Sans, sans-serif',
                          fontWeight: 600,
                          fontSize: '16px',
                          color: '#46E556'
                        }}
                      >
                        {analysisData.Model_score.Confidence_score}%
                      </div>
                      <div 
                        className="flex-1 h-2 rounded-full"
                        style={{ background: '#F3F4F6' }}
                      >
                        <div 
                          className="h-full rounded-full"
                          style={{
                            width: `${analysisData.Model_score.Confidence_score}%`,
                            background: '#46E556'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Overview */}
                  <div>
                    <div 
                      className="mb-2"
                      style={{
                        fontFamily: 'Hubot Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#212529'
                      }}
                    >
                      Summary:
                    </div>
                    <p 
                      style={{
                        fontFamily: 'Hubot Sans, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: '#374151'
                      }}
                    >
                      {analysisData.general_overview}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowResponse(false)}
                  className="px-6 py-2 rounded-lg text-sm transition-all hover:shadow-sm"
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 500,
                    background: '#F8F9FA',
                    color: '#212529',
                    border: '2px solid #E5E7EB'
                  }}
                >
                  Try Another Query
                </button>
                {onSearchClick && (
                  <button
                    onClick={() => {
                      setUserType("journalist");
                      onSearchClick(searchQuery, "journalist");
                    }}
                    className="px-6 py-2 rounded-lg text-sm transition-all hover:shadow-sm"
                    style={{
                      fontFamily: 'Hubot Sans, sans-serif',
                      fontWeight: 500,
                      background: '#212529',
                      color: '#FFFFFF',
                      border: '2px solid #212529'
                    }}
                  >
                    View Detailed Analysis
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Full Width */}
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
