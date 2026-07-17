import { motion } from "motion/react";
import {
  BadgeAlert,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";


function getRiskStyles(riskLevel) {
  const styles = {
    LOW: {
      border: "border-emerald-400/20",
      background: "bg-emerald-400/5",
      text: "text-emerald-400",
    },

    MODERATE: {
      border: "border-yellow-400/20",
      background: "bg-yellow-400/5",
      text: "text-yellow-400",
    },

    HIGH: {
      border: "border-orange-400/20",
      background: "bg-orange-400/5",
      text: "text-orange-400",
    },

    CRITICAL: {
      border: "border-red-400/20",
      background: "bg-red-400/5",
      text: "text-red-400",
    },
  };

  return styles[riskLevel] || styles.MODERATE;
}


function VerdictPanel({
  verdict,
  riskLevel,
  disclaimer,
  onReset,
}) {
  const style = getRiskStyles(riskLevel);

  return (
    <section className="border-t border-white/10 p-6 md:p-10">

      {/* Investigator Verdict */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className={`
          rounded-3xl
          border
          ${style.border}
          ${style.background}
          p-6
          md:p-8
        `}
      >

        <div className="flex items-start gap-4">

          <div
            className={`
              rounded-xl
              border
              ${style.border}
              bg-black/20
              p-3
            `}
          >
            <BadgeAlert
              className={`
                h-6 w-6
                ${style.text}
              `}
            />
          </div>


          <div className="flex-1">

            <p
              className={`
                text-xs
                font-bold
                tracking-[0.25em]
                ${style.text}
              `}
            >
              INVESTIGATOR'S VERDICT
            </p>


            <h3 className="
              mt-3 text-2xl
              font-black
              text-white
            ">
              Forensic Assessment
            </h3>


            <p className="
              mt-4 max-w-3xl
              text-base
              leading-8
              text-slate-300
            ">
              {verdict}
            </p>

          </div>

        </div>

      </motion.div>


      {/* Disclaimer */}

      <div className="
        mt-6 flex
        items-start gap-4
        rounded-2xl
        border border-white/10
        bg-black/30
        p-5
      ">

        <ShieldAlert className="
          mt-0.5 h-5 w-5
          shrink-0
          text-slate-500
        " />


        <div>

          <p className="
            text-xs font-bold
            tracking-[0.2em]
            text-slate-500
          ">
            IMPORTANT LIMITATION
          </p>


          <p className="
            mt-2 text-sm
            leading-6
            text-slate-500
          ">
            {disclaimer} Results are generated
            from predefined linguistic heuristics
            and should not be treated as proof of
            deception, dishonesty, or intent.
          </p>

        </div>

      </div>


      {/* Reset Button */}

      <button
        onClick={onReset}
        className="
          mt-8 flex w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          border border-white/10
          bg-white/5
          px-6 py-4
          font-bold
          text-white
          transition
          hover:border-emerald-400/30
          hover:bg-emerald-400/10
          hover:text-emerald-400
        "
      >

        <RotateCcw className="h-5 w-5" />

        ANALYZE ANOTHER CASE

      </button>

    </section>
  );
}


export default VerdictPanel;