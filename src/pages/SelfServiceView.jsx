import { useState } from 'react';
import { Droplets, Gauge, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { selfServiceOptions } from '../data/catalog.js';

export function SelfServiceView({
  identified,
  selfMinutes,
  setSelfMinutes,
  selfRemaining,
  setSelfRemaining,
  selfActive,
  startSelfService,
}) {
  const [feedback, setFeedback] = useState(null);
  const totalSeconds = selfMinutes * 60;
  const remainingLabel = `${Math.floor(selfRemaining / 60)}:${String(selfRemaining % 60).padStart(2, '0')}`;
  const selectedOption =
    selfServiceOptions.find((option) => option.minutes === selfMinutes) || selfServiceOptions[0];
  const navigate = useNavigate();

  function selectTime(minutes) {
    if (selfActive) return;
    setSelfMinutes(minutes);
    setSelfRemaining(minutes * 60);
    setFeedback(null);
  }

  function handleStart() {
    const result = startSelfService(selfMinutes);
    setFeedback({ type: result.ok ? 'success' : 'error', message: result.message });
  }

  return (
    <section className="screen split-screen">
      <div>
        <div className="screen-heading">
          <span className="eyebrow">Box self-service</span>
          <h2>Controle de tempo e consumo</h2>
        </div>

        {identified ? (
          <div className="approval-panel approved">
            <strong>Veículo autorizado</strong>
            <p>
              {identified.customer.name} — {identified.vehicle.plate} — identificação por{' '}
              {identified.method}
            </p>
          </div>
        ) : (
          <div className="approval-panel">
            <ShieldAlert size={28} />
            <strong>Identificação obrigatória</strong>
            <p>Libere o cliente e o veículo no totem antes de ocupar o box.</p>
            <button
              className="text-action compact-action"
              onClick={() => navigate('/app/admin/totem')}
            >
              Voltar ao totem
            </button>
          </div>
        )}

        <div className="time-options">
          {selfServiceOptions.map((option) => (
            <button
              key={option.minutes}
              onClick={() => selectTime(option.minutes)}
              className={selfMinutes === option.minutes ? 'selected' : ''}
              disabled={selfActive}
            >
              {option.minutes} min — R$ {option.price.toFixed(2)}
            </button>
          ))}
        </div>
        <button
          className="primary-action"
          onClick={handleStart}
          disabled={selfActive || !identified}
        >
          {selfActive ? 'Box em uso' : 'Liberar box'} <Droplets size={18} />
        </button>

        {feedback && (
          <div
            className={feedback.type === 'success' ? 'approval-panel approved' : 'approval-panel'}
            style={{ marginTop: 16 }}
          >
            <strong>{feedback.type === 'success' ? 'Box liberado' : 'Liberação bloqueada'}</strong>
            <p>{feedback.message}</p>
          </div>
        )}
      </div>
      <div className="self-console">
        <Gauge size={44} />
        <h3>
          {selfActive ? `${remainingLabel} restantes` : `${selfMinutes} minutos selecionados`}
        </h3>
        <strong>R$ {selectedOption.price.toFixed(2)}</strong>
        <div className="meter">
          <span
            style={{
              width: `${selfActive ? Math.max((selfRemaining / Math.max(totalSeconds, 1)) * 100, 5) : 100}%`,
            }}
          />
        </div>
        <p>
          Consumo simulado:{' '}
          {selfActive ? Math.max(1, Math.round((totalSeconds - selfRemaining) * 0.45)) : 0} L
        </p>
        <div className="tag-list">
          <span>Água pressurizada</span>
          <span>Espuma</span>
          <span>Aspirador</span>
        </div>
      </div>
    </section>
  );
}
