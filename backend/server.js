const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
// Importe o módulo cors
const cors = require('cors'); 

const app = express();
const port = 3001;

// Configuração do MySQL
const connection = mysql.createConnection({
    //caminho do servidor do banco de dados
    host: 'localhost',

    //usuario do banco de dados
    user: 'root',

    //senha para acessar o banco de dados
    password: 'Desenvolvedor@123',

    //base de dados 
    database: 'aula',
    
    //porta liberada para acessar o banco de dados
    port: 3306
});

// Conectar ao MySQL
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Middleware para analisar solicitações JSON
app.use(bodyParser.json());

// Use o middleware cors
app.use(cors());

// Rota para lidar com o envio dos dados do formulário para o Banco de dados
app.post('/api/usuarios', (req, res) => {
    const { nome, email, telefone, cpf } = req.body;
    const INSERT_USER_QUERY = `INSERT INTO cadastro (nome, email, telefone, cpf, endereco, senha) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(INSERT_USER_QUERY, [nome, email, telefone, cpf, endereco, senha], (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).send('Erro ao inserir usuário');
        }
        console.log('Usuário inserido com sucesso');
        res.send('Usuário inserido com sucesso');
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor Node.js está rodando na porta ${port}`);
});
