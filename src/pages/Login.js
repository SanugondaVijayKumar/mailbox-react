import React, { Fragment, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./Login.module.css";

const Login = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;
      const obj = {
        email,
        password,
        returnSecureToken: true,
      };

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMd_qTECZkz7h2bjSmdtphxW2dmKLVkQk",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      console.log(data);
      const idToken = data.idToken;
      localStorage.setItem("token", idToken);
      alert("successfully loggedIn");
      history.push("/mailbox");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <Form className={classes.form} onSubmit={submitHandler}>
          <h3>Login</h3>
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

          <Button className={classes["primary-button"]} type="submit">
            Login
          </Button>

          <div className={classes["forgot-password-link"]}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <p className={classes["login-link"]}>
            Don't have an account?<Link to="/signup">SignUp</Link>
          </p>
        </Form>
      </div>
    </Fragment>
  );
};

export default Login;
