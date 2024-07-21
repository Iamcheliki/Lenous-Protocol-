import React, { FC } from 'react';
import connection from './connection.svg';
import moon from './moon.svg';
import questionMark from './questionMark.svg';
import world from './world.svg';
import setting from './setting.svg';
import linkedin from './linkedin.svg';
import x from './x.svg';
import instagram from './instagram.svg';
import facebook from './facebook.svg';
import youtube from './youtube.svg';
import arrowDown from './arrowDown.svg';
import switchToken from './switchToken.svg';
import arrowLeft from './arrowLeft.svg';
import orderBook from './order-book.svg';
import stopLimit from './stop-limit.svg';
import marginRatio from './margin-ratio.svg';
import market from './market.svg';
import help from './help.svg';
import limit from './limit.svg';
import assets from './assets.svg';
import trades from './trades.svg';
import search from './search.svg';
import fingerPrint from './finger-print.svg';
import openLock from './open-lock.svg';
import trust from './trust.svg';
import security from './security.svg';
import noBrand from './noBrand.svg';
import github from './github.svg';
import plus from './plus.svg';
interface IconProps {
  name: string;
  [key: string]: string;
}

interface IconTypes {
  [key: string]: FC<React.SVGProps<SVGSVGElement>>;
}

const iconTypes: IconTypes = {
  connection: connection,
  moon: moon,
  questionMark: questionMark,
  setting: setting,
  world: world,
  linkedin: linkedin,
  x: x,
  instagram: instagram,
  facebook: facebook,
  youtube: youtube,
  arrowDown: arrowDown,
  switchToken: switchToken,
  arrowLeft: arrowLeft,
  orderBook: orderBook,
  stopLimit: stopLimit,
  marginRatio: marginRatio,
  market: market,
  help: help,
  limit: limit,
  assets: assets,
  trades: trades,
  search: search,
  fingerPrint: fingerPrint,
  openLock: openLock,
  trust: trust,
  security: security,
  noBrand: noBrand,
  github: github,
  plus: plus,
};

const Icon: FC<IconProps> = ({ name, ...props }) => {
  let IconComponent = iconTypes[name];
  return <IconComponent {...props} />;
};

export default Icon;
