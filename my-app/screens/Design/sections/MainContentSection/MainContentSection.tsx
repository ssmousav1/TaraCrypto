"use client";
import React, { JSX, useEffect, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "../../../../components/ui/card";

interface Token {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  total_supply: number;
  image: string;
}

export const MainContentSection = (): JSX.Element => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch token data");
        }

        const data = await response.json();
        setTokens(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

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

  // const chartImage1 = "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector-1.svg";
  // const chartImage2 = "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector-5.svg";
  // const upArrowImage1 = "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector.svg";
  // const upArrowImage2 =
  //   "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector-3.svg";

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 w-full">
      <header className="flex items-center justify-center py-4 w-full px-4">
        <h1 className="font-semibold text-white text-2xl md:text-[32px] text-center leading-7 [font-family:'Roboto',Helvetica]">
          Top 10 Trending Tokens
        </h1>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-white text-lg">Loading token data...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-red-500 text-lg">Error: {error}</p>
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

                  <Button className="w-[120px] flex-shrink-0 h-10 bg-[#14381b] text-[#15ff44] rounded hover:bg-[#1a4522] transition-colors">
                    Buy Token
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
