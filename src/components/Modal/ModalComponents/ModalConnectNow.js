import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalConnectNowSelector } from '../../../redux/modal/modalSelectors';
import { setModalConnectNow } from '../../../redux/modal/modalAction';

import ModalPortal from '../../../common/ModalPortal/ModalPortal';
import Modal from '../Modal';

export default function ModalConnectNow() {
  const dispatch = useDispatch();
  const isOpen = useSelector(modalConnectNowSelector);
  const closeModal = () => dispatch(setModalConnectNow(false));
  return isOpen ? (
    <ModalPortal>
      <Modal onClose={closeModal}>
        {/* <AddParticipant onClose={onToggle} /> */}
      </Modal>
    </ModalPortal>
  ) : null;
}
