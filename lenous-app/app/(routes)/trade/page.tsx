import AccountMargin from '@/app/_components/trade/AccountMargin';
import TradeMenu from '@/app/_components/trade/TradeMenu';
import TradeTabs from '@/app/_components/trade/TradeTabs';
import TradingViewWidget from '@/app/_components/widgets/TradingViewWidget';

const tradePanel = async () => {
  return (
    <div>
      <div className=" w-full ">
        <div className="flex h-full ">
          <div className="flex-1">
            <AccountMargin />
            <div className="h-[452px]">
              <TradingViewWidget />
            </div>
          </div>
          <TradeMenu />
        </div>
      </div>
      <div className=" bg-white-bg-05 h-full">
        <TradeTabs />
      </div>
    </div>
  );
};
export default tradePanel;
