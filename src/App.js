import { ethers } from "ethers";
import { useEffect, useState, useCallback } from "react";
import { Nav } from "./components/Nav";
import { NavButton } from "./components/NavButton";
import { Page } from "./components/Page";
import { Following } from "./components/Following";
import { TweetsOf } from "./components/TweetsOf";
import { useActiveNavContext } from "./context/ActiveNavContext";
import { useConnectToWalletContext } from "./context/ConnectToWalletContext";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const { activeNav, setActiveNav } = useActiveNavContext();
  const { ethersApi, setEthersApi } = useConnectToWalletContext();

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setEthersApi((prev) => ({
          ...prev,
          provider,
          address,
          signer,
          isConnect: true,
        }));

        console.log("Connected to wallet:", address);
      } catch (error) {
        console.error("Failed to connect to the wallet:", error);
        alert("Failed to connect. Please check your wallet and try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  }, [setEthersApi]);

  useEffect(() => {
    if (window.ethereum && !ethersApi.isConnect) {
      connectWallet();
      window.ethereum.on("accountsChanged", () => {
        connectWallet();
      });
    }
  }, [connectWallet, ethersApi.isConnect]);

  return (
    <div className="App w-full h-full flex flex-row">
      <Nav addressOf={ethersApi?.address} />
      {activeNav && (
        <NavButton activeNav={activeNav} setActiveNav={setActiveNav} />
      )}
      <header className="App-header w-full h-full">
        <Routes>
          <Route path="/" element={<Page />} />
          {!activeNav && <Route path="/tweets" element={<TweetsOf />} />}
          <Route path="/following" element={<Following />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
