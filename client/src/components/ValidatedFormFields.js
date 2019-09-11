import React from "react";
import { Form } from "semantic-ui-react";

export const ValidatedFormInput = props => {
  return (
    <Form.Field
      {...props}
      error={
        props.valid === false && {
          error: true,
          content: `${props.validationMessage}`
        }
      }
    >
      {props.children}
    </Form.Field>
  );
};

export const ValidatedFormDropDown = props => {
  return (
    <Form.Select
      {...props}
      error={
        props.valid === false && {
          error: true,
          content: `${props.validationMessage}`
        }
      }
    />
  );
};

export const ValidatedFormCheckbox = props => {
  return (
    <Form.Checkbox
      {...props}
      error={
        props.valid === false && {
          error: true,
          content: `${props.validationMessage}`,
          pointing: "left"
        }
      }
    />
  );
};
