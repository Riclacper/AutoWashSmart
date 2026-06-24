export function SimChart({ title, values }) {
  return (
    <article className="chart-card">
      <h3>{title}</h3>
      <div className="bars">
        {values.map((value, index) => <span key={index} style={{ height: `${value}%` }} />)}
      </div>
    </article>
  );
}
