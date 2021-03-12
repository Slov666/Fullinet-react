import React from "react";
import style from "./Footer.module.css";
import { useTranslation } from "react-i18next";
import "../../utils/i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={style.contanier}>
      <p>
        <a
          className={style.linkVitalik}
          rel="noreferrer"
          target="_blank"
          href="https://www.facebook.com/Fullinet-1409833259236644"
        >
          {t("links.link_Vitalik", { dateNow: new Date().getFullYear() })}
        </a>
      </p>
      <a
        className={style.myLink}
        rel="noreferrer"
        target="_blank"
        href="https://www.facebook.com/slavik.ogorodnyk"
      >
        {t("links.link_Slavik")}
      </a>
    </footer>
  );
}
