import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { AuthAdapter } from "@web3auth/auth-adapter";
import { useEffect, useState } from "react";
import { FloatingInbox } from "./FloatingInbox";
import { ethers, JsonRpcSigner } from "ethers";

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

declare global {
  interface Window {
    FloatingInbox: {
      open: () => void;
      close: () => void;
    }
  }
}

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const authAdapter = new AuthAdapter();
web3auth.configureAdapter(authAdapter);

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [wallet, setWallet] = useState<any | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      if (web3auth.connected) {
        const address = await getAccounts();
        setAddress(address);
        const wallet = await getWallet();
        setWallet(wallet);
      }
    }
    getDetails();
  }, [provider, loggedIn]);

  const login = async () => {
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "google",
    });
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getWallet = async (): Promise<JsonRpcSigner | null> => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return null;
    }
    const ethersProvider = new ethers.BrowserProvider(provider);

    return ethersProvider.getSigner();
  }

  const getAccounts = async (): Promise<any> => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = signer.getAddress();

      return await address;
    } catch (error) {
      return error;
    }
  }

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setWallet(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Volt</h1>
      
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            loggedIn
              ? "bg-green-500 text-white cursor-default"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={login}
          disabled={loggedIn}
        >
          {loggedIn ? "Connected" : "Login with Google"}
        </button>
        {loggedIn && (
          <button
            className="px-4 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>

      {address && <h3 className="text-lg mb-6">{address}</h3>}

      {loggedIn && (
        <>
          <section className="flex space-x-4 mb-6">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={() => window.FloatingInbox.open()}
            >
              Open
            </button>
            <button
              className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={() => window.FloatingInbox.close()}
            >
              Close
            </button>
          </section>
          <FloatingInbox wallet={wallet} onLogout={logout} />
        </>
      )}


    </div>
  );
}

export default App;
