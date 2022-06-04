import React, { useEffect, useState } from 'react';
import './App.css';
import CandyMachine from './CandyMachine';


const App = () => {

  const [walletAddress, setWalletAddress] = useState(null)

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window
      if (solana && solana.isPhantom) {
        console.log("Phantom wallet found!")

        const response = await solana.connect({onlyIfTrusted: true})
        console.log('Connected with Public Key', response.publicKey.toString())
        setWalletAddress(response.publicKey.toString())
      }
      else {
        alert("solana oblject nof found! get a phantom wallet 👻")
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    const {solana} = window
    if(solana) {
      const response = await solana.connect()
      console.log('Connected with public Key', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  const renderNotConnectedContainer = () => (
    <button className = 'cta-button connect-wallet-button' onClick={connectWallet}>
      Connect to Wallet
    </button>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])
  return (
    <div className="App">
      <div className="container">
        <div className="header-container xl:w-1/2">
          <p className="header">Underground Society</p>
          <p className="sub-text text-red-500">solana NFT</p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && <CandyMachine walletAddress={window.solana} />}
        </div>
      </div>
    </div>
  );
};

export default App;
