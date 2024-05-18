const fs = require("fs").promises;
async function readAndLowercaseWallets(filePath) {
  let wallets = [];
  try {
    const data = await fs.readFile(filePath, "utf8");
    const lines = data.split("\n");
    wallets = lines
      .map((line) => line.trim().toLowerCase())
      .filter((wallet) => wallet);
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
  }
  return wallets;
}

async function checkWallet() {
  const initialListPath = "initialList.csv";
  const myListPath = "wallets.txt";
  const walletsList = await readAndLowercaseWallets(initialListPath);
  const myWalletsList = await readAndLowercaseWallets(myListPath);
  console.log(walletsList.length);

  for (let i = 1; i < walletsList.length; i++) {
    const wallet = walletsList[i];
    console.log(i, wallet);

    if (myWalletsList.includes(wallet)) {
      console.log("my wallet is sybill: " + wallet);

      try {
        await fs.appendFile("sybills.txt", wallet + "\n", "utf8");
        console.log(`Wallet ${wallet} записан в sybills.txt`);
      } catch (err) {
        console.error(`Error writing to file: ${err}`);
      }
    }
  }
}
checkWallet();
