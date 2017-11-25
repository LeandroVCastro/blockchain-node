const Block = require('./Block');

class Blockchain {

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
