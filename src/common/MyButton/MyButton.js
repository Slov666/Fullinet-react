import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStylesTariffs = makeStyles(() => ({
  root: {
    padding: '0',
    fontSize: '10px',
  },
}));
const useStylesServices = makeStyles(() => ({
  root: {
    fontSize: '12px',
  },
}));


export default function MyButton({ onClick, styles, children, ...rest }) {
  const styledComponentTarrifs= useStylesTariffs();
  const styledComponentServices = useStylesServices();
  let style;
  switch (styles) {
    case 'tariffs':
      style = styledComponentTarrifs;
      break;
    case 'services':
      style = styledComponentServices;
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
