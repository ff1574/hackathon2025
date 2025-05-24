import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function NavigationButton({
  icon: Icon,
  title,
  description,
  onClick,
  variant = "primary",
  disabled = false,
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          card: "border-lime-200 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-100",
          button: "bg-lime-500 hover:bg-lime-600 text-white",
          icon: "text-lime-500",
          title: "text-gray-900",
        };
      case "secondary":
        return {
          card: "border-gray-200 hover:border-gray-400 hover:shadow-lg",
          button: "bg-gray-100 hover:bg-gray-200 text-gray-900",
          icon: "text-gray-600",
          title: "text-gray-900",
        };
      default:
        return {
          card: "border-gray-200 hover:border-gray-400",
          button: "bg-gray-100 hover:bg-gray-200 text-gray-900",
          icon: "text-gray-600",
          title: "text-gray-900",
        };
    }
  };

  const styles = getVariantStyles();

  const handleClick = () => {
    if (!disabled && onClick) {
      // TODO: Add analytics tracking here
      console.log(`Navigation button clicked: ${title}`);
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="w-full"
    >
      <Card
        className={`cursor-pointer transition-all duration-200 ${styles.card} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleClick}
      >
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-3 rounded-full bg-gray-50 ${styles.icon}`}>
              <Icon size={32} />
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-2 ${styles.title}`}>
                {title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{description}</p>
            </div>

            <Button
              className={`w-full ${styles.button}`}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default NavigationButton;
