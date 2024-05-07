import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const showSignUpForm = () => {
        setIsLogin(false);
    };

    const validateEmail = (email) => {
        if (!email) {
            return "Email field can't be empty";
        } else if (!email.includes('@')) {
            return "Email address must contain '@'";
        } else if (!email.endsWith('.com')) {
            return "Email address must end with '.com'";
        } else if (!email.charAt(0).match(/[A-Za-z]/)) {
            return "Email address must start with a letter";
        } else if (email.includes(' ')) {
            return "Email address must not contain whitespaces";
        }
        return "";
    };

    const validatePassword = (password) => {
        if (!password) {
            return "Password field can't be empty";
        } else if (password.length < 8) {
            return "Password length should be at least 8 characters";
        } else if (!password.match(/[0-9]/)) {
            return "Password must contain at least one number";
        } else if (!password.match(/[A-Z]/)) {
            return "Password must contain at least one uppercase letter";
        } else if (!password.match(/[a-z]/)) {
            return "Password must contain at least one lowercase letter";
        } else if (!password.match(/[^a-zA-Z0-9]/)) {
            return "Password must contain at least one symbol";
        }
        return "";
    };

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginEmailError, setLoginEmailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');

    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpName, setSignUpName] = useState('');
    const [signUpAge, setSignUpAge] = useState('');
    const [signUpEmailError, setSignUpEmailError] = useState('');
    const [signUpPasswordError, setSignUpPasswordError] = useState('');
    const [signUpNameError, setSignUpNameError] = useState('');
    const [signUpAgeError, setSignUpAgeError] = useState('');

   


    const handleLogin = () => {
        const emailError = validateEmail(loginEmail);
        const passwordError = validatePassword(loginPassword);
       

        setLoginEmailError(emailError);
        setLoginPasswordError(passwordError);
     
    

        if (emailError === '' && passwordError === '') {
            alert("You have successfully logged in!");
            setLoginEmail('');
            setLoginPassword('');
           
        } else {
            alert("Please correct the errors before logging in.");
        }
    };

    const handleSignUp = () => {
        const emailError = validateEmail(signUpEmail);
        const passwordError = validatePassword(signUpPassword);

        setSignUpEmailError(emailError);
        setSignUpPasswordError(passwordError);

        if (signUpName === '') {
            setSignUpNameError("Name field can't be empty");
        } else {
            setSignUpNameError('');
        }

        if (signUpAge === '') {
            setSignUpAgeError("Age field can't be empty");
        } else {
            setSignUpAgeError('');
        }

        if (emailError === '' && passwordError === '' && signUpName !== '' && signUpAge !== '') {
            alert("You have successfully signed up!");
            setSignUpEmail('');
            setSignUpPassword('');
            setSignUpName('');
            setSignUpAge('');
        } else {
            alert("Please correct the errors before signing up.");
        }
    };
    return (
        <div className="App">
            <div id="formContainer">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

                {isLogin ? (
                    <div id="loginForm">
                        <input
                            className="i"
                            id="emailInput"
                            type="email"
                            placeholder="Enter your email"
                            value={loginEmail}
                            onChange={(e) => {
                                setLoginEmail(e.target.value);
                                setLoginEmailError(validateEmail(e.target.value));
                            }}
                        />
                        <p className="er">{loginEmailError}</p>

                        <input
                            className="i"
                            id="pwInput"
                            type="password"
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(e) => {
                                setLoginPassword(e.target.value);
                                setLoginPasswordError(validatePassword(e.target.value));
                            }}
                        />
                        <p className="er">{loginPasswordError}</p>

                        
                       

                        <button style={{ backgroundColor: "green" }} onClick={handleLogin}>Log in</button>
                    </div>
                ) : (
                    <div id="signUpForm">
                        <input
                            className="i"
                            id="newEmailInput"
                            type="email"
                            placeholder="Enter your email"
                            value={signUpEmail}
                            onChange={(e) => {
                                setSignUpEmail(e.target.value);
                                setSignUpEmailError(validateEmail(e.target.value));
                            }}
                        />
                        <p className="er">{signUpEmailError}</p>

                        <input
                            className="i"
                            id="newPwInput"
                            type="password"
                            placeholder="Enter your password"
                            value={signUpPassword}
                            onChange={(e) => {
                                setSignUpPassword(e.target.value);
                                setSignUpPasswordError(validatePassword(e.target.value));
                            }}
                        />
                        <p className="er">{signUpPasswordError}</p>

                        <input
                            className="i"
                            id="nameInput"
                            type="text"
                            placeholder="Enter your name"
                            value={signUpName}
                            onChange={(e) => {
                                setSignUpName(e.target.value);
                                setSignUpNameError(e.target.value === '' ? "Name field can't be empty" : '');
                            }}
                        />
                        <p className="er">{signUpNameError}</p>

                        <input
                            className="i"
                            id="ageInput"
                            type="number"
                            placeholder="Enter your age"
                            value={signUpAge}
                            onChange={(e) => {
                                setSignUpAge(e.target.value);
                                setSignUpAgeError(e.target.value === '' ? "Age field can't be empty" : '');
                            }}
                        />
                        <p className="er">{signUpAgeError}</p>

                        <button style={{ backgroundColor: "green" }} onClick={handleSignUp}>Sign Up</button>
                    </div>
                )}

                <div id="toggleButtons">
                    {!isLogin && (
                        <div>
                            <span>Already have an account? </span>
                            <a href="#" onClick={() => setIsLogin(true)}>Log In</a>
                        </div>
                    )}
                    {isLogin && (
                        <div>
                            <span>Don't have an account? </span>
                            <a href="#" onClick={showSignUpForm}>Sign Up</a>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Auth;
