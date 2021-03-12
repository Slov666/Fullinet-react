import React, { useEffect, useState } from 'react';
import style from './PageTariff.module.css';
import TariffItem from '../Tariffs/TariffItem';
import { useLocation, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import getQueryParams from '../../utils/queryString';

export default function PageTariff() {
  const [item, setItem] = useState({});
  const { t } = useTranslation();
  const tariffs = t('tariffs', { returnObjects: true });


  const locations = useLocation();
  const history = useHistory();
  const { id } = getQueryParams(locations.search);
  useEffect(() => {
    if (!locations.search || !id) return history.push('/tariffs');
    setItem(tariffs.find((el) => el.id === id));
  }, []);

  const onGoBack = () => {
    const { state } = locations;
    if (state && state.from) {
      return history.push(state.from);
    }
    return history.push('/home');
  };
  return (
    <>
      <TariffItem name={item.name} cost={item.cost} speed={item.speed} />
    </>
  );
}
