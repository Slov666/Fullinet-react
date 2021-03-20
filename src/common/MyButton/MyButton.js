import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStylesFlip = makeStyles(() => ({
  root: {
    padding: '0',
    fontSize: '10px',
  },
}));
// const useStyles = makeStyles(() => ({
//   root: {
//     padding: '0',
//     fontSize: '14px',
//   },
// }));

export default function MyButton({ onClick, styles, children, ...other }) {
  const styledComponentFlip = useStylesFlip();
  let style;
  switch (styles) {
    case 'details':
      style = styledComponentFlip;
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
      {...other}
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
