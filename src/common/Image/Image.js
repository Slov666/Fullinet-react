import React from 'react';
import style from './Image.module.css';
import Loader from '../../components/Loader/Loader';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function Image({ alt, size, ...rest }) {
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const handleLoad = async () => {
    setLoading(false);
    setIsError(false);
  };

  const handleError = async () => {
    setLoading(false);
    setIsError(true);
  };

  return (
    <div className={classNames(style.container, style[size])}>
      {isError && !isLoading && (
        <img
          src="images/DefaultServices-min.png"
          alt={alt || 'Default Alt'}
          className={style.img}
          loading='lazy'
        />
      )}
      {!isError && isLoading && <Loader width={100} position="card" />}
      <img
        style={{
          display: isError || isLoading ? 'none' : 'initial',
        }}
        alt={alt || 'Default Alt'}
        onLoad={handleLoad}
        onError={handleError}
        loading='lazy'
        {...rest}
      />
    </div>
  );
}
Image.proprTypes = {
  size: PropTypes.string,
};

Image.defaultProps = {
  size: "big_size",
};
