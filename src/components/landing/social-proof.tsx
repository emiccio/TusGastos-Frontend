export default function SocialProof() {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
          La forma más fácil de llevar tus cuentas
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="pt-8 md:pt-0">
            <div className="text-4xl font-semibold text-gray-900 tracking-tight mb-2">+10,000</div>
            <div className="text-gray-500">Mensajes procesados</div>
          </div>
          <div className="pt-8 md:pt-0">
            <div className="text-4xl font-semibold text-emerald-600 tracking-tight mb-2">35%</div>
            <div className="text-gray-500">Ahorro promedio mensual</div>
          </div>
          <div className="pt-8 md:pt-0">
            <div className="text-4xl font-semibold text-gray-900 tracking-tight mb-2">98%</div>
            <div className="text-gray-500">Usuarios activos diarios</div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            { quote: "Increíblemente fácil de usar. Por fin logro registrar cada gasto porque es solo mandar un audio.", name: "Delfina", role: "Freelancer" },
            { quote: "Antes usaba Excel y siempre me colgaba. Con Lulu lo hago al instante cuando pago.", name: "Tomás", role: "Diseñador" },
            { quote: "La categorización automática funciona perfecto. El resumen a fin de mes es oro puro.", name: "Sofia", role: "Emprendedora" }
          ].map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-1 mb-4 text-emerald-500">
                {Array(5).fill('★').map((s, j) => <span key={j}>{s}</span>)}
              </div>
              <p className="text-gray-700 italic mb-6">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
