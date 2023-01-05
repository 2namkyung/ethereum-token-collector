import { ethers } from 'ethers';

import {
  erc20Contract,
  mumbaiGasPrice,
  mumbaiSigner,
} from '../../utils/polyEthers';
import erc20 from '../../json/ERC20.json';

const decimals = 18;

export default async function tranfser(address: string, amount: number) {
  try {
    const amountToString = amount.toString();
    const amountFormatted = ethers.utils.parseUnits(amountToString, decimals);
    const tx = await erc20Contract.transfer(address, amountFormatted);
    return await tx.wait();
  } catch (error) {
    console.log(error);
    return error;
  }
}

function createTransaction(
  from: string,
  to: string,
  data: string,
  value?: number,
) {
  const gasLimit = ethers.utils.hexlify(100000);
  return {
    from,
    to,
    value: !value && 0,
    data,
    gasPrice: mumbaiGasPrice,
    gasLimit,
  };
}

function transferFunctionEncode(address: string, amount: number) {
  const iface = new ethers.utils.Interface(erc20.abi);

  const amountToString = amount.toString();
  const amountFormatted = ethers.utils.parseUnits(amountToString, decimals);
  return iface.encodeFunctionData('transfer', [address, amountFormatted]);
}

async function transferSendTransaction(
  from: string,
  to: string,
  address: string,
  amount: number,
  value?: number,
) {
  const data = transferFunctionEncode(address, amount);
  const tx = createTransaction(from, to, data, value);

  try {
    const transaction = await mumbaiSigner.sendTransaction(tx);
    const receipt = await transaction.wait();

    console.log(`TRANSACTION HASH : ${receipt.transactionHash}`);
    return receipt;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// tranfser('0x504370060B9d5433679e557621ee31a3B960C157', 150);

transferSendTransaction(
  '0x9729352a088bCBcaDfa404F1E4B4BbBeD339b571',
  erc20.contractAddress,
  '0x504370060B9d5433679e557621ee31a3B960C157',
  30,
);
