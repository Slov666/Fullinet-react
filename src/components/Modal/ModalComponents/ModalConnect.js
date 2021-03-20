import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalConnectSelector } from '../../../redux/modal/modalSelectors';
import { setModalConnect } from '../../../redux/modal/modalAction';

import ConnectElement from '../ModalElements/ConnectElement';
import ModalPortal from '../../../common/ModalPortal/ModalPortal';
import Modal from '../Modal';

export default function ModalConnect() {
  const dispatch = useDispatch();
  const isOpen = useSelector(modalConnectSelector);
  const closeModal = () => dispatch(setModalConnect(false));
  return isOpen ? (
    <ModalPortal>
      <Modal onClose={closeModal}>
        <ConnectElement />
      </Modal>
    </ModalPortal>
  ) : null;
}
