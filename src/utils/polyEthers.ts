import { ethers } from 'ethers';
import erc20 from '../json/ERC20.json';
import config from '../config';

const { MUMBAI_INFURA_URL, MUMBAI_PRIVATE_KEY } = config;

export const publicRpcProvider = new ethers.providers.JsonRpcProvider(
  'https://rpc-mumbai.maticvigil.com',
);

export const JsonRpcProvider = new ethers.providers.JsonRpcProvider(
  MUMBAI_INFURA_URL,
);

export const alchemyRpcProvider = new ethers.providers.AlchemyProvider(
  'maticmum',
  config.MUMBAI_ALCHEMY_KEY,
);

export const mumbaiSigner = new ethers.Wallet(
  MUMBAI_PRIVATE_KEY,
  JsonRpcProvider,
);

export const mumbaiAlchemySigner = new ethers.Wallet(
  MUMBAI_PRIVATE_KEY,
  alchemyRpcProvider,
);

export async function getWalletAddressNonce(address: string) {
  try {
    return await JsonRpcProvider.getTransactionCount(address, 'latest');
  } catch (error) {
    console.log(error);
    return error;
  }
}

export function initContract() {
  return new ethers.Contract(erc20.contractAddress, erc20.abi, mumbaiSigner);
}

export const mumbaiGasPrice = 1500000010;
export async function getGasPrice() {
  try {
    return await JsonRpcProvider.getGasPrice();
  } catch (error) {
    return error;
  }
}

export const erc20Contract = initContract();
