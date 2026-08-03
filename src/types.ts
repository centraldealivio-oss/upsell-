export interface CustomerOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  mainProductPurchased: boolean;
  upsellPurchased: boolean;
  createdAt: string;
  paradiseTransactionId?: string;
}

export interface BonusModule {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'audio' | 'video' | 'checklist';
  durationOrPages: string;
  downloadUrl?: string;
  contentSnippet: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  badge?: string;
  timestamp: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  comments: {
    id: string;
    author: string;
    timestamp: string;
    text: string;
  }[];
}

export interface BonusTokenRule {
  id: string;
  bonusName: string;
  paramKey: string;    // e.g. 'token', 'ob', 'b1', 'orderbump'
  paramValue: string; // e.g. '1', 'bonus1', '14da32acba', 'all'
  checkoutUrl: string; // e.g. 'https://compraonlineseguura.com/c/14da32acba'
  description?: string;
}

export interface UpsellConfig {
  headline: string;
  subheadline: string;
  price: string;
  paradiseCheckoutUrl: string;
  declineUrl: string;
  productImage: string;
  timerMinutes: number;
  useVectorMockup?: boolean;
  bonusRules?: BonusTokenRule[];
  forwardUrlParams?: boolean;
  dynamicTokenInUrl?: boolean;
}
