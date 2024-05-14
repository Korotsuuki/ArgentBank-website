import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../Button/Button.jsx";

/* Variables importées pour l'utilisation redux */
import { useDispatch } from "react-redux";
import { loginUser, infoUser } from "../../redux/loginSlice.js";
import {logUser, getUserProfile } from "../../core/api.js"; /* Import des fonctions API */


function SignIn() {
    /* Initialisation de variables pour le formulaire de connexion */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState("");
    const [erreur, setErreur] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlelogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await logUser(email, password); /* Utilisation de la fonction loginUser */
            const token = userData.body.token;
            await dispatch(loginUser(token));

            if (rememberMe) {
                localStorage.setItem('token', token);
            }

            const userInfo = await getUserProfile(token); /* Utilisation de la fonction getUserProfile */
            const userInfos = {
                email: userInfo.body.email,
                firstName: userInfo.body.firstName,
                lastName: userInfo.body.lastName,
                userName: userInfo.body.userName
            };
            await dispatch(infoUser(userInfos));
            navigate("/user");
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setErreur("Identifiants incorrects");
        }
    };

    const handleRememberMe = (e) => {
        setRememberMe(e.target.checked);
    };

  return (
    <main className="main bg-dark">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handlelogin}>
                <div className="input-wrapper">
                    <label htmlFor="userEmail">User Email</label>
                    <input
                        type="email"
                        id="userEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemple@gmail.com"
                        required 
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-remember">
                    <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                    />
                    <label htmlFor="Remember me"></label>
                </div>
                <Button btnText={"Sign In"} className={"sign-in-button"}/>
            </form>
            {erreur && <p className="errorConnexion">{erreur}</p>}
        </section>
    </main>
  )
}

export default SignIn