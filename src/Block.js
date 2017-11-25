const SHA256 = require('crypto-js/sha256');

class Block {

  /**
   * Cria um novo bloco.
   *
   * @param {Number} index
   * @param {Date} timestamp
   * @param {Object} data
   * @param {String} previousHash
   * @return {void}
   */
  constructor (index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  /**
   * Calcula a Hash do bloco.
   *
   * @return {String}
   */
  calculateHash () {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  /**
   * Minera o bloco.
   * Enquanto a prova de dificuldade não for satisfeita, persistir  no laço de repetição.
   * A prova de dificuldade é satisfeita quando o hash gerado inicia com a mesma quantidade de "zeros" que a dificuldade
   * Ex: Dificuldade 5, Hash: 00000nc3276b3s4b326432784632784532v493284632v432
   *
   * @param {Number} difficulty
   * @return {self}
   */
  mineBlock (difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`, `\nNonce: ${this.nonce}`);

    return this;
  }

  /**
   * Verifica a integridade do bloco.
   *
   * @param {Block} block
   * @return {Boolean}
   */
  checkIntegrity (block) {
    return this.hash === this.calculateHash() && this.matchHash(block);
  }

  /**
   * Verifica se as hashs combinam.
   *
   * @param {Block} block
   * @return {Boolean}
   */
  matchHash (block) {
    return this.previousHash === block.hash;
  }
}

module.exports = Block;
