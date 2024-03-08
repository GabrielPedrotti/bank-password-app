const { MongoClient } = require('mongodb');
const { DB_CONNECTION_STRING } = process.env;
const client = new MongoClient(DB_CONNECTION_STRING);

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

            await collection.insertOne({ username, bankId, password });

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

            return res.status(200).json({ keyboardNumbers });
        } catch (error) {
            console.error(error);
        } finally {
            await client.close();
        }
    }
}

function generateKeyboardConditions(takenNumbers, keyboard) {]
    // entender pq as vezes repete o nro mesmo validando...
    if (keyboard.length === 5) return keyboard;

    let firstRandomNumber = Math.floor(Math.random() * 10)
    let secondRandomNumber = Math.floor(Math.random() * 10)

    console.log('Numeros pegos: ', takenNumbers)
    console.log('Primeiro numero gerado: ', firstRandomNumber)
    console.log('Segundo numero gerado: ', secondRandomNumber)
    console.log('Teclado oficial: ', keyboard)

    if (takenNumbers.includes(firstRandomNumber) || takenNumbers.includes(secondRandomNumber)) {
        console.log('Um dos números ja foi pego, gerando novamente...')
        return generateKeyboardConditions(takenNumbers, keyboard);
    }

    const sortedNumbers = [firstRandomNumber, secondRandomNumber].sort();

    keyboard.push({ values: sortedNumbers });
    takenNumbers.push(firstRandomNumber, secondRandomNumber);

    return generateKeyboardConditions(takenNumbers, keyboard);
}