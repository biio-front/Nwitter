import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons"
import 'css/Auth.css';

const Auth = () => {
    const onSocialClick = async e => {
        const { target: { name } } = e;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }
    return (
        <>
            <div className="authContainer">
                <FontAwesomeIcon
                    icon={faTwitter}
                    color="#04AAFF"
                    size="3x"
                />
                <AuthForm />
                <div className="authBtns">
                    <button onClick={onSocialClick} name="google" className="authBtn">
                        Continue with Google <FontAwesomeIcon icon={faGoogle} />
                    </button>
                    <button onClick={onSocialClick} name="github" className="authBtn">
                        Continue with Github <FontAwesomeIcon icon={faGithub} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Auth;