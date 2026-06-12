import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Sparkles, Send, Bot } from 'lucide-react';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  const [userData, setUserData] = useState({
    nombre: '',
    motivo: '',
    mensaje: ''
  });

  const [messages, setMessages] = useState([
    { sender: 'ai', text: '¡Hola! Soy la IA Asistente de Clínica MG 🤖. Para ayudarte de forma más rápida, ¿me podrías decir tu nombre?' }
  ]);

  const messagesEndRef = useRef(null);

  // Handle scroll locking when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowMessage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const phoneNumber = "56930744877";

  const handleOpenChat = (e) => {
    e.preventDefault();
    setIsOpen(true);
    setShowMessage(false);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: inputValue }];
    setMessages(newMessages);
    const userReply = inputValue;
    setInputValue('');

    // Process logic based on step
    setTimeout(() => {
      if (step === 0) {
        setUserData({ ...userData, nombre: userReply });
        setMessages(prev => [...prev, { 
          sender: 'ai', 
          text: `¡Mucho gusto, ${userReply}! 👋 ¿Cuál es el motivo principal de tu contacto hoy?`,
          options: ['Agendar cita de evaluación', 'Urgencia Dental', 'Consulta de Valores', 'Otro motivo']
        }]);
        setStep(1);
      } else if (step === 2) {
        setUserData({ ...userData, mensaje: userReply });
        setMessages(prev => [...prev, { 
          sender: 'ai', 
          text: `¡Perfecto! Ya tengo todo anotado. Haz clic en el botón de abajo para enviar esta información directamente a nuestro WhatsApp oficial y te responderemos a la brevedad. ✨` 
        }]);
        setStep(3);
      }
    }, 600);
  };

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { sender: 'user', text: option }]);
    setUserData({ ...userData, motivo: option });
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: `Entendido. Por favor, escríbeme aquí abajo un breve detalle de lo que necesitas o tu duda específica:`
      }]);
      setStep(2);
    }, 600);
  };

  const handleSendToWhatsApp = () => {
    const messageTemplate = `*NUEVA SOLICITUD DE ATENCIÓN - CLÍNICA MG*

Hola equipo, me he contactado a través del asistente virtual de la página web para solicitar atención. Aquí están mis datos:

*PACIENTE:* ${userData.nombre}
*MOTIVO DE CONSULTA:* ${userData.motivo}

*DETALLE DE MI CONSULTA:*
_${userData.mensaje}_

---
Mensaje generado automáticamente vía Web.`;

    const formattedMessage = encodeURIComponent(messageTemplate);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    
    // Reset after sending
    setTimeout(() => {
      setStep(0);
      setUserData({ nombre: '', motivo: '', mensaje: '' });
      setMessages([{ sender: 'ai', text: '¡Hola! Soy la IA Asistente de Clínica MG 🤖. Para ayudarte de forma más rápida, ¿me podrías decir tu nombre?' }]);
    }, 1000);
  };

  return (
    <div className="whatsapp-widget-container">
      {showMessage && !isOpen && (
        <div className="ai-tooltip">
          <button className="close-tooltip" onClick={() => setShowMessage(false)}><X size={12} /></button>
          <div className="ai-tooltip-content" onClick={handleOpenChat}>
            <p><strong><Sparkles size={14} style={{display:'inline', marginRight:'4px'}}/> IA Clínica MG</strong></p>
            <p>¡Hola! Haz clic aquí para charlar un momento y ayudarte más rápido.</p>
          </div>
        </div>
      )}

      {isOpen && (
        <>
          <div className="chat-backdrop" onClick={() => setIsOpen(false)}></div>
          <div className="chat-window">
            <div className="chat-header">
            <div className="chat-header-title">
              <Bot size={20} />
              <span>IA Clínica MG</span>
            </div>
            <button className="close-chat" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble-wrapper ${msg.sender}`}>
                {msg.sender === 'ai' && <div className="chat-avatar"><Bot size={16}/></div>}
                <div className="chat-bubble-content">
                  <div className={`chat-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>
                  {msg.options && (
                    <div className="chat-options">
                      {msg.options.map((opt, i) => (
                        <button key={i} className="chat-option-btn" onClick={() => handleOptionClick(opt)}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            {step === 3 ? (
              <button className="whatsapp-final-btn" onClick={handleSendToWhatsApp}>
                <MessageCircle size={18} /> Ir a WhatsApp Oficial
              </button>
            ) : step === 1 ? (
              <div className="chat-waiting-text">Por favor selecciona una opción arriba.</div>
            ) : (
              <form onSubmit={handleSendReply} className="chat-input-form">
                <input 
                  type="text" 
                  placeholder="Escribe tu respuesta..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                />
                <button type="submit" disabled={!inputValue.trim()}>
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
        </>
      )}
      
      {!isOpen && (
        <button 
          className="whatsapp-button"
          onClick={handleOpenChat}
          onMouseEnter={() => setShowMessage(true)}
        >
          <MessageCircle size={32} />
        </button>
      )}
    </div>
  );
};

export default WhatsAppWidget;
