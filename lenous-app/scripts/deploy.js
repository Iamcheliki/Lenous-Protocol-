async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // Deploy the LiquidityPool contract
  const LiquidityPool = await ethers.getContractFactory('LiquidityPool');
  const liquidityPool = await LiquidityPool.deploy();
  await liquidityPool.deployed();
  console.log('LiquidityPool deployed to:', liquidityPool.address);

  // Deploy the Orderbook contract
  const Orderbook = await ethers.getContractFactory('Orderbook');
  const orderbook = await Orderbook.deploy(deployer.address);
  await orderbook.deployed();
  console.log('Orderbook deployed to:', orderbook.address);

  // Set liquidity pool address in Orderbook contract
  await orderbook.setLiquidityPoolAddress(liquidityPool.address);
  console.log('Liquidity pool address set in Orderbook');
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
