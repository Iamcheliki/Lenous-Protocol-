'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

export default function TopSlider() {
  return (
    <div className="max-w-full">
      <Swiper spaceBetween={20} slidesPerView={1}>
        <SwiperSlide
          style={{
            width: 'auto',
            alignSelf: 'stretch',
            height: 'auto',
          }}
        >
          <Image
            src="/images/home-header.png"
            width={1920}
            height={240}
            alt="lenous banner"
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            width: 'auto',
            alignSelf: 'stretch',
            height: 'auto',
          }}
        >
          <Image
            src="/images/home-header.png"
            width={1920}
            height={240}
            alt="lenous banner"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
