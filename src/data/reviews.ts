export interface Review {
  id: number;
  item_id: number;
  item_name: string;
  item_type: 'travel' | 'food' | 'toy';
  nation_id: number;
  nation_name: string;
  flag_url: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  continent: string;
  timezone: string;
}

export const mockReviews: Review[] = [
  // Travel Reviews
  {
    id: 1,
    item_id: 1,
    item_name: "Tokyo Skytree",
    item_type: "travel",
    nation_id: 1,
    nation_name: "Japan",
    flag_url: "🇯🇵",
    user_name: "Sarah Chen",
    rating: 5,
    comment: "Absolutely breathtaking views! The Skytree offers panoramic views of Tokyo that are worth every yen. The observation decks are well-organized and the audio guide was very informative.",
    date: "2024-01-15",
    helpful: 24,
    continent: "Asia",
    timezone: "JST (UTC+9)"
  },
  {
    id: 2,
    item_id: 2,
    item_name: "Machu Picchu",
    item_type: "travel",
    nation_id: 2,
    nation_name: "Peru",
    flag_url: "🇵🇪",
    user_name: "Miguel Rodriguez",
    rating: 4,
    comment: "Incredible ancient wonder! The hike up was challenging but the views were spectacular. Early morning visit helped avoid crowds. Don't forget your altitude sickness medication!",
    date: "2024-01-10",
    helpful: 31,
    continent: "South America",
    timezone: "PET (UTC-5)"
  },
  {
    id: 3,
    item_id: 3,
    item_name: "Eiffel Tower",
    item_type: "travel",
    nation_id: 3,
    nation_name: "France",
    flag_url: "🇫🇷",
    user_name: "Emma Thompson",
    rating: 5,
    comment: "Iconic and romantic! The evening light show is magical. Book tickets in advance to skip the lines. The surrounding gardens are beautiful too.",
    date: "2024-01-08",
    helpful: 18,
    continent: "Europe",
    timezone: "CET (UTC+1)"
  },
  {
    id: 4,
    item_id: 4,
    item_name: "Great Wall of China",
    item_type: "travel",
    nation_id: 4,
    nation_name: "China",
    flag_url: "🇨🇳",
    user_name: "David Kim",
    rating: 4,
    comment: "A must-see wonder! The Mutianyu section is less crowded and has a cable car. The views of the surrounding mountains are stunning. Bring good walking shoes!",
    date: "2024-01-05",
    helpful: 27,
    continent: "Asia",
    timezone: "CST (UTC+8)"
  },
  {
    id: 5,
    item_id: 5,
    item_name: "Pyramids of Giza",
    item_type: "travel",
    nation_id: 5,
    nation_name: "Egypt",
    flag_url: "🇪🇬",
    user_name: "Fatima Hassan",
    rating: 5,
    comment: "Mind-blowing ancient architecture! The scale is incredible. Early morning visit is best to avoid heat. The Sphinx is equally impressive.",
    date: "2024-01-03",
    helpful: 35,
    continent: "Africa",
    timezone: "EET (UTC+2)"
  },

  // Food Reviews
  {
    id: 6,
    item_id: 1,
    item_name: "Sushi",
    item_type: "food",
    nation_id: 1,
    nation_name: "Japan",
    flag_url: "🇯🇵",
    user_name: "Alex Johnson",
    rating: 5,
    comment: "Fresh and delicious! The fish was incredibly fresh and the presentation was beautiful. My first time trying authentic sushi - exceeded all expectations!",
    date: "2024-01-12",
    helpful: 22,
    continent: "Asia",
    timezone: "JST (UTC+9)"
  },
  {
    id: 7,
    item_id: 2,
    item_name: "Ceviche",
    item_type: "food",
    nation_id: 2,
    nation_name: "Peru",
    flag_url: "🇵🇪",
    user_name: "Maria Garcia",
    rating: 4,
    comment: "Citrusy and fresh! The lime marinade perfectly cooked the fish. A bit spicy for my taste but very authentic. Great with cold beer!",
    date: "2024-01-09",
    helpful: 19,
    continent: "South America",
    timezone: "PET (UTC-5)"
  },
  {
    id: 8,
    item_id: 3,
    item_name: "Croissant",
    item_type: "food",
    nation_id: 3,
    nation_name: "France",
    flag_url: "🇫🇷",
    user_name: "Pierre Dubois",
    rating: 5,
    comment: "Buttery perfection! The flakiness and the aroma are heavenly. Fresh from the boulangerie in the morning - there's nothing better!",
    date: "2024-01-07",
    helpful: 31,
    continent: "Europe",
    timezone: "CET (UTC+1)"
  },
  {
    id: 9,
    item_id: 4,
    item_name: "Dim Sum",
    item_type: "food",
    nation_id: 4,
    nation_name: "China",
    flag_url: "🇨🇳",
    user_name: "Li Wei",
    rating: 4,
    comment: "Steamed to perfection! The shrimp dumplings were juicy and flavorful. The variety of fillings kept us coming back for more. Traditional tea pairing was excellent!",
    date: "2024-01-04",
    helpful: 25,
    continent: "Asia",
    timezone: "CST (UTC+8)"
  },
  {
    id: 10,
    item_id: 5,
    item_name: "Falafel",
    item_type: "food",
    nation_id: 5,
    nation_name: "Egypt",
    flag_url: "🇪🇬",
    user_name: "Ahmed Mohamed",
    rating: 5,
    comment: "Crispy and flavorful! The chickpeas were perfectly spiced and the tahini sauce was creamy. Street food at its finest - authentic and delicious!",
    date: "2024-01-02",
    helpful: 28,
    continent: "Africa",
    timezone: "EET (UTC+2)"
  },

  // Toy Reviews
  {
    id: 11,
    item_id: 1,
    item_name: "Kintsugi Art Set",
    item_type: "toy",
    nation_id: 1,
    nation_name: "Japan",
    flag_url: "🇯🇵",
    user_name: "Yuki Tanaka",
    rating: 5,
    comment: "Beautiful philosophy! The art of repairing broken pottery with gold is so meaningful. Great for mindfulness and teaching children about imperfection. High-quality materials!",
    date: "2024-01-14",
    helpful: 16,
    continent: "Asia",
    timezone: "JST (UTC+9)"
  },
  {
    id: 12,
    item_id: 2,
    item_name: "Andean Textile Kit",
    item_type: "toy",
    nation_id: 2,
    nation_name: "Peru",
    flag_url: "🇵🇪",
    user_name: "Rosa Martinez",
    rating: 4,
    comment: "Colorful and cultural! The traditional patterns are stunning. Great for learning about Andean culture. The wool is soft and the dyes are vibrant. A bit challenging for beginners.",
    date: "2024-01-11",
    helpful: 12,
    continent: "South America",
    timezone: "PET (UTC-5)"
  },
  {
    id: 13,
    item_id: 3,
    item_name: "French Patisserie Set",
    item_type: "toy",
    nation_id: 3,
    nation_name: "France",
    flag_url: "🇫🇷",
    user_name: "Sophie Laurent",
    rating: 5,
    comment: "Delightful baking experience! The molds are detailed and the recipes are authentic. My children loved creating miniature éclairs and macarons. Perfect for aspiring young chefs!",
    date: "2024-01-06",
    helpful: 23,
    continent: "Europe",
    timezone: "CET (UTC+1)"
  },
  {
    id: 14,
    item_id: 4,
    item_name: "Chinese Calligraphy Set",
    item_type: "toy",
    nation_id: 4,
    nation_name: "China",
    flag_url: "🇨🇳",
    user_name: "Wang Mei",
    rating: 4,
    comment: "Elegant and educational! The brushes are high quality and the ink flows smoothly. Learning Chinese characters is challenging but rewarding. Great for cultural appreciation!",
    date: "2024-01-01",
    helpful: 20,
    continent: "Asia",
    timezone: "CST (UTC+8)"
  },
  {
    id: 15,
    item_id: 5,
    item_name: "Egyptian Hieroglyph Kit",
    item_type: "toy",
    nation_id: 5,
    nation_name: "Egypt",
    flag_url: "🇪🇬",
    user_name: "Omar Hassan",
    rating: 5,
    comment: "Fascinating ancient script! The symbols are beautifully carved and the guidebook is comprehensive. Perfect for history enthusiasts. The wooden blocks feel substantial and authentic!",
    date: "2023-12-30",
    helpful: 17,
    continent: "Africa",
    timezone: "EET (UTC+2)"
  }
];

export const continents = [
  "All Continents",
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Oceania"
];

export const timezones = [
  "All Timezones",
  "JST (UTC+9)",
  "PET (UTC-5)",
  "CET (UTC+1)",
  "CST (UTC+8)",
  "EET (UTC+2)",
  "EST (UTC-5)",
  "PST (UTC-8)",
  "GMT (UTC+0)",
  "IST (UTC+5:30)"
];