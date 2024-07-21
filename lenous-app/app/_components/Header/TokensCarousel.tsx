'use client';
import React from 'react';
import { TokenData } from '@/app/_libs/types/token';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function TokensCarousel({ tokens }: { tokens: TokenData[] }) {
  return (
    <div className=" max-w-full" style={{ width: 'calc(100% - 13rem)' }}>
      <Swiper spaceBetween={20} slidesPerView={'auto'}>
        {tokens.map((token) => (
          <SwiperSlide
            key={token.id}
            style={{
              width: 'auto',
              alignSelf: 'stretch',
              height: 'auto',
            }}
          >
            <div className="gap-2.5 flex w-52">
              <div className="text-white">{token.symbol}</div>
              <div
                className={`${
                  token.price_change_percentage_24h >= 0
                    ? 'text-good-condition'
                    : 'text-bad-situation'
                }`}
              >
                {token.price_change_percentage_24h}%
              </div>
              <div className="text-less-important">
                {Number(token.current_price).toFixed(4)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
