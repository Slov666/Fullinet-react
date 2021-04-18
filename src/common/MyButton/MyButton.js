import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useMobile from '../../hooks/useMobile';

export default function MyButton({ onClick, styles, children, ...rest }) {
  const isMobile = useMobile();
  const useStylesTariffs = makeStyles(() => ({
    root: {
      padding: '2',
      fontSize: '10px',
    },
  }));
  const useStylesServices = makeStyles(() => ({
    root: {
      fontSize: '12px',
    },
  }));
  const useStylesServicesSended = makeStyles(() => ({
    root: {
      fontSize: '12px',
      height: isMobile ? '35px' : '50px',
    },
  }));
  const styledComponentTarrifs = useStylesTariffs();
  const styledComponentServices = useStylesServices();
  const styledComponentServicesSended = useStylesServicesSended();
  let style;
  switch (styles) {
    case 'tariffs':
      style = styledComponentTarrifs;
      break;
    case 'services':
      style = styledComponentServices;
      break;
    case 'servicesSended':
      style = styledComponentServicesSended;
      break;

    default:
      break;
  }
  return (
      <Button
        size="small"
        color="primary"
        className={style.root}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Button>
  );
}
Button.proprTypes = {
  onClick: PropTypes.func,
  styles: PropTypes.string,
};
// variant => contained
Button.defaultProps = {
  variant: 'outlined',
};
