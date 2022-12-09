import { erc20Contract } from '../../utils/polyEthers';

export default async function getBalance(address: string) {
  try {
    return (await erc20Contract.balanceOf(address)).toString();
  } catch (error) {
    return error;
  }
}
