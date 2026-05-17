const techs = [
  'React','Next.js','Node.js','Python','Go','TypeScript','PostgreSQL','MongoDB',
  'Redis','Kubernetes','Docker','AWS','Azure','GCP','Terraform','GraphQL',
  'Kafka','Elasticsearch','TensorFlow','PyTorch','LangChain','Rust',
];

export default function TechnologiesSection() {
  return (
    <section id="technologies" style={{ background: 'var(--navy)' }}>
      <div className="section-inner">
        <p className="section-tag">Our stack</p>
        <h2 className="section-title">Battle-tested technologies</h2>
        <p className="section-sub">We pick the right tool for each job — not the trendiest one.</p>
        <div className="tech-grid">
          {techs.map((t) => (
            <div key={t} className="tech-pill">{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
