import Redis from 'ioredis';

const redis = new Redis();

async function test(key: string) {
  const nonces = [
    { nonce: 5, account: key },
    { nonce: 1, account: key },
    { nonce: 6, account: key },
    { nonce: 7, account: key },
    { nonce: 2, account: key },
    { nonce: 0, account: key },
    { nonce: -1, account: key },
  ];

  const newMap = nonces.map(({ nonce, account }) => [nonce, account]);

  await redis.zadd(key, ...newMap.map((value: any) => value));

  console.log(await redis.zrange(key, 0, 0, 'WITHSCORES'));
}

test('515151');
