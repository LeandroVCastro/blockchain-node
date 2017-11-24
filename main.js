const SHA256 = require('crypto-js/sha256');

class Block{


	// Cria o bloco com informações padrão
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}


	// Função que calcula o hash
	// Parâmetros: index, prevrioshash, timestamp, data, nonce
	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}


	// Minera o bloco criado
	mineBlock(difficulty){
		// Enquanto a prova de dificuldade não for satisfeita, persistir  no laço de repetição
		// A prova de dificuldade é satisfeita quando o hash gerado inicia com a mesma quantidade de "zeros" que a dificuldade
		// Ex: Dificuldade = 5
		// Hash: 00000nc3276b3s4b326432784632784532v493284632v432
		while(this.hash.substring(0, difficulty) !== Array(difficulty +1).join("0")){
			// Adiciona +1 na variável 'nonce' para tentar gerar um novo hash
			this.nonce++;
			this.hash = this.calculateHash();
		}

		// Bloco finalmente foi minerado
		console.log("Block mined: " + this.hash);
		console.log("Nonce: " + this.nonce);
	}
}


class Blockchain{

	// Clica a blockchain(corrente de blocos interligados)
	constructor(){
		this.chain = [this.createGenesisBlock()];

		// Seta a dificuldade de mineração
		// Quanto maior a dificuldade, mais tempo demora par o bloco ser gerado
		this.difficulty = 4;
	}


	// Cria o bloco gênesis
	// Este é o primeiro bloco da blockchain. O previushash desse blocó é = 0
	createGenesisBlock(){
		return new Block(0, "01/01/2017", "Genesis Block", "0");
	}

	// Pega o ultimo bloco minerado
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	// Adiciona um novo bloco na blockchain
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		//newBlock.hash = newBlock.calculateHash();
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}


	// Verifica se a blockchain está corrompida
	// Percorre a blockchain inteira verificando o hash dos blocos.
	isChainValid(){
		for(let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true;
	}
}

// Inicia a blockchain
// Ao iniciar a blockchain, o bloco gênesis é criado automaticamente(método constructor)
let savjeeCoin = new Blockchain();
var isDead = false;
var indexBlockchain = 1;

// Roda a aplicação
while(!isDead){
	console.log("");
	console.log("mining block " + indexBlockchain + "...");
	savjeeCoin.addBlock(new Block(indexBlockchain, new Date(), {amount: Math.random() * 100000}));
	indexBlockchain++;
}
