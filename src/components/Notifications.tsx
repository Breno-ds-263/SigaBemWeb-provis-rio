import { useState, useEffect } from 'react';
import Header from './header';
import Footer from './Footer';
import FeedbackTable from './FeedbackTable';
import NotificationTable from './NotificationTable';
import NotificationModal from './NotificationModal';
import FilterCard from './FilterCard';
import type { Feedback, Notification, DisabilityType, NotificationType } from '../types';

// Mock data for feedbacks
const MOCK_FEEDBACKS: Feedback[] = [
  {
    id: 1,
    line: '201',
    date: '20/11/2025',
    disability: 'FISICA',
    gender: 'M',
    message: 'Ônibus sem rampa de acesso',
    type: 'Acessibilidade'
  },
  {
    id: 2,
    line: '202',
    date: '21/11/2025',
    disability: 'VISUAL',
    gender: 'F',
    message: 'Falta de aviso sonoro nas paradas',
    type: 'Acessibilidade'
  },
  {
    id: 3,
    line: '203',
    date: '22/11/2025',
    disability: 'AUDITIVA',
    gender: 'M',
    message: 'Motorista não avisou a próxima parada',
    type: 'Atendimento'
  },
  {
    id: 4,
    line: '201',
    date: '23/11/2025',
    disability: 'INTELECTUAL',
    gender: 'F',
    message: 'Sinalização confusa no ponto de ônibus',
    type: 'Sinalização'
  },
  {
    id: 5,
    line: '205',
    date: '24/11/2025',
    disability: 'MULTIPLA',
    gender: 'M',
    message: 'Ônibus lotado, sem espaço para cadeirante',
    type: 'Acessibilidade'
  }
];

// Mock data for notifications
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: 'Alteração de Itinerário',
    message: 'Linha 201 com desvio temporário na Avenida Principal',
    type: 'itinerario',
    line: '201',
    date: '20/11/2025'
  },
  {
    id: 2,
    title: 'Mudança de Paradas',
    message: 'Novas paradas incluídas no trajeto da linha 202',
    type: 'mudanca',
    line: '202',
    date: '21/11/2025'
  },
  {
    id: 3,
    title: 'Campanha de Conscientização',
    message: 'Respeite os assentos preferenciais',
    type: 'educativa',
    line: 'Todas',
    date: '22/11/2025'
  },
  {
    id: 4,
    title: 'Aviso Importante',
    message: 'Manutenção programada para fim de semana',
    type: 'aviso',
    line: '201, 202, 203',
    date: '23/11/2025'
  }
];

const Notifications: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<'feedbacks' | 'notifications'>('feedbacks');
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filteredData, setFilteredData] = useState<Feedback[] | Notification[]>(MOCK_FEEDBACKS);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [disabilityFilter, setDisabilityFilter] = useState<DisabilityType | 'all'>('all');
  const [notificationTypeFilter, setNotificationTypeFilter] = useState<NotificationType | 'all'>('all');

  useEffect(() => {
    if (currentMode === 'feedbacks') {
      setFilteredData(MOCK_FEEDBACKS);
    } else {
      setFilteredData(notifications);
    }
  }, [currentMode, notifications]);

  const handleFilterFeedbacks = () => {
    if (disabilityFilter === 'all') {
      setFilteredData(MOCK_FEEDBACKS);
    } else {
      const filtered = MOCK_FEEDBACKS.filter(f => f.disability === disabilityFilter);
      setFilteredData(filtered);
    }
  };

  const handleClearFeedbackFilter = () => {
    setDisabilityFilter('all');
    setFilteredData(MOCK_FEEDBACKS);
  };

  const handleFilterNotifications = () => {
    if (notificationTypeFilter === 'all') {
      setFilteredData(MOCK_NOTIFICATIONS);
    } else {
      const filtered = MOCK_NOTIFICATIONS.filter(n => n.type === notificationTypeFilter);
      setFilteredData(filtered);
    }
  };

  const handleClearNotificationFilter = () => {
    setNotificationTypeFilter('all');
    setFilteredData(MOCK_NOTIFICATIONS);
  };

  const handleSwitchMode = (mode: 'feedbacks' | 'notifications') => {
    setCurrentMode(mode);
    setDisabilityFilter('all');
    setNotificationTypeFilter('all');
  };

  const handleCreateNotification = (notificationData: Omit<Notification, 'id' | 'date'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: notifications.length + 1,
      date: new Date().toLocaleDateString('pt-BR')
    };
    
    setNotifications([...notifications, newNotification]);
    alert('Notificação criada com sucesso!');
    setIsNotificationModalOpen(false);
  };

  return (
    <div className="font-sans bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      <Header />
      
      <section className="flex justify-center gap-4 p-5">
        <button 
          className="px-4 py-2.5 border-none rounded-md text-sm font-semibold cursor-pointer transition-all duration-300 hover:opacity-85 bg-green-600 text-white"
          onClick={() => setIsNotificationModalOpen(true)}
        >
          Enviar Notificação
        </button>
      </section>

      <section className="flex gap-5 justify-center p-5 flex-wrap">
        {currentMode === 'feedbacks' ? (
          <FilterCard
            title="Filtrar Feedbacks"
            filterType="disability"
            selectedValue={disabilityFilter}
            onFilterChange={(value: string) => setDisabilityFilter(value as DisabilityType | 'all')}
            onApplyFilter={handleFilterFeedbacks}
            onClearFilter={handleClearFeedbackFilter}
          />
        ) : (
          <FilterCard
            title="Filtrar Notificações"
            filterType="notification"
            selectedValue={notificationTypeFilter}
            onFilterChange={(value: string) => setNotificationTypeFilter(value as NotificationType | 'all')}
            onApplyFilter={handleFilterNotifications}
            onClearFilter={handleClearNotificationFilter}
          />
        )}
      </section>

      <section className="p-5 flex-1">
        {currentMode === 'feedbacks' ? (
          <FeedbackTable 
            feedbacks={filteredData as Feedback[]} 
            onSwitchToNotifications={() => handleSwitchMode('notifications')}
          />
        ) : (
          <NotificationTable 
            notifications={filteredData as Notification[]} 
            onSwitchToFeedbacks={() => handleSwitchMode('feedbacks')}
          />
        )}
      </section>

      <Footer />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        onSubmit={handleCreateNotification}
      />
    </div>
  );
};

export default Notifications;
