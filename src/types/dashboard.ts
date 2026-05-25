export interface DashboardStats {
  totalAccesses: number;
  totalRequests: number;
  topLines: LineStats[];
  topStops: StopStats[];
  accessHistory: AccessHistoryItem[];
}

export interface LineStats {
  id: string;
  name: string;
  accessCount: number;
  requestCount: number;
}

export interface StopStats {
  id: string;
  name: string;
  accessCount: number;
}

export interface AccessHistoryItem {
  date: string;
  accesses: number;
  requests: number;
}
