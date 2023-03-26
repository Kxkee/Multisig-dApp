"use client";
import { useSigner, useProvider, useAccount } from "wagmi";
import { ethers } from "ethers";
import Multisig from "../../backend/src/artifacts/contracts/MultisigWallet.sol/MultisigWallet.json";
import {useEffect, useState} from "react";
export default function Home() {
    const multisigAddress = '0xdC24a98240877a7B55d4e1d55C2D5175c149e529';
    const { address, isConnected } = useAccount();
    const { data: signer } = useSigner();
    const provider = useProvider();
    const [owners, setOwners] = useState<string[]>();
    const [totalNbWithdraw, setTotalNbWithdraw] = useState<number>();
    const [scBalance, setScBalance] = useState<number>();
    const [amount, setAmount] = useState<string>();
    useEffect(() => {
        getOwners();
        getNbTotalWithdraw();
        getContractBalance();
    }, [])
    const getOwners = async() => {
        try {
            const contract = new ethers.Contract(multisigAddress, Multisig.abi, provider);
            const owners = await contract.getOwners();
            setOwners(owners)
        }catch (err) {
            console.log(err);
        }
    }
    const getNbTotalWithdraw = async() => {
        try {
            const contract = new ethers.Contract(multisigAddress, Multisig.abi, provider);
            const withdrawCount = await contract.getWithdrawTxCount();
            setTotalNbWithdraw(withdrawCount / 10 ** 18);
        }catch(err) {
            console.log(err);
        }
    }
    const getContractBalance = async() => {
        try {
            const contract = new ethers.Contract(multisigAddress, Multisig.abi, provider);
            const balance = await contract.balanceOf();
            setScBalance(balance / 10**18);
        }catch(err) {
            console.log(err)
        }
    }

    const deposit = async() => {
        try {
            const contract = new ethers.Contract(multisigAddress, Multisig.abi, signer);
            const tx = contract.deposit({value: ethers.utils.parseEther(amount)});
        }catch(err) {
            console.log(err);
        }
    }

  return (
    <main>
      <div className="h-[calc(100vh-85px)] flex flex-col justify-start items-center p-10">
          {owners ? (
              <h2>Multisig owners: {owners}</h2>
          ) : null}
              <h2>Total withdraw number: {totalNbWithdraw}</h2>
              <h2>Contract balance: {scBalance}</h2>
          <form>
              <input type="text"
                     placeholder="amount to deposit"
                     className="p-2 rounded text-center mt-10 text-black"
                     onChange={(e) => setAmount(e.target.value)} />
              <button type="button" className="bg-blue-600 p-2 rounded" onClick={deposit}>Deposit</button>
          </form>
      </div>
    </main>
  )
}
