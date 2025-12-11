import type { Notification } from '../types';

interface NotificationTableProps {
  notifications: Notification[];
  onSwitchToFeedbacks: () => void;
}

const NotificationTable = ({ 
  notifications, 
  onSwitchToFeedbacks 
}: NotificationTableProps) => {
  return (
    <div id="notificationsTable">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">
              <button 
                className="px-4 py-2 border-none rounded-md text-sm font-semibold cursor-pointer transition-all hover:opacity-85 bg-blue-500 text-white"
                onClick={onSwitchToFeedbacks}
              >
                Feedbacks
              </button>
              <button 
                className="px-4 py-2 border-none rounded-md text-sm font-semibold cursor-not-allowed opacity-60 bg-blue-500 text-white ml-2"
                disabled
              >
                Notificações
              </button>
            </th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Título</th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Mensagem</th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Tipo</th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Linhas</th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Data</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-5">
                Nenhuma notificação encontrada
              </td>
            </tr>
          ) : (
            notifications.map((notification) => (
              <tr key={notification.id} className="even:bg-gray-100 hover:bg-green-50 border-b border-gray-300">
                <td className="p-3 text-center">{notification.id}</td>
                <td className="p-3 text-center">{notification.title}</td>
                <td className="p-3 text-center">{notification.message}</td>
                <td className="p-3 text-center">{notification.type}</td>
                <td className="p-3 text-center">{notification.line}</td>
                <td className="p-3 text-center">{notification.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;
