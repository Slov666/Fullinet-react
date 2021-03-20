import React from 'react';
import PropTypes from 'prop-types';
import useIsMobile from '../../hooks/useMobile';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  root: {
    padding: '7.5px 4px',
  },
  label: {
    padding: '8px 4px',
  },
}));

export default function MyInput({ onChange, ...other }) {
  const isMobile = useIsMobile();
  const styles = useStyles();
  const CssTextField = withStyles({
    '@global': {
      '& label.Mui-focused': {
        color: 'rgba(24, 28, 39, 0.6)',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'rgba(24, 28, 39, 0.6)',
      },
      '.MuiOutlinedInput-input': {
        padding: isMobile ? '12.5px 7px !important' : '7.5px 8px !important',
        fontSize: isMobile ? '13px  !important' : "1rem !important'",
      },
    },
  })(TextField);
  return <CssTextField classes={styles} onClick={onChange} {...other} />;
}
MyInput.proprTypes = {
  onChange: PropTypes.func,
  helperText: PropTypes.string,
};

MyInput.defaultProps = {
  variant: 'outlined',
  helperText: '',
};
