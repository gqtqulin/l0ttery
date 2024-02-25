import Web3, { validator } from "web3";

const contractAddress = "0xE436197f79C4f40CE9221861C2DF9e8A5F045Eac";
const contractABI = [
    {
        inputs: [],
        name: "receivePayment",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "sendPayment",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "getAccountBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);

/**
 *
 * @returns {Object} провайдер window.ethereum
 */
export const getProvider = async () => {
    try {
        return await window.ethereum;
    } catch (e) {
        console.error(e);
    }
};

/**
 * Список акков
 * @returns {Array}
 */
export const getAccounts = async () => {
    try {
        const accounts = await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log("Please connect to MetaMask.");
                } else {
                    console.error(err);
                }
            });

        return accounts;
    } catch (e) {
        console.error(e);
    }
};

/**
 * Выдает текущий баланс пользователя
 */
export const getBalance = async () => {};

export const revokePermissions = async () => {
    await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [
            {
                eth_accounts: {},
            },
        ],
    });
};

/**
 * Пополнить баланс
 */
export const deposit = async (accountAddress, amount, isTest = false) => {
    window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
            {
                from: accountAddress,
                to: contractAddress,
                value: amount,
                // Customizable by the user during MetaMask confirmation.
                gasLimit: "0x5028",
                // Customizable by the user during MetaMask confirmation.
                maxPriorityFeePerGas: "0x3b9aca00",
                // Customizable by the user during MetaMask confirmation.
                maxFeePerGas: "0x2540be400",
            },
        ],
    });
};
