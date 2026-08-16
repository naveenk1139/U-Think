import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const PASS = process.env.SMTP_PASS || 'lykfvgxnzrpjrxgq'; // fallback to the one in the image

const emailsToTest = [
  'naveenk11398@gmail.com',
  'kirannaveen127@gmail.com',
  'nkiran3020@gmail.com'
];

async function tryLogin(email: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: PASS
    }
  });

  try {
    await transporter.verify();
    return true;
  } catch (err: any) {
    return false;
  }
}

async function run() {
  console.log(`\n🔍 Scanning your known emails to find which one owns the App Password (${PASS.substring(0,4)}...)\n`);
  
  let workingEmail = null;

  for (const email of emailsToTest) {
    console.log(`Testing: ${email} ...`);
    const success = await tryLogin(email);
    if (success) {
      console.log(`✅ SUCCESS! The password belongs to: ${email}`);
      workingEmail = email;
      break;
    } else {
      console.log(`❌ Failed.`);
    }
  }

  if (workingEmail) {
    console.log(`\n🛠️ Updating your .env file automatically...`);
    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace SMTP_USER and SMTP_FROM
    envContent = envContent.replace(/SMTP_USER=.*/g, `SMTP_USER=${workingEmail}`);
    envContent = envContent.replace(/SMTP_FROM=.*/g, `SMTP_FROM=${workingEmail}`);
    
    fs.writeFileSync(envPath, envContent);
    console.log(`✅ .env updated! Restart your backend and it will work perfectly!`);
  } else {
    console.log(`\n❌ ERROR: None of your emails worked with this App Password.`);
    console.log(`This means the password in your screenshot belongs to a DIFFERENT Google account, or Google blocked the login.`);
    console.log(`Please go to https://myaccount.google.com/apppasswords and verify the email in the top right corner!`);
  }
}

run();
