import { ModalContext, Frame, List, Button } from "@react95/core";
import { FileFind, HelpBook, LoaderBat } from "@react95/icons";
import { revokePermissions, deposit } from "../ethereum/ethereum";
import { useState } from "react";
import styles from "./MyTaskBar.module.css";

const MyTaskBar = ({
    setAccountAddress,
    removeCookies,
    setIsBlueScreenMode,
}) => {
    const [showList, toggleShowList] = useState(false);
    //const [activeStart, toggleActiveStart] = useState(false);

    const handleWithdrawButton = () => {
        setIsBlueScreenMode(true);
    };

    const handleLoginButton = () => {

    }

    const handleLogoutButton = () => {
        // -- drop cookies & account (state) & revoke permissions (metamask)
        setAccountAddress("");
        removeCookies("accountAddress");
        revokePermissions();
    };

    const handleDepositButton = () => {};

    return (
        <div className={styles.mainContainer}>
            {showList ? (
                <div className={styles.listContainer}>
                    <List className={styles.list} width="200px">
                        <List.Item
                            onClick={handleLoginButton}
                            icon={<LoaderBat variant="32x32_4" />}
                            className={styles.listItem}
                            disabled={true}
                        >
                            login
                        </List.Item>
                        <List.Item
                            onClick={handleLogoutButton}
                            icon={<LoaderBat variant="32x32_4" />}
                        >
                            logout
                        </List.Item>
                        <List.Item
                            onClick={handleDepositButton}
                            icon={<FileFind variant="32x32_4" />}
                        >
                            deposit
                        </List.Item>
                        <List.Item
                            onClick={handleWithdrawButton}
                            icon={<HelpBook variant="32x32_4" />}
                        >
                            withdraw
                        </List.Item>
                    </List>
                </div>
            ) : (
                <></>
            )}

            <div>
                <Button
                    className={styles.menuButton}
                    onClick={() => toggleShowList(!showList)}
                >
                    Menu
                </Button>
            </div>
        </div>
    );
};

export default MyTaskBar;
