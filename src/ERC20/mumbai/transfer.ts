import { ethers } from 'ethers';

import {
  erc20Contract,
  mumbaiGasPrice,
  mumbaiSigner,
} from '../../utils/polyEthers';

const decimals = 18;

const abiCoder = ethers.utils.defaultAbiCoder;

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
  const amountToString = amount.toString();
  const amountFormatted = ethers.utils.parseUnits(amountToString, decimals);
  return abiCoder.encode(['address', 'uint256'], [address, amountFormatted]);
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

    console.log(receipt);
    return receipt;
  } catch (error) {
    console.log(error);
    return error;
  }
}

tranfser('0x504370060B9d5433679e557621ee31a3B960C157', 100);

// transferSendTransaction(
//   '0x9729352a088bCBcaDfa404F1E4B4BbBeD339b571',
//   '0x244D4241EC8cF7383D7e4854Ee55205386d5741D',
//   '0x504370060B9d5433679e557621ee31a3B960C157',
//   10,
// );
