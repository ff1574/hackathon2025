import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Star,
  Clock,
  Percent,
  ShoppingBag,
  Coffee,
  Car,
  Smartphone,
  Home,
  Utensils,
} from "lucide-react";

function OffersSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All", icon: ShoppingBag },
    { id: "food", label: "Food", icon: Utensils },
    { id: "coffee", label: "Coffee", icon: Coffee },
    { id: "transport", label: "Transport", icon: Car },
    { id: "tech", label: "Tech", icon: Smartphone },
    { id: "home", label: "Home", icon: Home },
  ];

  const offers = [
    {
      id: 1,
      store: "Starbucks",
      logo: "☕",
      cashback: "8%",
      category: "coffee",
      description: "Get 8% cashback on all purchases",
      rating: 4.8,
      expires: "2 days",
      featured: true,
      color: "from-green-400 to-green-600",
    },
    {
      id: 2,
      store: "Amazon",
      logo: "📦",
      cashback: "5%",
      category: "tech",
      description: "5% back on electronics and gadgets",
      rating: 4.9,
      expires: "5 days",
      featured: true,
      color: "from-orange-400 to-orange-600",
    },
    {
      id: 3,
      store: "Uber",
      logo: "🚗",
      cashback: "12%",
      category: "transport",
      description: "12% cashback on rides and delivery",
      rating: 4.6,
      expires: "1 day",
      featured: false,
      color: "from-black to-gray-800",
    },
    {
      id: 4,
      store: "McDonald's",
      logo: "🍟",
      cashback: "6%",
      category: "food",
      description: "6% back on all orders",
      rating: 4.3,
      expires: "3 days",
      featured: false,
      color: "from-red-400 to-red-600",
    },
    {
      id: 5,
      store: "Target",
      logo: "🎯",
      cashback: "4%",
      category: "home",
      description: "4% cashback on home essentials",
      rating: 4.5,
      expires: "7 days",
      featured: false,
      color: "from-red-500 to-red-700",
    },
    {
      id: 6,
      store: "Apple Store",
      logo: "🍎",
      cashback: "3%",
      category: "tech",
      description: "3% back on Apple products",
      rating: 4.9,
      expires: "10 days",
      featured: true,
      color: "from-gray-400 to-gray-600",
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
    // TODO: Implement offer activation
    console.log("Activating offer:", offer.store);
  };

  return (
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
            className="pl-10 border-lime-200 focus:border-lime-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={`flex items-center gap-2 ${
                selectedCategory === category.id
                  ? "bg-lime-500 hover:bg-lime-600 text-white"
                  : "border-lime-300 text-lime-600 hover:bg-lime-50"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </Button>
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
              {featuredOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="border-lime-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${offer.color}`} />
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{offer.logo}</div>
                          <div>
                            <CardTitle className="text-lg">
                              {offer.store}
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600">
                                {offer.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-lime-100 text-lime-800 text-lg font-bold px-3 py-1">
                          {offer.cashback}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {offer.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-orange-600">
                          <Clock className="w-3 h-3" />
                          Expires in {offer.expires}
                        </div>
                        <Button
                          onClick={() => activateOffer(offer)}
                          className="bg-lime-500 hover:bg-lime-600 text-white group-hover:scale-105 transition-transform"
                        >
                          Activate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
              {regularOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="border-gray-200 hover:border-lime-300 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{offer.logo}</div>
                          <div>
                            <CardTitle className="text-lg">
                              {offer.store}
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600">
                                {offer.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-lime-300 text-lime-600 text-lg font-bold px-3 py-1"
                        >
                          {offer.cashback}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {offer.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-orange-600">
                          <Clock className="w-3 h-3" />
                          Expires in {offer.expires}
                        </div>
                        <Button
                          onClick={() => activateOffer(offer)}
                          variant="outline"
                          className="border-lime-300 text-lime-600 hover:bg-lime-50 group-hover:scale-105 transition-transform"
                        >
                          Activate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {filteredOffers.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No offers found
          </h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default OffersSection;
