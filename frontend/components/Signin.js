import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/SignIn.module.css";
import Image from "next/image";
import { login } from "../reducers/user";
import { useRouter } from "next/router";


function SignIn(props) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter()
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleConnection = () => {
    if (!signInUsername || !signInPassword) {
        setError('Missing or empty field'); // Message d'erreur si des champs sont vides
        return;
      }

    fetch('http://localhost:3000/signin', {
    method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
        username: signInUsername, 
        password: signInPassword, 
      })
    })
    .then(response => response.json())
    .then(data => {
        if(data.result) {
            dispatch(login({ username: signInUsername, token : data.token}))
            setSignInUsername('');
			setSignInPassword('');
            setError('')
            router.push("/tweet")
        } else {
            setError("Invalid email or username"); // Message d'erreur en cas de problème
        }
    })
}

  return (
    <div className={styles.modalSignIn}>
      <button className={styles.SignInCloseButton} onClick={props.closeModal}>
        X
      </button>
      <div className={styles.modalContent}>
        <Image
          src="/logoTwitterBlanc.png"
          alt="Logo Twitter"
          width={60}
          height={50}
        />
        <h1>Connect to Hackatweet</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.modalInputButton}>
          <input
            className={styles.modalInput}
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            className={styles.modalInput}
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button className={styles.modalButton} onClick={() => handleConnection()}>Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
