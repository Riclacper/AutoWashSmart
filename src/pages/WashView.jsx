import { useState } from 'react';
import { Car, CreditCard, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { serviceOptions, washSteps } from '../data/catalog.js';

export function WashView({
  identified,
  selectedService,
  setSelectedService,
  washProgress,
  isWashing,
  startWash,
  checkout,
}) {
  const [feedback, setFeedback] = useState(null);
  const activeStep = Math.min(Math.floor(washProgress / 20), washSteps.length - 1);
  const navigate = useNavigate();

  function handleStartWash() {
    const result = startWash();
    setFeedback({ type: result.ok ? 'success' : 'error', message: result.message });
  }

  return (
    <section className="screen">
      <div className="screen-heading">
        <span className="eyebrow">Lavagem automatizada</span>
        <h2>Fluxo visual em tempo real</h2>
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
          <p>Nenhuma lavagem pode começar sem cliente e veículo liberados pelo totem.</p>
          <button
            className="text-action compact-action"
            onClick={() => navigate('/app/admin/totem')}
          >
            Voltar ao totem
          </button>
        </div>
      )}

      {feedback && (
        <div className={feedback.type === 'success' ? 'approval-panel approved' : 'approval-panel'}>
          <strong>
            {feedback.type === 'success' ? 'Operação iniciada' : 'Operação bloqueada'}
          </strong>
          <p>{feedback.message}</p>
        </div>
      )}

      <div className="service-strip">
        {serviceOptions.map((service) => (
          <button
            key={service.name}
            className={
              selectedService.name === service.name ? 'service-option selected' : 'service-option'
            }
            onClick={() => setSelectedService(service)}
            disabled={isWashing}
          >
            <strong>{service.name}</strong>
            <span>R$ {service.price.toFixed(2)}</span>
            <small>{service.duration}</small>
          </button>
        ))}
      </div>
      <div className="wash-stage">
        <div className="wash-animation">
          <Car size={76} />
          <div className="spray spray-one" />
          <div className="spray spray-two" />
        </div>
        <div className="progress-track">
          <span style={{ width: `${washProgress}%` }} />
        </div>
        <div className="step-grid">
          {washSteps.map((step, index) => (
            <div className={index <= activeStep ? 'step active' : 'step'} key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <button
          className="primary-action"
          onClick={handleStartWash}
          disabled={isWashing || !identified}
        >
          {isWashing ? 'Lavagem em andamento' : 'Iniciar lavagem'}
        </button>
      </div>
      {checkout && <CheckoutPanel checkout={checkout} />}
    </section>
  );
}

function CheckoutPanel({ checkout }) {
  return (
    <article className="checkout-panel">
      <CreditCard size={26} />
      <div>
        <h3>Pagamento aprovado</h3>
        <p>
          {checkout.service} — R$ {checkout.price.toFixed(2)}
        </p>
        <small>
          {checkout.customerName} — {checkout.vehiclePlate}
        </small>
      </div>
      <div className="checkout-times">
        <span>Entrada: {checkout.entry}</span>
        <span>Saída: {checkout.exit}</span>
      </div>
    </article>
  );
}
