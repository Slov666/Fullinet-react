import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalShopSelector } from '../../../redux/modal/modalSelectors';
import { setModalShop } from '../../../redux/modal/modalAction';

import ShopElements from '../ModalElements/ShopElemets/ShopElements';
import ModalPortal from '../../../common/ModalPortal/ModalPortal';
import Modal from '../Modal';

export default function ModalConnect() {
  const dispatch = useDispatch();
  const isOpen = useSelector(modalShopSelector);
  const closeModal = () => dispatch(setModalShop(false));
  return isOpen ? (
    <ModalPortal>
      <Modal onClose={closeModal} position="centerShop" >
        <ShopElements />
      </Modal>
    </ModalPortal>
  ) : null;
}
