import { motion } from "motion/react";
import { AlertTriangle, Search } from "lucide-react";


function getHighlightStyle(category) {
  const styles = {
    vagueness:
      "border-yellow-400/30 bg-yellow-400/10 text-yellow-200",

    hedging:
      "border-blue-400/30 bg-blue-400/10 text-blue-200",

    emotional_padding:
      "border-purple-400/30 bg-purple-400/10 text-purple-200",

    convenient_timing:
      "border-orange-400/30 bg-orange-400/10 text-orange-200",

    suspicious_phrase:
      "border-red-400/30 bg-red-400/10 text-red-200",

    context_pattern:
      "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  };

  return (
    styles[category] ||
    "border-white/20 bg-white/10 text-white"
  );
}


function getCategoryLabel(category) {
  const labels = {
    vagueness: "Vagueness",
    hedging: "Hedging",
    emotional_padding: "Emotional Padding",
    convenient_timing: "Convenient Timing",
    suspicious_phrase: "Pattern Match",
    context_pattern: "Context Pattern",
  };

  return labels[category] || category;
}


function HighlightedText({
  text,
  flaggedPhrases,
}) {

  /*
    Remove overlapping matches.

    Example:
    If two detected phrases overlap,
    we keep the first valid match so the
    original statement is not duplicated.
  */

  const sortedFlags = [...flaggedPhrases].sort(
    (a, b) => {
      if (a.start !== b.start) {
        return a.start - b.start;
      }

      return b.end - b.start - (a.end - a.start);
    }
  );


  const cleanFlags = [];

  let lastEnd = 0;


  for (const flag of sortedFlags) {

    if (flag.start >= lastEnd) {

      cleanFlags.push(flag);

      lastEnd = flag.end;
    }

  }


  /*
    Build the highlighted statement
  */

  const parts = [];

  let cursor = 0;


  cleanFlags.forEach((flag, index) => {

    // Normal text before highlighted phrase
    if (flag.start > cursor) {

      parts.push(
        <span key={`text-${index}`}>
          {text.slice(
            cursor,
            flag.start
          )}
        </span>
      );

    }


    // Highlighted phrase
    parts.push(
      <span
        key={`flag-${index}`}
        title={flag.reason}
        className={`
          mx-0.5 inline
          rounded-md border
          px-1.5 py-0.5
          ${getHighlightStyle(
            flag.category
          )}
        `}
      >
        {text.slice(
          flag.start,
          flag.end
        )}
      </span>
    );


    cursor = flag.end;

  });


  // Remaining normal text
  if (cursor < text.length) {

    parts.push(
      <span key="remaining-text">
        {text.slice(cursor)}
      </span>
    );

  }


  return (
    <section className="
      border-t
      border-white/10
      p-6
      md:p-10
    ">

      {/* Header */}

      <div className="mb-7">

        <div className="
          flex items-center
          gap-3
        ">

          <Search className="
            h-5 w-5
            text-emerald-400
          " />

          <p className="
            text-xs font-bold
            tracking-[0.25em]
            text-emerald-400
          ">
            EVIDENCE INSPECTION
          </p>

        </div>


        <h3 className="
          mt-3 text-2xl
          font-black text-white
        ">
          Statement Under Examination
        </h3>


        <p className="
          mt-2 max-w-2xl
          text-sm leading-6
          text-slate-500
        ">
          Detected linguistic patterns are
          highlighted directly inside the
          original statement.
        </p>

      </div>


      {/* Highlighted Statement */}

      <div className="
        rounded-2xl
        border border-white/10
        bg-black/30
        p-6
        text-base
        leading-9
        text-slate-300
        md:text-lg
      ">

        {parts}

      </div>


      {/* No Flags */}

      {cleanFlags.length === 0 && (

        <div className="
          mt-5 rounded-xl
          border border-emerald-400/20
          bg-emerald-400/5
          p-4
          text-sm
          text-emerald-300
        ">

          No predefined linguistic risk
          phrases were detected in this
          statement.

        </div>

      )}


      {/* Evidence List */}

      {cleanFlags.length > 0 && (

        <div className="
          mt-8
          grid gap-4
          md:grid-cols-2
        ">

          {cleanFlags.map(
            (flag, index) => (

              <motion.div
                key={`${flag.start}-${flag.end}`}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.08,
                }}
                className="
                  rounded-2xl
                  border border-white/10
                  bg-white/3
                  p-5
                "
              >

                <div className="
                  flex items-start
                  gap-3
                ">

                  <div className="
                    mt-0.5
                    rounded-lg
                    bg-orange-400/10
                    p-2
                  ">

                    <AlertTriangle className="
                      h-4 w-4
                      text-orange-400
                    " />

                  </div>


                  <div>

                    <p className="
                      font-mono
                      text-sm
                      font-bold
                      text-white
                    ">
                      "{flag.text}"
                    </p>


                    <p className="
                      mt-2 text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-emerald-400
                    ">
                      {getCategoryLabel(
                        flag.category
                      )}
                    </p>


                    <p className="
                      mt-2 text-sm
                      leading-6
                      text-slate-500
                    ">
                      {flag.reason}
                    </p>

                  </div>

                </div>

              </motion.div>

            )
          )}

        </div>

      )}

    </section>
  );
}


export default HighlightedText;