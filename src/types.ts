export interface NftTx {
  contract: string;
  tokenId: string;
  from: string;
  to: string;
  txHash: string;
  eventName: string;
}

export interface NftTradeEvent extends NftTx {
  price: string;
}

export type NftUpdateInfo = {
  contract: string;
  tokenId: number;
  owner: string;
};
