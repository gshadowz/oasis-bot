import { readToken, delay } from "./utils/file.js";
import { createConnection } from "./utils/websocket.js";
import { showBanner } from "./utils/banner.js";

async function start() {
    showBanner();
    const tokens = await readToken("providers.txt");
    const proxies = await readToken("proxy.txt");

    if (proxies.length < tokens.length) {
        logger("No Proxy Found - Running Without Proxy...", "", "warn");
    }

    // Create connections with 1 proxy per token
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const proxy = proxies[i % proxies.length] || null; 

        await createConnection(token, proxy);
        await delay(1000);
    }
}

start();
