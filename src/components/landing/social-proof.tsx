import { Star } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      text: "Increíblemente fácil de usar. Por fin logro registrar cada gasto porque es solo mandar un audio.",
      author: "Matias V.",
      role: "Freelance",
      image: "/users/matias.jpg"
    },
    {
      text: "Antes usaba Excel y siempre me colgaba. Con Lulu lo hago al instante cuando pago.",
      author: "Micaela.",
      role: "Usuario Pro",
      image: "/users/micaela.jpg"
    },
    {
      text: "Lo usamos con mi pareja para el hogar y es increíble. No más '¿quién pagó la luz?'.",
      author: "Elias M.",
      role: "Emprendedor",
      image: "/users/Elias.jpg"
    }
  ];

  return (
    <section className="py-24 bg-[#fafafa]" id="testimonios">
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
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col h-full group hover:-translate-y-1">
              <p className="text-slate-text italic mb-8 leading-relaxed flex-grow text-lg">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-light border border-brand/10">
                  <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-slate-text">{t.author}</p>
                  <p className="text-sm text-slate-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
