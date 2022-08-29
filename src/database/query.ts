import { NftTradeEvent, NftUpdateInfo } from '../types';
import connection from './connection';

export async function updateNftInfoByNftTrade(data: NftUpdateInfo) {
  const { contract, tokenId, owner } = data;
  let conn = null;
  try {
    conn = await connection();
    await conn.beginTransaction();
    await conn.query(
      `UPDATE nfts SET owner='${owner.toLowerCase()}', status='MINT', price='0' WHERE contract='${contract}' AND tokenId=${tokenId}`,
    );

    await conn.query(
      `DELETE FROM listing WHERE contract='${contract}' AND tokenId=${tokenId}`,
    );

    await conn.commit();
    conn.release();
  } catch (error) {
    console.log('[ERROR] : UPDATE_NFT_INFO', error);
    conn.rollback();
  }
}

export async function insertNftTradeTx(data: NftTradeEvent) {
  const { contract, tokenId, from, to, price, txHash, eventName } = data;
  try {
    const conn = await connection();
    await conn.query(
      'INSERT INTO market_transaction(contract, tokenId, `from`, `to`, txHash, price, eventName) VALUES (?,?,?,?,?,?,?)',
      [
        contract,
        tokenId,
        from.toLowerCase(),
        to.toLowerCase(),
        txHash,
        price,
        eventName,
      ],
    );

    conn.release();
  } catch (error) {
    console.log('[ERROR] : INSERT_NFT_TRADE_TX', error);
  }
}
