import { Button, Frame, Input, List } from "@react95/core";
import { FileFind, HelpBook, LoaderBat } from "@react95/icons";
import "@react95/icons/icons.css";
import { useState, useEffect } from "react";
import styles from "./Game.module.css";
import "../index.css";
import { revokePermissions, deposit } from "../ethereum/ethereum";
import { generateRndNumber } from "../util/util";
import DepositMenu from "./DepositMenu";

const Game = ({
  accountAddress,
  setAccountAddress,
  removeCookies,
  setIsBlueScreenMode,
}) => {
  const [range, setRange] = useState(0);
  const [numbers, setNumbers] = useState(`1 3 3 7`);
  const [depositMenu, setVisiableDepositMenu] = useState(false);

  const handleLogoutButton = () => {
    // -- drop cookies & account (state) & revoke permissions (metamask)
    setAccountAddress("");
    removeCookies("accountAddress");
    revokePermissions();
  };

  const handleWithdrawButton = () => {
    setIsBlueScreenMode(true);
  };

  /**
   * run game
   */
  const handleBetButton = () => {
    const rnd = generateRndNumber(10000); // -- минимум 1 число
    // const rnd = String(generateRndNumber(10));
    // console.log(rnd);

    let result = String(rnd);
    let i = 4 - result.length;
    while (i > 0) {
      result = "0" + result;
      i--;
    }
    setNumbers(`${result[0]} ${result[1]} ${result[2]} ${result[3]}`);

    const resultRange = rnd <= 5000 ? 0 : 1;

    // пополнить / убавить баланс на сайте и в блокчейне
  };

  return (
    <div className={styles.gameContainer}>
      {depositMenu ? <DepositMenu /> : <></>}

      <div className={styles.gameFrameContainer}>
        <Frame className={styles.gameFrame}>
          <div className={styles.numbersContainer}>
            <div className={styles.numbers}>{numbers}</div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.optionsContainer}>
              <p
                className={`${styles.range} ${
                  range === 0 ? "text-black" : "text-gray-600"
                }`}
              >
                0000 - 5000
              </p>
              <button
                className={`${styles.option} ${
                  range === 0 ? "text-red-900" : ""
                }`}
                onClick={() => setRange(0)}
              >
                &lt;
              </button>
              <button
                className={`${styles.option} ${
                  range === 1 ? "text-red-900" : ""
                }`}
                onClick={() => setRange(1)}
              >
                &gt;
              </button>
              <p
                className={`${styles.range} ${
                  range === 1 ? "text-black" : "text-gray-600"
                }`}
              >
                5001 - 9999
              </p>
            </div>

            <div className={styles.inputAmountContainer}>
              <Input className={styles.input}></Input>
            </div>

            <Button className={styles.rollButton} onClick={handleBetButton}>
              bet
            </Button>
          </div>
        </Frame>
      </div>

      <div className={styles.userPanelFrameContainer}>
        <Frame className={styles.userPanelFrame}>
          <p className={styles.header}>{accountAddress}</p>
          <div className={styles.userPanelButtonsContainer}>
            <List>
              <List.Item icon={<FileFind variant="32x32_4" />}>deposit</List.Item>
              <List.Item onClick={handleWithdrawButton} icon={<HelpBook variant="32x32_4" />}>withdraw</List.Item>
              <List.Item icon={<LoaderBat variant="32x32_4" />}>
                logout
              </List.Item>
            </List>
          </div>
        </Frame>
      </div>
    </div>
  );
};

export default Game;
