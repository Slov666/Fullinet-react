import React from 'react';
import Services from '../../components/Services/Services';
import MetaTags from 'react-meta-tags';
import { useTranslation } from 'react-i18next';

export default function ServicesView() {
  const { t } = useTranslation();
  return (
    <>
      <MetaTags>
        <meta name="description" content={t('metaServices.title')} />
        <meta name="author" content={t('metaServices.author')} />
        <meta name="keywords" content={t('metaServices.keyword')} />
      </MetaTags>
      <Services />
    </>
  );
}
