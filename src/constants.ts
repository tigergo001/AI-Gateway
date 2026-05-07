import { Model, ModelUsage, Activity, RouteStrategy, Log } from './types';

export const modelUsageData: ModelUsage[] = [
  { name: 'GPT-4o', value: 45, color: '#9a3412' },
  { name: 'Claude 3.5', value: 30, color: '#d97706' },
  { name: 'Gemini', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 10, color: '#dc2626' },
];

export const dailyCostData = [
  { day: 'MON', value: 40 }, { day: 'TUE', value: 65 }, { day: 'WED', value: 55 },
  { day: 'THU', value: 90 }, { day: 'FRI', value: 70 }, { day: 'SAT', value: 30 },
  { day: 'SUN', value: 45 },
];

export const usageChartData = [
  { time: '00:00', value: 30 }, { time: '03:00', value: 45 }, { time: '06:00', value: 35 },
  { time: '09:00', value: 40 }, { time: '12:00', value: 60 }, { time: '15:00', value: 50 },
  { time: '18:00', value: 35 }, { time: '21:00', value: 45 }, { time: 'Now', value: 60 },
];

export const activities: Activity[] = [
  {
    id: '1',
    type: 'request',
    title: 'GPT-4o API Request',
    description: '242 tokens • Completion successful',
    time: '2m ago',
    tokens: 242,
  },
  {
    id: '2',
    type: 'route',
    title: 'Route Updated: Llama-3-70b',
    description: 'Latency optimized for US-East',
    time: '15m ago',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Rate Limit Warning',
    description: 'Model claude-3-opus approaching limit',
    time: '1h ago',
  },
];

export const models: Model[] = [
  {
    id: '1',
    name: 'OpenAI GPT-4',
    provider: 'OpenAI',
    status: 'active',
    quota: 82,
    latency: '420ms',
    lastPing: '2m ago',
    icon: 'openai',
  },
  {
    id: '2',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    status: 'active',
    quota: 45,
    latency: '1.2s',
    lastPing: '5m ago',
    icon: 'anthropic',
  },
  {
    id: '3',
    name: 'DeepSeek-V3',
    provider: 'DeepSeek',
    status: 'offline',
    quota: 12,
    latency: 'N/A',
    lastPing: '1h ago',
    icon: 'deepseek',
  },
];

export const strategies: RouteStrategy[] = [
  {
    id: '1',
    name: 'Latency First',
    description: 'Prioritizes models with the lowest response time for the current request payload.',
    icon: 'Zap',
    active: true,
    optimized: true,
  },
  {
    id: '2',
    name: 'Cost First',
    description: 'Automatically routes to the least expensive model that meets the capability requirements.',
    icon: 'DollarSign',
    active: true,
  },
  {
    id: '3',
    name: 'Remaining Quota First',
    description: 'Balances usage across providers based on monthly subscription limits and tiers.',
    icon: 'Database',
    active: false,
  },
];

export const logs: Log[] = [
  {
    id: 'req_92h...a812', timestamp: '14:23:01.442', model: 'gpt-4o-2024-05-13',
    tokens: '1,248', latency: '842ms', status: '200', statusText: 'OK',
  },
  {
    id: 'req_b12...ff90', timestamp: '14:22:58.110', model: 'claude-3-5-sonnet',
    tokens: '512', latency: '1,210ms', status: '200', statusText: 'OK',
  },
  {
    id: 'req_31a...dd22', timestamp: '14:22:55.002', model: 'gpt-4o-mini',
    tokens: '2,890', latency: '3,540ms', status: '429', statusText: 'RATE',
  },
  {
    id: 'req_f44...ee11', timestamp: '14:22:50.871', model: 'gemini-1.5-pro',
    tokens: '188', latency: '412ms', status: '200', statusText: 'OK',
  },
];
