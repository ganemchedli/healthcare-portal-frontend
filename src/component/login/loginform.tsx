import { useState, FormEvent } from "react";
import "./loginform.css";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Prepare the data to send to the backend
    const data = {
      username: username,
      password: password,
    };

    try {
      // Send a POST request to your Spring Boot backend
      const response = await fetch("http://your-backend-url/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if the request was successful
      if (response.ok) {
        // Handle successful login (redirect, update state, etc.)
        console.log("Login successful");
      } else {
        // Handle failed login (display error message, etc.)
        console.error("Login failed");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error:", error);
    }
  };
  return (
    <div className="container">
      <div className="image-container">
        <img className="logo" src="../src/assets/corilus-logo.png" alt="" />
      </div>
      <div className="form-container">
        <div className="login-form">
          <div>
            <h2>Sign in </h2>
            <p>Enter your email and password to login</p>
          </div>
          <form onSubmit={handleSubmit} action="#" method="POST">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="remember-password">
              <input type="checkbox" />
              <p>Remember password</p>
              <div className="space"></div>
              <a href="">Forget password ?</a>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;

// import React from "react";

// export default function loginform() {
//   return <div>loginform</div>;
// }
