import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Добро пожаловать в техподдержку CyberBun! Как мы можем помочь?", isBot: true, time: "14:30" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const services = [
    { title: "Разработка веб-приложений", desc: "Современные SPA и PWA решения", icon: "Code" },
    { title: "Мобильные приложения", desc: "iOS и Android приложения", icon: "Smartphone" },
    { title: "Система управления", desc: "CRM и ERP системы", icon: "Settings" },
    { title: "ИИ и автоматизация", desc: "Машинное обучение и боты", icon: "Bot" },
  ];

  const technologies = [
    "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "MongoDB",
    "Docker", "Kubernetes", "AWS", "GraphQL", "REST API", "WebSocket"
  ];

  const projects = [
    { title: "Ресторанная платформа", category: "Web", status: "Завершен" },
    { title: "Мобильное приложение доставки", category: "Mobile", status: "В работе" },
    { title: "CRM система", category: "Enterprise", status: "Завершен" },
    { title: "ИИ-чатбот", category: "AI", status: "В работе" },
  ];

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: newMessage, 
      isBot: false, 
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Спасибо за ваш вопрос! Наш специалист свяжется с вами в ближайшее время.", 
        isBot: true, 
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
    
    setNewMessage("");
  };

  const createTicket = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Тикет создан успешно! Номер обращения: #" + Math.random().toString(36).substr(2, 9).toUpperCase());
    setTicketDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 cyber-gradient rounded-lg flex items-center justify-center cyber-glow animate-pulse">
              <Icon name="Zap" size={24} className="text-white animate-bounce" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CyberBun</h1>
              <p className="text-sm text-blue-300">Технобулочка будущего</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="text-slate-300 hover:text-white transition-colors">Услуги</a>
            <a href="#portfolio" className="text-slate-300 hover:text-white transition-colors">Портфолио</a>
            <a href="#technologies" className="text-slate-300 hover:text-white transition-colors">Технологии</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Контакты</a>
          </nav>
          <Button onClick={() => setChatOpen(!chatOpen)} className="bg-blue-600 hover:bg-blue-700">
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Поддержка
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 cyber-gradient rounded-full flex items-center justify-center cyber-glow animate-pulse">
              <Icon name="Zap" size={40} className="text-white animate-bounce" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Инновации в <span className="text-blue-400">IT</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Создаем технологические решения будущего для вашего бизнеса
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать проект
            </Button>
            <Dialog open={ticketDialogOpen} onOpenChange={setTicketDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  <Icon name="Ticket" size={20} className="mr-2" />
                  Создать тикет
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Создание тикета техподдержки</DialogTitle>
                </DialogHeader>
                <form onSubmit={createTicket} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Тема обращения</Label>
                    <Input id="title" placeholder="Краткое описание проблемы" required className="bg-slate-800 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="priority">Приоритет</Label>
                    <Select required>
                      <SelectTrigger className="bg-slate-800 border-slate-600">
                        <SelectValue placeholder="Выберите приоритет" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="low">Низкий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                        <SelectItem value="critical">Критический</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Описание проблемы</Label>
                    <Textarea id="description" placeholder="Подробное описание проблемы" required className="bg-slate-800 border-slate-600" />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Создать тикет
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Наши услуги</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-blue-500 transition-colors">
                <CardHeader className="text-center">
                  <Icon name={service.icon as any} size={48} className="text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-center">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Технологический стек</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-900/50 text-blue-200 hover:bg-blue-800/50 transition-colors px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Портфолио проектов</h3>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-slate-900 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                  <Card key={index} className="bg-slate-900/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">{project.title}</CardTitle>
                      <Badge variant={project.status === "Завершен" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-400">{project.category}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">Свяжитесь с нами</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Icon name="Mail" size={32} className="text-blue-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Email</h4>
              <p className="text-slate-400">info@cyberbun.tech</p>
            </div>
            <div className="text-center">
              <Icon name="Phone" size={32} className="text-blue-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Телефон</h4>
              <p className="text-slate-400">+7 (495) 123-45-67</p>
            </div>
            <div className="text-center">
              <Icon name="MapPin" size={32} className="text-blue-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Офис</h4>
              <p className="text-slate-400">Москва, ул. Тверская, 1</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h4 className="text-white font-semibold">Онлайн поддержка</h4>
            <Button variant="ghost" size="sm" onClick={() => setChatOpen(false)}>
              <Icon name="X" size={16} />
            </Button>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-slate-800 text-slate-300' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70">{message.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Напишите сообщение..."
                  className="bg-slate-800 border-slate-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <Button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-40"
      >
        <Icon name="MessageCircle" size={24} />
      </Button>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 CyberBun. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;