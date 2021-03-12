import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import style from "./Contact.module.css";
import FacebookPage from "../FacebookPage/FacebookPage";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgba(24, 28, 39, 0.6)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(24, 28, 39, 0.6)",
    },
  },
})(TextField);

export default function BasicTextFields() {
  const classes = useStyles();
  const [name, setName] = useState("");

  return (
    <>
      <FacebookPage />
      <form
        className={(classes.root, style.form)}
        noValidate
        autoComplete="off"
      >
        <CssTextField
          error={name.length < 3}
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText="Incorrect entry."
          className={classes.margin}
          label="Custom CSS"
        />
        <TextField
          className={CssTextField.root}
          id="outlined-basic"
          type="text"
          label="Имя"
          variant="outlined"
          helperText="1233"
        />
        <TextField
          id="outlined-basic"
          type="text"
          label="Адрес"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          type="number"
          label="Номер телефона"
          variant="outlined"
        />
        {/* <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax={4}
        value=''
        onChange=''
        variant="outlined"
      /> */}
        <Button variant="contained" color="primary">
          Отправить заявку
        </Button>
      </form>
    </>
  );
}
