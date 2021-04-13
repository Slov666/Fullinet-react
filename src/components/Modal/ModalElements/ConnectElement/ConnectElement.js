import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ConnectElemet.module.css';
import { modalConnectSelector } from '../../../../redux/modal/modalSelectors';
import { useTranslation } from 'react-i18next';
import '../../../../utils/i18next';

import Button from '@material-ui/core/Button';
import MyInput from '../../../../common/MyInput/MyInput';
import SendIcon from '@material-ui/icons/Send';

export default function ConnectElement() {
  const { t } = useTranslation();
  const tariff = useSelector(modalConnectSelector);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handlerOnSubmit}>
        <div className={styles.tariff}>
          <MyInput
            disabled
            label={t('tariffs_title.cost')}
            defaultValue={tariff.cost}
          />
          <MyInput
            disabled
            label={t('tariffs_title.speed')}
            defaultValue={tariff.speed}
          />
          <MyInput
            disabled
            label={t('tariffs_title.package')}
            defaultValue={tariff.name}
          />
        </div>

        <div className={styles.abonent}>
          <MyInput
            type="text"
            value={name}
            onChange={handleOnChangeName}
            label={t('form.yourName')}
          />

          <MyInput
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label={t('form.yourPhone')}
          />

          <MyInput
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label={t('form.yourAddress')}
          />
        </div>

        <div className={styles.containerBtn}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
          >
            {t('ui.send')}
          </Button>
        </div>
      </form>
    </div>
  );
}
