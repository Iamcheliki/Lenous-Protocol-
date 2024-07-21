'use client';
import Link from 'next/link';
import TopSlider from './_components/home/TopSlider';
import Script from 'next/script';
import Image from 'next/image';
import { TokenData } from '@/app/_libs/types/token';
import { tokenList } from './_libs/utils/constants/TokenList';
import Icon from './_components/UI/icon';

const fetchTokenData = async (tokens: string): Promise<TokenData[]> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokens}`
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

export default async function Home() {
  const tokenIds = tokenList.map((token) => token.id).join(',');
  const tokensPrice = await fetchTokenData(tokenIds);
  console.log(tokensPrice);
  return (
    <main className="min-h-screen italic ">
      <div className="index-container  pt-24">
        <div className="font-inter text-7xl font-thin">
          <div className="text-white">ANYTIME, ANYWHERE</div>
          <div className="text-primary -mt-3">ANYTIME, ANYWHERE</div>
        </div>
      </div>
      <div className="index-container mt-7">
        <div
          className="text-white font-poppins font-black text-center text-7xl"
          style={{ textShadow: '13px 18px 0px #ffffff0d' }}
        >
          TRADE ON THE GO
        </div>
        <div className="appComuincation rounded-6xl font-poppins mt-28 grid grid-cols-4 justify-center bg-radial-gradient-25-5 py-20 text-white">
          <div className="text-center">
            <div className="text-4xl">200+</div>
            <div className="text-2xl font-extralight  pt-2">
              Countries Covered
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl">30 Milion</div>
            <div className="text-2xl font-extralight  pt-2">
              Global Investors
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl">700+</div>
            <div className="text-2xl font-extralight  pt-2">Coins</div>
          </div>
          <div className="text-center">
            <div className="text-4xl">2.15 Bilion</div>
            <div className="text-2xl font-extralight pt-2">
              24h Trading Volume
            </div>
          </div>
        </div>
        <div className="linearShadow relative h-11 -mt-2.5">
          <div className="h-11 left-14 right-14 absolute top-2 opacity-15 bg-colorfull-gradient box-shadow-[75px_75px_75px] blur-34"></div>
          <div className="h-px left-14 right-14 absolute top-2 bg-colorfull-gradient"></div>
        </div>
      </div>
      <div className="index-container mt-28 flex justify-between text-white">
        <div>
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-primary text-3xl font-extralight ">
                Find the Next
              </div>
              <div className="text-4xl font-bold mt-2">
                Crypto Gem on Lenous
              </div>
              <div className="text-2xl font-extralight mt-10">
                1 Out of 4 Crypto Holders Worldwide Is with Lenous
              </div>
            </div>
            <div>
              <div className="text-xl font-extralight ">
                Scan QR Code to Download App
              </div>
              <Link
                className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
                href="#"
              >
                Veiw more
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/images/index/ios&android.png"
            alt={'ios&android'}
            width={450}
            height={405}
          />
        </div>
      </div>
      <div className="text-center text-white mt-36">
        <div>
          <div className="text-primary text-3xl font-extralight">
            16 July 2024
          </div>
          <div className="text-4xl font-bold">Crypto Market Today</div>
        </div>
        <div className="mt-12 bg-radial-gradient-25-5 py-10">
          <div className="text-primary text-4xl font-extralight">
            NEW LISTING
          </div>
          <div className="flex justify-between index-container">
            <div className="flex items-center">
              <Image
                src="/images/index/uxLink.png"
                alt={'uxLink'}
                width={190}
                height={146}
              />
              <div className="text-left">
                <div className="text-5xl font-bold">UXLINK</div>
                <div className="text-2xl font-extralight mt-2">UXLINK</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="pr-3 flex items-end">
                <div className="font-black text-4xl pr-1">49</div>
                <div className="font-extralight">H</div>
              </div>
              <div className="pr-3 flex items-end">
                <div className="font-black text-4xl pr-1">32</div>
                <div className="font-extralight">M</div>
              </div>
              <div className="pr-3 flex items-end">
                <div className="font-black text-4xl pr-1">01</div>
                <div className="font-extralight">S</div>
              </div>
            </div>
          </div>
        </div>
        <div className="linearShadow relative h-11 -mt-2.5">
          <div className="h-11 left-0 right-0 absolute top-2 opacity-15 bg-colorfull-gradient box-shadow-[75px_75px_75px] blur-34"></div>
          <div className="h-px left-0 right-0 absolute top-2 bg-colorfull-gradient"></div>
        </div>
      </div>
      <div className="index-container grid grid-cols-3 gap-8 text-white mt-28">
        {/* column 1 */}
        <div className="rounded-6xl border border-white-bg-15 p-10">
          <div className="text-center text-white text-4xl">
            <div className="font-extralight">HOT LIST</div>
            <div>H</div>
          </div>
          <div>
            {tokensPrice.slice(0, 5).map((token) => (
              <div key={token.id} className="flex justify-between pt-6">
                <div className="flex items-center">
                  <div className="pr-2">
                    <Image
                      src={token.image}
                      alt={token.name}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div>
                    <div className="text-xl">{token.symbol.toUpperCase()}</div>
                    <div className="font-extralight">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl">{token.current_price}</div>
                  <div
                    className={` font-extralight ${
                      token.price_change_percentage_24h >= 0
                        ? 'text-good-condition'
                        : 'text-bad-situation'
                    }`}
                  >
                    {Number(token.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* column 2 */}
        <div className="rounded-6xl border border-white-bg-15 p-10">
          <div className="text-center text-white text-4xl">
            <div className="font-extralight">NEW COINS</div>
            <div>H</div>
          </div>
          <div>
            {tokensPrice.slice(5, 10).map((token) => (
              <div key={token.id} className="flex justify-between pt-6">
                <div className="flex items-center">
                  <div className="pr-2">
                    <Image
                      src={token.image}
                      alt={token.name}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div>
                    <div className="text-xl">{token.symbol.toUpperCase()}</div>
                    <div className="font-extralight">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl">{token.current_price}</div>
                  <div
                    className={` font-extralight ${
                      token.price_change_percentage_24h >= 0
                        ? 'text-good-condition'
                        : 'text-bad-situation'
                    }`}
                  >
                    {Number(token.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* column 3 */}
        <div className="rounded-6xl border border-white-bg-15 p-10">
          <div className="text-center text-white text-4xl">
            <div className="font-extralight">TOP GAINERS</div>
            <div>H</div>
          </div>
          <div>
            {tokensPrice.slice(10, 15).map((token) => (
              <div key={token.id} className="flex justify-between pt-6">
                <div className="flex items-center">
                  <div className="pr-2">
                    <Image
                      src={token.image}
                      alt={token.name}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div>
                    <div className="text-xl">{token.symbol.toUpperCase()}</div>
                    <div className="font-extralight">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl">{token.current_price}</div>
                  <div
                    className={` font-extralight ${
                      token.price_change_percentage_24h >= 0
                        ? 'text-good-condition'
                        : 'text-bad-situation'
                    }`}
                  >
                    {Number(token.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* lenous exchange */}
      <div className="index-container mt-36 flex justify-between text-white">
        <div>
          <div className="h-full">
            <div>
              <div className="text-primary text-3xl font-extralight ">
                Lenous Exchange
              </div>
              <div className="text-4xl font-bold mt-2">
                Try Our Crypto Exchange Now
              </div>
              <div className="text-2xl font-extralight mt-10">
                Start trading to get up to 11,200 USDT in rewards!
              </div>
              <Link
                className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
                href="#"
              >
                View more benefits
              </Link>
            </div>
            <div className="mt-28">
              <div>
                <div className="text-5xl font-extralight">SIGN UP</div>
                <div className="text-5xl font-extralight text-primary">
                  SIGN UP
                </div>
              </div>
              <div className="text-xl font-extralight ">
                Sign Up and Claim 500 USDT token + 200 USDT coupon + 7500 USDT
                Futures Trial Fund
              </div>
              <Link
                className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
                href="#"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/images/index/lenous-exchange.png"
            alt={'lenous exchange'}
            width={450}
            height={405}
          />
        </div>
      </div>
      <div className="index-container text-white mt-36">
        <div className="text-5xl font-bold text-center">
          Explore Products & Services
        </div>
        <div className=" grid grid-cols-2 gap-8 mt-24">
          {/* spot trading */}
          <div>
            <div className="rounded-6xl border border-white-bg-15 py-10 px-12 overflow-hidden">
              <div className="text-4xl relative">
                <div className="z-10 relative">Spot Trading</div>
                <div
                  className="absolute font-extrabold text-5xl text-red opacity-75 -top-4 -left-4"
                  style={{ textShadow: '1px 2px 14px #ef4444c9' }}
                >
                  S
                </div>
                <div className="opacity-10 absolute -top-11 -left-10 text-5xl font-thin">
                  <div className="text-white">SPOT TRADING</div>
                  <div className="text-red">SPOT TRADING</div>
                </div>
              </div>
              <div className="mt-6 font-extralight leading-9">
                Trade crypto with our comprehensive set of powerful tools to
                maximize your profits.
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-4 left-16 right-16 absolute top-2 opacity-15 bg-red box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-16 right-16 absolute top-2 bg-red"></div>
            </div>
          </div>
          {/* GemSPACE */}
          <div>
            <div className="rounded-6xl border border-white-bg-15 py-10 px-12 overflow-hidden">
              <div className="text-4xl relative">
                <div className="z-10 relative">GemSPACE</div>
                <div
                  className="absolute font-extrabold text-5xl text-yellow opacity-75 -top-4 -left-4"
                  style={{ textShadow: '1px 2px 14px #eab308c9' }}
                >
                  G
                </div>
                <div className="opacity-10 absolute -top-11 -left-10 text-5xl font-thin">
                  <div className="text-white">GEMSPACE</div>
                  <div className="text-red">GEMSPACE</div>
                </div>
              </div>
              <div className="mt-6 font-extralight leading-9">
                Discover new coins with limitless potential,
                <br /> exclusively on KuCoin.
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-4 left-16 right-16 absolute top-2 opacity-15 bg-yellow box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-16 right-16 absolute top-2 bg-yellow"></div>
            </div>
          </div>
          {/* Crypto Derivatives */}
          <div>
            <div className="rounded-6xl border border-white-bg-15 py-10 px-12 overflow-hidden">
              <div className="text-4xl relative">
                <div className="z-10 relative">Crypto Derivatives</div>
                <div
                  className="absolute font-extrabold text-5xl text-primary opacity-75 -top-4 -left-4"
                  style={{ textShadow: '1px 2px 14px #14b8a6bf' }}
                >
                  C
                </div>
                <div className="opacity-10 absolute -top-11 -left-10 text-5xl font-thin">
                  <div className="text-white">CRYPTO DERIVATIVES</div>
                  <div className="text-red">CRYPTO DERIVATIVES</div>
                </div>
              </div>
              <div className="mt-6 font-extralight leading-9">
                We are the best crypto exchange for trading crypto futures.
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-4 left-16 right-16 absolute top-2 opacity-15 bg-primary box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-16 right-16 absolute top-2 bg-primary"></div>
            </div>
          </div>
          {/* Margin Trading */}
          <div>
            <div className="rounded-6xl border border-white-bg-15 py-10 px-12 overflow-hidden">
              <div className="text-4xl relative">
                <div className="z-10 relative">Margin Trading </div>
                <div
                  className="absolute font-extrabold text-5xl text-purple opacity-75 -top-4 -left-4"
                  style={{ textShadow: '1px 2px 14px #a855f7bd' }}
                >
                  M
                </div>
                <div className="opacity-10 absolute -top-11 -left-10 text-5xl font-thin">
                  <div className="text-white">MARGIN TRADING </div>
                  <div className="text-red">MARGIN TRADING</div>
                </div>
              </div>
              <div className="mt-6 font-extralight leading-9">
                Trade crypto with our comprehensive set of powerful tools to
                maximize your profits.
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-4 left-16 right-16 absolute top-2 opacity-15 bg-purple box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-16 right-16 absolute top-2 bg-purple"></div>
            </div>
          </div>
          {/*   Buy Crypto */}
          <div>
            <div className="rounded-6xl border border-white-bg-15 py-10 px-12 overflow-hidden">
              <div className="text-4xl relative">
                <div className="z-10 relative">Buy Crypto</div>
                <div
                  className="absolute font-extrabold text-5xl text-red opacity-75 -top-4 -left-4"
                  style={{ textShadow: '1px 2px 14px #ef4444c9' }}
                >
                  B
                </div>
                <div className="opacity-10 absolute -top-11 -left-10 text-5xl font-thin">
                  <div className="text-white">Buy Crypto</div>
                  <div className="text-red">Buy Crypto</div>
                </div>
              </div>
              <div className="mt-6 font-extralight leading-9">
                Purchase crypto quickly and easily on our popular and
                industry-leading platform.
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-4 left-16 right-16 absolute top-2 opacity-15 bg-red box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-16 right-16 absolute top-2 bg-red"></div>
            </div>
          </div>
          {/* Leveraged Tokens */}
          <div>
            <div className="rounded-6xl border border-white-bg-15 py-10 px-12 overflow-hidden">
              <div className="text-4xl relative">
                <div className="z-10 relative">Leveraged Tokens</div>
                <div
                  className="absolute font-extrabold text-5xl text-yellow opacity-75 -top-4 -left-4"
                  style={{ textShadow: '1px 2px 14px #eab308c9' }}
                >
                  L
                </div>
                <div className="opacity-10 absolute -top-11 -left-10 text-5xl font-thin">
                  <div className="text-white">Leveraged Tokens</div>
                  <div className="text-red">Leveraged Tokens</div>
                </div>
              </div>
              <div className="mt-6 font-extralight leading-9">
                Amplify your investment returns by simply buying and selling
                leveraged tokens.
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-4 left-16 right-16 absolute top-2 opacity-15 bg-yrllow box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-16 right-16 absolute top-2 bg-yellow"></div>
            </div>
          </div>
          {/* Lenous Earn */}
          <div>
            <div className="rounded-6xl border border-white-bg-15 py-10 px-12 overflow-hidden">
              <div className="text-4xl relative">
                <div className="z-10 relative">Lenous Earn</div>
                <div
                  className="absolute font-extrabold text-5xl text-primary opacity-75 -top-4 -left-4"
                  style={{ textShadow: '1px 2px 14px #14b8a6bf' }}
                >
                  L
                </div>
                <div className="opacity-10 absolute -top-11 -left-10 text-5xl font-thin">
                  <div className="text-white">Lenous Earn</div>
                  <div className="text-red">Lenous Earn</div>
                </div>
              </div>
              <div className="mt-6 font-extralight leading-9">
                Invest and earn steady income with the help of a professional
                asset manager.
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-4 left-16 right-16 absolute top-2 opacity-15 bg-primary box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-16 right-16 absolute top-2 bg-primary"></div>
            </div>
          </div>
          {/* Trading Bot */}
          <div>
            <div className="rounded-6xl border border-white-bg-15 py-10 px-12 overflow-hidden">
              <div className="text-4xl relative">
                <div className="z-10 relative">Trading Bot </div>
                <div
                  className="absolute font-extrabold text-5xl text-purple opacity-75 -top-4 -left-4"
                  style={{ textShadow: '1px 2px 14px #a855f7bd' }}
                >
                  T
                </div>
                <div className="opacity-10 absolute -top-11 -left-10 text-5xl font-thin">
                  <div className="text-white">Trading Bot</div>
                  <div className="text-red">Trading Bot</div>
                </div>
              </div>
              <div className="mt-6 font-extralight leading-9">
                Earn passive income round-the-clock without having to constantly
                monitor markets.
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-4 left-16 right-16 absolute top-2 opacity-15 bg-purple box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-16 right-16 absolute top-2 bg-purple"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Your Safe and Trusted Crypto Exchange */}
      <div className="index-container text-white mt-36">
        <div className="text-center">
          <div className="text-5xl font-bold">
            Your Safe and Trusted Crypto Exchange
          </div>
          <Link
            className="inline-block mt-6 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
            href="#"
          >
            Learn more
          </Link>
        </div>
        <div className="mt-28">
          {/* Safe & Secure */}
          <div className="p-16 px-20  rounded-6xl bg-primary-gradient">
            <div className="flex items-center">
              <div className="relative pr-4">
                <div className="w-[90px] h-[90px] bg-primary flex items-center justify-center rounded-4xl relative z-10">
                  <Icon name="openLock" />
                </div>
                <div className="absolute w-[90px] h-[90px] bg-primary-dark rounded-4xl -top-4 -left-4"></div>
              </div>
              <div>
                <div className="text-primary text-2xl font-light">
                  Safe & Secure
                </div>
                <div className="text-4xl mt-2 font-extralight">
                  Secure Asset Storage
                </div>
              </div>
            </div>
            <div className="font-extralight mt-6">
              Our industry-leading encryption and storage systems ensure that
              your assets are always safe and secure.
            </div>
          </div>
          {/*Trustworthy*/}
          <div className="p-16 px-20  rounded-6xl bg-primary-gradient mt-12 ml-24">
            <div className="flex items-center">
              <div className="relative pr-4">
                <div className="w-[90px] h-[90px] bg-primary flex items-center justify-center rounded-4xl relative z-10">
                  <Icon name="security" />
                </div>
                <div className="absolute w-[90px] h-[90px] bg-primary-dark rounded-4xl -top-4 -left-4"></div>
              </div>
              <div>
                <div className="text-primary text-2xl font-light">
                  Trustworthy
                </div>
                <div className="text-4xl mt-2 font-extralight">
                  Strong Account Security
                </div>
              </div>
            </div>
            <div className="font-extralight mt-6">
              Our industry-leading encryption and storage systems ensure that
              your assets are always safe and secure.
            </div>
          </div>
          {/* Ten years of service */}
          <div className="p-16 px-20  rounded-6xl bg-primary-gradient mt-12 ">
            <div className="flex items-center">
              <div className="relative pr-4">
                <div className="w-[90px] h-[90px] bg-primary flex items-center justify-center rounded-4xl relative z-10">
                  <Icon name="trust" />
                </div>
                <div className="absolute w-[90px] h-[90px] bg-primary-dark rounded-4xl -top-4 -left-4"></div>
              </div>
              <div>
                <div className="text-primary text-2xl font-light">
                  Ten years of service
                </div>
                <div className="text-4xl mt-2 font-extralight">
                  Trusted Platform
                </div>
              </div>
            </div>
            <div className="font-extralight mt-6">
              We have a secure-by-design foundation in place to ensure rapid
              detection and response to any cyber attacks.
            </div>
          </div>
          {/* Update methods */}
          <div className="p-16 px-20 rounded-6xl bg-primary-gradient mt-12 ml-24 ">
            <div className="flex items-center">
              <div className="relative pr-4">
                <div className="w-[90px] h-[90px] bg-primary flex items-center justify-center rounded-4xl relative z-10">
                  <Icon name="fingerPrint" />
                </div>
                <div className="absolute w-[90px] h-[90px] bg-primary-dark rounded-4xl -top-4 -left-4"></div>
              </div>
              <div>
                <div className="text-primary text-2xl font-light">
                  Update methods
                </div>
                <div className="text-4xl mt-2 font-extralight">
                  PoR — Asset Transparency
                </div>
              </div>
            </div>
            <div className="font-extralight mt-6">
              PoR (Proof of Reserves) is a widely used method to prove custody
              of assets on the blockchain, confirming that KuCoin has the funds
              that cover all user assets on our books.
            </div>
          </div>
        </div>
      </div>
      {/* LENOUS by Your Side */}
      <div className="index-container text-white mt-36">
        <div className="text-5xl font-bold ">LENOUS by Your Side</div>
        <div className="grid grid-cols-2 gap-6 mt-20">
          <div>
            <div className="border border-white-bg-15 rounded-6xl flex flex-col justify-between p-12 h-[500px]">
              <div>
                <div className="text-4xl font-extralight">
                  24/7 Support Chat
                </div>
                <div className="text-xl mt-6 font-extralight">
                  Your questions, answered. Contact KuCoin customer support with
                  your questions at any time.
                </div>
              </div>
              <div>
                <Link
                  className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
                  href="#"
                >
                  LENOUS Help Center
                </Link>
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-11 left-14 right-14 absolute top-2 opacity-15 bg-colorfull-gradient box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-14 right-14 absolute top-2 bg-colorfull-gradient"></div>
            </div>
          </div>
          <div>
            <div className="border border-white-bg-15 rounded-6xl flex flex-col justify-between p-12 h-[500px]">
              <div>
                <div className="text-4xl font-extralight">
                  Join Our Community
                </div>
                <div className="text-xl mt-6 font-extralight">
                  The KuCoin Global Community is home to millions of users from
                  200+ countries, with support for 8+ languages.
                </div>
              </div>
              <div>
                <div className="text-2xl">English Community</div>
                <div className="flex gap-4 mt-4">
                  <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                    <Icon name="youtube" />
                  </div>
                  <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                    <Icon name="noBrand" />
                  </div>
                  <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                    <Icon name="github" />
                  </div>
                  <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                    <Icon name="x" />
                  </div>
                  <div className="h-16 w-16 flex items-center justify-center bg-radial-gradient-25-5 rounded-full">
                    <Icon name="facebook" />
                  </div>
                </div>
              </div>
              <div>
                <Link
                  className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
                  href="#"
                >
                  View all 8+ languages
                </Link>
              </div>
            </div>
            <div className="linearShadow relative h-11 -mt-2.5">
              <div className="h-11 left-14 right-14 absolute top-2 opacity-15 bg-colorfull-gradient box-shadow-[75px_75px_75px] blur-34"></div>
              <div className="h-px left-14 right-14 absolute top-2 bg-colorfull-gradient"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="index-container text-white mt-36">
        <div className="flex justify-between">
          <div className="text-5xl font-extralight">
            <div>FAQs</div>
            <div className="text-primary">FAQs</div>
          </div>
          <div>
            <div className="text-primary">have a Questions?</div>
            <Link
              className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
              href="#"
            >
              Contact us
            </Link>
          </div>
        </div>
        <div className="mt-12">
          <div className="p-6 rounded-6xl flex justify-between items-center border border-white-bg-30 mt-4">
            <div className="text-3xl font-thin">
              Is Lenous a safe cryptocurrency exchange?
            </div>
            <div>
              <Icon name="plus" />
            </div>
          </div>
          <div className="p-6 rounded-6xl flex justify-between items-center border border-white-bg-30 mt-4">
            <div className="text-3xl font-thin">
              Can I start trading with just $1?
            </div>
            <div>
              <Icon name="plus" />
            </div>
          </div>
          <div className="p-6 rounded-6xl flex justify-between items-center border border-white-bg-30 mt-4">
            <div className="text-3xl font-thin">
              Is there an exchange limit between fiat and crypto?
            </div>
            <div>
              <Icon name="plus" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
