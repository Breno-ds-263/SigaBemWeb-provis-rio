import { useState, useEffect } from 'react';
import type { DashboardStats } from '../types/dashboard';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Mocking delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockData: DashboardStats = {
          totalAccesses: 12540,
          totalRequests: 3200,
          topLines: [
            { id: '1', name: '001 - Centro / Rodoviária', accessCount: 1200, requestCount: 450 },
            { id: '2', name: '002 - Bairro Feliz / Shopping', accessCount: 950, requestCount: 380 },
            { id: '3', name: '045 - Campus Universitário', accessCount: 880, requestCount: 310 },
            { id: '4', name: '102 - Distrito Industrial', accessCount: 720, requestCount: 200 },
            { id: '5', name: '012 - Terminal Sul / Leste', accessCount: 650, requestCount: 150 },
          ],
          topStops: [
            { id: 's1', name: 'Terminal Central - Plataforma A', accessCount: 2500 },
            { id: 's2', name: 'Praça da Matriz', accessCount: 1800 },
            { id: 's3', name: 'Hospital Regional', accessCount: 1400 },
            { id: 's4', name: 'Shopping Park', accessCount: 1200 },
            { id: 's5', name: 'Estação Rodoviária', accessCount: 1100 },
          ],
          accessHistory: [
            { date: '2026-05-19', accesses: 1200, requests: 300 },
            { date: '2026-05-20', accesses: 1500, requests: 400 },
            { date: '2026-05-21', accesses: 1100, requests: 250 },
            { date: '2026-05-22', accesses: 1800, requests: 500 },
            { date: '2026-05-23', accesses: 2000, requests: 600 },
            { date: '2026-05-24', accesses: 1700, requests: 450 },
            { date: '2026-05-25', accesses: 1240, requests: 300 },
          ],
        };

        setData(mockData);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
