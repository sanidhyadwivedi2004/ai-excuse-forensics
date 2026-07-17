import { motion } from "motion/react";

const signalConfig = [
  {
    key: "vagueness",
    label: "Vagueness",
    description: "Non-specific or unclear language",
    risk: true,
  },
  {
    key: "hedging",
    label: "Hedging",
    description: "Reduced certainty or commitment",
    risk: true,
  },
  {
    key: "emotional_padding",
    label: "Emotional Padding",
    description: "Emotional credibility reinforcement",
    risk: true,
  },
  {
    key: "convenient_timing",
    label: "Convenient Timing",
    description: "Sudden or unusually timed circumstances",
    risk: true,
  },
  {
    key: "suspicious_phrases",
    label: "Pattern Matches",
    description: "Common excuse-language patterns",
    risk: true,
  },
  {
  key: "context_patterns",
  label: "Context Patterns",
  description: "Excuse patterns associated with the selected case context",
  risk: true,
},
  {
    key: "specificity",
    label: "Specificity",
    description: "Presence of concrete details",
    risk: false,
  },
  {
    key: "verifiability",
    label: "Verifiability",
    description: "Potentially checkable information",
    risk: false,
  },
];

function getBarColor(value, isRisk) {
  if (!isRisk) {
    return "bg-emerald-400";
  }

  if (value <= 24) {
    return "bg-emerald-400";
  }

  if (value <= 49) {
    return "bg-yellow-400";
  }

  if (value <= 74) {
    return "bg-orange-400";
  }

  return "bg-red-400";
}

function SignalBars({ signals }) {
  return (
    <section className="border-t border-white/10 p-6 md:p-10">

      {/* Section Header */}

      <div className="mb-8">

        <p className="
          text-xs font-bold
          tracking-[0.25em]
          text-emerald-400
        ">
          SIGNAL BREAKDOWN
        </p>

        <h3 className="
          mt-2 text-2xl
          font-black text-white
        ">
          Linguistic Evidence Profile
        </h3>

        <p className="
          mt-2 max-w-2xl
          text-sm leading-6
          text-slate-500
        ">
          Each signal represents a linguistic
          characteristic detected in the statement.
          Higher risk-signal values increase suspicion,
          while higher specificity and verifiability
          reduce it.
        </p>

      </div>


      {/* Signal Bars */}

      <div className="grid gap-6 md:grid-cols-2">

        {signalConfig.map((signal, index) => {

          const value = signals[signal.key] ?? 0;

          return (
            <motion.div
              key={signal.key}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="
                rounded-2xl
                border border-white/10
                bg-black/20
                p-5
              "
            >

              {/* Label */}

              <div className="
                flex items-start
                justify-between gap-4
              ">

                <div>

                  <p className="
                    font-bold text-white
                  ">
                    {signal.label}
                  </p>

                  <p className="
                    mt-1 text-xs
                    leading-5
                    text-slate-500
                  ">
                    {signal.description}
                  </p>

                </div>


                <span className="
                  font-mono
                  text-lg font-black
                  text-white
                ">
                  {value}
                </span>

              </div>


              {/* Progress Bar */}

              <div className="
                mt-5 h-2
                overflow-hidden
                rounded-full
                bg-white/10
              ">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${value}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.08,
                    ease: "easeOut",
                  }}
                  className={`
                    h-full rounded-full
                    ${getBarColor(
                      value,
                      signal.risk
                    )}
                  `}
                />

              </div>


              {/* Scale */}

              <div className="
                mt-2 flex
                justify-between
                text-[10px]
                font-bold
                tracking-wider
                text-slate-700
              ">

                <span>0</span>

                <span>
                  {signal.risk
                    ? "RISK SIGNAL"
                    : "POSITIVE SIGNAL"}
                </span>

                <span>100</span>

              </div>

            </motion.div>
          );
        })}

      </div>

    </section>
  );
}

export default SignalBars;