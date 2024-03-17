const { MongoClient } = require('mongodb');
const { DB_CONNECTION_STRING } = process.env;
const crypto = require('crypto');
const client = new MongoClient(DB_CONNECTION_STRING);
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

async function databaseConnect() {
    await client.connect();
    const database = client.db('bank');
    return database.collection('usersLogin');
}

module.exports = {
    async createUser(req, res) {
        try {
            const { username, password } = req.body;

            if (!username) return res.status(400).json({ message: 'Usuário não informado' });
            if (username.length < 3) return res.status(400).json({ message: 'Nome de usuário deve ter no mínimo 3 caracteres' });
            if (!password) return res.status(400).json({ message: 'Senha não informada' });
            if (!Number(password)) return res.status(400).json({ message: 'Senha deve conter apenas números' });
            if (password.length !== 5) return res.status(400).json({ message: 'Senha deve conter 5 números' });

            const collection = await databaseConnect();

            let bankId = Math.floor(Math.random() * 10000);
            const bankIdExists = await collection.findOne({ bankId });

            if (bankIdExists) this.createUser(req, res);

            const userExists = await collection.findOne({ username });
            if (userExists) return res.status(409).json({ message: 'Usuário já cadastrado' });

            const { iv, encryptedData } = encrypt(password)
            await collection.insertOne({ username, bankId, password: { encrypted: encryptedData, iv, key } });

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        } finally {
            await client.close();
        }
    },

    async getUser(req, res) {
        try {
            const { username } = req.params;

            const collection = await databaseConnect();
            const user = await collection.findOne({ username });

            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar usuário' });
        } finally {
            await client.close();
        }
    },

    async getUserBankKeyboard(req, res) {
        try {
            const { username } = req.params;

            const collection = await databaseConnect();
            const user = await collection.findOne({ username });

            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

            const keyboard = []
            const takenNumbers = [];
            const keyboardNumbers = generateKeyboardConditions(takenNumbers, keyboard);

            await collection.update({ username }, { $set: { lastKeyboardNumbers: keyboardNumbers } })

            return res.status(200).json({ keyboardNumbers });
        } catch (error) {
            console.error(error);
        } finally {
            await client.close();
        }
    },

    async checkUserPassword(req, res) {
        try {
            const { username, passwordKeyboard } = req.body;

            const collection = await databaseConnect();
            const user = await collection.findOne({
                username
            });

            const decryptedPassword = decrypt({ iv: user.password.iv, encryptedData: user.password.encrypted, key  });

            console.log('Senha desencriptada: ', decryptedPassword);

            return res.status(200).json({ decryptedPassword });
        } catch (error) {
            console.error(error);
        } finally {
            await client.close();
        }
    }
}

function generateKeyboardConditions(takenNumbers, keyboard) {
    if (keyboard.length === 5) return keyboard;

    let firstRandomNumber = Math.floor(Math.random() * 10)
    let secondRandomNumber = Math.floor(Math.random() * 10)

    if (takenNumbers.includes(firstRandomNumber) || takenNumbers.includes(secondRandomNumber) || firstRandomNumber === secondRandomNumber) {
        return generateKeyboardConditions(takenNumbers, keyboard);
    }

    const sortedNumbers = [firstRandomNumber, secondRandomNumber].sort((a, b) => a - b);

    keyboard.push({ values: sortedNumbers });
    takenNumbers.push(firstRandomNumber, secondRandomNumber);

    return generateKeyboardConditions(takenNumbers, keyboard);
}

function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(data) {
    let ivBuffer = Buffer.from(data.iv, 'hex');
    let encryptedText = Buffer.from(data.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(data.key), ivBuffer);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}