import styles from "./Certifications.module.css";
import CinematicLayer from "./CinematicLayer";

const CERTIFICATIONS = [
  {
    title: "AI for Organizational Leaders",
    issuer: "Microsoft & LinkedIn Learning",
    year: "2025",
  },
  {
    title: "AI for Managers",
    issuer: "Microsoft & LinkedIn Learning",
    year: "2025",
  },
  {
    title: "Human Skills in the Age of AI",
    issuer: "Microsoft & LinkedIn Learning",
    year: "2025",
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn Learning",
    year: "2025",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className={styles.section}>
      <CinematicLayer />
      <span className={styles.cornerNumber}>03</span>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>Credentials</span>
        <h2 className={styles.heading}>Certifications</h2>

        <div className={styles.grid}>
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.title} className={styles.card}>
              <span className={styles.year}>{cert.year}</span>
              <h3 className={styles.cardTitle}>{cert.title}</h3>
              <p className={styles.issuer}>{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
