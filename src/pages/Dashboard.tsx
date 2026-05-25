import { useDashboardData } from "../hooks/useDashboardData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Legend 
} from "recharts";
import { Users, MapPin, Bus, Activity } from "lucide-react";

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error || "Dados não encontrados"}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard de Operações</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card 
            title="Total de Acessos" 
            value={data.totalAccesses.toLocaleString()} 
            icon={<Users className="text-blue-500" />} 
          />
          <Card 
            title="Solicitações" 
            value={data.totalRequests.toLocaleString()} 
            icon={<Activity className="text-green-500" />} 
          />
          <Card 
            title="Linhas Ativas" 
            value={data.topLines.length.toString()} 
            icon={<Bus className="text-purple-500" />} 
          />
          <Card 
            title="Paradas Monitoradas" 
            value={data.topStops.length.toString()} 
            icon={<MapPin className="text-orange-500" />} 
          />
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Access History Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Histórico de Acessos (Últimos 7 dias)</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.accessHistory}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="accesses" 
                    name="Acessos"
                    stroke="#22c55e" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="requests" 
                    name="Solicitações"
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Lines Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Linhas Mais Acessadas</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.topLines} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    tick={{fontSize: 10}} 
                  />
                  <Tooltip />
                  <Bar 
                    dataKey="accessCount" 
                    name="Acessos"
                    fill="#22c55e" 
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Lines Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-700">Ranking de Linhas</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm">
                    <th className="p-4 font-medium">Linha</th>
                    <th className="p-4 font-medium text-right">Acessos</th>
                    <th className="p-4 font-medium text-right">Solicitações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.topLines.map((line) => (
                    <tr key={line.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-gray-700">{line.name}</td>
                      <td className="p-4 text-sm text-right text-gray-600">{line.accessCount.toLocaleString()}</td>
                      <td className="p-4 text-sm text-right text-gray-600">{line.requestCount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Stops Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-700">Paradas Mais Solicitadas</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm">
                    <th className="p-4 font-medium">Parada / Estação</th>
                    <th className="p-4 font-medium text-right">Total de Acessos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.topStops.map((stop) => (
                    <tr key={stop.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-gray-700">{stop.name}</td>
                      <td className="p-4 text-sm text-right text-gray-600">{stop.accessCount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function Card({ title, value, icon }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
