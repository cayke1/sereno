import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Brain, BarChart4 } from 'lucide-react';

export function Hero () {
  return (
    <section className="py-20 md:py-32 overflow-hidden gradient-bg-soft relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-mint-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-heading mb-6">
              Acompanhamento emocional simplificado
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto lg:mx-0">
              Transforme sua prática clínica com uma plataforma que conecta profissionais e pacientes através de um monitoramento emocional intuitivo e humano.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="px-6 py-6 text-white bg-mint-500 hover:bg-mint-600 rounded-full text-lg">
                Comece agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-6 py-6 border-mint-500 text-mint-700 hover:bg-mint-50 rounded-full text-lg">
                Fale conosco
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="bg-white rounded-2xl shadow-xl p-1 border border-border">
              <div className="bg-mint-50 rounded-xl p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Painel de emoções</h3>
                  <span className="px-3 py-1 bg-mint-100 text-mint-700 rounded-full text-sm">
                    Semana atual
                  </span>
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        i === 3 ? 'bg-sky-500 text-white' : 
                        i === 5 ? 'bg-mint-500 text-white' : 
                        'bg-white border border-border'
                      }`}>
                        {i === 3 ? <Heart size={18} /> : 
                         i === 5 ? <Brain size={18} /> : 
                         <span className="text-sm text-muted-foreground">
                           {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}
                         </span>}
                      </div>
                      <div className={`h-24 w-full bg-white rounded-lg border ${
                        i === 3 ? 'border-sky-300' : 
                        i === 5 ? 'border-mint-300' : 
                        'border-border'
                      }`}></div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <BarChart4 size={18} className="text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Média semanal</p>
                      <p className="font-medium">Equilibrado</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="rounded-full">
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-sky-200 rounded-full opacity-30 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
