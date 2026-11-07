/**
 * PS4 GoldHEN BinLoader Payload Sender Script
 * Target: Port 9090
 * Description: Sends a payload array/buffer over local loopback (127.0.0.1:9090)
 *              to inject network configuration into GoldHEN on PS4.
 */

async function sendPayloadToPS4Port9090(payloadData) {
    const ps4Ip = "127.0.0.1";
    const port = 9090;

    console.log(`[+] Attempting payload delivery to http://${ps4Ip}:${port}...`);

    try {
        let bodyBuffer = payloadData;
        if (typeof payloadData === 'string') {
            bodyBuffer = new TextEncoder().encode(payloadData);
        }

        const response = await fetch(`http://${ps4Ip}:${port}`, {
            method: 'POST',
            body: bodyBuffer,
            mode: 'no-cors'
        });

        console.log("[+] Payload packet delivered to BinLoader port 9090!");
        return true;
    } catch (err) {
        console.error("[-] Payload delivery failed:", err);
        return false;
    }
}
