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
                  ⚖️ Direitos Trabalhistas
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Você Merece{' '}
                  <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Respeito
                  </span>{' '}
                  no Trabalho
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Descubra como podemos ajudá-lo a garantir seus direitos e conquistar a valorização que você merece.
                </p>
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

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">+500 casos resolvidos</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Você se sente desvalorizado e sem voz no seu ambiente de trabalho?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Rotina Desmotivadora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A sensação de estar preso em uma rotina não reconhecida afeta sua carreira, autoestima e bem-estar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-orange-600 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Instabilidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lidando com contratos injustos e medo constante da perda do emprego, você precisa de segurança.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Falta de Direitos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Todo trabalhador tem direito a um ambiente justo, seguro e que promova o crescimento profissional.
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
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mb-4">
              Seu Direito Garantido
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Advogado Trabalhista Enrico Rotter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Com anos de experiência defendendo os direitos dos trabalhadores em todo Brasil, 
              Enrico Rotter é o advogado trabalhista que entende profundamente os desafios que você enfrenta.
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para fazer a mudança?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Entre em contato hoje mesmo e comece a transformar sua realidade no trabalho. 
            Defenda seus direitos com um advogado trabalhista experiente e comprometido.
          </p>
          
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

      {/* Contact Form Section */}
      <section id="contato" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tem dúvidas sobre seus direitos trabalhistas?
            </h2>
            <p className="text-xl text-gray-600 mb-2">Não espere mais!</p>
            <p className="text-lg text-gray-600">
              Preencha o formulário para iniciar uma conversa com o Dr. Enrico Rotter 
              e tire todas as suas dúvidas instantaneamente.
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">
                Converse diretamente com o Advogado Trabalhista Enrico Rotter
              </CardTitle>
              <CardDescription className="text-blue-100 text-center text-lg">
                Preencha o formulário para iniciar
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome *</Label>
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sobrenome" className="text-sm font-medium text-gray-700">Sobrenome *</Label>
                    <Input
                      id="sobrenome"
                      name="sobrenome"
                      type="text"
                      required
                      value={formData.sobrenome}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Seu sobrenome"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">Número de telefone *</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="(51) 99999-9999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem" className="text-sm font-medium text-gray-700">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Descreva brevemente sua situação ou dúvida..."
                  />
                </div>

                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketing"
                      name="marketing"
                      checked={formData.marketing}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketing: checked }))}
                      className="mt-1"
                    />
                    <Label htmlFor="marketing" className="text-sm text-gray-600 leading-relaxed">
                      Eu concordo em receber outras comunicações da enricorotter.com.br.
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consentimento"
                      name="consentimento"
                      checked={formData.consentimento}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consentimento: checked }))}
                      required
                      className="mt-1"
                    />
                    <Label htmlFor="consentimento" className="text-sm text-gray-600 leading-relaxed">
                      Eu concordo em permitir que a enricorotter.com.br armazene e processe meus dados pessoais. *
                    </Label>
                  </div>

                  <p className="text-xs text-gray-500">
                    A enricorotter.com.br tem o compromisso de proteger e respeitar sua privacidade. 
                    Para obter mais informações, confira nossa Política de Privacidade.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
                  disabled={!formData.consentimento}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Iniciar Conversa Agora
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
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
    </div>
  )
}

export default App
