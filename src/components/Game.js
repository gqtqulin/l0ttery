import { Input, Range } from "@react95/core";
import win95 from "@react95/core/cjs/ThemeProvider/themes";
import "@react95/icons/icons.css";
import { useState, useEffect } from "react";
import styles from "./styles/Game.module.css";
import "../index.css";
import Numbers from "./Numbers";
import Shortcuts from "./Shortcuts";

const Game = ({
    accountAddress,
    setAccountAddress,
    removeCookies,
    setIsBlueScreenMode,
}) => {
    const [range, setRange] = useState(500); // -- число от 0 до 1000 - отображает где пользователь поставил ползунок
    const [displayRange, setDisplayRange] = useState(500);
    const [pointer, setPointer] = useState(0); // -- выбор пользователя больше или меньше в диапазоне
    const [amount, setAmount] = useState(0); // -- $$$ на сколько ставим
    const [balance, setBalance] = useState(0.0); // -- баланс пользователя на сайте
    const [coefficient, setCoefficient] = useState(1.0);

    useEffect(() => {
        const updateCoefficient = () => {
            let val;

            if (pointer === 0) {
                val = range;
            } else if (pointer === 1) {
                val = 1000 - range;
            }

            val = parseFloat((10 - val / 100) / 2.5);
            if (val < 1.1) val = 1.1;
            val = val.toFixed(2);

            setCoefficient(val);
        };

        const updateDisplayRange = () => {
            let val;

            if (pointer === 0) {
                val = range;
            } else if (pointer === 1) {
                val = 1000 - range;
            }

            setDisplayRange(val);
        };

        updateCoefficient();
        updateDisplayRange();
    }, [range, pointer]);

    const handleChangeRange = (e) => {
        setRange(10 * parseInt(e.target.value));
    };

    const handleLeftPointerButton = () => {
        setPointer(0);
    };

    const handleRightPointerButton = () => {
        setPointer(1);
    };

    return (
        <div className={styles.gameContainer}>
            <div className={styles.gameFrameContainer}>
                <div className={styles.userPanelButtonsContainer}>
                    <div className={styles.inputAmountContainer}>
                        <Input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className={styles.input}
                            theme={win95}
                        ></Input>
                    </div>
                    <div className={styles.optionsContainer}>
                        <p>
                            {coefficient}x / {range}
                        </p>
                        <div className={styles.optionsButtonContainer}>
                            <button
                                onClick={handleLeftPointerButton}
                                className={`${styles.option} ${
                                    pointer === 0 ? "text-winRed" : ""
                                }`}
                            >
                                &gt;
                            </button>
                            <Range
                                style={{
                                    width: 100,
                                }}
                                className={styles.range}
                                onChange={handleChangeRange}
                            />
                            <button
                                onClick={handleRightPointerButton}
                                className={`${styles.option} ${
                                    pointer === 1 ? "text-winRed" : ""
                                }`}
                            >
                                &lt;
                            </button>
                        </div>
                    </div>
                </div>

                <Numbers />

                <Shortcuts balance={balance} setBalance={setBalance} />
            </div>
        </div>
    );
};

export default Game;
