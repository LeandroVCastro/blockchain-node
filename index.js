const Block      = require('./src/Block');
const Blockchain = require('./src/Blockchain');

/**
 * Inicia a blockchain.
 * Ao usar Blockchain.create() o bloco gênesis é criado automaticamente.
 */
const myChain = new Blockchain();
const dead = false;
const chainIndex = 1;

// Roda a aplicação
while(!dead) {
  console.log(`\n mining block ${chainIndex} ...`);
  myChain.addBlock(new Block(chainIndex, new Date(), { amount: Math.random() * 100000 }));
  chainIndex++;
}
