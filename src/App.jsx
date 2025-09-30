import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Scale, 
  Shield, 
  Users, 
  CheckCircle, 
  MessageCircle, 
  Calendar,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  Briefcase,
  Award,
  Clock
} from 'lucide-react'
import './index.css'

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    mensagem: '',
    consentimento: false,
    marketing: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Function to open Leadster chatbot as full-page popup
  const openLeadsterChat = () => {
    // Try different methods to open Leadster chat
    if (typeof window !== 'undefined') {
      // Method 1: Try common Leadster global methods
      if (window.neuroleadOpen) {
        window.neuroleadOpen()
        return
      }
      
      if (window.neurolead && typeof window.neurolead.open === 'function') {
        window.neurolead.open()
        return
      }
      
      if (window.neurolead && typeof window.neurolead.show === 'function') {
        window.neurolead.show()
        return
      }

      // Method 2: Try to trigger chat via events
      if (window.neuroleadId) {
        // Try to dispatch custom event that Leadster might listen to
        const event = new CustomEvent('neurolead-open', {
          detail: { source: 'cta-button' }
        })
        window.dispatchEvent(event)
        
        // Try to trigger via postMessage
        window.postMessage({ type: 'neurolead-open', source: 'cta-button' }, '*')
        
        // Look for Leadster iframe and try to interact with it
        const leadsterIframe = document.querySelector('iframe[src*="leadster"]') || 
                              document.querySelector('iframe[src*="neurolead"]')
        
        if (leadsterIframe) {
          // Make the iframe full screen
          leadsterIframe.style.position = 'fixed'
          leadsterIframe.style.top = '0'
          leadsterIframe.style.left = '0'
          leadsterIframe.style.width = '100vw'
          leadsterIframe.style.height = '100vh'
          leadsterIframe.style.zIndex = '999999'
          leadsterIframe.style.border = 'none'
          
          // Try to send message to iframe
          leadsterIframe.contentWindow?.postMessage({ type: 'open-chat' }, '*')
        }
        
        return
      }

      // Method 3: Create a full-page overlay to simulate chat opening
      // This is a fallback if Leadster isn't properly loaded
      const overlay = document.createElement('div')
      overlay.id = 'leadster-fullpage-overlay'
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
      `
      
      const content = document.createElement('div')
      content.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      `
      
      content.innerHTML = `
        <h2 style="color: #1e40af; margin-bottom: 1rem;">Entre em contato conosco!</h2>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          O chat do Dr. Enrico Rotter está sendo carregado... 
          Enquanto isso, você pode entrar em contato diretamente:
        </p>
        <div style="margin-bottom: 1rem;">
          <a href="https://wa.me/5551981218676" target="_blank" 
             style="display: inline-block; background: #25d366; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 8px; margin: 8px; font-weight: bold;">
            📱 WhatsApp: (51) 98121-8676
          </a>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <a href="mailto:contato@enricorotter.com.br" 
             style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 8px; margin: 8px; font-weight: bold;">
            📧 Email: contato@enricorotter.com.br
          </a>
        </div>
        <button onclick="document.getElementById('leadster-fullpage-overlay').remove()" 
                style="background: #6b7280; color: white; border: none; padding: 8px 16px; 
                       border-radius: 6px; cursor: pointer; font-size: 14px;">
          Fechar
        </button>
      `
      
      overlay.appendChild(content)
      document.body.appendChild(overlay)
      
      // Remove overlay when clicking outside
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove()
        }
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Store form data for potential use by Leadster
    console.log('Dados do formulário:', formData)
    
    // Store form data in sessionStorage for Leadster to potentially access
    sessionStorage.setItem('contactFormData', JSON.stringify(formData))
    
    // Open Leadster chat
    openLeadsterChat()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-blue-200" />
              <div>
                <h1 className="text-2xl font-bold">Enrico Rotter</h1>
                <p className="text-blue-200 text-sm">Advogado Trabalhista OAB/RS</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-blue-200 transition-colors">Home</a>
              <a href="#servicos" className="hover:text-blue-200 transition-colors">Serviços</a>
              <a href="#contato" className="hover:text-blue-200 transition-colors">Contato</a>
            </nav>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={openLeadsterChat}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Conversar!
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
                  ⚖️ Dr. Enrico Rotter - OAB/RS 97520
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Foi Demitido?{' '}
                  <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Seus Direitos
                  </span>{' '}
                  Não Foram Respeitados
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-4">
                  <strong>Advogado trabalhista com +469 avaliações 5 estrelas no Google.</strong> 
                  Recupere o que é seu por direito com atendimento humanizado, sem juridiquês e total transparência.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <p className="text-lg text-gray-700">
                    ✓ Primeira consulta GRATUITA e sem compromisso<br/>
                    ✓ Especialista em acordos rápidos<br/>
                    ✓ Honorários transparentes desde o início
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={openLeadsterChat}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Agendar Consulta Gratuita
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                  onClick={openLeadsterChat}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Iniciar Conversa
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">5,0 no Google</p>
                    <p className="text-xs text-gray-600">+469 avaliações reais</p>
                  </div>
                </div>
                <div className="border-l border-gray-300 pl-6 hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">+500 casos</p>
                  <p className="text-xs text-gray-600">resolvidos com sucesso</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Consulta Gratuita</h3>
                    <p className="text-gray-600">Avaliação completa do seu caso</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Análise detalhada da situação</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Orientação sobre seus direitos</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Estratégia personalizada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Reconhece Alguma Dessas Situações?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Você não está sozinho. Milhares de trabalhadores enfrentam os mesmos problemas todos os dias.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Demitido Sem Justa Causa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  • Não recebeu todas as verbas rescisórias<br/>
                  • FGTS não foi liberado corretamente<br/>
                  • Aviso prévio não foi pago
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-orange-600 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Horas Extras Não Pagas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  • Trabalha além do horário sem receber<br/>
                  • Empresa não registra banco de horas<br/>
                  • Plantões e finais de semana não pagos
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Assédio Moral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  • Pressão psicológica constante<br/>
                  • Humilhações e tratamento desigual<br/>
                  • Ambiente de trabalho tóxico
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4">
              A Solução Está Aqui
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Dr. Enrico Rotter: Seu Advogado Trabalhista
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <strong>OAB/RS 97520</strong> • Mais de 10 anos defendendo trabalhadores em Porto Alegre.<br/>
              Atendimento humanizado, linguagem clara e resultados que transformam vidas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Experiência Comprovada</h3>
                    <p className="text-gray-600">Anos de experiência defendendo trabalhadores em todo o Brasil com resultados excepcionais.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Proteção Garantida</h3>
                    <p className="text-gray-600">Navegue pelas complexidades do direito trabalhista com segurança e clareza total.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Atendimento Personalizado</h3>
                    <p className="text-gray-600">Cada caso é único. Receba atenção dedicada e estratégias personalizadas para sua situação.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Como Funciona</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Consulta Inicial</h4>
                    <p className="text-gray-600 text-sm">Agende uma consulta sem compromisso para discutir seu caso</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Análise Detalhada</h4>
                    <p className="text-gray-600 text-sm">Receba uma avaliação completa da sua situação e entenda seus direitos</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Plano de Ação</h4>
                    <p className="text-gray-600 text-sm">Desenvolvemos uma estratégia personalizada para seus problemas específicos</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 mt-6">
                  <p className="text-sm text-gray-700 text-center">
                    <strong>Enrico Rotter</strong> estará ao seu lado em cada etapa, oferecendo o suporte necessário para alcançar o melhor resultado possível.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              O Que Você Vai Conquistar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como sua vida pode mudar quando seus direitos são respeitados e defendidos adequadamente
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dinheiro no Bolso</h3>
              <p className="text-gray-600">Receba todas as verbas que tem direito: FGTS, multa, férias, 13º</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Segurança Jurídica</h3>
              <p className="text-gray-600">Tenha certeza de que está fazendo tudo certo, sem riscos</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rapidez</h3>
              <p className="text-gray-600">Acordos ágeis, sem prolongar seu sofrimento desnecessariamente</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paz de Espírito</h3>
              <p className="text-gray-600">Durma tranquilo sabendo que um especialista cuida do seu caso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              O Que Falam Nossos Clientes
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex -space-x-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">5,0 estrelas no Google</span>
            </div>
            <p className="text-gray-600">Mais de 469 avaliações reais de clientes satisfeitos</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"Dr. Enrico me ajudou a recuperar mais de R$ 15.000 em verbas que a empresa não tinha pagado. Atendimento excelente e muito transparente."</p>
                <p className="font-semibold text-gray-900">Maria S. - Auxiliar Administrativa</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"Conseguiu resolver meu caso em apenas 3 meses. Linguagem clara, sem juridiquês. Recomendo para qualquer trabalhador."</p>
                <p className="font-semibold text-gray-900">João P. - Motorista</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"Profissional íntegro e competente. Me orientou corretamente desde o primeiro contato. Resultado acima do esperado."</p>
                <p className="font-semibold text-gray-900">Ana L. - Enfermeira</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Não Deixe Seus Direitos Para Depois</h2>
          <p className="text-xl mb-8 text-blue-100">
            Cada dia que passa é dinheiro que você pode estar perdendo. 
            Entre em contato AGORA e defenda o que é seu por direito.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <p className="text-lg">
              ✓ Consulta gratuita e sem compromisso<br/>
              ✓ Atendimento em até 24 horas<br/>
              ✓ Total sigilo e confidencialidade
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={openLeadsterChat}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Agendar Consulta Gratuita
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              onClick={openLeadsterChat}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Iniciar Conversa
            </Button>
          </div>
        </div>
      </section>

      {/* About Dr. Enrico Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mb-4">
                Sobre o Advogado
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Dr. Enrico Dal Fiume Rotter
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                <strong>OAB/RS 97520</strong> • Especialista em Direito do Trabalho
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <strong>Mais de 10 anos</strong> defendendo exclusivamente direitos trabalhistas em Porto Alegre
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <strong>+500 casos resolvidos</strong> com foco em acordos ágeis e justos
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <strong>5,0 estrelas no Google</strong> com mais de 469 avaliações reais de clientes
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <strong>Atendimento humanizado:</strong> explicações claras, sem juridiquês, com total transparência
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-700">
                  <em>"Minha missão é simples: garantir que cada trabalhador receba exatamente o que tem direito, 
                  de forma rápida e transparente. Você não está sozinho nessa luta."</em>
                </p>
                <p className="text-blue-600 font-semibold mt-2">- Dr. Enrico Rotter</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Scale className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Diferenciais</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Primeira consulta sempre gratuita</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Honorários transparentes desde o início</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Atendimento rápido em até 24h</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Foco em acordos ágeis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Total sigilo e confidencialidade</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contato" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Qual é Sua Situação?
            </h2>
            <p className="text-xl text-gray-600 mb-2">Escolha sua situação e vamos te ajudar agora mesmo!</p>
            <p className="text-lg text-gray-600">
              Atendimento rápido pelo WhatsApp ou agende uma consulta gratuita
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 border-red-200 hover:border-red-500 transition-colors cursor-pointer" 
                  onClick={() => window.open('https://wa.me/5551981218676?text=Olá! Fui demitido recentemente e gostaria de saber sobre meus direitos e verbas rescisórias.', '_blank')}>
              <CardContent className="p-6 text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fui Demitido</h3>
                <p className="text-gray-600 mb-4">Problemas com verbas rescisórias, FGTS, aviso prévio</p>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Conversar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-500 transition-colors cursor-pointer"
                  onClick={() => window.open('https://wa.me/5551981218676?text=Olá! Tenho dúvidas sobre horas extras, banco de horas e outros direitos trabalhistas.', '_blank')}>
              <CardContent className="p-6 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Horas Extras</h3>
                <p className="text-gray-600 mb-4">Trabalho além do horário, banco de horas, plantões</p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  Conversar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => window.open('https://wa.me/5551981218676?text=Olá! Tenho algumas dúvidas gerais sobre direitos trabalhistas e gostaria de orientação.', '_blank')}>
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Outras Dúvidas</h3>
                <p className="text-gray-600 mb-4">Assédio moral, acidentes, aposentadoria</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Conversar Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-blue-700">
            <CardContent className="p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Prefere Agendar uma Consulta?</h3>
              <p className="text-blue-100 mb-6">
                Agende uma conversa individual com o Dr. Enrico Rotter.<br/>
                <strong>Primeira consulta sempre GRATUITA e sem compromisso.</strong>
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Button 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3"
                  onClick={openLeadsterChat}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Agendar Consulta Online
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  onClick={() => window.open('https://wa.me/5551981218676?text=Olá! Gostaria de agendar uma consulta presencial com o Dr. Enrico Rotter.', '_blank')}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Direto
                </Button>
              </div>
              
              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-blue-100 text-sm">
                  ✓ Atendimento em até 24h • ✓ Total sigilo • ✓ Sem custo inicial
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Location Section with Google Maps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nosso Escritório
            </h2>
            <p className="text-xl text-gray-600">
              Localizado em Porto Alegre, atendemos todo o Rio Grande do Sul
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Telefone/WhatsApp</p>
                      <p className="text-gray-600">(51) 98121-8676</p>
                      <p className="text-sm text-gray-500">Atendimento de segunda a sexta, 8h às 18h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">E-mail</p>
                      <p className="text-gray-600">contato@enricorotter.com.br</p>
                      <p className="text-sm text-gray-500">Resposta em até 24 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Localização</p>
                      <p className="text-gray-600">Porto Alegre, Rio Grande do Sul</p>
                      <p className="text-sm text-gray-500">Atendimento presencial mediante agendamento</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <p className="text-blue-800">
                    <strong>Atendimento Online:</strong> Realizamos consultas por videochamada para todo o Brasil. 
                    Agende sua consulta gratuita!
                  </p>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300"
                    onClick={openLeadsterChat}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Conversar pelo WhatsApp
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d483689.5060226456!2d-51.24867693994142!3d-29.996099999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9519827f49ac13cd%3A0x5a3e31f1ba6ab8c1!2sPorto%20Alegre%2C%20State%20of%20Rio%20Grande%20do%20Sul%2C%20Brazil!5e0!3m2!1sen!2sus!4v1647095834395!5m2!1sen!2sus"
                  width="100%"
                  height="384"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do escritório - Porto Alegre, RS"
                ></iframe>
              </div>
              <p className="text-center text-gray-600 mt-4">
                Porto Alegre - Rio Grande do Sul
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">Enrico Rotter</h3>
                  <p className="text-gray-400 text-sm">Advogado Trabalhista</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Defendendo os direitos dos trabalhadores com experiência, dedicação e resultados comprovados.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">(51) 98121-8676</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">contato@enricorotter.com.br</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">Porto Alegre, RS</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Áreas de Atuação</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Rescisão Indevida</li>
                <li>• Horas Extras</li>
                <li>• Assédio Moral</li>
                <li>• FGTS e Verbas Rescisórias</li>
                <li>• Acidentes de Trabalho</li>
                <li>• Aposentadoria</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Enrico Rotter - OAB/RS. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-2xl transition-all duration-300 transform hover:scale-110"
          onClick={() => window.open('https://wa.me/5551981218676?text=Olá! Vim do site e gostaria de conversar sobre meus direitos trabalhistas.', '_blank')}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    </div>
  )
}

export default App
