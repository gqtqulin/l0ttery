import { ThemeProvider, TitleBar } from "@react95/core";
import "@react95/icons/icons.css";
import styles from "./App.module.css";
import "./index.css";
import { Doc } from "@react95/icons";
import Login from "./components/Login";
import Game from "./components/Game";
import BlueScreenMode from "./components/BlueScreenMode";
import { useEffect, useState } from "react";
import { getProvider, getAccounts } from "./ethereum/ethereum";
import { useCookies } from "react-cookie";

function App() {
  const [isBlueScreenMode, setIsBlueScreenMode] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(["accountAddress"]);

  //let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  /**
   * Проверять на УЖЕ подключенный аккаунт
   */
  useEffect(() => {
    const checkCookies = async () => {
      const provider = await getProvider();
      const cookiesAddress = cookies.accountAddress;

      if (provider && cookiesAddress) {
        const accounts = await getAccounts();
        if (accounts && accounts[0] === cookiesAddress) {
          setAccountAddress(cookiesAddress);
        } else {
          removeCookies("accountAddress");
        }
      }
    };

    checkCookies();
  }, []);

  return (
    <ThemeProvider theme="brick">
      {isBlueScreenMode ? (
        <BlueScreenMode setIsBlueScreenMode={setIsBlueScreenMode} />
      ) : (
        <div className={styles.page}>
          <div className={styles.titleBarContainer}>
            <TitleBar
              active
              icon={<Doc variant="16x16_4" />}
              className={styles.title}
              title="untitled - l0ttery"
            >
              <TitleBar.OptionsBox>
                <TitleBar.Option>?</TitleBar.Option>
              </TitleBar.OptionsBox>
            </TitleBar>
          </div>
          {accountAddress ? (
            <Game
              accountAddress={accountAddress}
              setAccountAddress={setAccountAddress}
              removeCookies={removeCookies}
              setIsBlueScreenMode={setIsBlueScreenMode}
            />
          ) : (
            <Login
              setAccountAddress={setAccountAddress}
              setCookies={setCookies}
            />
          )}

          <div className={styles.footerContainer}>
            <p>2024</p>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
