async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const LimitOrder = await ethers.getContractFactory('LimitOrder');
  const swapRouterAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'; // Uniswap v3 router address
  const factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984'; // Uniswap v3 factory address

  const limitOrder = await LimitOrder.deploy(swapRouterAddress, factoryAddress);

  console.log('LimitOrder contract deployed to:', limitOrder.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
