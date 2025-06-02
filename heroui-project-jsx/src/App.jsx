import React from "react";
import { Card, CardBody, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CryptoSearch } from "./components/crypto-search";
import { MainChart } from "./components/main-chart";
import { MiniCharts } from "./components/mini-charts";
import { CryptoDescription } from "./components/crypto-description";
import { CryptoHeader } from "./components/crypto-header";
import { SpreadIndicator } from "./components/spread-indicator";
import { useCryptoData } from "./hooks/use-crypto-data";

export default function App() {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedPair,
    setSelectedPair,
    searchResults,
    isLoading,
    cryptoData
  } = useCryptoData();

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-6">
            <Icon icon="lucide:bar-chart-2" className="text-primary" width={28} height={28} />
            Crypto Ticker Dashboard
          </h1>
          
          <CryptoSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            isLoading={isLoading}
            onSelectPair={setSelectedPair}
          />
        </header>

        {selectedPair ? (
          <>
            <CryptoHeader 
              symbol={selectedPair.symbol} 
              name={selectedPair.name} 
              price={cryptoData.price}
              change={cryptoData.change}
            />
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-content1">
                <CardBody>
                  <MainChart data={cryptoData.mainChartData} />
                </CardBody>
              </Card>
              
              <MiniCharts 
                highLowData={cryptoData.highLowData}
                sentimentData={cryptoData.sentimentData}
                volumeHeatmapData={cryptoData.volumeHeatmapData}
              />
              
              <SpreadIndicator 
                symbol={selectedPair.symbol}
                exchangeData={cryptoData.exchangeData}
              />
              
              <CryptoDescription 
                symbol={selectedPair.symbol}
                description={cryptoData.description}
                marketCap={cryptoData.marketCap}
                volume24h={cryptoData.volume24h}
                circulatingSupply={cryptoData.circulatingSupply}
                allTimeHigh={cryptoData.allTimeHigh}
              />
            </div>
          </>
        ) : (
          <Card className="bg-content1">
            <CardBody className="flex flex-col items-center justify-center py-16">
              <Icon icon="lucide:search" className="text-foreground-400 mb-4" width={48} height={48} />
              <p className="text-foreground-400 text-lg">Search for a cryptocurrency pair to view charts and data</p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
