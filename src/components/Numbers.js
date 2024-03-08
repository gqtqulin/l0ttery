import AnimatedNumbers from "react-animated-numbers";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion";
import styles from "./styles/Numbers.module.css";
import { Button } from "@react95/core";
import { generateRndNumber } from "../util/util";
import { useState } from "react";

const Numbers = () => {
    const [numbers, setNumbers] = useState(1337); // -- выпавшие цифры

    /**
     * run game
     */
    const handleBetButton = () => {
        const rnd = generateRndNumber(10000); // -- минимум 1 число
        // const rnd = String(generateRndNumber(10));
        // console.log(rnd);

        // let result = String(rnd);
        // let i = 4 - result.length;
        // while (i > 0) {
        //     result = "0" + result;
        //     i--;
        // }

        setNumbers(rnd);

        const resultRange = rnd <= 5000 ? 0 : 1;

        // пополнить / убавить баланс на сайте и в блокчейне
    };

    return (
        <div className={styles.container}>
            <motion.span
                className={styles.numbers}
                key={numbers} // Ключ должен изменяться при изменении числа для запуска анимации
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {numbers}
            </motion.span>

            <Button className={styles.button} onClick={handleBetButton}>
                bet
            </Button>
        </div>
    );
};

export default Numbers;
