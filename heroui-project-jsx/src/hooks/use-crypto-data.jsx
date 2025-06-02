import React from "react";

// Mock data
const mockPairs = [
  { symbol: "BTC/USDT", name: "Bitcoin" },
  { symbol: "ETH/USDT", name: "Ethereum" },
  { symbol: "BNB/USDT", name: "Binance Coin" },
  { symbol: "SOL/USDT", name: "Solana" },
  { symbol: "ADA/USDT", name: "Cardano" },
  { symbol: "XRP/USDT", name: "Ripple" },
  { symbol: "DOT/USDT", name: "Polkadot" },
  { symbol: "DOGE/USDT", name: "Dogecoin" },
  { symbol: "AVAX/USDT", name: "Avalanche" },
  { symbol: "MATIC/USDT", name: "Polygon" },
  { symbol: "LINK/USDT", name: "Chainlink" },
  { symbol: "UNI/USDT", name: "Uniswap" },
];

// Generate random data for charts
const generateChartData = (days, baseValue, volatility, pointsPerDay = 1) => {
  const data = [];
  let currentValue = baseValue;
  
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    // For each day, generate multiple data points if requested
    for (let j = 0; j < pointsPerDay; j++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      if (pointsPerDay > 1) {
        // Add hours if we have multiple points per day
        date.setHours(Math.floor(24 / pointsPerDay * j));
      }
      
      // Random walk with some volatility
      const change = (Math.random() - 0.5) * volatility * currentValue;
      currentValue += change;
      if (currentValue < 0) currentValue = baseValue * 0.1; // Prevent negative values
      
      data.push({
        date: date.toISOString(),
        value: currentValue
      });
    }
  }
  
  return data;
};

const generateSentimentData = (days) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random sentiment values that sum to 100
    const buy = Math.floor(Math.random() * 60) + 20;
    const sell = Math.floor(Math.random() * (100 - buy - 5)) + 5;
    const neutral = 100 - buy - sell;
    
    data.push({
      date: date.toISOString().split('T')[0],
      buy,
      neutral,
      sell
    });
  }
  
  return data;
};

// Generate volume heatmap data for the last 30 days
const generateVolumeHeatmapData = (baseValue) => {
  const data = [];
  const now = new Date();
  
  // Generate data for the last 30 days
  for (let i = 30; i > 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random volume with some patterns (weekends tend to have lower volume)
    let volumeMultiplier = 1;
    const dayOfWeek = date.getDay();
    
    // Lower volume on weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      volumeMultiplier = 0.6;
    }
    
    // Random variation
    const randomFactor = 0.5 + Math.random();
    const volume = baseValue * 1000000 * volumeMultiplier * randomFactor;
    
    data.push({
      date: date.toISOString().split('T')[0],
      volume
    });
  }
  
  return data;
};

const generateMockCryptoData = (symbol) => {
  // Base values for different cryptocurrencies
  const baseValues = {
    "BTC": 50000,
    "ETH": 3000,
    "BNB": 400,
    "SOL": 100,
    "ADA": 1.2,
    "XRP": 0.5,
    "DOT": 20,
    "DOGE": 0.1,
    "AVAX": 30,
    "MATIC": 1.5,
    "LINK": 15,
    "UNI": 10,
  };
  
  const baseSymbol = symbol.split('/')[0];
  const baseValue = baseValues[baseSymbol] || 100;
  
  // Generate more detailed data for the main chart (24 points per day for the last 30 days)
  const mainChartData = generateChartData(30, baseValue, 0.01, 24);
  
  // Generate volume heatmap data
  const volumeHeatmapData = generateVolumeHeatmapData(baseValue);
  
  // Generate both daily and yearly high/low data
  const dailyHighLowData = generateChartData(1, baseValue, 0.03, 24);
  const yearlyHighLowData = generateChartData(365, baseValue, 0.05);
  
  // Calculate high, low, and average for daily data
  const dailyHigh = Math.max(...dailyHighLowData.map(d => d.value)) * 1.05;
  const dailyLow = Math.min(...dailyHighLowData.map(d => d.value)) * 0.95;
  const dailyAverage = dailyHighLowData.reduce((sum, d) => sum + d.value, 0) / dailyHighLowData.length;
  
  // Calculate high, low, and average for yearly data
  const yearlyHigh = Math.max(...yearlyHighLowData.map(d => d.value)) * 1.05;
  const yearlyLow = Math.min(...yearlyHighLowData.map(d => d.value)) * 0.95;
  const yearlyAverage = yearlyHighLowData.reduce((sum, d) => sum + d.value, 0) / yearlyHighLowData.length;
  
  const sentimentData = generateSentimentData(30);
  
  // Current price is the last value in the main chart
  const currentPrice = mainChartData[mainChartData.length - 1].value;
  // Previous price is the second to last value
  const previousPrice = mainChartData[mainChartData.length - 2].value;
  const change = ((currentPrice - previousPrice) / previousPrice) * 100;
  
  // Generate exchange data with price variations
  const binancePrice = currentPrice;
  const bybitPrice = currentPrice * (1 + (Math.random() * 0.02 - 0.01)); // +/- 1%
  const htxPrice = currentPrice * (1 + (Math.random() * 0.03 - 0.015)); // +/- 1.5%
  
  // Calculate reference price (average)
  const referencePrice = (binancePrice + bybitPrice + htxPrice) / 3;
  
  const exchangeData = [
    {
      name: "Binance",
      price: binancePrice,
      spread: {
        value: binancePrice - referencePrice,
        percentage: ((binancePrice - referencePrice) / referencePrice) * 100
      }
    },
    {
      name: "ByBit",
      price: bybitPrice,
      spread: {
        value: bybitPrice - referencePrice,
        percentage: ((bybitPrice - referencePrice) / referencePrice) * 100
      }
    },
    {
      name: "HTX",
      price: htxPrice,
      spread: {
        value: htxPrice - referencePrice,
        percentage: ((htxPrice - referencePrice) / referencePrice) * 100
      }
    }
  ];
  
  return {
    price: currentPrice,
    change,
    mainChartData,
    highLowData: {
      daily: {
        high: dailyHigh,
        low: dailyLow,
        average: dailyAverage,
        data: dailyHighLowData
      },
      yearly: {
        high: yearlyHigh,
        low: yearlyLow,
        average: yearlyAverage,
        data: yearlyHighLowData
      }
    },
    sentimentData,
    volumeHeatmapData,
    exchangeData,
    description: `${baseSymbol} is a digital asset that operates on a decentralized network. This is a placeholder description for ${baseSymbol}. In a real application, this would contain actual information about the cryptocurrency, its technology, use cases, and recent developments.`,
    marketCap: currentPrice * (Math.random() * 1000000000 + 1000000000),
    volume24h: Math.random() * 5000000000 + 500000000,
    circulatingSupply: Math.random() * 100000000 + 10000000,
    allTimeHigh: currentPrice * (1 + Math.random() * 0.5),
  };
};

export const useCryptoData = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedPair, setSelectedPair] = React.useState(() => {
    // Set Bitcoin as the default selected pair
    return { symbol: "BTC/USDT", name: "Bitcoin" };
  });
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Filter pairs based on search query
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return mockPairs.filter(pair => 
      pair.symbol.toLowerCase().includes(query) || 
      pair.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  // Generate crypto data for the selected pair
  const cryptoData = React.useMemo(() => {
    if (!selectedPair) {
      return {
        price: 0,
        change: 0,
        mainChartData: [],
        highLowData: { daily: { high: 0, low: 0, average: 0, data: [] }, yearly: { high: 0, low: 0, average: 0, data: [] } },
        sentimentData: [],
        volumeHeatmapData: [],
        exchangeData: [],
        description: "",
        marketCap: 0,
        volume24h: 0,
        circulatingSupply: 0,
        allTimeHigh: 0,
      };
    }
    
    // Simulate loading
    setIsLoading(true);
    
    // In a real app, this would be an API call
    const data = generateMockCryptoData(selectedPair.symbol);
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return data;
  }, [selectedPair]);
  
  return {
    searchQuery,
    setSearchQuery,
    selectedPair,
    setSelectedPair,
    searchResults,
    isLoading,
    cryptoData,
  };
};
