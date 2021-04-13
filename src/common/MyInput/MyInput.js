import React from 'react';
import PropTypes from 'prop-types';
import useIsMobile from '../../hooks/useMobile';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function MyInput({ value, onChange, ...other }) {

  const useStyles = makeStyles(() => ({
    root: {
      padding: '7px 5px',
      marginBottom: '5px',
    },
  }));
  const styles = useStyles();

  return (
    <TextField value={value} classes={styles} onChange={onChange} {...other} />
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
