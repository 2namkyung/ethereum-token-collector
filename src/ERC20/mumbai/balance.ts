import { erc20Contract } from '../../utils/polyEthers';

export default async function getBalance(address: string) {
  try {
    const amount = await erc20Contract.balanceOf(address);
    const amountFormatted = Number(amount) / 1e18;
    return amountFormatted;
  } catch (error) {
    return error;
  }
}
