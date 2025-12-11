import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Notification, NotificationType } from '../types';

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
    setTitle('');
    setMessage('');
    setType('mudanca');
    setLine('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]" 
      onClick={handleClose}
    >
      <div 
        className="bg-white p-5 rounded-lg w-[90%] max-w-[500px] shadow-xl relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <span 
          className="absolute top-2 right-4 text-2xl cursor-pointer text-gray-600 hover:text-black"
          onClick={handleClose}
        >
          &times;
        </span>
        <h2 className="mb-4">Nova Notificação</h2>
        <form onSubmit={handleSubmit} className="grid gap-2 mt-4">
          <label htmlFor="titulo" className="font-medium mt-1">Título:</label>
          <input
            type="text"
            id="titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 rounded-md border border-gray-300 w-full font-inherit"
          />

          <label htmlFor="mensagem" className="font-medium mt-1">Mensagem:</label>
          <textarea
            id="mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            required
            className="p-2 rounded-md border border-gray-300 w-full font-inherit"
          />

          <label htmlFor="tipoNotificacao" className="font-medium mt-1">Tipo:</label>
          <select
            id="tipoNotificacao"
            value={type}
            onChange={(e) => setType(e.target.value as NotificationType)}
            required
            className="p-2 rounded-md border border-gray-300 w-full font-inherit"
          >
            <option value="mudanca">Mudança de Paradas</option>
            <option value="itinerario">Itinerário</option>
            <option value="aviso">Aviso</option>
            <option value="educativa">Campanha Educativa</option>
          </select>

          <label htmlFor="linhas" className="font-medium mt-1">Linhas Atingidas:</label>
          <input
            type="text"
            id="linhas"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            placeholder="Ex: 201, 202"
            required
            className="p-2 rounded-md border border-gray-300 w-full font-inherit"
          />

          <button 
            type="submit" 
            className="mt-2 px-4 py-2 border-none rounded-md text-sm font-semibold cursor-pointer transition-all hover:opacity-85 bg-green-600 text-white"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationModal;
