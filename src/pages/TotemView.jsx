import { useState } from 'react';
import { CheckCircle2, Clock, QrCode, ScanFace } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TotemView({ identified, findByPlate, simulateIdentification }) {
  const [plate, setPlate] = useState('');
  const navigate = useNavigate();

  function submitPlate(event) {
    event.preventDefault();
    findByPlate(plate);
  }

  return (
    <section className="screen totem-screen">
      <div className="screen-heading centered">
        <span className="eyebrow">Totem de entrada</span>
        <h2>Identificacao do veiculo</h2>
      </div>
      <div className="totem-device">
        <div className="totem-camera"><ScanFace size={58} /></div>
        <form className="plate-search" onSubmit={submitPlate}>
          <input
            value={plate}
            onChange={(event) => setPlate(event.target.value)}
            placeholder="Digite a placa"
            aria-label="Digite a placa"
          />
          <button type="submit">Buscar</button>
        </form>
        <div className="totem-actions">
          <button onClick={() => simulateIdentification('QR Code')}><QrCode size={18} /> QR Code</button>
          <button onClick={() => simulateIdentification('Facial')}><ScanFace size={18} /> Facial</button>
        </div>
        <div className={identified ? 'approval-panel approved' : 'approval-panel'}>
          {identified ? (
            <>
              <CheckCircle2 size={34} />
              <h3>Servico liberado</h3>
              <p>{identified.customer.name} - {identified.vehicle.plate}</p>
              <div className="approval-grid">
                <span>Cliente encontrado</span>
                <span>Veiculo encontrado</span>
                <span>Plano ativo</span>
                <span>{identified.method}</span>
              </div>
              <button className="primary-action" onClick={() => navigate('/lavagem')}>Ir para lavagem</button>
            </>
          ) : (
            <>
              <Clock size={34} />
              <h3>Aguardando identificacao</h3>
              <p>Use a placa AWS2026, uma placa cadastrada ou acione uma simulacao.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
