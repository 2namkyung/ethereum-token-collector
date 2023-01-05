import { JsonRpcProvider } from '../../utils/polyEthers';

export default async function getWalletAddressNonce(address: string) {
  try {
    const nonce = await JsonRpcProvider.getTransactionCount(address, 'latest');
    console.log(`Address : ${address} , nonce : ${nonce}`);
    return nonce;
  } catch (error) {
    console.log(error);
    return error;
  }
}

getWalletAddressNonce('0x9729352a088bCBcaDfa404F1E4B4BbBeD339b571');
