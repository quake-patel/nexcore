export default function TrustLogos() {
  const logos = ['Accenture', 'Microsoft', 'AWS', 'Deloitte', 'Oracle', 'Cisco'];
  return (
    <div className="logos">
      <div className="logos-inner">
        <p>Trusted by</p>
        {logos.map((name) => (
          <div key={name} className="logo-pill">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
