export function SimChart({ title, points, summary }) {
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <article className="chart-card">
      <div className="chart-heading">
        <h3>{title}</h3>
        {summary && <strong>{summary}</strong>}
      </div>
      <div className="bars">
        {points.map((point) => {
          const height = Math.max(8, Math.round((point.value / max) * 100));
          return (
            <div className="bar-item" key={point.label}>
              <span className="bar-value">{point.display}</span>
              <span className="bar-fill" style={{ height: `${height}%` }} />
              <small>{point.label}</small>
            </div>
          );
        })}
      </div>
    </article>
  );
}
