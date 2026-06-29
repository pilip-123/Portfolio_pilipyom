const nodemailer = require('nodemailer');

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
            message: 'Contact endpoint is running. Use POST to send messages.'
        });
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'GET,POST,OPTIONS');
        return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const recipientEmail = process.env.RECIPIENT_EMAIL || gmailUser;

    if (!gmailUser || !gmailPass) {
        return res.status(500).json({
            ok: false,
            error: 'Server is missing email configuration'
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

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailUser,
            pass: gmailPass
        }
    });

    const mailOptions = {
        from: `"${name}" <${gmailUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #f8fafc; border-radius: 12px;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <h2 style="color: #6366f1; margin: 0;">New Message from Portfolio</h2>
                    <p style="color: #64748b; font-size: 14px;">Someone filled out your contact form</p>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px; background: #fff; border-radius: 8px 8px 0 0;">
                            <strong style="color: #334155;">Name:</strong>
                            <p style="margin: 4px 0 0; color: #0f172a;">${name}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; background: #fff; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #334155;">Email:</strong>
                            <p style="margin: 4px 0 0; color: #0f172a;">
                                <a href="mailto:${email}" style="color: #6366f1;">${email}</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; background: #fff; border-top: 1px solid #e2e8f0;">
                            <strong style="color: #334155;">Subject:</strong>
                            <p style="margin: 4px 0 0; color: #0f172a;">${subject}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; background: #fff; border-top: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
                            <strong style="color: #334155;">Message:</strong>
                            <p style="margin: 8px 0 0; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </td>
                    </tr>
                </table>
                <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 24px;">Sent from your portfolio website</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ ok: true });
    } catch (_error) {
        return res.status(500).json({
            ok: false,
            error: 'Unable to send message right now'
        });
    }
};
