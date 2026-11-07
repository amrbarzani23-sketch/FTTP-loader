/**
 * PS4 GoldHEN Payload Sender Script
 * Target IP: 192.168.1.11
 * Target Port: 9090
 */

async function sendPayloadToPS4Port9090(payloadData) {
    const ps4Ip = "192.168.1.11";
    const port = 9090;
    const targetUrl = `http://${ps4Ip}:${port}`;

    console.log(`[+] Dispatching payload to ${targetUrl}...`);

    try {
        let payloadString = payloadData;
        if (payloadData instanceof ArrayBuffer || payloadData instanceof Uint8Array) {
            payloadString = new TextDecoder().decode(payloadData);
        }

        // Use form submission to bypass browser CORS / mixed-content restrictions
        const form = document.createElement('form');
        form.action = targetUrl;
        form.method = 'POST';
        form.style.display = 'none';

        const textarea = document.createElement('textarea');
        textarea.name = 'payload';
        textarea.value = payloadString;
        form.appendChild(textarea);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        console.log("[+] Payload sent to PS4 at 192.168.1.11:9090!");
        return true;
    } catch (err) {
        console.error("[-] Payload delivery failed:", err);
        return false;
    }
}
