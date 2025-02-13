"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFoundContent() {
  const router = useRouter();
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    setPreviousPath(sessionStorage.getItem("previousPath") || "/");
  }, []);

  const goBack = () => {
    if (previousPath) {
      router.push(previousPath);
    } else {
      router.back();
    }
  };

  const goHome = () => {
    router.push("/");
  };

  const containerVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { yoyo: Infinity, duration: 0.3 } },
  };

  const numberVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div className="text-center" variants={containerVariants} initial="initial" animate="animate">
        <motion.h1
          className="text-6xl font-bold mb-4 flex justify-center"
          animate={{ color: ["var(--color-primary)", "var(--color-secondary)", "var(--color-background)", "var(--color-white)"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.span variants={numberVariants} animate="animate">
            4
          </motion.span>
          <motion.span variants={numberVariants} animate="animate">
            0
          </motion.span>
          <motion.span variants={numberVariants} animate="animate">
            4
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-lg mb-8"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Oops! Page not found
        </motion.p>
        <div className="space-x-4">
          <motion.button
            className="px-4 py-2 btn btn-primary"
            onClick={goBack}
            variants={buttonVariants}
            whileHover="hover"
          >
            Go Back
          </motion.button>
          <motion.button
            className="px-4 py-2 btn btn-secondary"
            onClick={goHome}
            variants={buttonVariants}
            whileHover="hover"
          >
            Go Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
