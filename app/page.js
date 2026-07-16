import VideoIntro from "@/components/VideoIntro";
import WhoIAm from "@/components/WhoIAm";
import TechnicalSkills from "@/components/TechnicalSkills";
import Certifications from "@/components/Certifications";
import SelectedWork from "@/components/SelectedWork";

export default function Home() {
  return (
    <main>
      <VideoIntro
        videoSrc="/videos/hero.mp4"
        firstName="Jeremy"
        role="AI Automation · Web Design · Full Stack Developer"
        skills={["n8n", "Make", "Zapier", "Claude Code", "Linux"]}
        githubUrl="https://github.com/ZeroTouchAI"
        openToWork
      />

      <WhoIAm />
      <TechnicalSkills />
      <Certifications />
      <SelectedWork />
    </main>
  );
}
