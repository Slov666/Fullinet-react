import React from 'react';
import PropTypes from 'prop-types';
import useIsMobile from '../../hooks/useMobile';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function MyInput({ value, onChange, ...other }) {
  const useStyles = makeStyles(() => ({
    root: {
      padding: '2px 5px',
      marginBottom: '5px',
      display: 'inline-block',
      margin: '0 auto',
      width: "280px"
    },
  }));
  const styles = useStyles();

  return (
    <TextField fullWidth value={value} classes={styles} onChange={onChange} {...other} />
  );
}

MyInput.proprTypes = {
  onChange: PropTypes.func,
  helperText: PropTypes.string,
};

MyInput.defaultProps = {
  variant: 'outlined',
  helperText: '',
};
