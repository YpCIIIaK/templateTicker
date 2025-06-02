import React from "react";
import { Input, Card, Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";

export const CryptoSearch = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  isLoading,
  onSelectPair
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchRef = React.useRef(null);
  
  // Close search results when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (value) => {
    setSearchQuery(value);
    setIsSearchOpen(value.trim().length > 0);
  };
  
  const handleSelectPair = (pair) => {
    onSelectPair(pair);
    setSearchQuery(pair.symbol);
    setIsSearchOpen(false);
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <Input
        placeholder="Search for cryptocurrency pairs (e.g., BTC/USDT, ETH/USDT)"
        value={searchQuery}
        onValueChange={handleInputChange}
        onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
        startContent={<Icon icon="lucide:search" className="text-foreground-400" />}
        className="w-full"
      />
      
      {isSearchOpen && (
        <Card className="absolute z-10 w-full mt-1 bg-content1 shadow-lg">
          <div className="max-h-64 overflow-y-auto p-2">
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <Spinner size="sm" color="primary" />
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((pair) => (
                <Button
                  key={pair.symbol}
                  className="w-full justify-start mb-1 bg-content1 hover:bg-content2"
                  variant="flat"
                  onPress={() => handleSelectPair(pair)}
                >
                  <div className="flex items-center">
                    <span className="font-medium">{pair.symbol}</span>
                    <span className="ml-2 text-foreground-400 text-small">{pair.name}</span>
                  </div>
                </Button>
              ))
            ) : (
              <div className="text-center py-4 text-foreground-400">
                No results found
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
