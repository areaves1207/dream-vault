import { Resend } from 'resend';

export async function sendEmail(destinationAddress, id, token) {
    console.log("Sending email");
    try{
        const verificationURL = `https://www.dreamvault.life/verify-email?id=${id}&token=${token}`
        const htmlbody = `
        <h1>DreamVault - Verify your email</h1>
        <p>Welcome to Dreamvault!</p>
        <a href=${verificationURL}>Click here to verify your email</a>
        <p>This link will expire in 20 minutes.</p>
        `
    
        const resend = new Resend(process.env.RESEND_SECRET);

        resend.emails.send({
        from: 'no-reply@dreamvault.life',
        to: destinationAddress,
        subject: 'Activate your Dreamvault account',
        html: htmlbody
        });
    }
    catch(e){
        console.log("Failed to send email");
    }
}