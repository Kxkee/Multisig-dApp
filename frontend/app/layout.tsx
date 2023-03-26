"use client";
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Header from "@/components/Header";

const { chains, provider } = configureChains(
    [sepolia],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
            <div className="bg-gray-900 h-screen text-white">
                <Header />
                {children}
            </div>
        </RainbowKitProvider>
      </WagmiConfig>
      </body>
    </html>
  )
}
