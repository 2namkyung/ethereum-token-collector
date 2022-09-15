import { NftTradeEvent, NftTx, NftUpdateInfo } from '../types';
import pool from './pool';

export async function updateNftInfoByNftTrade(data: NftUpdateInfo) {
  const { contract, tokenId, owner } = data;
  let connection = null;

  try {
    connection = await pool.getConnection();
    connection.beginTransaction();
    await connection.query(
      `UPDATE nfts SET owner='${owner.toLowerCase()}', status='MINT', price='0' WHERE contract='${contract}' AND tokenId=${tokenId}`,
    );

    await connection.query(
      `DELETE FROM listing WHERE contract='${contract}' AND tokenId=${tokenId}`,
    );

    connection.commit();
    connection.release();

    return true;
  } catch (error) {
    console.log('[ERROR] : UPDATE_NFT_INFO', error);
    connection.rollback();
    connection.release();
    return error;
  }
}

export async function insertNftTradeTx(data: NftTradeEvent) {
  const { contract, tokenId, from, to, price, txHash, eventName } = data;
  try {
    await pool.query(
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
    return true;
  } catch (error) {
    console.log('[ERROR] : INSERT_NFT_TRADE_TX', error);
    return error;
  }
}

export async function insertNftTx(data: NftTx) {
  const { contract, tokenId, from, to, txHash, eventName } = data;
  try {
    await pool.query(
      'INSERT INTO nft_transaction(contract, tokenId, `from`, `to`, txHash, eventName) VALUES(?,?,?,?,?,?)',
      [contract, tokenId, from, to, txHash, eventName],
    );

    console.log(`${eventName} - ${contract} - ${tokenId}`);
    return true;
  } catch (error) {
    console.log('[ERROR] : INSERT_NFT_TX', error);
    return error;
  }
}
