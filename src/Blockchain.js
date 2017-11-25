const SHA256 = require('crypto-js/sha256');

class Block {
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
