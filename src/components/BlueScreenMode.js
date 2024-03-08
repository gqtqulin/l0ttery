
import { ProgressBar, Button } from '@react95/core';
import '@react95/icons/icons.css';
import '../index.css';
import styles from './styles/BlueScreenMode.module.css';

const WithdrawMode = ({ setIsBlueScreenMode }) => {

    const handleBackButton = () => {
        setIsBlueScreenMode(false);
    }

    return (<div className={styles.blueScreenContainer}>
        <p>error 404!</p>
        <p>page not found.</p>
        <button onClick={handleBackButton} className={styles.button}>back</button>
    </div>)
}

export default WithdrawMode;