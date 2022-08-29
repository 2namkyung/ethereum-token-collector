export type NftTradeEvent = {
  from: string;
  to: string;
  contract: string;
  tokenId: number;
  price: string;
  txHash: string;
  eventName: string;
};

export type NftUpdateInfo = {
  contract: string;
  tokenId: number;
  owner: string;
};
