import { ethers } from 'ethers';
import {
  insertNftTradeTx,
  insertNftTx,
  updateNftInfoByNftTrade,
} from '../database/query';
import { NftTradeEvent, NftUpdateInfo } from '../types';
import { ERC721_EVENT_TRANSFER_SIGNATURE, zeroAddress } from '../utils/abi';
import {
  JsonRpcProvider,
  marketContract,
  nftContract,
  webSocketProvider,
} from '../utils/mainEthers';
import NFT from '../json/NFT.json';

export async function nftTradeEvent() {
  webSocketProvider.on('block', async (newBlockNumber: number) => {
    const block = await JsonRpcProvider.getBlock(newBlockNumber);
    block?.transactions.forEach(async (txHash) => {
      try {
        const receipt = await JsonRpcProvider.getTransactionReceipt(txHash);
        if (receipt && receipt.status && receipt.logs.length !== 0) {
          receipt.logs.forEach(async (log) => {
            const { topics } = log;
            const contract = log.address;
            if (
              topics[0] === ERC721_EVENT_TRANSFER_SIGNATURE &&
              topics.length === 4
            ) {
              const abiCoder = new ethers.utils.AbiCoder();
              const from = abiCoder.decode(['address'], topics[1])[0];
              const to = abiCoder.decode(['address'], topics[2])[0];
              const tokenId = abiCoder.decode(['uint256'], topics[3])[0];
              const nftData = {
                contract,
                from,
                to,
                tokenId: tokenId.toString(),
                txHash,
                eventName: from === zeroAddress ? 'MINT' : 'TRANSFER',
              };

              await insertNftTx(nftData);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}

export async function LazyNftEvent() {
  nftContract.on('Transfer', async (from, to, tokenId) => {
    if (from === zeroAddress) {
      return;
    }

    const updateData: NftUpdateInfo = {
      contract: NFT.contractAddress,
      tokenId: Number(tokenId),
      owner: to,
    };
    await updateNftInfoByNftTrade(updateData);
  });
}

export async function MarketEvent() {
  marketContract.on(
    'NftTrade',
    async (from, to, contract, tokenId, price, event) => {
      const etherPrice = ethers.utils.formatEther(price);
      const tradeData: NftTradeEvent = {
        from,
        to,
        contract,
        tokenId: tokenId.toString(),
        price: etherPrice,
        txHash: event.transactionHash,
        eventName: event.event,
      };

      await insertNftTradeTx(tradeData);
    },
  );
}
