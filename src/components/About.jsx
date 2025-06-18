import "../assets/About.css";

export default function About() {
  return (
    <div className="about-page">
      <main className="about-container">
        <header className="about-header">
          <img 
            src="/logo.png" 
            alt="Lets Debate" 
            className="about-logo" 
            loading="lazy"
          />
        </header>

        <article className="about-content">
          <h3><span role="img" aria-label="Brain">🧠</span> About Us – Lets Debate</h3>
          <p>
            Lets Debate is a dynamic platform dedicated to organizing in-person debate sessions across Jordan. We believe in the power of dialogue to spark ideas, challenge assumptions, and drive personal and societal growth.
          </p>
          <p>
            At our core, we are more than just event organizers — we are community builders, critical thinkers, and advocates for expression. Whether you're a student, professional, or just passionate about a topic, Lets Debate gives you the space to engage with others, sharpen your skills, and gain new perspectives.
          </p>

          <h3><span role="img" aria-label="Target">🎯</span> Our Mission</h3>
          <p>
            To foster a culture of structured dialogue and critical thinking by connecting people through in-person debates on topics that matter — from sports and medicine to finance, politics, and beyond.
          </p>

          <h3><span role="img" aria-label="Globe">🌍</span> Our Vision</h3>
          <p>
            To become the leading platform for debate and public discourse in the Arab world, starting with Jordan and expanding to other countries. We aim to create a generation of confident speakers, thoughtful listeners, and well-informed citizens.
          </p>

          <h3><span role="img" aria-label="Question mark">❓</span> Why Debates?</h3>
          <p>
            In an age of noise and polarization, we believe in the value of face-to-face conversation. Debating:
          </p>
          <ul>
            <li>Builds confidence and communication skills</li>
            <li>Encourages research and analytical thinking</li>
            <li>Promotes empathy and understanding of other perspectives</li>
            <li>Creates safe spaces for intellectual exploration</li>
          </ul>

          <h3><span role="img" aria-label="Megaphone">🗣️</span> Join the Conversation</h3>
          <p>
            Explore upcoming sessions, reserve your seat, or even apply to become a debater. Everyone has a voice — and at Lets Debate, every voice matters.
          </p>
        </article>
      </main>
    </div>
  );
}
