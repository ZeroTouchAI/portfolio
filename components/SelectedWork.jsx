import styles from "./SelectedWork.module.css";
import CinematicLayer from "./CinematicLayer";

const PROJECTS = [
  {
    name: "Effortless Cold Calling",
    description:
      "An AI powered cold calling system that automates outbound sales calls for businesses.",
  },
  {
    name: "Effortless Social Media",
    description:
      "An AI system that generates and manages social media content automatically.",
  },
  {
    name: "Google Reviews Automation",
    description:
      "An automation system that helps businesses collect and manage Google reviews.",
  },
  {
    name: "AI Influencer System",
    description:
      "Given a product and some details about it, this system generates an AI influencer that creates promotional content for that product.",
  },
  {
    name: "Print on Demand AI Automation",
    description:
      "An automation system that designs custom print on demand clothing and publishes the listings automatically.",
  },
  {
    name: "AI Driver Assistance System",
    description:
      "Built for a trucking company. Handles scheduling, routing, paychecks, and customer invoices, tracks profit and loss, generates monthly reports with suggestions for reducing costs, and sends reminders like birthdays and unpaid payment notices.",
  },
  {
    name: "Automated Job Search System",
    description:
      "Finds job openings that match a person's criteria, then delivers the job link along with a resume tailored specifically to that role.",
  },
  {
    name: "Real Estate Cold Call Outreach",
    description:
      "Calls people in a target area to invite them to open houses, and asks for referrals from anyone who might know someone interested, collecting their details for the agent to follow up.",
  },
];

export default function SelectedWork() {
  return (
    <section id="selected-work" className={styles.section}>
      <CinematicLayer />
      <span className={styles.cornerNumber}>04</span>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>Selected Work</span>
        <h2 className={styles.heading}>Recent Builds from Zero Touch AI</h2>
        <p className={styles.intro}>
          A collection of AI automation systems built for real businesses.
          More projects are being published at{" "}
          <a
            href="https://zerotouchai.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.introLink}
          >
            zerotouchai.com
          </a>
          .
        </p>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <div key={project.name} className={styles.card}>
              <h3 className={styles.cardTitle}>{project.name}</h3>
              <p className={styles.cardDescription}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
