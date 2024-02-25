import { Button, Frame, Input, List, Range } from "@react95/core";
import "@react95/icons/icons.css";
import { useState, useEffect } from "react";
import styles from "./Game.module.css";
import "../index.css";
import { revokePermissions, deposit } from "../ethereum/ethereum";
import { generateRndNumber } from "../util/util";

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
    const [numbers, setNumbers] = useState(`1337`); // -- выпавшие цифры
    const [balance, setBalance] = useState(0.0); // -- баланс пользователя на сайте
    const [coefficient, setCoefficient] = useState(1.0);

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
    }

    useEffect(() => {
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
        setNumbers(`${result[0]}${result[1]}${result[2]}${result[3]}`);

        const resultRange = rnd <= 5000 ? 0 : 1;

        // пополнить / убавить баланс на сайте и в блокчейне
    };

    return (
        <div className={styles.gameContainer}>
            <div className={styles.gameFrameContainer}>
                <Frame className={styles.gameFrame} bg="#286061">
                    <div className={styles.userPanelButtonsContainer}>
                        <div className={styles.inputAmountContainer}>
                            <Input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={styles.input}
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

                    <div className={styles.numbersContainer}>
                        <div className={styles.numbers}>{numbers}</div>
                        <Button
                            className={styles.rollButton}
                            onClick={handleBetButton}
                        >
                            bet
                        </Button>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.buttonsAmountContainer}>
                            <Button
                                className={styles.amountButton}
                                onClick={() => setAmount(0)}
                            >
                                zero
                            </Button>
                            <Button
                                className={styles.amountButton}
                                onClick={() => setAmount(balance / 3)}
                            >
                                33%
                            </Button>
                        </div>
                        <div className={styles.buttonsAmountContainer}>
                            <Button
                                className={styles.amountButton}
                                onClick={() => setAmount(balance)}
                            >
                                all in
                            </Button>
                            <Button
                                className={styles.amountButton}
                                onClick={() => setAmount(balance / 2)}
                            >
                                50%
                            </Button>
                        </div>
                    </div>
                </Frame>
            </div>
        </div>
    );
};

export default Game;
