"use client";
import React, { JSX } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "../../../../components/ui/card";
import { useWalletStatus } from "../../../../hooks/useWalletStatus";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTokens, Token } from "../../../../lib/api";

export const MainContentSection = (): JSX.Element => {
  const { isConnected, isConnecting } = useWalletStatus();
  const queryClient = useQueryClient();
  
  const {
    data: tokens = [],
    isLoading: loading,
    error,
    isFetching: isRefreshing,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    refetchInterval: 60000, // Auto-refresh every 60 seconds
    staleTime: 30000, // Consider data stale after 30 seconds
    refetchOnWindowFocus: true,
  });

  const handleManualRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['tokens'] });
  };

  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : null;
  const errorMessage = error instanceof Error ? error.message : null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  const formatSupply = (supply: number | null) => {
    if (!supply) return "N/A";
    if (supply >= 1e12) {
      return `${(supply / 1e12).toFixed(2)}T`;
    } else if (supply >= 1e9) {
      return `${(supply / 1e9).toFixed(2)}B`;
    } else if (supply >= 1e6) {
      return `${(supply / 1e6).toFixed(2)}M`;
    }
    return supply.toFixed(0);
  };

  const handleBuyToken = (tokenSymbol: string) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    
    // Placeholder for actual token purchase logic
    alert(`Buy ${tokenSymbol} - This would integrate with a DEX or swap protocol`);
  };


  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // const chartImage1 = "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector-1.svg";
  // const chartImage2 = "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector-5.svg";
  // const upArrowImage1 = "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector.svg";
  // const upArrowImage2 =
  //   "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector-3.svg";

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 w-full">
      <header className="flex flex-col items-center justify-center py-4 w-full px-4">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-semibold text-white text-2xl md:text-[32px] text-center leading-7 [font-family:'Roboto',Helvetica]">
            Top 10 Trending Tokens
          </h1>
          {isRefreshing && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#47fc28] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[#47fc28] text-sm">Updating...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
              <span className="text-xs">• Auto-refreshes every 60s</span>
            </div>
          )}
          <Button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="h-8 px-3 py-1 bg-transparent border border-[#47fc28]/30 text-[#47fc28] hover:bg-[#47fc28]/10 text-xs disabled:opacity-50"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-white text-lg">Loading token data...</p>
        </div>
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-red-500 text-lg">Error: {errorMessage}</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <Card className="w-full bg-transparent border-0 shadow-none">
            <CardContent className="p-0 space-y-2">
              <div className="min-w-[860px]">
                {/* Table header */}
                <div className="flex items-center justify-between  mb-1.5 px-4 py-2 bg-[#0a1f0699] rounded-[10px] overflow-hidden">
                  <div className="w-5 flex-shrink-0"></div>
                  <div className="w-[200px] flex-shrink-0">
                    <span className="text-[#00c727] text-xs [font-family:'Roboto',Helvetica] font-normal leading-4">
                      Name
                    </span>
                  </div>
                  <div className="w-[180px] flex-shrink-0 text-[#00c727] text-xs [font-family:'Roboto',Helvetica] font-normal leading-4">
                    Price
                  </div>
                  <div className="w-[120px] flex-shrink-0 hidden md:block text-[#00c727] text-xs font-text-xs-font-medium font-[number:var(--text-xs-font-medium-font-weight)] tracking-[var(--text-xs-font-medium-letter-spacing)] leading-[var(--text-xs-font-medium-line-height)] [font-style:var(--text-xs-font-medium-font-style)]">
                    Marketcap
                  </div>
                  <div className="w-[120px] flex-shrink-0 hidden lg:block text-[#00c727] text-xs font-text-xs-font-medium font-[number:var(--text-xs-font-medium-font-weight)] tracking-[var(--text-xs-font-medium-letter-spacing)] leading-[var(--text-xs-font-medium-line-height)] [font-style:var(--text-xs-font-medium-font-style)]">
                    Total Volume
                  </div>
                  <div className="w-[120px] flex-shrink-0 hidden lg:block text-[#00c727] text-xs font-text-xs-font-medium font-[number:var(--text-xs-font-medium-font-weight)] tracking-[var(--text-xs-font-medium-letter-spacing)] leading-[var(--text-xs-font-medium-line-height)] [font-style:var(--text-xs-font-medium-font-style)]">
                    Total supply
                  </div>
                  <div className="w-[120px] flex-shrink-0 text-center text-[#00c727] text-xs font-text-xs-font-medium font-[number:var(--text-xs-font-medium-font-weight)] tracking-[var(--text-xs-font-medium-letter-spacing)] leading-[var(--text-xs-font-medium-line-height)] [font-style:var(--text-xs-font-medium-font-style)]">
                    Action
                  </div>
                </div>

                {/* Token rows */}
                {tokens.map((token) => {
              const isPositive = token.price_change_percentage_24h >= 0;

              return (
                <div
                  key={token.id}
                  className="flex items-center justify-between px-4 py-2 bg-[#0a1f0699] rounded-[10px] overflow-hidden mb-1.5"
                >
                  <div className="w-5 flex-shrink-0 text-[#94ff82] text-xs font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] [font-style:var(--text-xs-font-semibold-font-style)]">
                    {token.market_cap_rank}
                  </div>

                  <div className="w-[200px] flex-shrink-0 flex items-center gap-2">
                    <Image
                      width={50}
                      height={50}
                      className="w-[42px] h-[42px] object-cover rounded-full"
                      alt={`${token.name} icon`}
                      src={token.image}
                    />
                    <div className="flex flex-col items-start justify-center">
                      <div className="text-white text-base font-text-base-font-semibold font-[number:var(--text-base-font-semibold-font-weight)] tracking-[var(--text-base-font-semibold-letter-spacing)] leading-[var(--text-base-font-semibold-line-height)] [font-style:var(--text-base-font-semibold-font-style)] uppercase">
                        {token.symbol}
                      </div>
                      <div className="text-[#bfbfbf] text-xs [font-family:'Roboto',Helvetica] font-normal leading-4">
                        {token.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex w-[180px] flex-shrink-0 items-center gap-1">
                    <span className="text-[#e6e6e6] text-sm [font-family:'Roboto',Helvetica] font-normal leading-5">
                      {formatPrice(token.current_price)}
                    </span>
                    <Badge
                      className={`h-5 ${
                        isPositive
                          ? "bg-[#17c9641a] text-[#58c16d]"
                          : "bg-red-900/10 text-red-500"
                      } text-[10px] font-normal rounded-[5px] flex items-center gap-1 p-1`}
                    >
                      <div className="relative w-3 h-3">
                        <div className="relative w-1.5 h-1">
                          {isPositive ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                              stroke="currentColor"
                              className="size-6"
                              style={{ width: "12px", height: "12px" }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 15.75 7.5-7.5 7.5 7.5"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                              stroke="currentColor"
                              style={{ width: "12px", height: "12px" }}
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {isPositive ? "+" : ""}
                      {token.price_change_percentage_24h.toFixed(2)}%
                    </Badge>
                  </div>

                  <div className="w-[120px] flex-shrink-0 hidden md:block text-white text-xs font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] [font-style:var(--text-xs-font-semibold-font-style)]">
                    {formatMarketCap(token.market_cap)}
                  </div>

                  <div className="w-[120px] flex-shrink-0 hidden lg:block text-white text-xs font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] [font-style:var(--text-xs-font-semibold-font-style)]">
                    {formatMarketCap(token.total_volume)}
                  </div>

                  <div className="w-[120px] flex-shrink-0 hidden lg:block text-white text-xs font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] [font-style:var(--text-xs-font-semibold-font-style)]">
                    {formatSupply(token.total_supply)}
                  </div>

                  <Button 
                    onClick={() => handleBuyToken(token.symbol)}
                    disabled={isConnecting}
                    className={`w-[120px] flex-shrink-0 h-10 rounded transition-colors ${
                      isConnected 
                        ? 'bg-[#14381b] text-[#15ff44] hover:bg-[#1a4522]' 
                        : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
                    }`}
                  >
                    {isConnecting ? 'Connecting...' : isConnected ? 'Buy Token' : 'Connect Wallet'}
                  </Button>
                </div>
                );
              })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};
