import { motion } from "framer-motion";

function PageLayout({ children, className = "" }) {
  const layoutVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
      variants={layoutVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // Keep min-h-screen here but ensure it doesn't create stacking context issues
      className={`min-h-screen bg-white ${className}`}
      style={{ position: "relative", zIndex: 1 }}
    >
      {children}
    </motion.div>
  );
}

export default PageLayout;
