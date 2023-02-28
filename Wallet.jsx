import { useState } from "react"
import { ethers } from 'ethers'
import ethLogo from "../assets/ethereum-logo.png"

const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

const Wallet = () => {
    const [accountAddress, setAccountAddress] = useState('')
    const [userBalance, setUserBalance] = useState('')

    const { ethereum } = window

    const handleWalletConnect = () => {
        if(ethereum) {
            provider.send("eth_requestAccounts", [])
            .then(async () => {
                await handleAccountChange(provider.getSigner());
            })
        } else {
            alert("You do not have a Metamask wallet. Install one to proceed")
        }

        const handleAccountChange = async(newAccount) => {
            const address = await newAccount.getAddress()
            setAccountAddress(address)
            const balance = await newAccount.getBalance()
            setUserBalance(ethers.utils.formatEther(balance))
            getUserBalance(address)
        }

        const getUserBalance = async (address) => {
            const balance = await provider.getBalance(address, "latest")
        }
    }

    return (
        <button
               className="btn"
                onClick={handleWalletConnect}>{accountAddress ? "Connected!!!" : "Connect Wallet"}</button>
            <h3 className="account-text">Address: {accountAddress}</h3>
            <h3>User balance: {userBalance}</h3>
        </div>
        
    )
}

export default Wallet
