import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import OfferActivationPopup from "./OfferActivationPopup";
import {
  Search,
  Star,
  Clock,
  Percent,
  ShoppingBag,
  Coffee,
  Smartphone,
  Utensils,
  CheckCircle,
  ShoppingCart,
  BookOpen,
  Dumbbell,
  Cookie,
  Apple,
  Shirt,
  Heart,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

function OffersSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activatedOffer, setActivatedOffer] = useState(null);
  const [showActivationPopup, setShowActivationPopup] = useState(false);
  const { activateOffer: activateOfferInContext, isOfferActivated } = useApp();

  const categories = [
    { id: "all", label: "All", icon: ShoppingBag },
    { id: "food", label: "Food", icon: Utensils },
    { id: "coffee", label: "Coffee", icon: Coffee },
    { id: "grocery", label: "Grocery", icon: ShoppingCart },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "tech", label: "Tech", icon: Smartphone },
    { id: "fitness", label: "Fitness", icon: Dumbbell },
    { id: "bakery", label: "Bakery", icon: Cookie },
    { id: "produce", label: "Produce", icon: Apple },
    { id: "clothing", label: "Clothing", icon: Shirt },
    { id: "pet", label: "Pet Care", icon: Heart },
  ];

  const offers = [
    {
      id: 1,
      store: "KavanaZadar",
      logo: "☕",
      cashback: "10%",
      category: "coffee",
      description:
        "Enjoy specialty coffee and get 10% back instantly when you pay with your OTP card.",
      rating: 4.1,
      expires: "36 days",
      featured: false,
      color: "from-green-400 to-green-600",
      terms:
        "Valid on all coffee purchases. Minimum spend 5€. Maximum cashback 10€ per transaction.",
    },
    {
      id: 2,
      store: "Konzum Supermarket",
      logo: "🛒",
      cashback: "5%",
      category: "grocery",
      description:
        "Shop daily groceries and earn 5% cashback on all purchases using your OTP card.",
      rating: 4.2,
      expires: "51 days",
      featured: true,
      color: "from-orange-400 to-orange-600",
      terms:
        "Valid on all grocery items. Minimum spend 20€. Maximum cashback 25€ per transaction.",
    },
    {
      id: 3,
      store: "Zadar Street Food",
      logo: "🌯",
      cashback: "8%",
      category: "food",
      description:
        "Taste local street food and earn cashback while enjoying the coast.",
      rating: 4.3,
      expires: "31 days",
      featured: false,
      color: "from-yellow-400 to-yellow-600",
      terms:
        "Valid on all food items. Minimum spend 10€. Maximum cashback 15€ per transaction.",
    },
    {
      id: 4,
      store: "VerbumZadar.",
      logo: "📚",
      cashback: "12%",
      category: "books",
      description:
        "Get rewarded for reading — 12% back when you shop for books using your OTP card.",
      rating: 4.4,
      expires: "46 days",
      featured: true,
      color: "from-indigo-400 to-indigo-600",
      terms:
        "Valid on all books and educational materials. Minimum spend 15€. No maximum limit.",
    },
    {
      id: 5,
      store: "ZaraTech Repairs",
      logo: "🔧",
      cashback: "15%",
      category: "tech",
      description:
        "Fix your tech and get money back — 15% cashback with your OTP card.",
      rating: 4.5,
      expires: "34 days",
      featured: false,
      color: "from-gray-400 to-gray-600",
      terms:
        "Valid on all repair services. Minimum spend 30€. Maximum cashback 50€ per service.",
    },
    {
      id: 6,
      store: "Studio Fit Zadar",
      logo: "🏋️",
      cashback: "20%",
      category: "fitness",
      description:
        "Stay fit and earn 20% back on your gym sessions and memberships.",
      rating: 4.6,
      expires: "68 days",
      featured: true,
      color: "from-purple-400 to-purple-600",
      terms:
        "Valid on memberships and personal training. Minimum spend 40€. Maximum cashback 80€ per month.",
    },
    {
      id: 7,
      store: "Bakery Sunce",
      logo: "🥐",
      cashback: "6%",
      category: "bakery",
      description:
        "Fresh pastries daily — 6% cashback when paying with your OTP card.",
      rating: 4.7,
      expires: "26 days",
      featured: false,
      color: "from-pink-400 to-pink-600",
      terms:
        "Valid on all bakery items. Minimum spend 8€. Maximum cashback 12€ per day.",
    },
    {
      id: 8,
      store: "Green Market",
      logo: "🥬",
      cashback: "7%",
      category: "produce",
      description: "Shop fresh local produce and earn 7% cashback instantly.",
      rating: 4.8,
      expires: "66 days",
      featured: true,
      color: "from-lime-400 to-lime-600",
      terms:
        "Valid on all fresh produce. Minimum spend 12€. Maximum cashback 20€ per transaction.",
    },
    {
      id: 9,
      store: "Zara",
      logo: "👗",
      cashback: "10%",
      category: "clothing",
      description:
        "Shop trendy outfits and get 10% cashback using your OTP card.",
      rating: 4.9,
      expires: "35 days",
      featured: false,
      color: "from-red-500 to-red-700",
      terms:
        "Valid on all clothing items. Minimum spend 50€. Maximum cashback 100€ per transaction.",
    },
    {
      id: 10,
      store: "ZooCity",
      logo: "🐶",
      cashback: "5%",
      category: "pet",
      description: "Treat your pet and get 5% cashback at ZooCity.",
      rating: 4.0,
      expires: "37 days",
      featured: true,
      color: "from-amber-400 to-amber-600",
      terms:
        "Valid on all pet supplies and services. Minimum spend 25€. Maximum cashback 30€ per transaction.",
    },
  ];

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch = offer.store
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || offer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredOffers = filteredOffers.filter((offer) => offer.featured);
  const regularOffers = filteredOffers.filter((offer) => !offer.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const activateOffer = (offer) => {
    console.log("Activating offer:", offer.store);
    const success = activateOfferInContext(offer);
    if (success) {
      setActivatedOffer(offer);
      setShowActivationPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowActivationPopup(false);
    setTimeout(() => setActivatedOffer(null), 300);
  };

  const renderOfferCard = (offer, isFeatured = false) => {
    const isActivated = isOfferActivated(offer.id);

    return (
      <motion.div
        key={offer.id}
        variants={itemVariants}
        layout
        whileHover={{
          scale: isActivated ? 1.01 : 1.02,
          y: isActivated ? -2 : -5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group"
      >
        <Card
          className={`transition-all duration-300 overflow-hidden relative ${
            isActivated
              ? "border-green-300 bg-green-50 shadow-md"
              : isFeatured
              ? "border-lime-200 hover:shadow-xl"
              : "border-gray-200 hover:border-lime-300 hover:shadow-lg"
          }`}
        >
          <div className={`h-2 bg-gradient-to-r ${offer.color}`} />

          {/* Status badges */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            {isFeatured && !isActivated && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                ⭐ Featured
              </Badge>
            )}
            {isActivated && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </motion.div>
            )}
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="text-2xl"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {offer.logo}
                </motion.div>
                <div>
                  <CardTitle className="text-lg">{offer.store}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">
                      {offer.rating}
                    </span>
                  </div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge
                  className={`text-lg font-bold px-3 py-1 ${
                    isActivated
                      ? "bg-green-100 text-green-800"
                      : isFeatured
                      ? "bg-lime-100 text-lime-800"
                      : "border-lime-300 text-lime-600"
                  }`}
                  variant={isFeatured && !isActivated ? "default" : "outline"}
                >
                  {offer.cashback}
                </Badge>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">{offer.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-orange-600">
                <Clock className="w-3 h-3" />
                Expires in {offer.expires}
              </div>
              <motion.div
                whileHover={{ scale: isActivated ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => activateOffer(offer)}
                  disabled={isActivated}
                  className={`transition-all duration-200 ${
                    isActivated
                      ? "bg-green-500 text-white cursor-default"
                      : isFeatured
                      ? "bg-lime-500 hover:bg-lime-600 text-white shadow-lg hover:shadow-xl"
                      : "border-lime-300 text-lime-600 hover:bg-lime-50"
                  }`}
                  variant={
                    isActivated ? "default" : isFeatured ? "default" : "outline"
                  }
                >
                  {isActivated ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activated
                    </>
                  ) : (
                    "Activate"
                  )}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search stores and offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-lime-200 focus:border-lime-500 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setSelectedCategory(category.id)}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-lime-500 hover:bg-lime-600 text-white shadow-lg"
                      : "border-lime-300 text-lime-600 hover:bg-lime-50 hover:border-lime-400"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Offers */}
        {featuredOffers.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Featured Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {featuredOffers.map((offer) => renderOfferCard(offer, true))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Regular Offers */}
        {regularOffers.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Percent className="w-6 h-6 text-lime-500" />
              All Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {regularOffers.map((offer) => renderOfferCard(offer, false))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {filteredOffers.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-12">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              🔍
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No offers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Offer Activation Popup */}
      <OfferActivationPopup
        offer={activatedOffer}
        isOpen={showActivationPopup}
        onClose={handlePopupClose}
      />
    </>
  );
}

export default OffersSection;
