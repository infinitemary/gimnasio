import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Button from '../shared/components/ui/button.component';
import Link from 'next/link';
import Image from 'next/image';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth/login');
  };

  return (
    <>
      <Head>
        <title>Cosmos Gym - Tu gimnasio de confianza</title>
        <meta name="description" content="Cosmos Gym - El mejor gimnasio para alcanzar tus metas fitness. Entrenamiento personalizado, clases grupales, y mucho más." />
      </Head>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Rajdhani', sans-serif;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-blue-900 to-cyan-700 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-20"></div>
          <Image 
            src="/images/logo_base.jpg" 
            alt="Cosmos Gym" 
            fill
            sizes="100vw"
            priority
            quality={100}
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'contrast(1.1) brightness(1.05)'
            }}
            className="z-0"
          />
        </div>
        <div className="container mx-auto px-4 py-32 relative z-30">
          <div className="max-w-3xl">
            <div className="mb-6">
              <h1 className="text-6xl md:text-7xl font-bold mb-2 tracking-wider">
                <span className="text-white">COSMOS</span> <span className="text-cyan-400">GYM</span>
              </h1>
              <div className="h-1 w-32 bg-cyan-400 mb-6"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              TRANSFORMA TU <span className="text-cyan-400">CUERPO</span>, TRANSFORMA TU <span className="text-cyan-400">VIDA</span>
            </h2>
            <p className="text-xl mb-10 text-gray-200 max-w-2xl">
              En Cosmos Gym te ayudamos a alcanzar tus metas fitness con entrenamiento personalizado, equipos de última generación y un ambiente motivador.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-cyan-500 hover:bg-cyan-600 text-white border-none px-8 py-3 text-lg font-semibold tracking-wider"
              >
                COMENZAR AHORA
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-3 text-lg font-semibold tracking-wider"
              >
                CONOCER MÁS
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-wider">¿POR QUÉ ELEGIR <span className="text-cyan-400">COSMOS GYM</span>?</h2>
            <div className="h-1 w-24 bg-cyan-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl border-t border-cyan-500/30 hover:border-cyan-400 transition-all duration-300">
              <div className="text-5xl mb-6 text-cyan-400">💪</div>
              <h3 className="text-2xl font-semibold mb-4 tracking-wide">ENTRENAMIENTO PERSONALIZADO</h3>
              <p className="text-gray-300">Nuestros entrenadores certificados diseñarán un plan de entrenamiento adaptado a tus necesidades y objetivos específicos.</p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl border-t border-cyan-500/30 hover:border-cyan-400 transition-all duration-300">
              <div className="text-5xl mb-6 text-cyan-400">🏋️</div>
              <h3 className="text-2xl font-semibold mb-4 tracking-wide">EQUIPOS MODERNOS</h3>
              <p className="text-gray-300">Contamos con equipos de última generación para que puedas entrenar de manera efectiva y segura en todo momento.</p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl border-t border-cyan-500/30 hover:border-cyan-400 transition-all duration-300">
              <div className="text-5xl mb-6 text-cyan-400">📱</div>
              <h3 className="text-2xl font-semibold mb-4 tracking-wide">SEGUIMIENTO DIGITAL</h3>
              <p className="text-gray-300">Accede a tu progreso, rutinas y pagos desde nuestra plataforma digital en cualquier momento y lugar.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Section */}
      <div className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-wider">NUESTROS <span className="text-cyan-400">PLANES</span></h2>
            <div className="h-1 w-24 bg-cyan-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-900 transition-all duration-300">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-center">
                <h3 className="text-2xl font-bold tracking-wide">BÁSICO</h3>
                <div className="text-4xl font-bold my-4">$29.99<span className="text-base font-normal text-gray-400">/mes</span></div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Acceso a sala de musculación
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Horario limitado
                  </li>
                  <li className="flex items-center text-gray-500">
                    <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Clases grupales
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    fullWidth 
                    onClick={handleGetStarted}
                    className="bg-gray-800 hover:bg-gray-700 text-white border-none py-3 text-lg font-semibold tracking-wider"
                  >
                    ELEGIR PLAN
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-2 border-cyan-700 rounded-lg overflow-hidden shadow-lg relative transform scale-105 hover:border-cyan-500 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-cyan-600 text-white px-4 py-1 text-sm font-semibold">POPULAR</div>
              <div className="bg-gradient-to-r from-blue-900 to-cyan-800 p-6 text-center text-white">
                <h3 className="text-2xl font-bold tracking-wide">PREMIUM</h3>
                <div className="text-4xl font-bold my-4">$49.99<span className="text-base font-normal text-gray-300">/mes</span></div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Acceso a sala de musculación
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Acceso 24/7
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Clases grupales ilimitadas
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    fullWidth 
                    variant="primary" 
                    onClick={handleGetStarted}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white border-none py-3 text-lg font-semibold tracking-wider"
                  >
                    ELEGIR PLAN
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-900 transition-all duration-300">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-center">
                <h3 className="text-2xl font-bold tracking-wide">ELITE</h3>
                <div className="text-4xl font-bold my-4">$79.99<span className="text-base font-normal text-gray-400">/mes</span></div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Todo lo incluido en Premium
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Entrenador personal (2 sesiones/semana)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Acceso a spa y sauna
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    fullWidth 
                    onClick={handleGetStarted}
                    className="bg-gray-800 hover:bg-gray-700 text-white border-none py-3 text-lg font-semibold tracking-wider"
                  >
                    ELEGIR PLAN
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-wider">LO QUE DICEN NUESTROS <span className="text-cyan-400">MIEMBROS</span></h2>
            <div className="h-1 w-24 bg-cyan-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl border-t border-cyan-500/30">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  JP
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-xl">Juan Pérez</h4>
                  <div className="flex text-cyan-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">"Desde que me uní a Cosmos Gym, he perdido 15 kilos y me siento con más energía que nunca. Los entrenadores son excelentes y el ambiente es muy motivador."</p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl border-t border-cyan-500/30">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  MG
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-xl">María González</h4>
                  <div className="flex text-cyan-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">"Las clases grupales son increíbles. He conocido a personas maravillosas y me divierto mientras me ejercito. Definitivamente vale la pena cada centavo."</p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl border-t border-cyan-500/30">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  CR
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-xl">Carlos Rodríguez</h4>
                  <div className="flex text-cyan-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">"El seguimiento digital es genial. Puedo ver mi progreso, reservar clases y gestionar mis pagos desde la app. La tecnología realmente hace la diferencia."</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-wider">¿LISTO PARA <span className="text-black">TRANSFORMAR</span> TU VIDA?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Únete a Cosmos Gym hoy y comienza tu viaje hacia un estilo de vida más saludable y activo.</p>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={handleGetStarted}
            className="border-2 border-white text-white hover:bg-white hover:text-cyan-700 px-10 py-3 text-lg font-semibold tracking-wider"
          >
            COMENZAR AHORA
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-10">
            <h3 className="text-3xl font-bold tracking-wider">
              <span className="text-white">COSMOS</span> <span className="text-cyan-400">GYM</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="text-center md:text-left">
              <p className="text-gray-400">Tu gimnasio de confianza para alcanzar tus metas fitness.</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4 tracking-wide text-cyan-400">ENLACES RÁPIDOS</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Inicio</Link></li>
                <li><Link href="/auth/login" className="text-gray-400 hover:text-cyan-400 transition-colors">Iniciar Sesión</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Planes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Clases</a></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4 tracking-wide text-cyan-400">HORARIOS</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Lunes - Viernes: 6:00 AM - 10:00 PM</li>
                <li>Sábados: 8:00 AM - 8:00 PM</li>
                <li>Domingos: 8:00 AM - 2:00 PM</li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4 tracking-wide text-cyan-400">CONTACTO</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Av. Principal #123</li>
                <li>Ciudad, CP 12345</li>
                <li>Tel: (123) 456-789</li>
                <li>Email: info@cosmosgym.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Cosmos Gym. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage; 