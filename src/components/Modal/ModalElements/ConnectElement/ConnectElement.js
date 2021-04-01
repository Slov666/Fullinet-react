import React from 'react';
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
  return (
    <div>
      <form className={styles.form}>
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
          <MyInput label={t('form.yourName')} />
          <MyInput label={t('form.yourPhone')} />
          <MyInput label={t('form.yourAddress')} />
        </div>
        <div className={styles.containerBtn}>
          <Button variant="contained" color="primary" endIcon={<SendIcon />}>
            Відправити
          </Button>
        </div>
      </form>
    </div>
  );
}
