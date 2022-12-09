import { erc20Contract } from '../../utils/polyEthers';

export default async function tranfser(address: string, amount: string) {
  try {
    const tx = await erc20Contract.transfer(address, amount);
    return await tx.wait();
  } catch (error) {
    return error;
  }
}
