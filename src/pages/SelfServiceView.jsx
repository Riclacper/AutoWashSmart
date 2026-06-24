import { Droplets, Gauge } from 'lucide-react';

export function SelfServiceView({ selfMinutes, setSelfMinutes, selfRemaining, setSelfRemaining, selfActive, setSelfActive }) {
  const totalSeconds = selfMinutes * 60;
  const remainingLabel = `${Math.floor(selfRemaining / 60)}:${String(selfRemaining % 60).padStart(2, '0')}`;

  function selectTime(minutes) {
    setSelfMinutes(minutes);
    setSelfRemaining(minutes * 60);
    setSelfActive(false);
  }

  return (
    <section className="screen split-screen">
      <div>
        <div className="screen-heading">
          <span className="eyebrow">Box self-service</span>
          <h2>Controle de tempo e consumo</h2>
        </div>
        <div className="time-options">
          {[10, 20, 30].map((minutes) => (
            <button key={minutes} onClick={() => selectTime(minutes)} className={selfMinutes === minutes ? 'selected' : ''}>
              {minutes} min
            </button>
          ))}
        </div>
        <button className="primary-action" onClick={() => {
          if (selfRemaining === 0) setSelfRemaining(totalSeconds);
          setSelfActive(true);
        }}>
          Liberar box <Droplets size={18} />
        </button>
      </div>
      <div className="self-console">
        <Gauge size={44} />
        <h3>{selfActive ? `${remainingLabel} restantes` : `${selfMinutes} minutos selecionados`}</h3>
        <div className="meter">
          <span style={{ width: `${selfActive ? Math.max((selfRemaining / Math.max(totalSeconds, 1)) * 100, 5) : 100}%` }} />
        </div>
        <p>Consumo simulado: {selfActive ? Math.max(1, Math.round((totalSeconds - selfRemaining) * 0.45)) : 0} L</p>
        <div className="tag-list">
          <span>Agua pressurizada</span>
          <span>Espuma</span>
          <span>Aspirador</span>
        </div>
      </div>
    </section>
  );
}
