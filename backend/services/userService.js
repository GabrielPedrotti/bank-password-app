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
            if (password.length !== 6) return res.status(400).json({ message: 'Senha deve conter 6 números' });

            const collection = await databaseConnect();
            
            let bankId = Math.floor(Math.random() * 10000);
            const bankIdExists = await collection.findOne({ bankId });

            if (bankIdExists) this.createUser(req, res);
            
            const userExists = await collection.findOne({ username });
            if (userExists) return res.status(409).json({ message: 'Usuário já cadastrado' });

            await collection.insertOne({ username, bankId });

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
    }
}