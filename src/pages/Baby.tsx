import { useState } from 'react';
import { Link } from 'react-router-dom';

interface BabyTip {
  month: number;
  title: string;
  tips: string[];
  references: Array<{
    title: string;
    url: string;
    type: 'article' | 'video';
  }>;
}

const babyTips: BabyTip[] = [
  {
    month: 1,
    title: "Newborn Essentials (Month 1)",
    tips: [
      "Establish a feeding routine - breastfeed on demand or every 2-3 hours",
      "Practice skin-to-skin contact for bonding and temperature regulation",
      "Change diapers frequently to prevent diaper rash",
      "Learn to recognize hunger, tiredness, and discomfort cues",
      "Ensure proper burping after feeds to prevent gas and spit-up",
      "Create a safe sleep environment - back sleeping only",
      "Monitor weight gain and wet/dirty diapers",
      "Keep umbilical cord stump clean and dry until it falls off"
    ],
    references: [
      {
        title: "Newborn Care Basics - AAP",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/default.aspx",
        type: "article"
      },
      {
        title: "First Month with Your Newborn",
        url: "https://www.youtube.com/watch?v=8VzQXMj9Z8E",
        type: "video"
      }
    ]
  },
  {
    month: 2,
    title: "Growing and Developing (Month 2)",
    tips: [
      "Continue with frequent feedings and monitor growth",
      "Introduce short periods of tummy time for neck strength",
      "Respond quickly to cries to build trust",
      "Start tracking developmental milestones",
      "Maintain consistent sleep schedule",
      "Begin social smiling and eye contact",
      "Consider introducing a pacifier if breastfeeding is established",
      "Keep vaccinations up to date"
    ],
    references: [
      {
        title: "2 Month Old Baby Development",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/2-Month-Old-Baby-Development.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 3,
    title: "Social Butterfly (Month 3)",
    tips: [
      "Baby should be smiling and cooing regularly",
      "Practice reaching and grasping for toys",
      "Establish a bedtime routine",
      "Continue tummy time and supervised play",
      "Monitor for signs of colic or reflux",
      "Introduce simple games and interactions",
      "Track sleep patterns (aiming for 14-17 hours total)",
      "Consider starting solid foods around 6 months"
    ],
    references: [
      {
        title: "3 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/3-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 4,
    title: "Rolling Over (Month 4)",
    tips: [
      "Many babies start rolling over from tummy to back",
      "Increased babbling and vocalization",
      "Better hand-eye coordination",
      "Start solid foods if pediatrician recommends",
      "Practice sitting with support",
      "Continue developmental screenings",
      "Monitor for teething signs",
      "Establish consistent nap schedule"
    ],
    references: [
      {
        title: "4 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/4-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 5,
    title: "Sitting Up (Month 5)",
    tips: [
      "Most babies can sit with support",
      "Increased interest in self-feeding",
      "More complex babbling and sounds",
      "Continue introducing new foods",
      "Practice pulling to stand",
      "Monitor for separation anxiety",
      "Ensure safe exploration environment",
      "Regular check-ups and vaccinations"
    ],
    references: [
      {
        title: "5 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/5-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 6,
    title: "First Solids (Month 6)",
    tips: [
      "Start solid foods (rice cereal, pureed fruits/vegetables)",
      "Continue breastfeeding or formula",
      "Practice self-feeding with finger foods",
      "Increased mobility - crawling may begin",
      "First teeth may appear",
      "More interactive play",
      "Sleep regression possible",
      "Monitor for food allergies"
    ],
    references: [
      {
        title: "Starting Solid Foods",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/Starting-Solid-Foods.aspx",
        type: "article"
      },
      {
        title: "6 Month Old Baby Development",
        url: "https://www.youtube.com/watch?v=some-video-id",
        type: "video"
      }
    ]
  },
  {
    month: 7,
    title: "Crawling Explorer (Month 7)",
    tips: [
      "Many babies start crawling",
      "Increased independence and exploration",
      "More words and gestures",
      "Continue expanding food variety",
      "Practice standing with support",
      "Monitor for stranger anxiety",
      "Ensure baby-proofed environment",
      "Regular dental check-ups"
    ],
    references: [
      {
        title: "7 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/7-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 8,
    title: "Standing Tall (Month 8)",
    tips: [
      "Pulling to stand and cruising along furniture",
      "First words may appear",
      "Advanced finger foods and self-feeding",
      "Increased separation anxiety",
      "Monitor for ear infections",
      "Continue developmental milestones",
      "Practice following simple commands",
      "Safe exploration supervision"
    ],
    references: [
      {
        title: "8 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/8-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 9,
    title: "First Steps (Month 9)",
    tips: [
      "Some babies take first independent steps",
      "Increased vocabulary and understanding",
      "More complex play and problem-solving",
      "Continue expanding diet",
      "Monitor for iron deficiency",
      "Practice pointing and gesturing",
      "Establish consistent routines",
      "Regular health check-ups"
    ],
    references: [
      {
        title: "9 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/9-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 10,
    title: "Toddler in Training (Month 10)",
    tips: [
      "Improved walking and climbing",
      "More words and simple sentences",
      "Independent play and exploration",
      "Finger foods and self-feeding mastery",
      "Monitor for tantrums and frustration",
      "Continue safety supervision",
      "Practice sharing and turn-taking",
      "Regular dental care"
    ],
    references: [
      {
        title: "10 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/10-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 11,
    title: "Almost One (Month 11)",
    tips: [
      "Confident walking and running",
      "Increased independence and opinions",
      "More complex communication",
      "Table foods and family meals",
      "Monitor for developmental delays",
      "Practice following directions",
      "Establish healthy sleep habits",
      "Prepare for first birthday"
    ],
    references: [
      {
        title: "11 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/11-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 12,
    title: "First Birthday (Month 12)",
    tips: [
      "Walking independently",
      "50+ words vocabulary",
      "Pointing and following gestures",
      "Complete transition to table foods",
      "Monitor growth and development",
      "Celebrate first birthday milestone",
      "Continue regular check-ups",
      "Prepare for toddler years"
    ],
    references: [
      {
        title: "12 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/12-Month-Old.aspx",
        type: "article"
      },
      {
        title: "First Year Milestones",
        url: "https://www.youtube.com/watch?v=some-video-id",
        type: "video"
      }
    ]
  },
  {
    month: 13,
    title: "Toddler Phase Begins (Month 13)",
    tips: [
      "Increased independence and exploration",
      "More complex language development",
      "Testing boundaries and limits",
      "Continue healthy eating habits",
      "Monitor for speech delays",
      "Establish consistent discipline",
      "Encourage imaginative play",
      "Regular health screenings"
    ],
    references: [
      {
        title: "13-18 Month Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/default.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 14,
    title: "Language Explosion (Month 14)",
    tips: [
      "Rapid vocabulary growth",
      "Following simple commands",
      "Increased physical coordination",
      "Monitor for iron-rich diet",
      "Practice social skills",
      "Continue safety awareness",
      "Establish nap routines",
      "Regular dental visits"
    ],
    references: [
      {
        title: "14 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/14-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 15,
    title: "Little Scientist (Month 15)",
    tips: [
      "Curiosity and experimentation",
      "Improved fine motor skills",
      "More complex play patterns",
      "Continue balanced nutrition",
      "Monitor for developmental milestones",
      "Practice patience and waiting",
      "Encourage problem-solving",
      "Regular check-ups"
    ],
    references: [
      {
        title: "15 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/15-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 16,
    title: "Independent Explorer (Month 16)",
    tips: [
      "Increased independence",
      "Better communication skills",
      "Advanced motor coordination",
      "Monitor portion sizes",
      "Practice self-help skills",
      "Continue safety education",
      "Establish bedtime routines",
      "Regular health monitoring"
    ],
    references: [
      {
        title: "16 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/16-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 17,
    title: "Terrific Twos Preview (Month 17)",
    tips: [
      "Strong opinions and preferences",
      "Advanced language skills",
      "Complex play scenarios",
      "Continue healthy eating habits",
      "Monitor for speech clarity",
      "Practice emotional regulation",
      "Encourage creativity",
      "Regular screenings"
    ],
    references: [
      {
        title: "17 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/17-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 18,
    title: "Toddler Independence (Month 18)",
    tips: [
      "Major independence milestone",
      "200+ word vocabulary",
      "Advanced pretend play",
      "Complete cup and spoon use",
      "Monitor for behavioral issues",
      "Practice sharing and cooperation",
      "Continue safety awareness",
      "Prepare for preschool"
    ],
    references: [
      {
        title: "18 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/18-Month-Old.aspx",
        type: "article"
      },
      {
        title: "18 Month Check-up",
        url: "https://www.youtube.com/watch?v=some-video-id",
        type: "video"
      }
    ]
  },
  {
    month: 19,
    title: "Growing Personality (Month 19)",
    tips: [
      "Unique personality development",
      "Complex sentence formation",
      "Advanced motor skills",
      "Monitor nutrition variety",
      "Practice conflict resolution",
      "Continue developmental tracking",
      "Establish healthy habits",
      "Regular health visits"
    ],
    references: [
      {
        title: "19 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/19-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 20,
    title: "Little Adult (Month 20)",
    tips: [
      "Increased adult-like behaviors",
      "Advanced communication",
      "Complex problem-solving",
      "Continue balanced diet",
      "Monitor for learning disabilities",
      "Practice social skills",
      "Encourage independence",
      "Regular check-ups"
    ],
    references: [
      {
        title: "20 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/20-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 21,
    title: "Two Years Approaching (Month 21)",
    tips: [
      "Near two-year-old capabilities",
      "Advanced language skills",
      "Complex emotional responses",
      "Monitor portion control",
      "Practice self-regulation",
      "Continue skill development",
      "Establish routines",
      "Health monitoring"
    ],
    references: [
      {
        title: "21 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/21-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 22,
    title: "Terrific Twos Beginning (Month 22)",
    tips: [
      "Testing boundaries actively",
      "Rapid language development",
      "Increased physical abilities",
      "Continue healthy nutrition",
      "Monitor behavioral changes",
      "Practice positive discipline",
      "Encourage exploration",
      "Regular screenings"
    ],
    references: [
      {
        title: "22 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/22-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 23,
    title: "Almost Two (Month 23)",
    tips: [
      "Near complete sentences",
      "Advanced motor coordination",
      "Complex social interactions",
      "Monitor for allergies",
      "Practice patience training",
      "Continue developmental progress",
      "Establish healthy sleep",
      "Regular health visits"
    ],
    references: [
      {
        title: "23 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/23-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 24,
    title: "Two Years Old (Month 24)",
    tips: [
      "Major developmental milestone",
      "Complete sentences common",
      "Advanced pretend play",
      "Monitor growth spurts",
      "Practice toilet training",
      "Continue social development",
      "Establish independence",
      "Celebrate achievements"
    ],
    references: [
      {
        title: "24 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/24-Month-Old.aspx",
        type: "article"
      },
      {
        title: "Two Year Old Milestones",
        url: "https://www.youtube.com/watch?v=some-video-id",
        type: "video"
      }
    ]
  },
  {
    month: 25,
    title: "Beyond Two (Month 25)",
    tips: [
      "Continued language explosion",
      "Advanced problem-solving",
      "Complex emotional regulation",
      "Continue balanced nutrition",
      "Monitor for developmental issues",
      "Practice advanced social skills",
      "Encourage creativity",
      "Regular health monitoring"
    ],
    references: [
      {
        title: "25-30 Month Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/25-30-Months.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 26,
    title: "Growing Confidently (Month 26)",
    tips: [
      "Increased self-confidence",
      "Advanced communication",
      "Complex play patterns",
      "Monitor healthy eating",
      "Practice self-help skills",
      "Continue safety education",
      "Establish routines",
      "Regular check-ups"
    ],
    references: [
      {
        title: "26 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/26-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 27,
    title: "Little Thinker (Month 27)",
    tips: [
      "Advanced reasoning skills",
      "Complex language use",
      "Increased independence",
      "Continue nutritional variety",
      "Monitor for learning styles",
      "Practice conflict resolution",
      "Encourage curiosity",
      "Health screenings"
    ],
    references: [
      {
        title: "27 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/27-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 28,
    title: "Almost Three (Month 28)",
    tips: [
      "Near three-year capabilities",
      "Advanced social skills",
      "Complex problem-solving",
      "Monitor portion sizes",
      "Practice emotional control",
      "Continue skill mastery",
      "Establish healthy habits",
      "Regular monitoring"
    ],
    references: [
      {
        title: "28 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/28-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 29,
    title: "Terrific Threes Preview (Month 29)",
    tips: [
      "Testing limits actively",
      "Advanced language skills",
      "Complex imaginative play",
      "Continue healthy nutrition",
      "Monitor behavioral patterns",
      "Practice positive reinforcement",
      "Encourage exploration",
      "Regular health visits"
    ],
    references: [
      {
        title: "29 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/29-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 30,
    title: "Three Years Old (Month 30)",
    tips: [
      "Major developmental milestone",
      "Complete understanding",
      "Advanced social interactions",
      "Monitor growth and health",
      "Practice advanced skills",
      "Continue developmental tracking",
      "Establish preschool readiness",
      "Celebrate progress"
    ],
    references: [
      {
        title: "30 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/30-Month-Old.aspx",
        type: "article"
      },
      {
        title: "Three Year Old Milestones",
        url: "https://www.youtube.com/watch?v=some-video-id",
        type: "video"
      }
    ]
  },
  {
    month: 31,
    title: "Growing Beyond (Month 31)",
    tips: [
      "Continued skill refinement",
      "Advanced communication",
      "Complex learning abilities",
      "Continue balanced nutrition",
      "Monitor for special needs",
      "Practice advanced social skills",
      "Encourage independence",
      "Regular health monitoring"
    ],
    references: [
      {
        title: "31-36 Month Development",
        url: "https://www.healthychildren.org/English/ages-stages/preschool/Pages/31-36-Months.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 32,
    title: "Little Learner (Month 32)",
    tips: [
      "Increased learning capacity",
      "Advanced problem-solving",
      "Complex social dynamics",
      "Monitor healthy eating habits",
      "Practice self-regulation",
      "Continue skill development",
      "Establish learning routines",
      "Regular check-ups"
    ],
    references: [
      {
        title: "32 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/preschool/Pages/32-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 33,
    title: "Confident Explorer (Month 33)",
    tips: [
      "Growing self-confidence",
      "Advanced language use",
      "Complex play scenarios",
      "Continue nutritional variety",
      "Monitor developmental progress",
      "Practice leadership skills",
      "Encourage creativity",
      "Health screenings"
    ],
    references: [
      {
        title: "33 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/preschool/Pages/33-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 34,
    title: "Almost Three and a Half (Month 34)",
    tips: [
      "Near advanced capabilities",
      "Complex reasoning skills",
      "Advanced social interactions",
      "Monitor portion control",
      "Practice emotional intelligence",
      "Continue comprehensive development",
      "Establish healthy patterns",
      "Regular monitoring"
    ],
    references: [
      {
        title: "34 Month Old Milestones",
        url: "https://www.healthychildren.org/English/ages-stages/preschool/Pages/34-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 35,
    title: "Preschool Ready (Month 35)",
    tips: [
      "Preschool preparation",
      "Advanced communication",
      "Complex learning abilities",
      "Continue healthy nutrition",
      "Monitor readiness skills",
      "Practice group activities",
      "Encourage independence",
      "Regular health visits"
    ],
    references: [
      {
        title: "35 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/preschool/Pages/35-Month-Old.aspx",
        type: "article"
      }
    ]
  },
  {
    month: 36,
    title: "Three Years Complete (Month 36)",
    tips: [
      "Complete three-year journey",
      "Advanced cognitive skills",
      "Complex social understanding",
      "Monitor overall development",
      "Practice life skills",
      "Continue educational foundation",
      "Establish healthy habits",
      "Celebrate achievements and prepare for four"
    ],
    references: [
      {
        title: "36 Month Old Development",
        url: "https://www.healthychildren.org/English/ages-stages/preschool/Pages/36-Month-Old.aspx",
        type: "article"
      },
      {
        title: "Three Year Journey Complete",
        url: "https://www.youtube.com/watch?v=some-video-id",
        type: "video"
      }
    ]
  }
];

export default function Baby() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleMonthClick = (month: number) => {
    setSelectedMonth(selectedMonth === month ? null : month);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Baby Care Guide</h1>
              <p className="mt-2 text-gray-600">
                Comprehensive monthly guide for raising healthy, happy babies from birth to 3 years
              </p>
            </div>
            <Link
              to="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Month Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {babyTips.map((tip) => (
            <button
              key={tip.month}
              onClick={() => handleMonthClick(tip.month)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMonth === tip.month
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">{tip.month}</div>
                <div className="text-sm text-gray-600">months</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Month Details */}
        {selectedMonth && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {(() => {
              const tip = babyTips.find(t => t.month === selectedMonth)!;
              return (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Month {tip.month}: {tip.title}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Tips */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Care Tips:</h3>
                      <ul className="space-y-2">
                        {tip.tips.map((tipText, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-700">{tipText}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* References */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Learn More:</h3>
                      <div className="space-y-3">
                        {tip.references.map((ref, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4">
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              {ref.title}
                            </a>
                            <div className="text-sm text-gray-500 mt-1">
                              {ref.type === 'video' ? '📹 Video' : '📄 Article'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Instructions */}
        {!selectedMonth && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              Click on any month above to view detailed care tips and resources
            </div>
            <div className="mt-4 text-sm text-gray-400">
              This guide covers essential parenting information from newborn to 3 years old
            </div>
          </div>
        )}
      </div>
    </div>
  );
}