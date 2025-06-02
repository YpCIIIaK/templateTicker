import React from "react";
import { Card, CardBody, Divider } from "@heroui/react";

export const CryptoDescription = ({
  symbol,
  description,
  marketCap,
  volume24h,
  circulatingSupply,
  allTimeHigh
}) => {
  const formatNumber = (value) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };
  
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
        maximumFractionDigits: 2
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
  
  return (
    <Card className="bg-content1">
      <CardBody>
        <h3 className="text-lg font-semibold mb-4">About {symbol.split('/')[0]}</h3>
        
        <p className="text-foreground-400 mb-6">
          {description}
        </p>
        
        <Divider className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h4 className="text-foreground-400 text-small mb-1">Market Cap</h4>
            <p className="font-semibold">{formatNumber(marketCap)}</p>
          </div>
          
          <div>
            <h4 className="text-foreground-400 text-small mb-1">24h Trading Volume</h4>
            <p className="font-semibold">{formatNumber(volume24h)}</p>
          </div>
          
          <div>
            <h4 className="text-foreground-400 text-small mb-1">Circulating Supply</h4>
            <p className="font-semibold">{Math.floor(circulatingSupply).toLocaleString()} {symbol.split('/')[0]}</p>
          </div>
          
          <div>
            <h4 className="text-foreground-400 text-small mb-1">All Time High</h4>
            <p className="font-semibold">{formatPrice(allTimeHigh)}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
