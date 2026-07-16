/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict Mode double-invokes effects in dev to surface missing cleanup
  // logic. That's valuable in general, but it can race with GSAP's
  // entrance timeline here (context revert firing mid-animation), which
  // was leaving hero text stuck at opacity 0. Turning it off avoids that
  // dev-only flicker; it has no effect on the production build.
  reactStrictMode: false,
};

module.exports = nextConfig;
