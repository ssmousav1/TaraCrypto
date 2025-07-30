import React, { JSX } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const MainContentSection = (): JSX.Element => {
  // Data for token rows
  const tokens = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    symbol: "SYMBOL",
    name: "Name",
    price: "$32,000",
    priceChange: "+13.4%",
    marketCap: "$8576",
    totalVolume: "100M",
    totalSupply: "$8576",
    chartImage1: "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector-1.svg",
    chartImage2: "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector-5.svg",
    tokenImage: "https://c.animaapp.com/mdlodzlxjRuFxk/img/rectangle-2.svg",
    upArrowImage1: "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector.svg",
    upArrowImage2: "https://c.animaapp.com/mdlodzlxjRuFxk/img/vector-3.svg",
  }));

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 w-full">
      <header className="flex items-center justify-center py-4 w-full">
        <h1 className="font-semibold text-white text-[32px] text-center leading-7 [font-family:'Roboto',Helvetica]">
          Top 10 Trending Tokens
        </h1>
      </header>

      <Card className="w-full bg-transparent border-0 shadow-none">
        <CardContent className="p-0 space-y-2">
          {/* Table header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#0a1f0699] rounded-[10px] overflow-hidden">
            <div className="w-5"></div>
            <div className="w-[114px]">
              <span className="text-[#00c727] text-xs [font-family:'Roboto',Helvetica] font-normal leading-4">
                Name
              </span>
            </div>
            <div className="flex items-center justify-between pl-16 pr-8 flex-1">
              <div className="w-[140px] text-[#00c727] text-xs [font-family:'Roboto',Helvetica] font-normal leading-4">
                Price
              </div>
              <div className="w-20 text-[#00c727] text-xs font-text-xs-font-medium font-[number:var(--text-xs-font-medium-font-weight)] tracking-[var(--text-xs-font-medium-letter-spacing)] leading-[var(--text-xs-font-medium-line-height)] [font-style:var(--text-xs-font-medium-font-style)]">
                Marketcap
              </div>
              <div className="w-20 text-[#00c727] text-xs font-text-xs-font-medium font-[number:var(--text-xs-font-medium-font-weight)] tracking-[var(--text-xs-font-medium-letter-spacing)] leading-[var(--text-xs-font-medium-line-height)] [font-style:var(--text-xs-font-medium-font-style)]">
                Total Volume
              </div>
              <div className="w-20 text-[#00c727] text-xs font-text-xs-font-medium font-[number:var(--text-xs-font-medium-font-weight)] tracking-[var(--text-xs-font-medium-letter-spacing)] leading-[var(--text-xs-font-medium-line-height)] [font-style:var(--text-xs-font-medium-font-style)]">
                Total supply
              </div>
              <div className="w-40 text-[#00c727] text-xs font-text-xs-font-medium font-[number:var(--text-xs-font-medium-font-weight)] tracking-[var(--text-xs-font-medium-letter-spacing)] leading-[var(--text-xs-font-medium-line-height)] [font-style:var(--text-xs-font-medium-font-style)]">
                Price Changes Chart
              </div>
            </div>
            <div className="w-[120px]"></div>
          </div>

          {/* Token rows */}
          {tokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between px-4 py-2 bg-[#0a1f0699] rounded-[10px] overflow-hidden"
            >
              <div className="w-5 text-[#94ff82] text-xs font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] [font-style:var(--text-xs-font-semibold-font-style)]">
                {token.id}
              </div>

              <div className="flex items-center gap-2">
                <img
                  className="w-[42px] h-[42px] object-cover"
                  alt="Token icon"
                  src={token.tokenImage}
                />
                <div className="flex flex-col items-start justify-center">
                  <div className="text-white text-base font-text-base-font-semibold font-[number:var(--text-base-font-semibold-font-weight)] tracking-[var(--text-base-font-semibold-letter-spacing)] leading-[var(--text-base-font-semibold-line-height)] [font-style:var(--text-base-font-semibold-font-style)]">
                    {token.symbol}
                  </div>
                  <div className="text-[#bfbfbf] text-xs [font-family:'Roboto',Helvetica] font-normal leading-4">
                    {token.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pl-16 pr-8 flex-1">
                <div className="flex w-[140px] items-center gap-1">
                  <span className="text-[#e6e6e6] text-sm [font-family:'Roboto',Helvetica] font-normal leading-5">
                    {token.price}
                  </span>
                  <Badge className="h-5 bg-[#17c9641a] text-[#58c16d] text-[10px] font-normal rounded-[5px] flex items-center gap-1 p-1">
                    <div className="relative w-3 h-3">
                      <div className="relative w-1.5 h-1 top-1 left-[3px]">
                        <img
                          className="absolute w-1 h-1 top-0 left-0.5"
                          alt="Up arrow"
                          src={token.upArrowImage1}
                        />
                        <img
                          className="absolute w-1 h-1 top-0 left-0"
                          alt="Up arrow"
                          src={token.upArrowImage2}
                        />
                      </div>
                    </div>
                    {token.priceChange}
                  </Badge>
                </div>

                <div className="w-20 text-white text-xs font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] [font-style:var(--text-xs-font-semibold-font-style)]">
                  {token.marketCap}
                </div>

                <div className="w-20 text-white text-xs font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] [font-style:var(--text-xs-font-semibold-font-style)]">
                  {token.totalVolume}
                </div>

                <div className="w-20 text-white text-xs font-text-xs-font-semibold font-[number:var(--text-xs-font-semibold-font-weight)] tracking-[var(--text-xs-font-semibold-letter-spacing)] leading-[var(--text-xs-font-semibold-line-height)] [font-style:var(--text-xs-font-semibold-font-style)]">
                  {token.totalSupply}
                </div>

                <div className="w-40 h-7 rotate-180">
                  <div className="relative h-7">
                    <img
                      className="absolute w-40 h-7 top-0 left-0 -rotate-180"
                      alt="Price chart"
                      src={token.chartImage1}
                    />
                    <img
                      className="absolute w-40 h-3.5 top-[15px] left-0 -rotate-180"
                      alt="Price chart"
                      src={token.chartImage2}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-[120px] h-10 bg-[#14381b] text-[#15ff44] rounded hover:bg-[#1a4522] transition-colors">
                Buy Token
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};
