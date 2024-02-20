import { Button, Frame, Input, Alert } from "@react95/core";
import "@react95/icons/icons.css";
import { useState, useEffect } from "react";
import styles from "./DepositMenu.module.css";
import "../index.css";

const DepositMenu = () => {
  const [depositValue, setDepositValue] = useState(0);

  const handleDepositButton = () => {
    //console.log(depositValue);
  };

  return (
    <div className={styles.depositFrameContainer}>
      <Frame className={styles.depositFrame}>
        <Input onChange={(e) => { setDepositValue(e.target.value) }} value={depositValue}></Input>
        <Button onClick={handleDepositButton}></Button>
      </Frame>
    </div>
  );
};

export default DepositMenu;