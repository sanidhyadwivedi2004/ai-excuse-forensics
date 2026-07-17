import { motion } from "motion/react";
import {
  Check,
  Circle,
  LoaderCircle,
  ScanLine,
} from "lucide-react";

const stages = [
  "Tokenizing statement",
  "Detecting linguistic anomalies",
  "Measuring specificity",
  "Evaluating verifiability",
  "Analyzing timing patterns",
  "Constructing forensic profile",
];

function Scanner({ currentStage }) {
  const progress = ((currentStage + 1) / stages.length) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-8 overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/4"
    >
      {/* Scanner Header */}

      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-400/10 p-3">
            <ScanLine className="h-6 w-6 animate-pulse text-emerald-400" />
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              FORENSIC SCAN ACTIVE
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Processing linguistic evidence...
            </p>
          </div>
        </div>
      </div>

      {/* Animated Scan Area */}

      <div className="relative overflow-hidden p-6 md:p-8">
        <motion.div
          animate={{
            y: ["-100%", "700%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute left-0 top-0 h-px w-full bg-emerald-400 shadow-[0_0_20px_5px_rgba(52,211,153,0.35)]"
        />

        {/* Progress */}

        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest text-slate-500">
              ANALYSIS PROGRESS
            </span>

            <span className="font-mono text-sm font-bold text-emerald-400">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.4,
              }}
              className="h-full rounded-full bg-emerald-400"
            />
          </div>
        </div>

        {/* Stages */}

        <div className="space-y-3">
          {stages.map((stage, index) => {
            const completed = index < currentStage;
            const active = index === currentStage;

            return (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity:
                    completed || active
                      ? 1
                      : 0.35,

                  x: 0,
                }}
                className={`
                  flex items-center gap-3
                  rounded-xl border p-4
                  transition
                  ${
                    active
                      ? "border-emerald-400/30 bg-emerald-400/10"
                      : "border-white/5 bg-black/20"
                  }
                `}
              >
                <div className="flex h-6 w-6 items-center justify-center">
                  {completed ? (
                    <Check className="h-5 w-5 text-emerald-400" />
                  ) : active ? (
                    <LoaderCircle className="h-5 w-5 animate-spin text-emerald-400" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-700" />
                  )}
                </div>

                <span
                  className={
                    active
                      ? "text-sm font-semibold text-white"
                      : "text-sm text-slate-500"
                  }
                >
                  {stage}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export default Scanner;