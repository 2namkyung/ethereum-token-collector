import tranfser from './ERC20/mumbai/transfer';
import { LazyNftEvent, MarketEvent, nftTradeEvent } from './subscribe';
import { erc20Contract } from './utils/polyEthers';

// LazyNftEvent();
// MarketEvent();
// nftTradeEvent();

console.log('====START====');
tranfser('0x504370060B9d5433679e557621ee31a3B960C157', '100000');
