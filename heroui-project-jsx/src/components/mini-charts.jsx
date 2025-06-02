import React from "react";
import { Card, CardBody, Button, Tooltip } from "@heroui/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip
} from "recharts";

export const MiniCharts = ({
  highLowData,
  sentimentData,
  volumeHeatmapData
}) => {
  // Add state for high/low chart view
  const [highLowView, setHighLowView] = React.useState("daily");
  
  // Get current high/low data based on selected view
  const currentHighLowData = highLowData[highLowView];
  
  // Format Y-axis values
  const formatYAxis = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return value.toFixed(1);
    }
  };
  
  // Format date for high/low chart
  const formatHighLowDate = (dateStr) => {
    const date = new Date(dateStr);
    if (highLowView === "daily") {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  // Custom tooltip components
  const HighLowTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = highLowView === "daily" 
        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
      
      return (
        <div className="chart-tooltip">
          <p className="font-medium">{formattedDate}</p>
          <p className="text-primary">Price: ${payload[0].value.toFixed(2)}</p>
          <p className="text-foreground-400 text-tiny">
            High: ${currentHighLowData.high.toFixed(2)} | Low: ${currentHighLowData.low.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const SentimentTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="font-medium">{label}</p>
          <p className="text-success">Buy: {payload[0].value}%</p>
          <p className="text-foreground-400">Neutral: {payload[1].value}%</p>
          <p className="text-danger">Sell: {payload[2].value}%</p>
        </div>
      );
    }
    return null;
  };
  
  // Format volume for tooltip
  const formatVolume = (volume) => {
    if (volume >= 1000000000) {
      return `$${(volume / 1000000000).toFixed(2)}B`;
    } else if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(2)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(2)}K`;
    } else {
      return `$${volume.toFixed(2)}`;
    }
  };
  
  // Get min and max volume for color scaling
  const minVolume = Math.min(...volumeHeatmapData.map(d => d.volume));
  const maxVolume = Math.max(...volumeHeatmapData.map(d => d.volume));
  
  // Calculate color intensity based on volume
  const getColorIntensity = (volume) => {
    const normalized = (volume - minVolume) / (maxVolume - minVolume);
    return Math.max(0.1, normalized); // Ensure at least 10% opacity
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* High/Low Chart */}
      <Card className="bg-content1">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">High/Low</h3>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={highLowView === "daily" ? "solid" : "flat"}
                color={highLowView === "daily" ? "primary" : "default"}
                onPress={() => setHighLowView("daily")}
              >
                Daily
              </Button>
              <Button
                size="sm"
                variant={highLowView === "yearly" ? "solid" : "flat"}
                color={highLowView === "yearly" ? "primary" : "default"}
                onPress={() => setHighLowView("yearly")}
              >
                Yearly
              </Button>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={currentHighLowData.data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#94a3b8' }}
                  tickLine={{ stroke: '#94a3b8' }}
                  tickFormatter={formatHighLowDate}
                />
                <YAxis 
                  tick={{ fill: '#94a3b8' }}
                  tickLine={{ stroke: '#94a3b8' }}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<HighLowTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0ea5e9" 
                  fill="rgba(14, 165, 233, 0.2)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-small">
            <div>
              <span className="text-foreground-400">Low: </span>
              <span className="font-medium">${currentHighLowData.low.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-foreground-400">Avg: </span>
              <span className="font-medium">${currentHighLowData.average.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-foreground-400">High: </span>
              <span className="font-medium">${currentHighLowData.high.toFixed(2)}</span>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Sentiment Chart */}
      <Card className="bg-content1">
        <CardBody>
          <h3 className="text-md font-semibold mb-4">Market Sentiment</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sentimentData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                stackOffset="expand"
                barCategoryGap={1}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#94a3b8' }}
                  tickLine={{ stroke: '#94a3b8' }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                  }}
                />
                <YAxis 
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  tick={{ fill: '#94a3b8' }}
                  tickLine={{ stroke: '#94a3b8' }}
                />
                <Tooltip content={<SentimentTooltip />} />
                <Bar dataKey="buy" stackId="a" fill="#22c55e" />
                <Bar dataKey="neutral" stackId="a" fill="#94a3b8" />
                <Bar dataKey="sell" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-small">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-success mr-1"></div>
              <span>Buy</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-foreground-400 mr-1"></div>
              <span>Neutral</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-danger mr-1"></div>
              <span>Sell</span>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Volume Heatmap */}
      <Card className="bg-content1">
        <CardBody>
          <h3 className="text-md font-semibold mb-4">Trading Volume Heatmap</h3>
          <div className="h-[200px] flex flex-col">
            <div className="flex-1 grid grid-cols-6 gap-1">
              {volumeHeatmapData.map((day, index) => {
                const colorIntensity = getColorIntensity(day.volume);
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
                const monthDay = date.getDate();
                
                return (
                  <Tooltip 
                    key={index}
                    content={
                      <div className="px-2 py-1">
                        <p className="font-medium">{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                        <p>Volume: {formatVolume(day.volume)}</p>
                      </div>
                    }
                    placement="top"
                  >
                    <div 
                      className="aspect-square rounded-sm flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: `rgba(14, 165, 233, ${colorIntensity})`,
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <span className="text-[10px] font-medium text-foreground">{dayName}</span>
                      <span className="text-[11px] font-bold text-foreground">{monthDay}</span>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-foreground-400">Lower Volume</div>
              <div className="flex-1 mx-2 h-2 rounded-full" style={{ 
                background: 'linear-gradient(to right, rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 1))' 
              }}></div>
              <div className="text-xs text-foreground-400">Higher Volume</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
