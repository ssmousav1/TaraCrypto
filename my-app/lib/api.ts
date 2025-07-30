export interface Token {
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

export const fetchTokens = async (): Promise<Token[]> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch token data");
  }

  return response.json();
};