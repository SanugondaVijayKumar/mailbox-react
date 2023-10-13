import React, { Fragment, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./SignUp.module.css"; // Import the CSS module

const SignUp = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;
      const confirmPassword = confirmPasswordInputRef.current.value;
      if (password !== confirmPassword) {
        alert("passwords do not match!");
        return;
      }
      const obj = {
        email,
        password,
        returnSecureToken: true,
      };

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMd_qTECZkz7h2bjSmdtphxW2dmKLVkQk",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Email Already Exists");
      }
      const data = await response.json();
      console.log(data);
      alert("successfully created the user");
      history.replace("/login");

      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      confirmPasswordInputRef.current.value = "";
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <Form className={classes.form} onSubmit={submitHandler}>
          <h3>SignUp</h3>
          <Form.Group className={`${classes["form-group"]} mb-3`}>
            <Form.Control
              type="email"
              className={classes["form-control"]}
              placeholder="Enter email"
              ref={emailInputRef}
            />
            <Form.Text className={`${classes["text-muted"]} text-muted`}>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className={`${classes["form-group"]} mb-3`}>
            <Form.Control
              type="password"
              className={classes["form-control"]}
              placeholder="Password"
              ref={passwordInputRef}
            />
          </Form.Group>

          <Form.Group className={`${classes["form-group"]} mb-3`}>
            <Form.Control
              type="password"
              className={classes["form-control"]}
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
            />
          </Form.Group>

          <Button className={classes["primary-button"]} type="submit">
            SignUp
          </Button>

          <div className={classes["forgot-password-link"]}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <p className={classes["login-link"]}>
            Already have an account?<Link to="/login">Login</Link>
          </p>
        </Form>
      </div>
    </Fragment>
  );
};

export default SignUp;
