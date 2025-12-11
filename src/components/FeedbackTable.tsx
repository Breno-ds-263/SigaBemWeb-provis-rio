import type { Feedback } from '../types';

interface FeedbackTableProps {
  feedbacks: Feedback[];
  onSwitchToNotifications: () => void;
}

const FeedbackTable = ({ 
  feedbacks, 
  onSwitchToNotifications 
}: FeedbackTableProps) => {
  return (
    <div id="feedbackTable">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">
              <button 
                className="px-4 py-2 border-none rounded-md text-sm font-semibold cursor-not-allowed opacity-60 bg-blue-500 text-white"
                disabled
              >
                Feedbacks
              </button>
              <button 
                className="px-4 py-2 border-none rounded-md text-sm font-semibold cursor-pointer transition-all hover:opacity-85 bg-blue-500 text-white ml-2"
                onClick={onSwitchToNotifications}
              >
                Notificações
              </button>
            </th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Linha</th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Data</th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Deficiência</th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Gênero</th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Descrição</th>
            <th className="p-3 text-center bg-green-500 text-white font-semibold">Demanda</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-5">
                Nenhum feedback encontrado
              </td>
            </tr>
          ) : (
            feedbacks.map((feedback) => (
              <tr key={feedback.id} className="even:bg-gray-100 hover:bg-green-50 border-b border-gray-300">
                <td className="p-3 text-center">{feedback.id}</td>
                <td className="p-3 text-center">{feedback.line}</td>
                <td className="p-3 text-center">{feedback.date}</td>
                <td className="p-3 text-center">{feedback.disability}</td>
                <td className="p-3 text-center">{feedback.gender === 'M' ? 'Masculino' : 'Feminino'}</td>
                <td className="p-3 text-center">{feedback.message}</td>
                <td className="p-3 text-center">{feedback.type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
