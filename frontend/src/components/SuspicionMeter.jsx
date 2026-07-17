import { useEffect, useState } from "react";
import { motion } from "motion/react";

function SuspicionMeter({ score }) {
  const [displayScore, setDisplayScore] = useState(0);

  const radius = 82;
  const circumference = 2 * Math.PI * radius;

  const progress =
    circumference - (score / 100) * circumference;

  useEffect(() => {
    let current = 0;

    const duration = 1200;
    const steps = 40;
    const increment = score / steps;

    const timer = setInterval(() => {
      current += increment;

      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  function getScoreStyle() {
    if (score <= 24) {
      return {
        text: "text-emerald-400",
        stroke: "#34d399",
        glow: "drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]",
      };
    }

    if (score <= 49) {
      return {
        text: "text-yellow-400",
        stroke: "#facc15",
        glow: "drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]",
      };
    }

    if (score <= 74) {
      return {
        text: "text-orange-400",
        stroke: "#fb923c",
        glow: "drop-shadow-[0_0_10px_rgba(251,146,60,0.6)]",
      };
    }

    return {
      text: "text-red-400",
      stroke: "#f87171",
      glow: "drop-shadow-[0_0_10px_rgba(248,113,113,0.6)]",
    };
  }

  const style = getScoreStyle();

  return (
    <div className="relative flex items-center justify-center">

      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        className="-rotate-90"
      >
        {/* Background Circle */}

        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
        />

        {/* Animated Score Circle */}

        <motion.circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke={style.stroke}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: progress,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className={style.glow}
        />
      </svg>

      {/* Score Text */}

      <div className="absolute text-center">

        <p
          className={`text-6xl font-black tracking-tight ${style.text}`}
        >
          {displayScore}
        </p>

        <p className="mt-1 text-xs font-bold tracking-[0.25em] text-slate-500">
          OUT OF 100
        </p>

      </div>

    </div>
  );
}

export default SuspicionMeter;