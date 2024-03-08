import { useRef } from "react";
import { Fieldset, Checkbox } from "@react95/core";
import styles from "./styles/Shortcuts.module.css";

const Shortcuts = ({ balance, setBalance }) => {
    const shortcut1 = useRef();
    const shortcut2 = useRef();
    const shortcut3 = useRef();
    const shortcut4 = useRef();
    const shortcut5 = useRef();
    const shortcuts = [shortcut1, shortcut2, shortcut3, shortcut4, shortcut5];

    const handleShortcutCheckbox = (val) => {
        console.log(`shortcut: ${val}%`);

        let betAmount;
        switch (val) {
            case "33":
                betAmount = balance * 0.33;
                break;
            case "50":
                betAmount = balance * 0.5;
                break;
            case "66":
                betAmount = balance * 0.66;
                break;
            case "100":
                betAmount = balance;
                break;
            default:
                betAmount = 0;
        }

        setBalance(betAmount);

        setTimeout(() => {
            if (shortcuts && shortcuts.length) {
                shortcuts.forEach((ref) => ref.current.checked = false);
            }
        }, 300);
    };

    return (
        <div>
            <Fieldset
                legend="shortcuts"
                className={styles.fieldset}
            >
                <Checkbox
                    onClick={() => handleShortcutCheckbox("0")}
                    ref={shortcut1}
                >
                    0%
                </Checkbox>
                <Checkbox
                    onClick={() => handleShortcutCheckbox("33")}
                    ref={shortcut2}
                >
                    33%
                </Checkbox>
                <Checkbox
                    onClick={() => handleShortcutCheckbox("50")}
                    ref={shortcut3}
                >
                    50%
                </Checkbox>
                <Checkbox
                    onClick={() => handleShortcutCheckbox("66")}
                    ref={shortcut4}
                >
                    66%
                </Checkbox>
                <Checkbox
                    onClick={() => handleShortcutCheckbox("100")}
                    ref={shortcut5}
                >
                    100%
                </Checkbox>
            </Fieldset>
        </div>
    );
};

export default Shortcuts;
