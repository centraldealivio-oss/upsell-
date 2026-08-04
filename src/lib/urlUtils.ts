import { UpsellConfig } from '../types';

export interface ComputedUrlResult {
  url: string;
  declineUrl: string;
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

  let targetBaseUrl = config.paradiseCheckoutUrl || 'https://checkoutonline.org.ua/c/71f8ea06a3';
  let targetDeclineUrl = config.declineUrl || 'https://area.centraldealivio.com.br/?token=PARADISE-STD-1234';
  let matchedRuleName: string | undefined = undefined;
  let isCustomParamActive = false;

  const searchLower = searchStr.toLowerCase();

  const hasB1 =
    urlParams.get('b1') === '1' ||
    urlParams.get('b1') === 'true' ||
    urlParams.get('ob1') === '1' ||
    searchLower.includes('ob_32cbb87ef39e091c') ||
    searchLower.includes('token-bonus1-bpm100');

  const hasB2 =
    urlParams.get('b2') === '1' ||
    urlParams.get('b2') === 'true' ||
    urlParams.get('ob2') === '1' ||
    searchLower.includes('ob_e03d0809953977bf') ||
    searchLower.includes('token-bonus2-gatilho');

  const hasB3 =
    urlParams.get('b3') === '1' ||
    urlParams.get('b3') === 'true' ||
    urlParams.get('ob3') === '1' ||
    searchLower.includes('ob_4ad8794a7ab9a473') ||
    searchLower.includes('token-bonus3-vinculo');

  const isSupremoFlag =
    urlParams.get('supremo') === 'true' ||
    urlParams.get('supremo') === '1' ||
    searchLower.includes('paradise-supremo-9999');

  const isComboFlag =
    urlParams.get('combo') === 'true' ||
    urlParams.get('combo') === '1' ||
    searchLower.includes('token-all-bonuses');

  // Count how many order bumps were bought
  const bumpCount = (hasB1 ? 1 : 0) + (hasB2 ? 1 : 0) + (hasB3 ? 1 : 0);

  // 1. Prioridade Máxima: Se comprou os 3 order bumps, ou Supremo flag, ou 2+ order bumps
  if (bumpCount >= 3 || isSupremoFlag) {
    targetDeclineUrl = 'https://area.centraldealivio.com.br/?token=PARADISE-SUPREMO-9999';
    matchedRuleName = '👑 Nível SUPREMO (Comunidade VIP Black)';
    isCustomParamActive = true;
  } else if (bumpCount === 2) {
    // Se comprou 2 bônus no checkout anterior, eleva para o nível Supremo ou Combo
    targetDeclineUrl = 'https://area.centraldealivio.com.br/?token=PARADISE-SUPREMO-9999';
    matchedRuleName = '👑 Nível SUPREMO (2 Bônus Adquiridos)';
    isCustomParamActive = true;
  } else if (isComboFlag) {
    targetDeclineUrl = 'https://area.centraldealivio.com.br/?token=TOKEN-ALL-BONUSES';
    matchedRuleName = '5. Combo Completo (Principal + Todos os 3 Bônus)';
    isCustomParamActive = true;
  } else if (hasB1 && !hasB2 && !hasB3) {
    targetDeclineUrl = 'https://area.centraldealivio.com.br/?token=TOKEN-BONUS1-BPM100';
    matchedRuleName = '2. Principal + Bônus 1 (Protocolo 100 BPM)';
    isCustomParamActive = true;
  } else if (hasB2 && !hasB1 && !hasB3) {
    targetDeclineUrl = 'https://area.centraldealivio.com.br/?token=TOKEN-BONUS2-GATILHO';
    matchedRuleName = '3. Principal + Bônus 2 (Raio-X do Gatilho)';
    isCustomParamActive = true;
  } else if (hasB3 && !hasB1 && !hasB2) {
    targetDeclineUrl = 'https://area.centraldealivio.com.br/?token=TOKEN-BONUS3-VINCULO';
    matchedRuleName = '4. Principal + Bônus 3 (Blindagem do Vínculo)';
    isCustomParamActive = true;
  } else if (config.bonusRules && config.bonusRules.length > 0 && searchStr) {
    // Regras personalizadas adicionais
    for (const rule of config.bonusRules) {
      if (!rule.paramKey) continue;
      const paramVal = urlParams.get(rule.paramKey);

      if (paramVal !== null) {
        const isMatch =
          paramVal === rule.paramValue ||
          rule.paramValue === '*' ||
          (rule.paramValue === '1' && (paramVal === 'true' || paramVal === '1')) ||
          paramVal.toLowerCase() === rule.paramValue.toLowerCase();

        if (isMatch) {
          if (rule.checkoutUrl) targetBaseUrl = rule.checkoutUrl;
          if (rule.declineUrl) targetDeclineUrl = rule.declineUrl;
          matchedRuleName = rule.bonusName;
          isCustomParamActive = true;
          break;
        }
      }
    }
  }

  // 2. Token explícito passado pela Paradise no link de redirecionamento (ex: ?token=PARADISE-SUPREMO-9999)
  const directToken =
    urlParams.get('token') ||
    urlParams.get('token_id') ||
    urlParams.get('checkout') ||
    urlParams.get('c');

  let tokenDetected: string | undefined = undefined;

  if (directToken && config.dynamicTokenInUrl !== false) {
    tokenDetected = directToken;
    isCustomParamActive = true;

    if (directToken.startsWith('TOKEN-') || directToken.startsWith('PARADISE-')) {
      targetDeclineUrl = `https://area.centraldealivio.com.br/?token=${directToken}`;
      if (directToken === 'PARADISE-SUPREMO-9999') {
        matchedRuleName = '👑 Nível SUPREMO (Comunidade VIP Black)';
      } else if (directToken === 'TOKEN-ALL-BONUSES') {
        matchedRuleName = '5. Combo Completo (Todos os Bônus)';
      } else if (directToken === 'TOKEN-BONUS1-BPM100') {
        matchedRuleName = '2. Principal + Bônus 1';
      } else if (directToken === 'TOKEN-BONUS2-GATILHO') {
        matchedRuleName = '3. Principal + Bônus 2';
      } else if (directToken === 'TOKEN-BONUS3-VINCULO') {
        matchedRuleName = '4. Principal + Bônus 3';
      }
    } else if (directToken.startsWith('http://') || directToken.startsWith('https://')) {
      targetBaseUrl = directToken;
    } else if (directToken.length >= 5) {
      if (targetBaseUrl.includes('/c/')) {
        targetBaseUrl = targetBaseUrl.replace(/\/c\/[a-zA-Z0-9]+/, `/c/${directToken}`);
      } else {
        targetBaseUrl = `https://checkoutonline.org.ua/c/${directToken}`;
      }
    }
  }

  // 3. Manter/Repassar parâmetros de tracking no link do botão de recusa
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

    try {
      const declObj = new URL(targetDeclineUrl);
      urlParams.forEach((value, key) => {
        if (key !== 'token' && !declObj.searchParams.has(key)) {
          declObj.searchParams.set(key, value);
        }
      });
      targetDeclineUrl = declObj.toString();
    } catch {
      // ignore invalid decline URL format
    }
  }

  return {
    url: targetBaseUrl,
    declineUrl: targetDeclineUrl,
    matchedRuleName,
    tokenDetected,
    isCustomParamActive,
  };
}
