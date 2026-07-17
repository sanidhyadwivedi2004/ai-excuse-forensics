import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { AnimatePresence, motion } from "motion/react";
import SuspicionMeter from "./components/SuspicionMeter";
import VerdictPanel from "./components/VerdictPanel";
import SignalBars from "./components/SignalBars";
import HighlightedText from "./components/HighlightedText";
import Scanner from "./components/Scanner";
import {
  BriefcaseBusiness,
  GraduationCap,
  Heart,
  CalendarClock,
  Timer,
  ScanLine,
  ShieldCheck,
  LoaderCircle,
  Download
} from "lucide-react";

import { analyzeExcuse } from "./services/api";


const contexts = [
  {
    name: "College",
    icon: GraduationCap,
  },
  {
    name: "Work",
    icon: BriefcaseBusiness,
  },
  {
    name: "Relationship",
    icon: Heart,
  },
  {
    name: "Meeting",
    icon: CalendarClock,
  },
  {
    name: "Deadline",
    icon: Timer,
  },
];


function App() {
  const [excuse, setExcuse] = useState("");
  const [context, setContext] = useState("College");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [scanStage, setScanStage] = useState(0);
  const reportRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  function handleReset() {
  setExcuse("");
  setContext("College");
  setResult(null);
  setError("");
  setScanStage(0);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
  async function handleDownloadReport() {
  if (!reportRef.current || !result) {
    return;
  }

  setExporting(true);
  setError("");

  try {
    const dataUrl = await toPng(
  reportRef.current,
  {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#05070a",

    filter: (node) => {
      return (
        node?.dataset?.exportControl !==
        "true"
      );
    },
  }
);

    const link = document.createElement("a");

    link.download =
      `${result.case_id}-forensic-report.png`;

    link.href = dataUrl;

    link.click();
  } catch (err) {
    console.error(
      "Report export failed:",
      err
    );

    setError(
      "Unable to save the forensic report as an image."
    );
  } finally {
    setExporting(false);
  }
}

  async function handleAnalyze() {
  if (excuse.trim().length < 5) {
    setError("Enter an excuse with at least 5 characters.");
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);
  setScanStage(0);

  try {
    // Start the real backend request immediately
    const analysisPromise = analyzeExcuse(
      excuse.trim(),
      context
    );

    // Move through the visual forensic stages
    for (let stage = 0; stage < 6; stage++) {
      setScanStage(stage);

      await new Promise((resolve) =>
        setTimeout(resolve, 550)
      );
    }

    // Get the real API result
    const data = await analysisPromise;

    setResult(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen px-5 py-10 md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mb-5 flex justify-center">
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-3">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
            </div>
          </div>

          <p className="mb-3 text-xs font-bold tracking-[0.35em] text-emerald-400">
            FORENSIC NLP SYSTEM
          </p>

          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            AI Excuse{" "}
            <span className="text-emerald-400">
              Forensics
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
            Submit a statement for linguistic risk analysis.
            The system examines patterns such as vagueness,
            hedging, emotional padding, and verifiability.
          </p>
        </motion.header>


        {/* Main Analyzer */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl md:p-8"
        >

          {/* Context */}

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-slate-500">
              SELECT CASE CONTEXT
            </p>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">

              {contexts.map((item) => {
                const Icon = item.icon;
                const selected = context === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => setContext(item.name)}
                    className={`
                      flex items-center justify-center gap-2
                      rounded-xl border px-3 py-3
                      text-sm font-semibold transition
                      ${
                        selected
                          ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                          : "border-white/10 bg-white/3 text-slate-400 hover:border-white/20 hover:text-white"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />

                    {item.name}
                  </button>
                );
              })}

            </div>
          </div>


          {/* Excuse Input */}

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <p className="text-xs font-bold tracking-[0.2em] text-slate-500">
                STATEMENT UNDER ANALYSIS
              </p>

              <span className="text-xs text-slate-600">
                {excuse.length} / 2000
              </span>

            </div>

            <textarea
              value={excuse}
              onChange={(event) =>
                setExcuse(event.target.value.slice(0, 2000))
              }
              placeholder="Enter the excuse or explanation you want to investigate..."
              rows={8}
              className="
                w-full resize-none rounded-2xl
                border border-white/10
                bg-black/30 p-5
                text-base leading-7 text-white
                outline-none transition
                placeholder:text-slate-600
                focus:border-emerald-400/50
                focus:ring-4
                focus:ring-emerald-400/5
              "
            />

          </div>


          {/* Error */}

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}


          {/* Analyze Button */}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="
              mt-6 flex w-full items-center
              justify-center gap-3
              rounded-xl bg-emerald-400
              px-6 py-4
              font-black text-black
              transition
              hover:bg-emerald-300
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" />
                ANALYZING STATEMENT...
              </>
            ) : (
              <>
                <ScanLine className="h-5 w-5" />
                RUN FORENSIC ANALYSIS
              </>
            )}

          </button>

        </motion.section>


        {/* Temporary Result Test */}
        <AnimatePresence>
  {loading && (
    <Scanner currentStage={scanStage} />
  )}
</AnimatePresence>

        {/* Forensic Report */}

{result && (
  
  <motion.section
    ref={reportRef}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="
      mt-8 overflow-hidden rounded-3xl
      border border-white/10
      bg-white/4
      shadow-2xl
    "
    
  >
    

    {/* Report Header */}

    <div className="
      flex flex-col gap-5
      border-b border-white/10
      p-6
      md:flex-row
      md:items-center
      md:justify-between
      md:p-8
    ">

      <div>

        <p className="
          text-xs font-bold
          tracking-[0.25em]
          text-emerald-400
        ">
          FORENSIC ANALYSIS COMPLETE
        </p>

        <h2 className="
          mt-2 text-2xl
          font-black text-white
          md:text-3xl
        ">
          Linguistic Risk Report
        </h2>

      </div>


      <div className="
  flex flex-col gap-3
  sm:flex-row
  sm:items-center
">

  {/* Case ID */}

  <div className="
    rounded-xl border
    border-white/10
    bg-black/30
    px-5 py-3
  ">

    <p className="
      text-xs font-bold
      tracking-widest
      text-slate-600
    ">
      CASE ID
    </p>

    <p className="
      mt-1 font-mono
      font-bold
      text-white
    ">
      {result.case_id}
    </p>

  </div>


  {/* Download Report */}

  <button
    onClick={handleDownloadReport}
    disabled={exporting}
    data-export-control="true"
    className="
      flex items-center
      justify-center gap-2
      rounded-xl
      border border-emerald-400/20
      bg-emerald-400/10
      px-5 py-4
      text-sm font-bold
      text-emerald-400
      transition
      hover:bg-emerald-400/20
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
  >

    {exporting ? (
      <>
        <LoaderCircle className="h-4 w-4 animate-spin" />
        SAVING...
      </>
    ) : (
      <>
        <Download className="h-4 w-4" />
        SAVE REPORT
      </>
    )}

  </button>

</div>

    </div>


    {/* Main Score Area */}

    <div className="
      grid items-center
      gap-8 p-6
      md:grid-cols-2
      md:p-10
    ">

      {/* Circular Meter */}

      <div className="flex justify-center">

        <SuspicionMeter
          score={result.suspicion_score}
        />

      </div>


      {/* Risk Information */}

      <div>

        <p className="
          text-xs font-bold
          tracking-[0.25em]
          text-slate-500
        ">
          CLASSIFICATION
        </p>


        <div className="
          mt-4 flex
          items-center gap-3
        ">

          <span className={`
            h-3 w-3
            rounded-full
            ${
              result.risk_level === "LOW"
                ? "bg-emerald-400"
                : result.risk_level === "MODERATE"
                ? "bg-yellow-400"
                : result.risk_level === "HIGH"
                ? "bg-orange-400"
                : "bg-red-400"
            }
          `} />

          <p className="
            text-4xl font-black
            text-white
          ">
            {result.risk_level}
          </p>

        </div>


        <p className="
          mt-5 max-w-md
          text-sm leading-7
          text-slate-400
        ">
          The statement has been evaluated
          across multiple linguistic risk
          categories including vagueness,
          hedging, emotional reinforcement,
          timing patterns, specificity,
          and verifiability.
        </p>


        {/* Context */}

        <div className="
          mt-6 inline-flex
          rounded-lg
          border border-white/10
          bg-white/5
          px-4 py-2
        ">

          <span className="
            text-xs font-bold
            tracking-wider
            text-slate-400
          ">
            CONTEXT: {result.context.toUpperCase()}
          </span>

        </div>

      </div>

    </div>
    <SignalBars signals={result.signals} />
    <HighlightedText
  text={result.excuse}
  flaggedPhrases={result.flagged_phrases}
/>
<VerdictPanel
  verdict={result.verdict}
  riskLevel={result.risk_level}
  disclaimer={result.disclaimer}
  onReset={handleReset}
/>

  </motion.section>
)}

      </div>

    </main>
  );
}


export default App;