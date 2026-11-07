/**
 * Fixed PS4 GoldHEN Payload Sender (Port 9090)
 * Uses a form-submission bypass to prevent HTTPS/HTTP Mixed Content blocking.
 */

async function sendPayloadToPS4Port9090(payloadData) {
    const ps4Ip = "127.0.0.1";
    const port = 9090;
    const targetUrl = `http://${ps4Ip}:${port}`;

    console.log(`[+] Dispatching payload to ${targetUrl}...`);

    try {
        // Convert input data to string/blob
        let payloadString = payloadData;
        if (payloadData instanceof ArrayBuffer || payloadData instanceof Uint8Array) {
            payloadString = new TextDecoder().decode(payloadData);
        }

        // Create a hidden form to bypass CORS/Mixed Content restrictions on PS4 browser
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

        console.log("[+] Payload dispatch triggered successfully!");
        return true;
    } catch (err) {
        console.error("[-] Payload dispatch failed:", err);
        return false;
    }
}
