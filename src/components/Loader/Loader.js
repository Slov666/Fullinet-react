import React from "react";
import Loader from "react-loader-spinner";
import style from "./Loader.module.css";

export default class App extends React.Component {
  render() {
    return (
      <div className={style.loader}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={300}
          width={300}

        />
      </div>
    );
  }
}
