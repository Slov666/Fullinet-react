import React from 'react';
import Tariffs from '../../components/Tariffs/Tariffs';
import Main from '../../components/Main/Main';
import MetaTags from 'react-meta-tags';
import { useTranslation } from 'react-i18next';

export default function HomeView() {
  const { t } = useTranslation();
  return (
    <>
      <MetaTags>
        <meta name="description" content={t('metaHome.title')} />
        <meta name="author" content={t('metaHome.author')} />
        <meta name="keywords" content={t('metaHome.keyword')} />
      </MetaTags>
      <Main />
      <Tariffs />
    </>
  );
}
