import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../actions/user";
import Panel from "../components/Panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import styles from "../components/Form.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  return (
    <Panel className={styles.form}>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(logIn({ username, password }))
            .then(() => {
              history.push('/')
            })
            .catch(() => {
              setError('Username & password dont match')
            })
        }}
      >
        <h1>Login to access GM mode</h1>
        {
          error && <div className={styles.formError} >{error}</div>
        }
        <div className={styles.formBlock}>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={(e=> setUsername(e.target.value))}/>
          <br />
        </div>
        <div className={styles.formBlock}>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e=> setPassword(e.target.value))}/>
        </div>

        <div className={styles.actions}>
          <button type="submit">
            <FontAwesomeIcon icon={faKey} /> Log in
          </button>
        </div>
      </form>
    </Panel>
  );
}
