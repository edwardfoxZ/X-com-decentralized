import React, { createContext, useContext, useState } from "react";

const ConnectToWalletContext = createContext();

export const ConnectToWalletProvider = ({ children }) => {
  const [ethersApi, setEthersApi] = useState({
    provider: null,
    address: null,
    signer: null,
    signedMessage: null,
    isConnect: false,
    isSigned: false,
  });

  return (
    <ConnectToWalletContext.Provider value={{ ethersApi, setEthersApi }}>
      {children}
    </ConnectToWalletContext.Provider>
  );
};

export const useConnectToWalletContext = () =>
  useContext(ConnectToWalletContext);
