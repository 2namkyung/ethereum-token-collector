import { ethers } from 'ethers';
import { mumbaiSigner } from '../../utils/polyEthers';
import ERC20DeployConfig from '../../json/ERC20DeployConfig.json';

const decimals = 18;

async function deployERC20(name: string, symbol: string, amount: string) {
  const factory = new ethers.ContractFactory(
    ERC20DeployConfig.abi,
    ERC20DeployConfig.bytecode,
    mumbaiSigner,
  );

  const amountFormatted = ethers.utils.parseUnits(amount, decimals);
  const contract = await factory.deploy(name, symbol, amountFormatted);
  await contract.deployed();

  console.log(`Deployment Successful , Contract Address : ${contract.address}`);
}

deployERC20('NK', 'T12A', '100000000');
