import '../styles/globals.css'
import {WagmiConfig, createClient} from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

const client = createClient(
    getDefaultClient({
        autoConnect: true,
        appName: 'Header Next.js demo',
        chains: [goerli, mainnet],
    })
);

function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={client}>
            <ConnectKitProvider
                theme="rounded"
                customTheme={"monospace"}
            >
                <Component {...pageProps} />
            </ConnectKitProvider>
        </WagmiConfig>

    )
}

export default MyApp
