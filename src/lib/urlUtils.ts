import { UpsellConfig } from '../types';

export interface ComputedUrlResult {
  url: string;
  matchedRuleName?: string;
  tokenDetected?: string;
  isCustomParamActive: boolean;
}

export function computeDynamicCheckoutUrl(
  config: UpsellConfig,
  customSearch?: string
): ComputedUrlResult {
  const searchStr =
    customSearch !== undefined
      ? customSearch
      : typeof window !== 'undefined'
      ? window.location.search
      : '';

  const urlParams = new URLSearchParams(searchStr);

  let targetBaseUrl = config.paradiseCheckoutUrl || 'https://compraonlineseguura.com/c/eb3f66e437';
  let matchedRuleName: string | undefined = undefined;
  let isCustomParamActive = false;

  // 1. Check if any configured bonus rule matches query params in URL
  if (config.bonusRules && config.bonusRules.length > 0 && searchStr) {
    for (const rule of config.bonusRules) {
      if (!rule.paramKey) continue;
      const paramVal = urlParams.get(rule.paramKey);

      if (paramVal !== null) {
        const isMatch =
          paramVal === rule.paramValue ||
          rule.paramValue === '*' ||
          (rule.paramValue === '1' && (paramVal === 'true' || paramVal === '1')) ||
          paramVal.toLowerCase() === rule.paramValue.toLowerCase();

        if (isMatch && rule.checkoutUrl) {
          targetBaseUrl = rule.checkoutUrl;
          matchedRuleName = rule.bonusName;
          isCustomParamActive = true;
          break;
        }
      }
    }
  }

  // 2. Direct token parameter (e.g., ?token=14da32acba or ?c=cd7eb4c0c6)
  const directToken =
    urlParams.get('token') ||
    urlParams.get('token_id') ||
    urlParams.get('checkout') ||
    urlParams.get('c');

  let tokenDetected: string | undefined = undefined;

  if (directToken && config.dynamicTokenInUrl !== false) {
    tokenDetected = directToken;
    isCustomParamActive = true;

    if (directToken.startsWith('http://') || directToken.startsWith('https://')) {
      targetBaseUrl = directToken;
    } else if (directToken.length >= 5) {
      if (targetBaseUrl.includes('/c/')) {
        targetBaseUrl = targetBaseUrl.replace(/\/c\/[a-zA-Z0-9]+/, `/c/${directToken}`);
      } else {
        targetBaseUrl = `https://compraonlineseguura.com/c/${directToken}`;
      }
    }
  }

  // 3. Preserve/forward tracking parameters (UTMs, fpay_id, transaction_id, etc.)
  if (config.forwardUrlParams !== false && searchStr) {
    try {
      const urlObj = new URL(targetBaseUrl);
      urlParams.forEach((value, key) => {
        if (!urlObj.searchParams.has(key)) {
          urlObj.searchParams.set(key, value);
        }
      });
      targetBaseUrl = urlObj.toString();
    } catch {
      const separator = targetBaseUrl.includes('?') ? '&' : '?';
      const cleanSearch = searchStr.replace(/^\?/, '');
      if (cleanSearch) {
        targetBaseUrl += `${separator}${cleanSearch}`;
      }
    }
  }

  return {
    url: targetBaseUrl,
    matchedRuleName,
    tokenDetected,
    isCustomParamActive,
  };
}
