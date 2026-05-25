import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Notification, NotificationType } from '../../../types/notifications';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (notification: Omit<Notification, 'id' | 'date'>) => void;
}

const NotificationModal = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}: NotificationModalProps) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('mudanca');
  const [line, setLine] = useState('');
  
  // States for handling animations
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to allow CSS transition to trigger after mount
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Wait for animation to finish before unmounting (300ms matches duration-300)
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !message.trim() || !type || !line.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    onSubmit({
      title: title.trim(),
      message: message.trim(),
      type,
      line: line.trim()
    });

    // Reset form
    setTitle('');
    setMessage('');
    setType('mudanca');
    setLine('');
  };

  const handleClose = () => {
    onClose();
    // Form reset happens after animation finishes via useEffect if needed, 
    // but doing it here is fine for immediate cleanup.
    setTimeout(() => {
        setTitle('');
        setMessage('');
        setType('mudanca');
        setLine('');
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] transition-opacity duration-300 ease-in-out ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`} 
      onClick={handleClose}
    >
      <div 
        className={`bg-white p-6 rounded-2xl w-[90%] max-w-[500px] shadow-2xl relative transition-all duration-300 ease-out transform ${
          isAnimating ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
        }`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 text-3xl leading-none cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
          onClick={handleClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-brand-dark-green mb-6 pr-8 border-b pb-2">Nova Notificação</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="titulo" className="text-sm font-bold text-gray-700">Título:</label>
            <input
              type="text"
              id="titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Ex: Alteração de Trajeto"
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="mensagem" className="text-sm font-bold text-gray-700">Mensagem:</label>
            <textarea
              id="mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              required
              placeholder="Descreva o conteúdo da notificação..."
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="tipoNotificacao" className="text-sm font-bold text-gray-700">Tipo:</label>
              <select
                id="tipoNotificacao"
                value={type}
                onChange={(e) => setType(e.target.value as NotificationType)}
                required
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green outline-none bg-white cursor-pointer"
              >
                <option value="mudanca">Mudança de Paradas</option>
                <option value="itinerario">Itinerário</option>
                <option value="aviso">Aviso</option>
                <option value="educativa">Campanha Educativa</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="linhas" className="text-sm font-bold text-gray-700">Linhas:</label>
              <input
                type="text"
                id="linhas"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                placeholder="Ex: 201, 202"
                required
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="mt-4 p-4 rounded-xl text-lg font-bold transition-all bg-brand-green text-white hover:bg-brand-dark-green shadow-lg active:scale-95 flex justify-center items-center gap-2"
          >
            Enviar Notificação
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationModal;
