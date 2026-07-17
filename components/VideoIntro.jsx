"use client";

import { useEffect, useRef, useState } from "react";
import CinematicLayer from "./CinematicLayer";
import styles from "./VideoIntro.module.css";

export default function VideoIntro({
  videoSrc,
  firstName,
  lastName,
  role,
  skills = [],
  githubUrl,
  openToWork = true,
}) {
  const foregroundVideoRef = useRef(null);
  const backgroundVideoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(true);

  // Try to autoplay with sound on. Browsers commonly block unmuted
  // autoplay until the visitor has interacted with the page at least
  // once, so if that's blocked, fall back to muted autoplay instead of
  // the video just not playing at all.
  useEffect(() => {
    const video = foregroundVideoRef.current;
    if (!video) return;

    video.muted = false;
    const playAttempt = video.play();

    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }
  }, []);

  function togglePlay() {
    const video = foregroundVideoRef.current;
    const bgVideo = backgroundVideoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      bgVideo?.pause();
    } else {
      video.play();
      bgVideo?.play();
    }
    setIsPlaying(!isPlaying);
  }

  function toggleMute() {
    const video = foregroundVideoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  function scrollToNext() {
    document
      .getElementById("who-i-am")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className={styles.hero}>
      {/* Blurred ambient background layer */}
      {videoAvailable && (
        <video
          ref={backgroundVideoRef}
          className={styles.bgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      )}

      {/* Fallback gradient shown if no video source is present yet */}
      <div className={styles.fallbackGradient} />

      {/* Foreground talking-head video, shown in an oval, feather-edged
          panel at its native aspect ratio so footage isn't cropped
          through the face. Controls live in a wrapper alongside the
          panel (not inside it) so the oval mask doesn't fade them out,
          while still keeping them visually anchored to the video in
          both the desktop and stacked mobile layouts. */}
      {videoAvailable && (
        <div className={styles.videoWrapper}>
          <div className={styles.videoPanel}>
            <video
              ref={foregroundVideoRef}
              className={styles.fgVideo}
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onError={() => setVideoAvailable(false)}
            />
          </div>
        </div>
      )}

      <div className={styles.gradientOverlay} />

      <CinematicLayer />

      <div className={styles.content}>
        {openToWork && (
          <span className={`${styles.openBadge} ${styles.enterFade1}`}>
            <span className={styles.openDot} />
            Open to Work
          </span>
        )}

        <div className={styles.nameRow}>
          <h1 className={styles.name}>
            <span className={`${styles.nameLine} ${styles.enterFade2}`}>
              {firstName}
            </span>
            {lastName && (
              <span className={`${styles.nameLine} ${styles.enterFade3}`}>
                {lastName}
              </span>
            )}
          </h1>

          {videoAvailable && (
            <div className={`${styles.controls} ${styles.mobileControls}`}>
              {isMuted && (
                <span className={styles.soundHint}>Click for sound</span>
              )}
              <div className={styles.glassButtonRow}>
                <button
                  type="button"
                  className={styles.glassButton}
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  type="button"
                  className={styles.glassButton}
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <MutedIcon /> : <UnmutedIcon />}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className={`${styles.role} ${styles.enterFade4}`}>{role}</p>

        {skills.length > 0 && (
          <div className={styles.skillRow}>
            {skills.map((skill, i) => (
              <span
                key={skill}
                className={`${styles.skillPill} ${styles.enterFade}`}
                style={{ animationDelay: `${0.55 + i * 0.06}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className={styles.actionsRow}>
          <div className={`${styles.actions} ${styles.enterFade5}`}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() =>
                document
                  .getElementById("selected-work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </button>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.textLink}
              >
                GitHub ↗
              </a>
            )}
          </div>

          {videoAvailable && (
            <div className={`${styles.controls} ${styles.desktopControls}`}>
              {isMuted && (
                <span className={styles.soundHint}>Click for sound</span>
              )}
              <div className={styles.glassButtonRow}>
                <button
                  type="button"
                  className={styles.glassButton}
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  type="button"
                  className={styles.glassButton}
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <MutedIcon /> : <UnmutedIcon />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.scrollIndicator} ${styles.enterFade6}`}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </button>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="2.5" width="3" height="11" fill="currentColor" />
      <rect x="9.5" y="2.5" width="3" height="11" fill="currentColor" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6H5L9 2.5V13.5L5 10H2V6Z" fill="currentColor" />
      <path
        d="M11 5.5L14 8.5M14 5.5L11 8.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UnmutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6H5L9 2.5V13.5L5 10H2V6Z" fill="currentColor" />
      <path
        d="M11.5 5.5C12.5 6.5 12.5 9.5 11.5 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
