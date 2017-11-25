const Block = require('./Block');

class Blockchain {

  /**
   * Cria a Blockchain.
   *
   * @param {String} difficulty Dificuldade de mineração, quanto maior mais tempo por block gerado.
   * @return {void}
   */
  constructor (difficulty = 4) {
    this.difficulty = difficulty;
  }

  /**
   * Retorna uma nova instância com o Genesis Block.
   *
   * @return {Blockchain} instace
   */
  static create () {
    const instance = new Blockchain();
    instance.chain = [instance.createGenesisBlock()];

    return instance;
  }

  /**
   * Cria o bloco gênesis.
   * Este é o primeiro bloco da Blockchain, o Previoushash deste bloco é 0.
   *
   * @return {Block}
   */
  createGenesisBlock () {
    return new Block(0, '01/01/2017', 'Genesis Block', '0');
  }

  /**
   * Retorna o último bloco minerado.
   *
   * @return {Block}
   */
  get latestBlock () {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Adiciona um novo bloco.
   *
   * @param {Block} block
   * @return {self}
   */
  addBlock (block) {
    block.previousHash = this.latestBlock.hash;
    this.chain.push(block.mineBlock(this.difficulty));

    return this;
  }

  /**
   * Percorre a Blockchain verificando a integridade dos blocos.
   *
   * @return {Boolean}
   */
  isChainValid () {
    for (let i = 1; i < this.chain.length; i++) {
      // Change it?
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (! currentBlock.checkIntegrity(previousBlock)) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;
