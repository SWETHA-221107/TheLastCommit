import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Terminal,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";

function Home() {
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const target = event.currentTarget;

    const rect = target.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    target.style.setProperty("--mouse-x", `${x}%`);
    target.style.setProperty("--mouse-y", `${y}%`);
  };

  const missions = [
    {
      number: "01",
      title: "CREATE",
      text: "Start with an idea that refuses to stay an idea.",
    },
    {
      number: "02",
      title: "BREAK",
      text: "Challenge assumptions. Break things. Learn faster.",
    },
    {
      number: "03",
      title: "SHIP",
      text: "Build something people actually want to use.",
    },
  ];

  const timeline = [
    ["01", "INITIALIZE", "Enter the grid."],
    ["02", "IDEATE", "Find the problem worth solving."],
    ["03", "BUILD", "Turn caffeine into code."],
    ["04", "DEBUG", "Nothing works on the first try."],
    ["05", "DEPLOY", "Put your idea into the world."],
    ["06", "COMMIT", "Make your final push count."],
  ];

  const faqs = [
    {
      question: "WHO CAN PARTICIPATE?",
      answer:
        "Anyone ready to build, experiment and learn. Bring your curiosity, your ideas and your favourite code editor.",
    },
    {
      question: "DO I NEED A TEAM?",
      answer:
        "You can participate with a team or start solo. The important part is showing up ready to build.",
    },
    {
      question: "WHAT CAN I BUILD?",
      answer:
        "Anything meaningful. AI tools, developer products, social impact solutions, creative technology or an idea nobody has tried yet.",
    },
    {
      question: "WHAT SHOULD I BRING?",
      answer:
        "Your laptop, your skills, your ideas and enough determination to survive the final commit.",
    },
  ];

  return (
    <div
      className="app"
      onMouseMove={handleMouseMove}
    >
      <Navbar />

      {/* HERO */}
      <main className="hero">
        <div className="grid-background" />
        <div className="hero-glow" />
        <ParticleBackground />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="terminal-line">
            <span>
              <Terminal size={14} />
              root@lastcommit:~$
            </span>{" "}
            ./start-hackathon
          </div>

          <div className="hero-status">
            <span className="status-dot" />
            SYSTEM ONLINE / REGISTRATION OPEN
          </div>

          <h1>
            THE
            <br />
            <span className="hero-outline">LAST</span>
            <br />
            COMMIT<span className="cursor">_</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">
              One final push.
              <br />
              One final build.
              <br />
              One chance to ship something unforgettable.
            </p>

            <div className="hero-buttons">
              <a href="/register" className="primary-button">
                ENTER THE GRID
                <ArrowRight size={18} />
              </a>

              <a href="#story" className="secondary-button">
                EXPLORE EVENT
                <ArrowDown size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          SCROLL TO INITIALIZE
          <ArrowDown size={15} />
        </motion.div>

        <div className="hero-corner hero-corner-left">
          13.0827° N
          <br />
          80.2707° E
        </div>

        <div className="hero-corner hero-corner-right">
          BUILD_01
          <br />
          STATUS: LIVE
        </div>
      </main>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          <span>BUILD</span>
          <i>✦</i>
          <span>BREAK</span>
          <i>✦</i>
          <span>DEBUG</span>
          <i>✦</i>
          <span>DEPLOY</span>
          <i>✦</i>
          <span>COMMIT</span>
          <i>✦</i>

          <span>BUILD</span>
          <i>✦</i>
          <span>BREAK</span>
          <i>✦</i>
          <span>DEBUG</span>
          <i>✦</i>
          <span>DEPLOY</span>
          <i>✦</i>
          <span>COMMIT</span>
          <i>✦</i>
        </div>
      </div>

      {/* STORY */}
      <section
        id="story"
        className="section story-section"
      >
        <div className="section-label">
          01 / THE LAST COMMIT
        </div>

        <motion.div
          className="story-layout"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="story-number">001</div>

          <div className="story-content">
            <p className="big-text">
              Every developer knows
              <br />
              <span>the feeling.</span>
            </p>

            <p className="story-text">
              It's 3:47 AM. The code almost works.
              One bug remains. One feature is unfinished.
              Your laptop is running on questionable amounts
              of caffeine.
            </p>

            <p className="story-highlight">
              And somehow...
              <br />
              there is still one commit left.
            </p>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stat-block">
          <span>TIME LIMIT</span>
          <strong>48<span>HRS</span></strong>
        </div>

        <div className="stat-block">
          <span>MISSION</span>
          <strong>01<span>BUILD</span></strong>
        </div>

        <div className="stat-block">
          <span>RULE</span>
          <strong>∞<span>IDEAS</span></strong>
        </div>

        <div className="stat-block">
          <span>OBJECTIVE</span>
          <strong>SHIP<span>IT</span></strong>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="section mission-section">
        <div className="section-label">
          02 / THE MISSION
        </div>

        <div className="section-heading-row">
          <h2 className="section-heading">
            THREE RULES.
            <br />
            <span>ONE OBJECTIVE.</span>
          </h2>

          <p className="section-side-text">
            No boring assignments.
            <br />
            No copy-paste solutions.
            <br />
            Just build something worth shipping.
          </p>
        </div>

        <div className="mission-grid">
          {missions.map((item, index) => (
            <motion.div
              className="mission-card"
              key={item.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
              }}
              whileHover={{
                y: -12,
              }}
            >
              <div className="card-top">
                <span>{item.number}</span>
                <Zap size={18} />
              </div>

              <h2>{item.title}</h2>

              <p>{item.text}</p>

              <div className="card-arrow">
                <ArrowRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TERMINAL */}
      <section className="terminal-section">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span />
              <span />
              <span />
            </div>

            <span>lastcommit.sh</span>

            <span>● LIVE</span>
          </div>

          <div className="terminal-body">
            <p>
              <span className="green">root@lastcommit</span>
              :~$ ./initialize
            </p>

            <p className="muted">
              Initializing hackathon environment...
            </p>

            <p>
              <span className="green">[OK]</span>{" "}
              creativity module loaded
            </p>

            <p>
              <span className="green">[OK]</span>{" "}
              caffeine levels acceptable
            </p>

            <p>
              <span className="green">[OK]</span>{" "}
              impossible ideas permitted
            </p>

            <p>
              <span className="green">[OK]</span>{" "}
              deployment pipeline ready
            </p>

            <p className="terminal-final">
              <span className="green">
                root@lastcommit
              </span>
              :~$ <span className="blink">_</span>
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section
        id="timeline"
        className="section timeline-section"
      >
        <div className="section-label">
          03 / THE BUILD
        </div>

        <div className="section-heading-row">
          <h2 className="section-heading">
            FROM ZERO
            <br />
            <span>TO DEPLOYED.</span>
          </h2>

          <p className="section-side-text">
            Every great product starts
            <br />
            with a single line of code.
          </p>
        </div>

        <div className="timeline">
          {timeline.map(([number, title, text], index) => (
            <motion.div
              className="timeline-item"
              key={number}
              initial={{
                opacity: 0,
                x: -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
              }}
            >
              <span className="timeline-number">
                {number}
              </span>

              <div className="timeline-line" />

              <div className="timeline-content">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="challenge-section">
        <div className="challenge-inner">
          <div className="section-label">
            04 / CHALLENGE
          </div>

          <h2>
            DON'T JUST
            <br />
            <span>BUILD.</span>
            <br />
            MATTER.
          </h2>

          <p>
            Build something that solves a problem,
            creates an experience or makes someone
            say:
          </p>

          <div className="quote">
            "Wait... you actually built that?"
          </div>

          <a href="/register" className="outline-button">
            ACCEPT THE CHALLENGE
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="section-label">
          05 / FREQUENTLY ASKED
        </div>

        <div className="faq-layout">
          <h2 className="section-heading">
            QUESTIONS
            <br />
            <span>?</span>
          </h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                className={`faq-item ${
                  activeFaq === index
                    ? "faq-active"
                    : ""
                }`}
                key={faq.question}
                onClick={() =>
                  setActiveFaq(
                    activeFaq === index ? null : index
                  )
                }
              >
                <div className="faq-question">
                  <span>
                    0{index + 1}
                  </span>

                  <strong>{faq.question}</strong>

                  <span className="faq-plus">
                    {activeFaq === index ? "−" : "+"}
                  </span>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height:
                      activeFaq === index
                        ? "auto"
                        : 0,
                    opacity:
                      activeFaq === index ? 1 : 0,
                  }}
                  className="faq-answer"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="register-section">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="section-label">
            06 / FINAL PUSH
          </div>

          <h2>
            READY TO MAKE
            <br />
            YOUR <span>LAST COMMIT?</span>
          </h2>

          <p>
            Prepare your team.
            <br />
            Your final push starts here.
          </p>

          <a
            href="/register"
            className="register-button"
          >
            REGISTER NOW
            <ArrowRight size={18} />
          </a>
          <a href="/admin" className="home-admin-button">
            ADMIN PORTAL
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;