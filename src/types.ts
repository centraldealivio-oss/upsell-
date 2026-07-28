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

export interface UpsellConfig {
  headline: string;
  subheadline: string;
  price: string;
  paradiseCheckoutUrl: string;
  declineUrl: string;
  productImage: string;
  timerMinutes: number;
}
