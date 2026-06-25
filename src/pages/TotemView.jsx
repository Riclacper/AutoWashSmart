import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock, QrCode, ScanFace, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TotemView({ customers, identified, findByPlate, simulateIdentification }) {
  const [plate, setPlate] = useState('');
  const [feedback, setFeedback] = useState(null);
  const profiles = useMemo(
    () =>
      customers.flatMap((customer) =>
        customer.vehicles.map((vehicle) => ({
          key: `${customer.id}:${vehicle.plate}`,
          customerId: customer.id,
          customerName: customer.name,
          plate: vehicle.plate,
          qrToken: customer.qrToken,
          faceLabel: customer.faceLabel,
        })),
      ),
    [customers],
  );
  const [selectedProfileKey, setSelectedProfileKey] = useState(profiles[0]?.key || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!profiles.length) {
      setSelectedProfileKey('');
      return;
    }
    if (!profiles.some((profile) => profile.key === selectedProfileKey)) {
      setSelectedProfileKey(profiles[0].key);
    }
  }, [profiles, selectedProfileKey]);

  function submitPlate(event) {
    event.preventDefault();
    const result = findByPlate(plate);
    setFeedback({ type: result.ok ? 'success' : 'error', message: result.message });
  }

  function runSimulation(method) {
    const selectedProfile =
      profiles.find((profile) => profile.key === selectedProfileKey) || profiles[0];
    if (!selectedProfile) {
      setFeedback({ type: 'error', message: 'Cadastre um cliente antes de simular o acesso.' });
      return;
    }

    const result = simulateIdentification(
      method,
      selectedProfile.customerId,
      selectedProfile.plate,
    );
    setFeedback({ type: result.ok ? 'success' : 'error', message: result.message });
  }

  return (
    <section className="screen totem-screen">
      <div className="screen-heading centered">
        <span className="eyebrow">Totem de entrada</span>
        <h2>Identificação do veículo</h2>
      </div>
      <div className="totem-device">
        <div className="totem-camera">
          <ScanFace size={58} />
        </div>
        <form className="plate-search" onSubmit={submitPlate}>
          <input
            value={plate}
            onChange={(event) => setPlate(event.target.value)}
            placeholder="Digite a placa"
            aria-label="Digite a placa"
          />
          <button type="submit">Buscar</button>
        </form>

        <label className="field" style={{ marginTop: 16 }}>
          <span>Perfil para simulação de QR Code ou reconhecimento facial</span>
          <select
            value={selectedProfileKey}
            onChange={(event) => setSelectedProfileKey(event.target.value)}
          >
            {profiles.map((profile) => (
              <option value={profile.key} key={profile.key}>
                {profile.customerName} — {profile.plate}
              </option>
            ))}
          </select>
        </label>

        <div className="totem-actions">
          <button onClick={() => runSimulation('QR Code')}>
            <QrCode size={18} /> Ler QR Code
          </button>
          <button onClick={() => runSimulation('Facial')}>
            <ScanFace size={18} /> Reconhecer rosto
          </button>
        </div>

        {feedback && (
          <div
            className={feedback.type === 'success' ? 'approval-panel approved' : 'approval-panel'}
          >
            <strong>
              {feedback.type === 'success' ? 'Identificação concluída' : 'Acesso não liberado'}
            </strong>
            <p>{feedback.message}</p>
          </div>
        )}

        <div className={identified ? 'approval-panel approved' : 'approval-panel'}>
          {identified ? (
            <>
              <CheckCircle2 size={34} />
              <h3>Serviço liberado</h3>
              <p>
                {identified.customer.name} — {identified.vehicle.plate}
              </p>
              <div className="approval-grid">
                <span>Cliente encontrado</span>
                <span>Veículo encontrado</span>
                <span>Plano {identified.customer.plan}</span>
                <span>{identified.method}</span>
              </div>
              <div className="totem-actions">
                <button className="primary-action" onClick={() => navigate('/app/admin/lavagem')}>
                  <Waves size={18} /> Ir para lavagem
                </button>
                <button
                  className="primary-action"
                  onClick={() => navigate('/app/admin/self-service')}
                >
                  Ir para self-service
                </button>
              </div>
            </>
          ) : (
            <>
              <Clock size={34} />
              <h3>Aguardando identificação</h3>
              <p>Use a placa AWS2026, uma placa cadastrada ou selecione um perfil demo.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
