"use client";
import {ConnectButton} from "@rainbow-me/rainbowkit";

export default function Header() {
    return(
        <div className="h-[85px] flex justify-between items-center pr-10 pl-10">
            <h1 className="text-4xl font-bold">Multisig Wallet</h1>
            <ConnectButton />
        </div>
    )
}