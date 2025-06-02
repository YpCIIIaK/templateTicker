import React from "react";
import { Card, CardBody, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";

export const SpreadIndicator = ({
  symbol,
  exchangeData
}) => {
  // Format price with appropriate precision
  const formatPrice = (price) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 2
      });
    } else if (price >= 1) {
      return price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      });
    } else {
      return price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });
    }
  };
  
  // Find min and max prices for spread calculation
  const prices = exchangeData.map(exchange => exchange.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const totalSpread = maxPrice - minPrice;
  const spreadPercentage = minPrice > 0 ? (totalSpread / minPrice) * 100 : 0;
  
  // Find exchange with min and max prices
  const minExchange = exchangeData.find(exchange => exchange.price === minPrice);
  const maxExchange = exchangeData.find(exchange => exchange.price === maxPrice);
  
  // Calculate arbitrage opportunity
  const arbitrageOpportunity = spreadPercentage > 0.1;
  
  return (
    <Card className="bg-content1">
      <CardBody>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Exchange Price Spread</h3>
            <div className="flex items-center gap-2">
              <span className="text-foreground-400 text-small">Total Spread:</span>
              <span className={`font-semibold ${spreadPercentage > 0.5 ? 'text-warning' : 'text-foreground'}`}>
                {spreadPercentage.toFixed(4)}%
              </span>
              {arbitrageOpportunity && (
                <div className="bg-warning/20 text-warning text-tiny px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Icon icon="lucide:alert-triangle" className="text-xs" />
                  Arbitrage
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exchangeData.map((exchange, index) => {
              // Determine color based on price comparison
              const isHighest = exchange.price === maxPrice;
              const isLowest = exchange.price === minPrice;
              const color = isHighest ? "danger" : isLowest ? "success" : "primary";
              
              // Calculate position in the price range for the progress bar
              const position = totalSpread > 0 
                ? ((exchange.price - minPrice) / totalSpread) * 100 
                : 50;
              
              return (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <Icon 
                        icon={`logos:${exchange.name.toLowerCase()}`} 
                        width={20} 
                        height={20}
                        className="mr-1"
                      />
                      <span className="font-medium">{exchange.name}</span>
                    </div>
                    <span className={`font-semibold ${isHighest ? 'text-danger' : isLowest ? 'text-success' : 'text-foreground'}`}>
                      {formatPrice(exchange.price)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Progress 
                      aria-label={`${exchange.name} price position`}
                      value={position}
                      color={color}
                      className="flex-1"
                      size="sm"
                    />
                    <span className={`text-small ${exchange.spread.percentage > 0 ? 'text-success' : exchange.spread.percentage < 0 ? 'text-danger' : 'text-foreground-400'}`}>
                      {exchange.spread.percentage > 0 ? '+' : ''}
                      {exchange.spread.percentage.toFixed(4)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {arbitrageOpportunity && maxExchange && minExchange && (
            <div className="mt-4 p-3 bg-content2 rounded-medium">
              <div className="flex items-center gap-2 text-small">
                <Icon icon="lucide:trending-up" className="text-success" />
                <span className="text-foreground-400">Potential arbitrage:</span>
                <span className="font-medium">Buy on {minExchange.name} at {formatPrice(minPrice)}</span>
                <Icon icon="lucide:arrow-right" className="text-foreground-400" />
                <span className="font-medium">Sell on {maxExchange.name} at {formatPrice(maxPrice)}</span>
                <span className="ml-auto font-semibold text-success">
                  Profit: {((maxPrice - minPrice) / minPrice * 100).toFixed(4)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
