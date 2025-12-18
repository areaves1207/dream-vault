import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: "us-west-2",
});

export async function sendEmail(destinationAddress, token) { //https://www.dreamvault.life
    const verificationURL = `http://localhost:5173/verify-email?token=${token}`
    const htmlbody = `<h1>DreamVault - Verify your email</h1><p>Welcome to DreamVault!</p><a href=${verificationURL}>Click here to verify your email</a>`
    
    const params = {
        Source: "no-reply@dreamvault.life",
        Destination: {
        ToAddresses: [destinationAddress],
        },
        Message: {
        Subject: {
            Data: "Verify your email with DreamVault",
            Charset: "UTF-8",
        },
        Body: {
            Text: {
            Data: "This is an email from DreamVault.",
            Charset: "UTF-8",
            },
            Html: {
            Data: htmlbody,
            Charset: "UTF-8",
            },
        },
        },
    };

    try {
        const result = await ses.send(new SendEmailCommand(params));
        console.log("Email sent:", result.MessageId);
    } catch (err) {
        console.error("SES error:", err);
        throw err;
    }
}
