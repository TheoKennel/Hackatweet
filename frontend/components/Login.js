import styles from "../styles/Login.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import SignIn from "./Signin";
import SignUp from "./Signup";
import { login } from "../reducers/user";
import Home from "./Home"

function Login() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const user = useSelector((state) => state.user.value);
  const router = useRouter()


    useEffect(() => {
      if (user.token) {
         router.push("/home"); // Redirection vers la page Home si un token est présent
     }
    }, [user]);

  const openSignUpModal = () => {
    setShowSignUpModal(true);
    // Pour ne pas ouvrir les deux modals en même temps
    setShowSignInModal(false)
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
    setShowSignUpModal(false)
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  return (
    <div className={styles.main_loginPage}>
      <div className={styles.imageLoginPage}>
      {user.token ? <Home /> : <Login />}
        <img src="/background_gauche_loginTwitter.png" />
        <div className={styles.logoContainer}>
          <Image
            src="/logoTwitterBlanc.png"
            alt="Logo Twitter"
            width={400}
            height={300}
          />
        </div>
      </div>
      <div className={styles.rightContent}>
        <div className={styles.rightLogoTop}>
          <Image
            src="/logoTwitterBlanc.png"
            alt="Logo Twitter"
            width={60}
            height={50}
          />
        </div>
        <div className={styles.rightTitre}>
          <h1>
            See what's <br />
            happening
          </h1>
        </div>
        <div className={styles.rightTexte}>
          <h3>Join Hackatweet today.</h3>
        </div>
        <div className={styles.rightButton}>
          <button className={styles.rightButtonUp} onClick={openSignUpModal}>Sign up</button>
          {showSignUpModal && (
            <SignUp closeModal={closeSignUpModal} />
          )}
          <p>Already have an account?</p>
          <button className={styles.rightButtonIn} onClick={openSignInModal}>
            Sign in
          </button>
          {showSignInModal && (
            <div className={styles.modal}>
              <SignIn closeModal={closeSignInModal} />
            </div>
          )}
        </div>
        {/* Contenu à droite */}
      </div>
    </div>
  );
}

export default Login;
