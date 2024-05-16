import React, { useState } from 'react';
import './Auth.css';
import { logIn, setAdminOn } from '../features/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api_base_url } from '../api';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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


    const handleLogin = async () => {
        const emailError = validateEmail(loginEmail);
        const passwordError = validatePassword(loginPassword);

        setLoginEmailError(emailError);
        setLoginPasswordError(passwordError);
        let userId;
        let userRole;

        const getUserFromDb = async (email, password) => {
            const data = { email, password };
            const response = await axios.post(api_base_url + '/api/users/login', data)
            const response_data = await response.data;
            console.log(response_data)
            userRole = response_data['data']['roles'][0]['name']
            userId = response_data['data']['id']
        }

        if (emailError === '' && passwordError === '') {
            // alert("You have successfully logged in!");
            // setLoginEmail('');
            // setLoginPassword('');
            await getUserFromDb(loginEmail, loginPassword);
            dispatch(logIn(userId))
            // navigate("/")
            if (userRole === 'ADMIN') {
                dispatch(setAdminOn())
                navigate("/admin")
            }
            else {
                navigate("/")
            }


        } else {
            alert("Please correct the errors before logging in.");
        }
    };



    const handleSignUp = async () => {

        const emailError = validateEmail(signUpEmail);
        const passwordError = validatePassword(signUpPassword);

        setSignUpEmailError(emailError);
        setSignUpPasswordError(passwordError);

        let userId;
        let userRole;

        const createUserInDb = async (email, password, name) => {
            const data = { email, password, username: name, role: 'USER' };
            const response = await axios.post(api_base_url + '/api/users/create', data)
            const response_data = await response.data;
            console.log(response_data)
            userRole = response_data['data']['roles'][0]['name']
            userId = response_data['data']['id']
        }

        if (signUpName === '') {
            setSignUpNameError("Name field can't be empty");
        } else {
            setSignUpNameError('');
        }

        if (emailError === '' && passwordError === '' && signUpName !== '') {
            alert("You have successfully signed up!");
            setSignUpEmail('');
            setSignUpPassword('');
            setSignUpName('');
            setSignUpAge('');
            await createUserInDb(signUpEmail, signUpPassword, signUpName);
            dispatch(logIn);
        } else {
            alert("Please correct the errors before signing up.");
        }
    };
    return (
        <div className="App">
            <div id="formContainer">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

                {isLogin ? (
                    <>
                        <input
                            className="i"
                            id="emailInput"
                            type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => {
                                setLoginEmail(e.target.value);
                                setLoginEmailError(validateEmail(e.target.value));
                            }}
                        />
                        {loginEmailError && <p className="er">{loginEmailError}</p>}

                        <input
                            className="i"
                            id="pwInput"
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => {
                                setLoginPassword(e.target.value);
                                setLoginPasswordError(validatePassword(e.target.value));
                            }}
                        />
                        {loginPasswordError && <p className="er">{loginPasswordError}</p>}


                        <button style={{ backgroundColor: "green" }} onClick={handleLogin}>Log in</button>
                    </>
                ) : (
                    <>
                        <input
                            className="i"
                            id="newEmailInput"
                            type="email"
                            placeholder="Email"
                            value={signUpEmail}
                            onChange={(e) => {
                                setSignUpEmail(e.target.value);
                                setSignUpEmailError(validateEmail(e.target.value));
                            }}
                        />
                        {signUpEmailError && <p className="er">{signUpEmailError}</p>}

                        <input
                            className="i"
                            id="newPwInput"
                            type="password"
                            placeholder="Password"
                            value={signUpPassword}
                            onChange={(e) => {
                                setSignUpPassword(e.target.value);
                                setSignUpPasswordError(validatePassword(e.target.value));
                            }}
                        />
                        {signUpPasswordError && <p className="er">{signUpPasswordError}</p>}

                        <input
                            className="i"
                            id="nameInput"
                            type="text"
                            placeholder="Name"
                            value={signUpName}
                            onChange={(e) => {
                                setSignUpName(e.target.value);
                                setSignUpNameError(e.target.value === '' ? "Name field can't be empty" : '');
                            }}
                        />
                        {signUpNameError && <p className="er">{signUpNameError}</p>}

                        {/*<input
                            className="i"
                            id="ageInput"
                            type="number"
                            placeholder="Age"
                            value={signUpAge}
                            onChange={(e) => {
                                setSignUpAge(e.target.value);
                                setSignUpAgeError(e.target.value === '' ? "Age field can't be empty" : '');
                            }}
                        />
                        {signUpAgeError && <p className="er">{signUpAgeError}</p>}
                        */}

                        <button style={{ backgroundColor: "green" }} onClick={handleSignUp}>Sign Up</button>
                    </>
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
