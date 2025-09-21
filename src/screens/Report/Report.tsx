export type UserType = "normal" | "journalist";

interface ReportProps {
  userType?: UserType;
}

// Mock data structure for Normal Users (simplified)
const normalUserData = {
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

// Mock data structure for Journalists (detailed)
const journalistData = {
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

// Helper function for bias color coding
const getBiasColor = (bias: string): string => {
  if (bias.toLowerCase().includes('left')) return '#4F46E5';
  if (bias.toLowerCase().includes('right')) return '#DC2626';
  if (bias.toLowerCase().includes('neutral')) return '#059669';
  return '#6B7280';
};

export const Report = ({ userType = "normal" }: ReportProps): JSX.Element => {
  // Select appropriate data based on user type
  const data = userType === "journalist" ? journalistData : normalUserData;
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
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
        </div>

        {/* Report Analysis Content */}
        <div className="space-y-6">
          {/* Executive Summary - Top Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Overall Score */}
            <div 
              className="p-4 rounded-lg text-center"
              style={{
                background: '#FFFFFF',
                border: '2px solid #E5E5E5',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div 
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  color: '#46E556'
                }}
              >
                {Math.round((data.author_cred_score + data.source_reliablity_score) / 2)}
              </div>
              <div 
                style={{
                  fontFamily: 'Hubot Sans SemiExpanded, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '1.2',
                  letterSpacing: '0%',
                  color: '#666666'
                }}
              >
                Overall Score
              </div>
            </div>

            {/* Author Score */}
            <div 
              className="p-4 rounded-lg text-center"
              style={{
                background: '#FFFFFF',
                border: '2px solid #E5E5E5',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div 
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  color: data.author_cred_score >= 70 ? '#46E556' : data.author_cred_score >= 40 ? '#FFA500' : '#FF4444'
                }}
              >
                {data.author_cred_score}
              </div>
              <div 
                style={{
                  fontFamily: 'Hubot Sans SemiExpanded, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '1.2',
                  letterSpacing: '0%',
                  color: '#666666'
                }}
              >
                Author Credibility
              </div>
            </div>

            {/* Source Score */}
            <div 
              className="p-4 rounded-lg text-center"
              style={{
                background: '#FFFFFF',
                border: '2px solid #E5E5E5',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div 
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  color: data.source_reliablity_score >= 70 ? '#46E556' : data.source_reliablity_score >= 40 ? '#FFA500' : '#FF4444'
                }}
              >
                {data.source_reliablity_score}
              </div>
              <div 
                style={{
                  fontFamily: 'Hubot Sans SemiExpanded, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '1.2',
                  letterSpacing: '0%',
                  color: '#666666'
                }}
              >
                Source Reliability
              </div>
            </div>

            {/* Confidence */}
            <div 
              className="p-4 rounded-lg text-center"
              style={{
                background: '#FFFFFF',
                border: '2px solid #E5E5E5',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div 
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  color: '#4F46E5'
                }}
              >
                {data.Model_score.Confidence_score}%
              </div>
              <div 
                style={{
                  fontFamily: 'Hubot Sans SemiExpanded, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '1.2',
                  letterSpacing: '0%',
                  color: '#666666'
                }}
              >
                AI Confidence
              </div>
            </div>
          </div>

          {/* Key Findings Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bias & Sentiment Analysis - Complete */}
            <div 
              className="p-6 rounded-lg"
              style={{
                background: '#FFFFFF',
                border: '2px solid #E5E5E5',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.09 8.26L22 9.27L17 14.14L18.18 22.02L12 18.77L5.82 22.02L7 14.14L2 9.27L9.91 8.26L12 2Z" fill="#4F46E5"/>
                  </svg>
                </div>
                <h3 
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: '24px',
                    lineHeight: '1.4',
                    letterSpacing: '0%',
                    color: '#212529'
                  }}
                >
                  Bias & Sentiment Report
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 
                    style={{
                      fontFamily: 'Hubot Sans SemiExpanded, sans-serif',
                      fontWeight: 600,
                      fontSize: '16px',
                      lineHeight: '1.2',
                      letterSpacing: '0%',
                      color: '#212529',
                      marginBottom: '8px'
                    }}
                  >
                    Bias Classification
                  </h4>
                  <span 
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      background: getBiasColor(data.Bias_sentiment_report.bias_classification),
                      color: '#FFFFFF',
                      fontFamily: 'Hubot Sans, sans-serif',
                      fontWeight: 500
                    }}
                  >
                    {data.Bias_sentiment_report.bias_classification}
                  </span>
                </div>

                <div>
                  <h4 
                    style={{
                      fontFamily: 'Hubot Sans SemiExpanded, sans-serif',
                      fontWeight: 600,
                      fontSize: '16px',
                      lineHeight: '1.2',
                      letterSpacing: '0%',
                      color: '#212529',
                      marginBottom: '8px'
                    }}
                  >
                    Sentiment Distribution
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.Bias_sentiment_report.sentiment_distribution.map((sentiment: string, index: number) => (
                      <span 
                        key={index}
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          background: '#F0F0F0',
                          color: '#212529',
                          fontFamily: 'Hubot Sans, sans-serif',
                          fontWeight: 400
                        }}
                      >
                        {sentiment}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Model Scores - Complete */}
            <div 
              className="p-6 rounded-lg"
              style={{
                background: '#FFFFFF',
                border: '2px solid #E5E5E5',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 2C8.67 2 8 2.67 8 3.5V5L7 7V21C7 21.55 7.45 22 8 22H16C16.55 22 17 21.55 17 21V7L16 5V3.5C16 2.67 15.33 2 14.5 2H9.5ZM10 4H14V5H10V4ZM10 8H14V9H10V8ZM10 11H14V12H10V11ZM10 14H14V15H10V14Z" fill="#7C3AED"/>
                  </svg>
                </div>
                <h3 
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: '24px',
                    lineHeight: '1.4',
                    letterSpacing: '0%',
                    color: '#212529'
                  }}
                >
                  Model Analysis
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 
                    style={{
                      fontFamily: 'Hubot Sans, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '1.4',
                      color: '#212529',
                      marginBottom: '8px'
                    }}
                  >
                    Confidence Score
                  </h4>
                  <div className="flex items-center gap-3">
                    <div 
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: 'Hubot Sans, sans-serif',
                        color: data.Model_score.Confidence_score >= 70 ? '#46E556' : data.Model_score.Confidence_score >= 40 ? '#FFA500' : '#FF4444'
                      }}
                    >
                      {data.Model_score.Confidence_score}%
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{
                          width: `${data.Model_score.Confidence_score}%`,
                          background: data.Model_score.Confidence_score >= 70 ? '#46E556' : data.Model_score.Confidence_score >= 40 ? '#FFA500' : '#FF4444'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 
                    style={{
                      fontFamily: 'Hubot Sans, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '1.4',
                      color: '#212529',
                      marginBottom: '8px'
                    }}
                  >
                    Key Features
                  </h4>
                  <p 
                    style={{
                      fontFamily: 'Hubot Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '1.4',
                      letterSpacing: '0%',
                      color: '#666666'
                    }}
                  >
                    {data.Model_score.Key_features_influencing_decision.length > 100 ? 
                      data.Model_score.Key_features_influencing_decision.substring(0, 100) + '...' : 
                      data.Model_score.Key_features_influencing_decision}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence-Based Contradictions - Full Section */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: '#FFFFFF',
              border: '2px solid #E5E5E5',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '1.4',
                  letterSpacing: '0%',
                  color: '#212529'
                }}
              >
                Evidence-Based Contradictions
              </h3>
            </div>
            
            <p 
              style={{
                fontFamily: 'Hubot Sans, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.6',
                letterSpacing: '0%',
                color: '#212529'
              }}
            >
              {data.evidence_based_contradictions}
            </p>
          </div>

          {/* Manipulation Techniques - Enhanced */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: '#FFFFFF',
              border: '2px solid #E5E5E5',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '1.4',
                  letterSpacing: '0%',
                  color: '#212529'
                }}
              >
                Manipulation Techniques Detected
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.manupulation_techniques.map((technique: string, index: number) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA'
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                  <span 
                    style={{
                      fontFamily: 'Hubot Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '1.5',
                      color: '#3E3E3E'
                    }}
                  >
                    {technique}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Citations - Enhanced */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: '#FFFFFF',
              border: '2px solid #E5E5E5',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '1.4',
                  letterSpacing: '0%',
                  color: '#212529'
                }}
              >
                Citations & Sources
              </h3>
            </div>
            
            <div className="space-y-3">
              {data.citations.map((citation: string, index: number) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg"
                  style={{
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        background: '#059669',
                        color: '#FFFFFF',
                        fontFamily: 'Hubot Sans, sans-serif',
                        minWidth: '24px',
                        textAlign: 'center'
                      }}
                    >
                      {index + 1}
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Hubot Sans, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: '#3E3E3E'
                      }}
                    >
                      {citation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Summary Dashboard */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: '#FFFFFF',
              border: '2px solid #E5E5E5',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '1.4',
                  letterSpacing: '0%',
                  color: '#212529'
                }}
              >
                Analysis Summary
              </h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    color: '#059669'
                  }}
                >
                  {data.citations.length}
                </div>
                <div 
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '1.4',
                    letterSpacing: '0%',
                    color: '#666666'
                  }}
                >
                  Citations
                </div>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    color: '#4F46E5'
                  }}
                >
                  {data.tools_used.length}
                </div>
                <div 
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '1.4',
                    letterSpacing: '0%',
                    color: '#666666'
                  }}
                >
                  Tools Used
                </div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    color: '#DC2626'
                  }}
                >
                  {data.manupulation_techniques.length}
                </div>
                <div 
                  style={{
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '1.4',
                    letterSpacing: '0%',
                    color: '#666666'
                  }}
                >
                  Issues Found
                </div>
              </div>
            </div>
          </div>

          {/* General Overview */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: '#F8F9FA',
              border: '2px solid #E5E5E5',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 
                style={{
                  fontFamily: 'Hubot Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '1.4',
                  letterSpacing: '0%',
                  color: '#212529'
                }}
              >
                General Overview
              </h3>
            </div>
            
            <p 
              style={{
                fontFamily: 'Hubot Sans, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.6',
                letterSpacing: '0%',
                color: '#212529'
              }}
            >
              {data.general_overview}
            </p>
          </div>

          {/* Tools Used */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: '#FFFFFF',
              border: '2px solid #E5E5E5',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h3 
              style={{
                fontFamily: 'Hubot Sans, sans-serif',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '1.4',
                letterSpacing: '0%',
                color: '#212529',
                marginBottom: '16px'
              }}
            >
              Analysis Tools Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.tools_used.map((tool: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-2 rounded-lg text-sm"
                  style={{
                    background: '#E5E7EB',
                    color: '#374151',
                    fontFamily: 'Hubot Sans, sans-serif',
                    fontWeight: 500
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
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
