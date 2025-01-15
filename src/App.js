import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { NavButton } from "./components/NavButton";
import { Page } from "./components/Page";
import { useActiveNavContext } from "./context/ActiveNavContext";
import { useConnectToWalletContext } from "./context/ConnectToWalletContext";

function App() {
  const { activeNav, setActiveNav } = useActiveNavContext();
  const { ethersApi, setEthersApi } = useConnectToWalletContext();
  const [isApproved, setIsApproved] = useState(false);

  const isApprovalValid = (timestamp) => {
    const currentTime = new Date().getTime();
    const approvalTime = new Date(timestamp).getTime();
    const diffInMilliseconds = currentTime - approvalTime;
    return diffInMilliseconds <= 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
  };

  const ConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setEthersApi({
          provider: provider,
          address: address,
          signer: signer,
          signMessage: null,
          isConnect: true,
          isSigned: false,
        });

        console.log("Connected to wallet:", address);
      } catch (error) {
        console.error("Failed to connect to the wallet: ", error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const signMessage = async () => {
    if (!ethersApi.address) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const message = `Authorize interaction with the Twitter project. Address: ${ethersApi.address}`;

      const signature = await signer.signMessage(message);

      setEthersApi((prevState) => ({
        ...prevState,
        signMessage: signature,
        isSigned: true,
      }));

      console.log("Message signed:", signature);
    } catch (error) {
      console.error("Failed to sign message: ", error);
    }
  };

  useEffect(() => {
    ConnectWallet();
  }, []);

  useEffect(() => {
    const storedTimestamp = localStorage.getItem("approvalTimestamp");
    if (storedTimestamp && isApprovalValid(storedTimestamp)) {
      setIsApproved(true);
    }
  }, []);

  return (
    <div className="App w-full h-full flex flex-row">
      <Nav addressOf={ethersApi.address} />
      <NavButton activeNav={activeNav} setActiveNav={setActiveNav} />
      <header className="App-header w-full h-full">
        <Page
          signMessage={signMessage}
          isApproved={isApproved}
          setIsApproved={setIsApproved}
          isApprovalValid={isApprovalValid}
        />
      </header>
    </div>
  );
}

export default App;
