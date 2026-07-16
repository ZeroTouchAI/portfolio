import styles from "./WhoIAm.module.css";
import CinematicLayer from "./CinematicLayer";

export default function WhoIAm() {
  return (
    <section id="who-i-am" className={styles.section}>
      <CinematicLayer />
      <span className={styles.cornerNumber}>01</span>

      <div className={styles.card}>
        <span className={styles.eyebrow}>About · Profile</span>
        <h2 className={styles.heading}>Who I Am</h2>

        <p className={styles.body}>
          AI Automation Specialist with <strong>10+ years</strong> of
          experience across enterprise infrastructure and operations,
          starting with NOC monitoring at Bell Canada and later data center
          operations at TD Bank. Today, as founder of{" "}
          <strong>2 companies</strong>, Zero Touch AI and Rapid Rank Agency,
          that reliability first background goes into building AI driven
          workflows, backend integrations, and intelligent systems for
          growing businesses. Holds <strong>4 certifications</strong> in
          applied AI from Microsoft and LinkedIn Learning.
        </p>

        <div className={styles.pillRow}>
          <span className={styles.pill}>AI Automation</span>
          <span className={styles.pill}>Backend Integrations</span>
          <span className={styles.pill}>Infrastructure</span>
          <span className={styles.pill}>Problem Solver</span>
        </div>
      </div>
    </section>
  );
}
