import { Star } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      text: "Increíblemente fácil de usar. Por fin logro registrar cada gasto porque es solo mandar un audio.",
      author: "Martín G.",
      role: "Freelance"
    },
    {
      text: "Antes usaba Excel y siempre me colgaba. Con Lulu lo hago al instante cuando pago.",
      author: "Sofía R.",
      role: "Emprendedora"
    },
    {
      text: "Lo usamos con mi pareja para el hogar y es increíble. No más '¿quién pagó la luz?'.",
      author: "Lucas P.",
      role: "Usuario Pro"
    }
  ];

  return (
    <section className="py-24 bg-white" id="testimonios">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-text mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-data-amber text-data-amber" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-card border border-brand-light/30 shadow-sm hover:shadow-card transition-shadow">
              <p className="text-slate-text italic mb-6 leading-relaxed">
                "{t.text}"
              </p>
              <div>
                <p className="font-bold text-slate-text">{t.author}</p>
                <p className="text-sm text-slate-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
