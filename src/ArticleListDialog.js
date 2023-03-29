import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function ArticleListDialog(props) {
  // create values state
  const [values, setValues] = useState({});

  // function to create initial state
  const createInitialState = (fields) => {
    var tempObj = {};
    fields.forEach((item) =>
      Object.assign(tempObj, { [item.id]: item.value ? item.value : "" })
    );
    return tempObj;
  };

  // update values state when props state
  useEffect(() => {
    const initialValues = createInitialState(props.inputFields);
    setValues(initialValues);
  }, [props]);

  // form submit
  const handleFormSubmit = (e) => {
    props.handleSubmit();
  };

  // input value change
  const handleInputValue = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      onBackdropClick={props.handleClose}
    >
      <form autocomplete="off" onSubmit={handleFormSubmit}>
        <DialogTitle>Title</DialogTitle>
        <DialogContent>
          {props.inputFields.map((field, index) => {
            return (
              <TextField
                key={index}
                id={field.id}
                label={field.label}
                type={field.type}
                name={field.id}
                required
                value={values[field.id]}
                margin="normal"
                variant="standard"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  handleInputValue(e);
                }}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
