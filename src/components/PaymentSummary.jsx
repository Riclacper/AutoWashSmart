import { CheckCircle2, CreditCard } from 'lucide-react';

export function PaymentSummary({ payment, title = 'Pagamento aprovado' }) {
  if (!payment) return null;

  return (
    <article className="payment-summary">
      <CreditCard size={26} />
      <div className="payment-main">
        <h3>{title}</h3>
        <p>
          {payment.service} - R$ {payment.price.toFixed(2)}
        </p>
        <small>
          {payment.customerName}
          {payment.vehiclePlate ? ` - ${payment.vehiclePlate}` : ''}
        </small>
      </div>
      <div className="payment-meta">
        <span>Data: {payment.date}</span>
        <span>Horário: {payment.time}</span>
        <strong>
          <CheckCircle2 size={16} /> {payment.status}
        </strong>
      </div>
    </article>
  );
}
