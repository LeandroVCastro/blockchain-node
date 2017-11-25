const Block      = require('./src/Block');
const Blockchain = require('./src/Blockchain');

// Inicia a blockchain
// Ao iniciar a blockchain, o bloco gênesis é criado automaticamente(método constructor)
const myChain = new Blockchain();
var isDead = false;
var indexBlockchain = 1;

// Roda a aplicação
while(!isDead){
  console.log("");
  console.log("mining block " + indexBlockchain + "...");
  myChain.addBlock(new Block(indexBlockchain, new Date(), {amount: Math.random() * 100000}));
  indexBlockchain++;
}
