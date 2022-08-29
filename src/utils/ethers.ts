import { ethers } from 'ethers';
import dotenv from 'dotenv';
import NFT from '../json/NFT.json';
import Market from '../json/Market.json';
import {
  ERC2981_ROYALTY_INFO,
  ERC721_ABI_OWNEROF,
  ERC721_ABI_TOKEN_URI,
} from './abi';

dotenv.config();

const { INFURA_WS, INFURA_URL } = process.env;

const abiList: any = {
  tokenURI: ERC721_ABI_TOKEN_URI,
  royalty: ERC2981_ROYALTY_INFO,
  ownerOf: ERC721_ABI_OWNEROF,
};

export const webSocketProvider = new ethers.providers.WebSocketProvider(
  INFURA_WS,
);
export const JsonRpcProvider = new ethers.providers.JsonRpcProvider(INFURA_URL);

export const nftContract = new ethers.Contract(
  NFT.contractAddress,
  NFT.abi,
  webSocketProvider,
);

export const marketContract = new ethers.Contract(
  Market.contractAddress,
  Market.abi,
  webSocketProvider,
);

export function initContract(abiName: any, contractAddress: string) {
  const abi: any = abiList[abiName];
  return new ethers.Contract(contractAddress, abi, JsonRpcProvider);
}

export async function getTokenURI(contractAddress: string, tokenId: number) {
  const contract = initContract('tokenURI', contractAddress);

  try {
    return await contract.tokenURI(tokenId);
  } catch (error) {
    console.log('[ERROR] : GET_TOKENURI');
    return error;
  }
}
