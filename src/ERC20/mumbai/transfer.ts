import { ethers } from 'ethers';
import { erc20Contract } from '../../utils/polyEthers';

const decimals = 18;

export default async function tranfser(address: string, amount: string) {
  try {
    const amountFormatted = ethers.utils.parseUnits(amount, decimals);
    const tx = await erc20Contract.transfer(address, amountFormatted);
    return await tx.wait();
  } catch (error) {
    return error;
  }
}
