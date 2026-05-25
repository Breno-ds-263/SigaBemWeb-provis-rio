import type { Feedback } from '../../../types/notifications';

interface FeedbackTableProps {
  feedbacks: Feedback[];
}

const FeedbackTable = ({ 
  feedbacks, 
}: FeedbackTableProps) => {
  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-brand-green text-white">
              <th className="p-3 text-center font-semibold">ID</th>
              <th className="p-3 text-center font-semibold">Linha</th>
              <th className="p-3 text-center font-semibold">Data</th>
              <th className="p-3 text-center font-semibold">Deficiência</th>
              <th className="p-3 text-center font-semibold">Gênero</th>
              <th className="p-3 text-center font-semibold">Descrição</th>
              <th className="p-3 text-center font-semibold">Demanda</th>
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
                <tr key={feedback.id} className="even:bg-gray-50 hover:bg-green-50 border-b border-gray-200 transition-colors">
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

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden flex flex-col gap-4">
        {feedbacks.length === 0 ? (
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            Nenhum feedback encontrado
          </div>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-brand-green">
              <div className="flex justify-between items-start mb-2 border-b pb-2">
                <span className="font-bold text-brand-dark-green">#{feedback.id} - Linha {feedback.line}</span>
                <span className="text-sm text-gray-500">{feedback.date}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                <div>
                  <p className="text-gray-500 font-medium">Deficiência</p>
                  <p>{feedback.disability}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Gênero</p>
                  <p>{feedback.gender === 'M' ? 'Masculino' : 'Feminino'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 font-medium">Tipo de Demanda</p>
                  <p>{feedback.type}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t">
                <p className="text-gray-500 font-medium text-sm italic">Descrição:</p>
                <p className="text-gray-700">{feedback.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackTable;
