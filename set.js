const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUdaR0xVbHVHMDA2bWlldlVGbGcrRHVJYU1aUm5ZSmdiT3N1eTA3T0xtMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielIzVVQzQXFuTlAzOGc5UHZpSkgvdFZGdDNraFFHZWFyaEdUZ202T2dBcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5R1Q4RDQ3aFZGc3Q4TDM2RVlPNjhrQ2V5UHU1M2RhOVlqNldKNnNjblVVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyMzdBVWdvVXRzejBHM0xVSGV5Vmdjd1BEWHREejFES1RDdEsxYUdHcndFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFPd01NMTJYaHFPRHp4Y1BUeE5aaittZTFuS0l2RWJzUHNPY1JoT0d6MDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9jYTFxL3RoK1NnTkphNFVWZ2lsSE1RdSswOEJ4SWk2eGlLN1QrV3hvRDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUxhNnR2bWlHSDBXTGJBcjVvdG9RM00yYlArRmRKNkJPdmZLZFRFY0hGRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU3BqMkpqbnQ2Q0FJYWVjS21WQmxwNDlTczVra3hweDNmRElSUDQ0OVIyYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inp4b0xFSFg2dkd5N3RIdjY3Tm81UUVjOHlPVmt5eGpQcUZtVmk0ckxLb2NVc1o3M0l2cVJTVkFIanE2dkVxbVZld3lzeC9teXFPY2tTcUVNcWExcmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiJOOVJUczMzZXRtN1JodjIrb0JLVlBPQWJZVThLK3FDbkNVZ3IxMEc2VFdnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjYwMTA1NjA0NzgxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA4OTQ5MTlENUU4RTI3QkMxRUZDNzg2MEVBQTgwM0E0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTYzNjQzMDV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IllvdVFOU2FuVGxPN2J1bEthZ3otcGciLCJwaG9uZUlkIjoiNjdkMWJhNjgtYmM4OS00ODNmLWJmMDctNTUzY2I3MjJiOTliIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjkrVndESU00TENVUmFvTksyYUozSmZBR1pHYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIaHRoVDVvbUlnKy80bnNROFV5RzNFUkhJTDg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTVZDWUpHTUwiLCJtZSI6eyJpZCI6IjYwMTA1NjA0NzgxOjU2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik5hbyBTaGlvbiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFNsenNvRkVJSEl0cklHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiR2JOMXI1K2dNMGNZS245OXA3c3ZITGlqWlRlWmwzYzR0aTdjQlZhMlhoST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY25wOXlKZWp1SklMRUNNRGlCQktTZW5FcWpBblZrcmV5U2dwNDc2VHZiVE1BeG9BbmRNa2MyL0JRa0dySDdWM2xMNVM2a292b2FDZmFsUHgxKzd2QXc9PSIsImRldmljZVNpZ25hdHVyZSI6InhXSVN1UWk0bzkrdjU5T0VoYlUrR3N4UnNhdjRVUUUxaGc5TUN1WFZIRG5jT010dFNON3JRTmRWQ0NGYXYrK09zMk4rRnpjdGRNcWRLRU1hMjRjYmd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNjAxMDU2MDQ3ODE6NTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUm16ZGErZm9ETkhHQ3AvZmFlN0x4eTRvMlUzbVpkM09MWXUzQVZXdGw0UyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNjM2NDMwMSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLczAifQ==',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "Karu Shion",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "60177637943",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

