const steps = [
  { num: '01', title: 'Discovery', desc: 'We map your goals, constraints, and technical landscape in a structured workshop to define a shared vision.' },
  { num: '02', title: 'Architecture', desc: 'Our architects design a scalable, future-proof solution blueprint before a single line of code is written.' },
  { num: '03', title: 'Build & Test', desc: 'Agile sprints with continuous integration, automated testing, and regular demos keep quality high throughout.' },
  { num: '04', title: 'Launch & Scale', desc: 'We deploy, monitor, and iterate post-launch — with SLA-backed support to keep everything running smoothly.' },
];

export default function ProcessSection() {
  return (
    <section id="process" style={{ background: 'var(--navy2)' }}>
      <div className="section-inner">
        <p className="section-tag">How we work</p>
        <h2 className="section-title">A process built for clarity</h2>
        <p className="section-sub">
          No surprises. No scope creep. Just a structured four-stage approach
          that keeps everyone aligned from kickoff to launch.
        </p>
        <div className="process-steps">
          {steps.map((s) => (
            <div key={s.num} className="step">
              <div className="step-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
