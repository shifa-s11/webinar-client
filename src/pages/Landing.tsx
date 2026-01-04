type Props = {
  onEnter: () => void;
};

function Landing({ onEnter }: Props) {
  return (
    <div className="landing-root">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="badge">LIVE • INTERACTIVE • FREE</span>

          <h1>
            Attend <span>Live Webinars</span><br />
            Learn From Experts
          </h1>

          <p>
            Discover high-quality webinars, register instantly, and grow your
            skills with industry professionals — all in one seamless platform.
          </p>

          <div className="hero-actions">
            <button onClick={onEnter}>Explore Webinars</button>
            <button className="secondary">How it works</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <h3>📅 Scheduled Sessions</h3>
          <p>Join well-planned webinars with clear schedules and topics.</p>
        </div>

        <div className="feature-card">
          <h3>👥 Real-time Registration</h3>
          <p>Register instantly and see attendee count update live.</p>
        </div>

        <div className="feature-card">
          <h3>⚡ Fast & Simple</h3>
          <p>Minimal UI, blazing fast loading, no unnecessary complexity.</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
