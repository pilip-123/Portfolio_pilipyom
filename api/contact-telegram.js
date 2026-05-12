module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    if (req.method === 'GET') {
        return res.status(200).json({
            ok: true,
            message: 'Contact Telegram endpoint is running. Use POST to send messages.'
        });
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'GET,POST,OPTIONS');
        return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return res.status(500).json({
            ok: false,
            error: 'Server is missing Telegram configuration'
        });
    }

    let payload = req.body;
    if (typeof payload === 'string') {
        try {
            payload = JSON.parse(payload);
        } catch (_error) {
            return res.status(400).json({ ok: false, error: 'Invalid JSON payload' });
        }
    }

    const name = (payload?.name || '').toString().trim();
    const email = (payload?.email || '').toString().trim();
    const subject = (payload?.subject || '').toString().trim();
    const message = (payload?.message || '').toString().trim();

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ ok: false, error: 'All fields are required' });
    }

    const text = [
        'New portfolio contact message',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        'Message:',
        message
    ].join('\n');

    try {
        const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text
            })
        });

        const telegramJson = await telegramResponse.json();

        if (!telegramResponse.ok || !telegramJson.ok) {
            return res.status(502).json({
                ok: false,
                error: 'Telegram API request failed'
            });
        }

        return res.status(200).json({ ok: true });
    } catch (_error) {
        return res.status(500).json({
            ok: false,
            error: 'Unable to send message right now'
        });
    }
};
