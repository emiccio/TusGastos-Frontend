import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col pt-16 bg-gray-50">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-3xl mx-auto px-6 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-semibold mb-6">Política de Privacidad</h1>
          <p className="text-gray-500 mb-4">Última actualización: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-gray-700">
            <p>En GestionAndo, valoramos y respetamos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Información que recopilamos</h2>
            <p>Recopilamos tu número de teléfono (para autenticación vía WhatsApp) y los mensajes/audios que nos envías para poder registrar y categorizar tus transacciones.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Uso de la información</h2>
            <p>Utilizamos inteligencia artificial para analizar el texto y los audios que nos envías con el único fin de extraer el monto, fecha, categoría y descripción del gasto o ingreso.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Protección de datos</h2>
            <p>Implementamos medidas de seguridad para proteger tu información contra acceso no autorizado, alteración o destrucción.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
