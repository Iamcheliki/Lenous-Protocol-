import { TokenData } from '@/app/_libs/types/token';
import CheckUserConnection from './CheckUserConnection';
import TokensCarousel from './TokensCarousel';

const fetchTokenData = async (): Promise<TokenData[]> => {
  const solanaTokens = 'solana,serum,raydium,ftt,kin,step';
  const arbitrumTokens = 'arbitrum,magic,dopex,gm,spell,tnd';
  const tokenIds = `${solanaTokens},${arbitrumTokens}`;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenIds}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch token data');
    }
    const data: TokenData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token data:', error);
    return [];
  }
};
const TokenPricesNav = async () => {
  const tokensInfo = await fetchTokenData();

  return (
    <div className="bg-green-linear-gradient border-y border-good-condition py-3">
      <div className="flex container flex-wrap justify-between  ">
        <CheckUserConnection />
        <TokensCarousel tokens={tokensInfo} />
      </div>
    </div>
  );
};

export default TokenPricesNav;
