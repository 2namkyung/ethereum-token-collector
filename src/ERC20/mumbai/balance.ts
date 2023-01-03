import { erc20Contract } from '../../utils/polyEthers';

export default async function getBalance(address: string) {
  try {
    const amount = await erc20Contract.balanceOf(address);
    const amountFormatted = Number(amount) / 1e18;

    console.log(`Address : ${address} : ${amountFormatted}`);
    return amountFormatted;
  } catch (error) {
    return error;
  }
}

getBalance('0x504370060B9d5433679e557621ee31a3B960C157');
