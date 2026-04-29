import { HelpCircle } from 'lucide-react';

export default function Faq() {
  const faqs = [
    {
      q: '¿Qué pasa si me equivoco al enviar un gasto?',
      a: 'Simplemente mandale otro mensaje a Lulu diciendo "borrá el último gasto" o "corregí lo anterior a 5000", y la inteligencia artificial se encargará del resto.'
    },
    {
      q: '¿Mis datos están seguros?',
      a: 'Tus datos son completamente privados. Solo vinculamos tu número de teléfono de forma segura para identificarte. No compartimos tu información con terceros.'
    },
    {
      q: '¿Tengo que descargar alguna app?',
      a: 'No. El servicio funciona 100% sobre WhatsApp. Solo guardas a Lulu como contacto, le escribís y listo. Para ver gráficos detallados entrás a nuestra plataforma web.'
    },
    {
      q: '¿Sirve para mis gastos y los de mi empresa?',
      a: 'Sí, podés indicarle a Lulu que etiquete el gasto. Por ejemplo: "Gasté 10k en artículos de librería para la oficina". En el plan Pro podés crear etiquetas e incluso múltiples espacios de trabajo.'
    },
    {
      q: '¿Qué pasa si uso dólares u otras monedas?',
      a: 'Lulu entiende múltiples monedas de forma natural. Podés poner "usd 20", "20 dólares", "veinte euros" y lo registrará correctamente, calculando la conversión si lo necesitás.'
    },
    {
      q: '¿Puedo compartir la cuenta con mi pareja?',
      a: 'Por el momento cada número de WhatsApp está asociado a una cuenta única. El soporte colaborativo (múltiples teléfonos sumando a una misma cuenta) estará disponible próximamente en el Plan Team.'
    }
  ];

  return (
    <section className="py-24 bg-[#F9FAFB] border-y border-zinc-100" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-text mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-slate-muted">
            Todo lo que necesitás saber sobre Lulú.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-card border border-brand-light/20 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-heading font-bold text-slate-text mb-3 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-brand shrink-0 mt-1" />
                {faq.q}
              </h3>
              <p className="text-sm text-slate-muted leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
