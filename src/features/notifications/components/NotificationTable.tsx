import type { Notification } from '../../../types/notifications';

interface NotificationTableProps {
  notifications: Notification[];
}

const NotificationTable = ({ 
  notifications, 
}: NotificationTableProps) => {
  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-brand-green text-white">
              <th className="p-3 text-center font-semibold">ID</th>
              <th className="p-3 text-center font-semibold">Título</th>
              <th className="p-3 text-center font-semibold">Mensagem</th>
              <th className="p-3 text-center font-semibold">Tipo</th>
              <th className="p-3 text-center font-semibold">Linhas</th>
              <th className="p-3 text-center font-semibold">Data</th>
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
                <tr key={notification.id} className="even:bg-gray-50 hover:bg-green-50 border-b border-gray-200 transition-colors">
                  <td className="p-3 text-center">{notification.id}</td>
                  <td className="p-3 text-center font-medium">{notification.title}</td>
                  <td className="p-3 text-center text-sm">{notification.message}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
                      {notification.type}
                    </span>
                  </td>
                  <td className="p-3 text-center">{notification.line}</td>
                  <td className="p-3 text-center">{notification.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden flex flex-col gap-4">
        {notifications.length === 0 ? (
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            Nenhuma notificação encontrada
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-2 border-b pb-2">
                <div className="flex flex-col">
                  <span className="font-bold text-blue-700">{notification.title}</span>
                  <span className="text-xs text-gray-400">ID: {notification.id}</span>
                </div>
                <span className="text-sm text-gray-500">{notification.date}</span>
              </div>
              <div className="mb-3">
                <p className="text-gray-700 text-sm">{notification.message}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Linhas: {notification.line}
                </span>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                  {notification.type}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationTable;
