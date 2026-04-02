import { sample } from "@/data";
import { View } from "react-native";
import { lineDataItem } from "react-native-gifted-charts";

// export interface UnifiedBar {
//   time: string;
//   price: number;
// }
// export type iexTimeframes = '1min'|'5min'|'15min'|'30min'|'1hour'|'2hour'|'4hour'
// export type dailyTimeframes = 'daily'|'weekly'|'monthly'|'annually'
// export type timeframes = iexTimeframes | dailyTimeframes
// 1. Define the arrays (the runtime values)
export const iexValues = ['1min', '5min', '15min', '30min', '1hour', '2hour', '4hour'] as const;
export const dailyValues = ['daily', 'weekly', 'monthly', 'annually'] as const;

// 2. Derive the types from the arrays
export type iexTimeframes = typeof iexValues[number];
export type dailyTimeframes = typeof dailyValues[number];
export type timeframes = iexTimeframes | dailyTimeframes;
// This function returns a boolean AND tells TS the specific type
export function isIexTimeframe(timeframe: string): timeframe is iexTimeframes {
  return iexValues.includes(timeframe as iexTimeframes);
}

export function isDailyTimeframe(timeframe: string): timeframe is dailyTimeframes {
  return dailyValues.includes(timeframe as dailyTimeframes);
}
const getTiingoDate = (daysAgo = 0) => {
  const date = new Date();
  // Subtract days if needed
  date.setDate(date.getDate() - daysAgo);

  return date.toISOString().split('T')[0];
};
const timeframeDayCorrespondence = {
  daily: 200,
  weekly: 1400,
  monthly: 1461,
  annually: 3653,
}





const normalizeTiingoData = (data: any[], isIntraday: boolean, timeframe: timeframes): lineDataItem[] => {
  if (!Array.isArray(data)) {
    console.error("normalizeTiingoData expected an array, but received:", data);
    return [];
  }
  let l = data.length;
  l = Math.floor(l / 5)
  let d = l;


  return data.map((item, i) => {
    let r: lineDataItem = {
      // IEX dates look like "2026-03-27T14:30:00.000Z"
      // Daily dates look like "2026-03-27T00:00:00.000Z"
      // For Monthly, we want Adjusted Close to account for splits/dividends
      value: isIntraday ? item.close : item.adjClose,
    }
    if (i === l) {

      l += d;
      if (timeframe === 'monthly' || timeframe === 'annually') {
        r.label = new Date(item.date).toLocaleDateString('en-GB', {
          month: 'short',
          year: '2-digit'
        })
      }
      else {
        r.label = new Date(item.date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short'
        })
      }
    }
    return r;
  });
};
const getApiUrl = (symbol: string, timeframe: timeframes, options?: stockDateOptions) => {
  const token = process.env.EXPO_PUBLIC_tiingo_api;

  if (isDailyTimeframe(timeframe)) {
    // Use the Daily endpoint for monthly resampling
    let url = `https://api.tiingo.com/tiingo/daily/${symbol}/prices?resampleFreq=${timeframe}&token=${token}`;
    if (options?.startDate) {
      url += `&startDate=${options.startDate}`
    }
    else {
      url += `&startDate=${getTiingoDate(timeframeDayCorrespondence[timeframe])}`
    }
    if (options?.endDate) {
      url += `&endDate=${options.endDate}`
    }
    else {
      url += `&endDate=${getTiingoDate()}`
    }
    return url
  }
  else {
    // Use the IEX endpoint for intraday (e.g., 5min)
    return `https://api.tiingo.com/iex/${symbol}/prices?resampleFreq=${timeframe}&token=${token}`;
  }
};
type stockDateOptions = {
  startDate?: string,
  endDate?: string
}
export const fetchStockData = async (symbol: string, timeframe: timeframes, options?: stockDateOptions) => {
  const url = getApiUrl(symbol, timeframe, options)

  const response = await fetch(url)
  // if (!response.ok) {
  //   const errorData = await response.json().catch(() => ({}));
  //   throw new Error(errorData.detail || `Failed to fetch stock data: ${response.statusText}`);
  // }
  let data;
  if (!response.ok) {
    data = sample
  }
  else {
    data = await response.json();
  }
  let isIntraday = false;
  if (isIexTimeframe(timeframe)) {
    isIntraday = true;
  }
  return normalizeTiingoData(data, isIntraday, timeframe)
}
