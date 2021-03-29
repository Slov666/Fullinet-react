import React from 'react';
import Loader from 'react-loader-spinner';
import style from './Loader.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Loaders extends React.Component {
  render() {
    const { height, width, position } = this.props;
    return (
      <div className={classNames(style.loader, style[position])}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={height}
          width={width}
        />
      </div>
    );
  }
}
Loaders.proprTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Loaders.defaultProps = {
  height: 300,
  width: 300,
  position: 'middle',
};
