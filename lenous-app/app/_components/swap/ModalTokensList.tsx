import React from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import { tokenList } from '@/app/_libs/utils/constants/TokenList';
import Icon from '../UI/icon';

interface props {
  isOpen: boolean;
  modifyToken: (i: number) => void;
  closeModal: () => void;
}
const ModalTokensList: React.FC<props> = ({
  isOpen,
  modifyToken,
  closeModal,
}) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      width: '800px',
      height: '650px',
      background: '#3F4C49',
      border: 'none',
      'overflow-y': 'hidden',
    },
    overlay: {
      background: '#8686866e',
      overflow: 'auto',
      zIndex: '20',
    },
  };
  return (
    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
      <div className="modalTitle flex items-center justify-between bg-neutral-button px-8 py-4 text-white">
        <div onClick={closeModal}>
          <Icon name="arrowLeft" />
        </div>
        <div className="text-2xl">Select Token</div>
      </div>
      <div className="modalContent overflow-auto h-full p-8">
        {tokenList.map((token, index) => (
          <div
            key={index}
            className="flex items-center text-white pb-6 cursor-pointer"
            onClick={() => modifyToken(index)}
          >
            <Image
              src={token.img}
              alt={token.name}
              width="60"
              height="60"
              className="pr-4"
            />
            {token.name}
          </div>
        ))}
      </div>
    </Modal>
  );
};
export default ModalTokensList;
