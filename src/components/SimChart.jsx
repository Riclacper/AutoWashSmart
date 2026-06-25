import { useState } from 'react';

export function SimChart({ title, points, summary, selected = false, expanded = false, onSelect }) {
  const [activePoint, setActivePoint] = useState(null);
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <article
      className={[
        'chart-card',
        selected ? 'selected' : '',
        expanded ? 'expanded' : '',
      ].filter(Boolean).join(' ')}
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onSelect) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="chart-heading">
        <h3>{title}</h3>
        {summary && <strong>{summary}</strong>}
      </div>
      <div className="bars">
        {points.map((point) => {
          const height = Math.max(8, Math.round((point.value / max) * 100));
          return (
            <div
              className={activePoint?.label === point.label ? 'bar-item active' : 'bar-item'}
              key={point.label}
              onMouseEnter={() => setActivePoint(point)}
              onMouseLeave={() => setActivePoint(null)}
              onFocus={() => setActivePoint(point)}
              onBlur={() => setActivePoint(null)}
              onClick={(event) => {
                event.stopPropagation();
                setActivePoint((current) => (current?.label === point.label ? null : point));
              }}
              role="button"
              tabIndex={0}
            >
              <span className="bar-value">{point.display}</span>
              <span className="bar-fill" style={{ height: `${height}%` }} />
              <small>{point.label}</small>
              {activePoint?.label === point.label && (
                <span className="bar-detail">
                  <strong>{point.label}</strong>
                  {point.detail || point.display}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}
