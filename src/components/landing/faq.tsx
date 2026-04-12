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
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {faqs.map((faq, i) => (
            <details key={i} className="group py-6 cursor-pointer overflow-hidden">
              <summary className="text-lg font-medium text-gray-900 flex justify-between items-center outline-none list-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="ml-6 flex-shrink-0 text-emerald-500 group-open:-rotate-180 transition-transform duration-200">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-500 leading-relaxed max-w-2xl hidden group-open:block animate-in slide-in-from-top-2 fade-in duration-200">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
