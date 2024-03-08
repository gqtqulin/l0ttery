import { useState } from "react";
import { Button, Dropdown, Checkbox } from "@react95/core";

const Alert = () => {
    const [showAlert, toggleShowAlert] = useState(true);
    const [withSound, toggleWithSound] = useState(false);
    const [type, setType] = useState("error");
    const handleCloseAlert = () => toggleShowAlert(false);

    return (
        <div>
            {showAlert && (
                <Alert
                    title="Windows Networking"
                    type={type}
                    message="The Windows password you typed is incorrect."
                    closeAlert={handleCloseAlert}
                    hasSound={withSound}
                    buttons={[
                        {
                            value: "OK",
                            onClick: handleCloseAlert,
                        },
                    ]}
                />
            )}
        </div>
    );
};

export default Alert;
