import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col pt-16 bg-gray-50">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-3xl mx-auto px-6 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-semibold mb-6">Términos de Servicio</h1>
          <p className="text-gray-500 mb-4">Última actualización: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-gray-700">
            <p>Al utilizar GestionAndo, aceptas estos términos de servicio en su totalidad.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Uso del servicio</h2>
            <p>GestionAndo es una herramienta de asistencia financiera personal. El servicio se provee "tal cual" sin garantías explícitas o implícitas de ningún tipo.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Cuentas de usuario</h2>
            <p>Eres responsable de mantener la seguridad de tu cuenta de WhatsApp, la cual sirve como método principal de acceso a nuestro servicio.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Limitación de responsabilidad</h2>
            <p>GestionAndo no es un asesor financiero. La información provista por la plataforma es únicamente a título informativo. No nos hacemos responsables por decisiones financieras tomadas basadas en dicha información.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
