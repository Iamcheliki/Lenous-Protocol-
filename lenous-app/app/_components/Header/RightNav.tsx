'use client';
import Icon from '../UI/icon';
import { ConnectWalletButton } from './ConnectWalletButton';

export default function RightNav() {
  return (
    <div className="flex items-center gap-6">
      <div>
        <Icon name="questionMark" />
      </div>
      <div>
        <Icon name="moon" />
      </div>
      <div>
        <Icon name="world" />
      </div>
      <div>
        <Icon name="setting" />
      </div>
      <ConnectWalletButton />
    </div>
  );
}
