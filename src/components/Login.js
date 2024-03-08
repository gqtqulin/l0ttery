import { Button, TitleBar, ThemeProvider } from "@react95/core";
import "@react95/icons/icons.css";
import styles from "./styles/Login.module.css";
import "../index.css";
import { getProvider, getAccounts } from "../ethereum/ethereum";
import Web3 from "web3";

const Login = ({ setAccountAddress, setCookies }) => {
  /**
   * Кнопка захода в аккаунт через METAMASK
   */
  const handleLoginButton = async () => {
    //setIsUserLoggedIn(true);
    const accounts = await getAccounts();

    if (accounts[0]) {
      const account = accounts[0];

      setCookies("accountAddress", account); // -- добавление кукиз
      // sendRequest(...) // --- добавить в blockchain аккаунт
      setAccountAddress(account); // -- устанавливаем стейт
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginTextContainer}>
        <p>metamask account required!</p>
      </div>
      <div className={styles.loginButtonContainer}>
        <Button theme={ThemeProvider.themes} className={styles.loginButton} onClick={handleLoginButton}>
          connect
        </Button>
      </div>
    </div>
  );
};

export default Login;
