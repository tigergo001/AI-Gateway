import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface Translations {
  [key: string]: string;
}

interface Dictionary {
  zh: Translations;
  en: Translations;
}

const defaultDict: Dictionary = {
  en: {
    // General
    'nav.home': 'Home',
    'nav.models': 'Models',
    'nav.routes': 'Routes',
    'nav.stats': 'Insights',
    'nav.workspace': 'Workspace',
    'nav.settings': 'Settings',
    'nav.profile': 'Profile',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.status': 'Status',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.offline': 'Offline',
    
    // Login
    'login.title': 'AI Gateway',
    'login.subtitle': 'Intelligent Infrastructure for Modern Devs',
    'login.wechat': 'Login with WeChat',
    'login.phone': 'Phone Number Login',
    'login.phonePlaceholder': 'Phone Number',
    'login.codePlaceholder': 'Verification Code',
    'login.passwordPlaceholder': 'Password',
    'login.phonePwd': 'Phone / Password',
    'login.phoneCode': 'Phone / Code',
    'login.getCode': 'Get Code',
    'login.submit': 'Login',
    'login.back': 'Back to options',
    'login.fast': 'Fast Access',
    'login.agree': 'I have read and agree to the {terms} and {privacy}.',
    'login.terms': 'Terms of Service',
    'login.privacy': 'Privacy Policy',
    'login.close': 'Close',
    'login.pleaseAgree': 'Please agree to the Terms of Service and Privacy Policy first',
    'login.status': 'All Gateway Nodes Operational',

    // Home
    'home.search': 'Search requests, models, or errors...',
    'home.todayTokens': "Today's Tokens",
    'home.estCost': 'Estimated Cost (USD)',
    'home.activeModels': 'Active Models',
    'home.realtimeUsage': 'Real-time Usage',
    'home.tokenConsumption': 'Token consumption over last 24h',
    'home.live': 'Live',
    'home.24h': '24H',
    'home.recentActivity': 'Recent Activity',
    'home.viewAll': 'View All Logs',
    'home.insightText': "You've successfully diverted 24% of traffic to cheaper models today.",
    'home.systemNotice': 'System Notice',
    'home.latencyNotice': 'High latency detected on GPT-4o region US-East.',

    // Models
    'models.title': 'Models',
    'models.subtitle': 'Manage your LLM deployments and quotas.',
    'models.active': 'Active',
    'models.remainingQuota': 'Remaining Quota',
    'models.statusOffline': 'STATUS: CONNECTION RESET',
    'models.latency': 'LATENCY:',
    'models.lastPing': 'Last ping:',
    'models.avgLatency': 'Avg. Latency',
    'models.totalTokens': 'Total Tokens',
    'models.addBtn': 'Add Model',
    'models.modelName': 'Model Name',
    'models.modelNamePlaceholder': 'e.g. GPT-4 Turbo',

    // Routes
    'routes.title': 'Route Settings',
    'routes.desc': 'Configure how your API requests are routed across multiple AI providers and models.',
    'routes.mode': 'Routing Mode',
    'routes.modeDesc': 'Select between static or intelligent routing logic.',
    'routes.manualBtn': 'Manual',
    'routes.autoBtn': 'Auto',
    'routes.manual': 'Manual Configuration',
    'routes.manualDesc': 'All traffic will be directed to this model until changed.',
    'routes.primaryModel': 'Primary Model Selection',
    'routes.auto': 'Auto-Routing Strategies',
    'routes.reset': 'Reset to Default',

    // Stats
    'stats.modelUsage': 'Model Usage',
    'stats.dailyCost': 'Daily Cost Trend',
    'stats.totalSpend': 'Total Spend',
    'stats.avgCost': 'Avg Per Req',
    'stats.rawLogs': 'Raw Request Logs',
    'stats.last7Days': 'Last 7 Days',
    'stats.last30Days': 'Last 30 Days',
    'stats.last3Months': 'Last 3 Months',
    'stats.liveFeed': 'Live Feed',
    'stats.date': 'Date/Time',
    'stats.model': 'Model',
    'stats.colClass': 'Status',
    'stats.duration': 'Duration',
    'stats.cost': 'Cost',

    // Workspace
    'workspace.title': 'Workspace Management',
    'workspace.desc': 'Manage environments and collaboration.',
    'workspace.create': 'Create',
    
    // StrategyConfig
    'strategy.title': 'Intelligent Route Engine',
    'strategy.desc': 'Dynamic traffic scheduling based on performance.',
    'strategy.latencyFirst': 'Latency First',
    'strategy.costFirst': 'Cost First',
    'strategy.expBackoff': 'Exponential Backoff',
    'strategy.streamSupport': 'Stream Support',
    'strategy.fallbackMod': 'Fallback Model Selector',
    'strategy.activeLbl': 'ACTIVE:',
    'strategy.reset': 'Reset',
    'strategy.save': 'Save Config',
    'strategy.lat': 'Lat:',
    'strategy.cost': 'Cost:',

    // Profile
    'profile.workspace': 'Workspace Management',
    'profile.usageLimits': 'Usage Limits',
    'profile.accountSecurity': 'Account Security',
    'profile.apiManagement': 'API Key Management',
    'profile.apiKeyDesc': 'Never share your API key. It grants full access to your gateway resources.',
    'profile.copy': 'Copy',
    'profile.sysAlerts': 'System Alerts',
    'profile.sysAlertsDesc': 'Notify on high latency',
    'profile.emailSum': 'Email Summaries',
    'profile.emailSumDesc': 'Weekly performance reports',
    'profile.logout': 'Logout Account',

    // ModelDetail
    'modelDetail.configuration': 'Configuration',
    'modelDetail.endpoints': 'Endpoints & Quota',
    'modelDetail.dangerZone': 'Danger Zone',
    'modelDetail.startTest': 'Start Test',
    'modelDetail.delete': 'Delete',
    'modelDetail.deleteDesc': 'Permanent removal will break all associated routing logic.',

    // LogDetail
    'logDetail.reqId': 'Request ID',
    'logDetail.model': 'Model Executed',
    'logDetail.status': 'Final Status',
    'logDetail.tokens': 'Token Usage',
    'logDetail.billing': 'Billing Detail',
    'logDetail.export': 'Export JSON',
    'logDetail.rerun': 'Rerun Request',
  },
  zh: {
    // General
    'nav.home': '首页',
    'nav.models': '模型',
    'nav.routes': '路由',
    'nav.stats': '洞察',
    'nav.workspace': '工作区管理',
    'nav.settings': '设置',
    'nav.profile': '我的',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.status': '状态',
    'common.active': '运行中',
    'common.inactive': '未激活',
    'common.offline': '离线',
    
    // Login
    'login.title': 'AI Gateway',
    'login.subtitle': '现代开发者的智能基础设施',
    'login.wechat': '微信登录',
    'login.phone': '手机号/验证码/密码登录',
    'login.phonePlaceholder': '请输入手机号',
    'login.codePlaceholder': '验证码',
    'login.passwordPlaceholder': '密码',
    'login.phonePwd': '手机号/密码',
    'login.phoneCode': '手机号/验证码',
    'login.getCode': '获取验证码',
    'login.submit': '登录',
    'login.back': '返回其他登录方式',
    'login.fast': '快捷访问',
    'login.agree': '我已阅读并同意 {terms} 与 {privacy}。',
    'login.terms': '服务条款',
    'login.privacy': '隐私政策',
    'login.close': '关闭',
    'login.pleaseAgree': '请先勾选同意服务条款与隐私政策',
    'login.status': '所有网关节点运行正常',

    // Home
    'home.search': '搜索请求、模型或错误日志...',
    'home.todayTokens': "今日消耗 Token",
    'home.estCost': '预估成本 (USD)',
    'home.activeModels': '活跃模型数',
    'home.realtimeUsage': '实时用量',
    'home.tokenConsumption': '过去 24 小时 Token 消耗情况',
    'home.live': '实时',
    'home.24h': '24小时',
    'home.recentActivity': '最近活动',
    'home.viewAll': '查看所有日志',
    'home.insightText': '您今天成功将 24% 的流量转移到了更便宜的模型。',
    'home.systemNotice': '系统通知',
    'home.latencyNotice': '已检测到 US-East 区域的 GPT-4o 模型存在高延迟。',

    // Models
    'models.title': '模型',
    'models.subtitle': '管理您的 LLM 部署及配额。',
    'models.active': '运行中',
    'models.remainingQuota': '剩余配额',
    'models.statusOffline': '状态：连接重置',
    'models.latency': '延迟：',
    'models.lastPing': '最后连接：',
    'models.avgLatency': '平均延迟',
    'models.totalTokens': '总消耗 Tokens',
    'models.addBtn': '新增模型',
    'models.modelName': '模型名称',
    'models.modelNamePlaceholder': '例如：GPT-4 Turbo',

    // Routes
    'routes.title': '路由设置',
    'routes.desc': '配置 API 请求如何在多个 AI 提供商和模型之间进行路由。',
    'routes.mode': '路由模式',
    'routes.modeDesc': '选择静态或智能路由逻辑。',
    'routes.manualBtn': '手动',
    'routes.autoBtn': '自动',
    'routes.manual': '手动配置',
    'routes.manualDesc': '除非更改，否则所有流量都将定向到此模型。',
    'routes.primaryModel': '主模型选择',
    'routes.auto': '自动路由策略',
    'routes.reset': '恢复默认设置',

    // Stats
    'stats.modelUsage': '模型使用率',
    'stats.dailyCost': '每日成本趋势',
    'stats.totalSpend': '总支出',
    'stats.avgCost': '平均单次请求费用',
    'stats.rawLogs': '原始请求日志',
    'stats.last7Days': '最近 7 天',
    'stats.last30Days': '最近 30 天',
    'stats.last3Months': '最近 3 个月',
    'stats.liveFeed': '实时日志',
    'stats.date': '日期/时间',
    'stats.model': '模型',
    'stats.colClass': '状态',
    'stats.duration': '耗时',
    'stats.cost': '费用',

    // Workspace
    'workspace.title': '工作区管理',
    'workspace.desc': '管理开发环境与团队协作。',
    'workspace.create': '创建环境',

    // StrategyConfig
    'strategy.title': '智能路由引擎',
    'strategy.desc': '基于性能的动态流量调度。',
    'strategy.latencyFirst': '延迟优先',
    'strategy.costFirst': '成本优先',
    'strategy.expBackoff': '指数退避重试',
    'strategy.streamSupport': '流式输出支持',
    'strategy.fallbackMod': '备用模型选择器',
    'strategy.activeLbl': '当前生效:',
    'strategy.reset': '重置',
    'strategy.save': '保存配置',
    'strategy.lat': '延迟:',
    'strategy.cost': '成本:',

    // Profile
    'profile.workspace': '工作区管理',
    'profile.usageLimits': '使用限制',
    'profile.accountSecurity': '账户安全',
    'profile.apiManagement': 'API 密钥管理',
    'profile.apiKeyDesc': '切勿分享您的 API 密钥。它提供对网关资源的完全访问权限。',
    'profile.copy': '复制',
    'profile.sysAlerts': '系统警报',
    'profile.sysAlertsDesc': '高延迟通知',
    'profile.emailSum': '邮件摘要',
    'profile.emailSumDesc': '每周性能报告',
    'profile.logout': '退出账号',

    // ModelDetail
    'modelDetail.configuration': '配置',
    'modelDetail.endpoints': '端点与配额',
    'modelDetail.dangerZone': '危险区域',
    'modelDetail.startTest': '开始测试',
    'modelDetail.delete': '删除',
    'modelDetail.deleteDesc': '永久删除将导致所有关联的路由逻辑失效。',

    // LogDetail
    'logDetail.reqId': '请求 ID',
    'logDetail.model': '执行模型',
    'logDetail.status': '最终状态',
    'logDetail.tokens': 'Token 用量',
    'logDetail.billing': '账单详情',
    'logDetail.export': '导出 JSON',
    'logDetail.rerun': '重新运行请求',
  }
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, values?: Record<string, ReactNode>) => string | ReactNode;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string, values?: Record<string, ReactNode>): string | ReactNode => {
    const text = defaultDict[language]?.[key] || defaultDict['en']?.[key] || key;
    
    if (!values) return text;
    
    const parts = text.split(/({[\w]+})/g);
    return (
      <>
        {parts.map((part, i) => {
          const match = part.match(/^{([\w]+)}$/);
          if (match && values[match[1]]) {
            return <React.Fragment key={i}>{values[match[1]]}</React.Fragment>;
          }
          return part;
        })}
      </>
    );
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
