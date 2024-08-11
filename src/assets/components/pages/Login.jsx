import React from "react";

const Login = () => {    return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Login Successful!</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="input-remember">
            <input 
              type="checkbox" 
              id="remember-me" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* <!-- PLACEHOLDER DUE TO STATIC SITE -->
          <a href="./user.html" class="sign-in-button">Sign In</a>
          <!-- SHOULD BE THE BUTTON BELOW -->
          <!-- <button class="sign-in-button">Sign In</button> -->
          <!--  --> */}
        </form>
      </section>
    </main>
  );
}
export default Login;