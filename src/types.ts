export interface ModelUsage {
  name: string;
  value: number;
  color: string;
}

export interface Activity {
  id: string;
  type: 'request' | 'route' | 'warning';
  title: string;
  description: string;
  time: string;
  tokens?: number;
}

export interface Model {
  id: string;
  name: string;
  provider: string;
  status: 'active' | 'offline';
  quota: number;
  latency: string;
  lastPing: string;
  icon: string;
}

export interface RouteStrategy {
  id: string;
  name: string;
  description: string;
  icon: string;
  active: boolean;
  optimized?: boolean;
}

export interface Log {
  id: string;
  timestamp: string;
  model: string;
  tokens: string;
  latency: string;
  status: '200' | '429';
  statusText: string;
}
