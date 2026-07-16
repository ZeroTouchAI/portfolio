import styles from "./TechnicalSkills.module.css";
import CinematicLayer from "./CinematicLayer";

const SKILL_GROUPS = [
  {
    title: "AI & Automation",
    skills: [
      "AI Workflow Automation",
      "Business Process Automation",
      "Backend System Integrations",
      "Workflow Optimization",
      "AI Operations Support",
      "AI System Monitoring",
    ],
  },
  {
    title: "Automation Tools",
    skills: ["n8n", "Make", "Zapier", "Claude Code"],
  },
  {
    title: "Infrastructure & Systems",
    skills: [
      "Data Center Operations",
      "Server Deployment & Maintenance",
      "Rack & Stack Infrastructure",
      "Structured Cabling",
      "Power Distribution (PDU/RPDU)",
      "Redundancy & Failover Validation",
    ],
  },
  {
    title: "Systems & Networking",
    skills: [
      "Windows",
      "Linux",
      "Unix",
      "TCP/IP",
      "DNS · DHCP · VLANs",
      "Firewalls",
      "SAN/NAS",
      "VMware",
    ],
  },
  {
    title: "Monitoring & Operations",
    skills: [
      "Zabbix Monitoring",
      "System Performance Monitoring",
      "Uptime & Reliability Management",
      "Infrastructure Troubleshooting",
    ],
  },
];

export default function TechnicalSkills() {
  return (
    <section id="technical-skills" className={styles.section}>
      <CinematicLayer />
      <span className={styles.cornerNumber}>02</span>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>Capabilities</span>
        <h2 className={styles.heading}>Technical Skills</h2>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <div className={styles.pillRow}>
                {group.skills.map((skill) => (
                  <span key={skill} className={styles.pill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
