import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.auction_tape': { zh: '实时竞价', en: 'Auction Tape' },
  'nav.explain': { zh: '竞价解释', en: 'Explain' },
  'nav.admin': { zh: '管理后台', en: 'Admin' },
  'nav.login': { zh: '登录', en: 'Login' },
  
  // Home
  'home.hero.title': { zh: 'Mirix-ADX 智能竞价引擎', en: 'Mirix-ADX Intelligent Bidding Engine' },
  'home.hero.subtitle': { zh: '新一代高性能、可解释的实时广告交易平台', en: 'Next-generation high-performance, explainable real-time ad exchange platform' },
  'home.stats.daily_auctions': { zh: '日均竞价', en: 'Daily Auctions' },
  'home.stats.latency': { zh: '平均延迟', en: 'Avg Latency' },
  'home.stats.active_bidders': { zh: '活跃Bidder', en: 'Active Bidders' },
  'home.stats.strategies': { zh: '智能策略', en: 'Smart Strategies' },
  'home.features.explainable': { zh: '可解释竞价', en: 'Explainable Bidding' },
  'home.features.explainable.desc': { zh: '透明展示每一步竞价逻辑和出价构成', en: 'Transparently display every bidding logic and bid composition' },
  'home.features.realtime': { zh: '实时流盘', en: 'Real-time Tape' },
  'home.features.realtime.desc': { zh: 'WebSocket毫秒级推送竞价现场数据', en: 'WebSocket millisecond-level push of live bidding data' },
  'home.features.smart': { zh: '智能策略', en: 'Smart Strategies' },
  'home.features.smart.desc': { zh: '支持tCPA、tROAS等多种自动出价算法', en: 'Support tCPA, tROAS and other auto-bidding algorithms' },
  'home.cta.view_tape': { zh: '查看实时竞价', en: 'View Auction Tape' },
  'home.cta.dashboard': { zh: '管理仪表板', en: 'Admin Dashboard' },

  // Auction Tape
  'tape.title': { zh: '实时竞价流盘', en: 'Real-time Auction Tape' },
  'tape.status.connected': { zh: '已连接', en: 'Connected' },
  'tape.status.disconnected': { zh: '未连接', en: 'Disconnected' },
  'tape.pause': { zh: '暂停', en: 'Pause' },
  'tape.resume': { zh: '恢复', en: 'Resume' },
  'tape.table.time': { zh: '时间', en: 'Time' },
  'tape.table.auction_id': { zh: '竞价ID', en: 'Auction ID' },
  'tape.table.winner': { zh: '获胜者', en: 'Winner' },
  'tape.table.winning_bid': { zh: '获胜出价', en: 'Winning Bid' },
  'tape.table.clearing_price': { zh: '成交价', en: 'Clearing Price' },
  'tape.table.actions': { zh: '操作', en: 'Actions' },
  'tape.view_details': { zh: '查看详情', en: 'View Details' },

  // Explain
  'explain.title': { zh: '竞价详情解释', en: 'Auction Explain' },
  'explain.step1': { zh: '候选过滤', en: 'Candidate Filtering' },
  'explain.step2': { zh: '出价构成', en: 'Bid Construction' },
  'explain.step3': { zh: '竞价排序', en: 'Bidding Ranking' },
  'explain.step4': { zh: '成交价计算', en: 'Clearing Price' },
  'explain.step5': { zh: '结算/记账', en: 'Settlement' },
  'explain.step6': { zh: '推送详情', en: 'Push Details' },
  'explain.base_price': { zh: '基础出价', en: 'Base Price' },
  'explain.adjustments': { zh: '调整因素', en: 'Adjustments' },
  'explain.final_bid': { zh: '最终出价', en: 'Final Bid' },
  'explain.winner': { zh: '获胜者', en: 'Winner' },
  'explain.second_price': { zh: '第二高价', en: 'Second Price' },
  'explain.clearing_price': { zh: '成交价格', en: 'Clearing Price' },
  'explain.publisher_revenue': { zh: '媒体收入', en: 'Publisher Revenue' },
  'explain.platform_fee': { zh: '平台费用', en: 'Platform Fee' },

  // Admin
  'admin.title': { zh: '管理仪表板', en: 'Admin Dashboard' },
  'admin.tab.bidders': { zh: 'Bidder管理', en: 'Bidders' },
  'admin.tab.creatives': { zh: '创意管理', en: 'Creatives' },
  'admin.tab.rules': { zh: '规则配置', en: 'Rules' },
  'admin.bidder.name': { zh: '名称', en: 'Name' },
  'admin.bidder.strategy': { zh: '策略', en: 'Strategy' },
  'admin.bidder.budget': { zh: '预算', en: 'Budget' },
  'admin.bidder.status': { zh: '状态', en: 'Status' },
  'admin.bidder.actions': { zh: '操作', en: 'Actions' },
  'admin.edit': { zh: '编辑', en: 'Edit' },
  'admin.demo.title': { zh: '演示控制', en: 'Demo Control' },
  'admin.demo.run': { zh: '运行一次竞价', en: 'Run Auction' },
  'admin.demo.running': { zh: '运行中...', en: 'Running...' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
