import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const storyScript = {
  introSequence: [
    "Life began in the ocean.",
    "For billions of years, it has been the engine of our planet.",
    "Today, we are giving that engine a new pulse.",
  ],
  hero: {
    title: "BLUE IMPULSE",
    subtitle: "DeepTech for a Resilient Earth.",
  },
  chapter1: {
    title: "Imagine a Future...",
    paragraph:
      "Where industry doesn't drain nature, but fuels it. We envision a world where the microscopic power of algae solves the macroscopic challenges of our time—feeding our population and healing our climate simultaneously.",
  },
  chapter2: {
    heading: "Precision, Not Just Farming.",
    beat1: "It starts with a single cell.",
    beat2: "Optimized by AI. Protected by Science.",
    beat3: "Grown in controlled environments to ensure purity.",
    beat4: "Delivered at industrial scale.",
  },
  chapter3: {
    title: "One Impulse. Two Worlds.",
    agri: "Revitalizing our soils and shielding crops from climate chaos.",
    aqua: "Nourishing aquaculture without depleting our wild oceans.",
  },
  footer: {
    call: "Join the Cycle.",
    email: "contact@blueimpulse.com",
  },
};

const introDuration = 3000;

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const stickyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  const cellScale = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0.65, 0.95, 1.2, 1.3]
  );
  const cellGlow = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.35, 0.6, 0.95, 0.8]
  );
  const cyanBloom = useTransform(
    scrollYProgress,
    [0.25, 0.5, 0.8],
    [0, 1, 0.6]
  );
  const clusterOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  const beat1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.3], [1, 1, 0]);
  const beat2Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.55],
    [0, 1, 0]
  );
  const beat3Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.65, 0.8],
    [0, 1, 0]
  );
  const beat4Opacity = useTransform(
    scrollYProgress,
    [0.75, 0.9, 1],
    [0, 1, 1]
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), introDuration + 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="intro-sequence">
              {storyScript.introSequence.map((line, index) => (
                <motion.p
                  key={line}
                  className="intro-line"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1,
                    delay: index * 1,
                    ease: "easeInOut",
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero">
        <div className="hero-video" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-subtitle">{storyScript.hero.subtitle}</p>
          <h1 className="hero-title">{storyScript.hero.title}</h1>
          <div className="scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      <section className="chapter3">
        <h2>{storyScript.chapter3.title}</h2>
        <div className="chapter3-columns">
          <div>
            <h3>Agri</h3>
            <p>{storyScript.chapter3.agri}</p>
          </div>
          <div>
            <h3>Aqua</h3>
            <p>{storyScript.chapter3.aqua}</p>
          </div>
        </div>
      </section>

      <section className="sticky-section" ref={stickyRef}>
        <div className="sticky-heading">
          <p className="eyebrow">{storyScript.chapter2.heading}</p>
        </div>
        <div className="sticky-stage">
          <motion.div
            className="cell-core"
            style={{ scale: cellScale, opacity: cellGlow }}
          >
            <motion.div className="cell-bloom" style={{ opacity: cyanBloom }} />
            <motion.div className="cell-cluster" style={{ opacity: clusterOpacity }}>
              <span />
              <span />
              <span />
            </motion.div>
          </motion.div>
          <div className="sticky-copy">
            <motion.p style={{ opacity: beat1Opacity }}>
              {storyScript.chapter2.beat1}
            </motion.p>
            <motion.p style={{ opacity: beat2Opacity }}>
              {storyScript.chapter2.beat2}
            </motion.p>
            <motion.p style={{ opacity: beat3Opacity }}>
              {storyScript.chapter2.beat3}
            </motion.p>
            <motion.p style={{ opacity: beat4Opacity }}>
              {storyScript.chapter2.beat4}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="chapter1">
        <div className="chapter1-text">
          <h2>{storyScript.chapter1.title}</h2>
          <p>{storyScript.chapter1.paragraph}</p>
        </div>
        <div className="chapter1-image" aria-hidden="true" />
      </section>

      <footer className="footer">
        <p className="footer-call">{storyScript.footer.call}</p>
        <a className="footer-email" href={`mailto:${storyScript.footer.email}`}>
          {storyScript.footer.email}
        </a>
        <button type="button" className="footer-button">
          Partner with Us
        </button>
      </footer>
    </div>
  );
}
