const nedb = require('nedb-promise');
const database = new nedb({ filename: 'accounts.db', autoload: true });

/** Databas - hur ska den se ut (datamodellering)? 
 * 
 * Vad är databasen till för? Dess syfte?
 * Vi vill kunna spara konto och logga in, hanterna användarkonton
 * 
 * Vad vill vi spara för data?
 * Användarnamn, lösenord och e-post
 * 
 * Vad är det för typ av data vi vill spara (datatyper)?
 * Objekt med strängar
 * 
 * Ex: {
 *    username: String,
 *    email: String,
 *    password: String
 * }
 * */

async function createAccount(account) {
    const result = await database.insert(account);
    return result;
}

async function compareCredentials(credentials) {
    const result = await database.find(
        { $and: [{ username: credentials.username }, { password: credentials.password }] });
    return result;
}

async function checkIfAccountsExists(credentials) {
    const result = await database.find({ $or: [{ username: credentials.username }, 
        { email: credentials.email }] });
    return result;
}

module.exports = { createAccount, compareCredentials, checkIfAccountsExists };