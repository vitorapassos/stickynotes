/**
 * Módulo de conexão com o banco de dados
 * Uso do framework mongoose
 */


// Importação do mongoose
const mongoose = require('mongoose')

// Configuração do banco de dados
// ip/link do servidor, autenticação
// ao final da url difinir o nome do banco de dados
// exemplo: /dbnotes
const url = 'mongodb+srv://admin:123Senac@cluster0.fnijm.mongodb.net/dbnotes'

// Validação (evitar a abertura de várias conexões)
let conectado = false

// método/função para conectar
const conectar = async () => {
    // Se não estiver conectado/(conectado = false)
    if (!conectado) {
        // Conectar com o banco de dados
        try {
            await mongoose.connect(url) // conectar
            console.log("MongoDB Conectado")
            conectado = true
        } catch (error) {
            console.log(error)
        }
    }
}

// método/função para desconectar
const desconectar = async () => {
    // Se estiver conectado/(conectado = true)
    if (conectado) {
        // Desconectar
        try {
            await mongoose.disconnect(url)
            console.log("MongoDB Desconectado")
            conectado = false
        } catch (error) {
            console.log(error)
        }
    }
}

// Exportar para o main os métodos conectar e disconectar
module.exports = { conectar, desconectar }