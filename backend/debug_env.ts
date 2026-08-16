import dotenv from 'dotenv';
dotenv.config();

console.log("--- ENV DEBUG ---");
console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
console.log(`SMTP_USER: ${process.env.SMTP_USER}`);
// Print password length to verify without printing the actual secret in case it logs somewhere public
console.log(`SMTP_PASS length: ${process.env.SMTP_PASS?.length}`);
// Actually let's just print the first 4 chars to make 100% sure it's the right one
console.log(`SMTP_PASS start: ${process.env.SMTP_PASS?.substring(0, 4)}`);
