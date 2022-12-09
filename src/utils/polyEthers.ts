import { ethers } from 'ethers';
import erc20 from '../json/ERC20.json';
import config from '../config';

const { MUMBAI_INFURA_URL, MUMBAI_PRIVATE_KEY } = config;

export const JsonRpcProvider = new ethers.providers.JsonRpcProvider(
  MUMBAI_INFURA_URL,
);

export const mumbaiSigner = new ethers.Wallet(
  MUMBAI_PRIVATE_KEY,
  JsonRpcProvider,
);

export function initContract() {
  return new ethers.Contract(erc20.contractAddress, erc20.abi, mumbaiSigner);
}

export const erc20Contract = initContract();
