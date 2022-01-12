# 🌊 @manythings/opensea-migration-sdk
SDK to migrate orders & sales from OpenSea

```ts
lookupAccountAddress('0x4a003f0a2c52e37138eb646aB4E669C4A84C1001')
```

```ts
{
  '0x6cdf9a2ac2068e43bb3571ad9ee544ef26300e6a': { orders: [] },
  '0x226bf5293692610692e2c996c9875c914d2a7f73': { orders: [] },
  '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85': { orders: [] },
  '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b': {
    orders: [
      {
        id: 2330772288,
        createdAt: new Date('2022-01-12T03:26:56.000Z'),
        expireAt: new Date('2022-01-12T06:28:33.000Z'),
        maker: '0xf7082b85636980cbc3f938543b24448a7164964e',
        currentPrice: '4158100000000000000.000000000',
        currentBounty: '41581000000000000',
        bountyMultiple: '0.01',
        quantity: 1,
        cancelled: false,
        paymentToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        markedInvalid: false
      },
      {
        id: 2329343287,
        createdAt: new Date('2022-01-12T00:17:05.000Z'),
        expireAt: new Date('2022-01-12T04:28:36.000Z'),
        maker: '0x6155bb89892127ba0d581bff5855bbe129aed8c3',
        currentPrice: '4157100000000000000.000000000',
        currentBounty: '41571000000000000',
        bountyMultiple: '0.01',
        quantity: 1,
        cancelled: false,
        paymentToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        markedInvalid: false
      },
      {
        id: 2324599963,
        createdAt: new Date('2022-01-11T14:45:25.000Z'),
        expireAt: new Date('2022-01-12T09:33:00.000Z'),
        maker: '0x3ffa7bb47ef76807912fea50b235faa380b820a2',
        currentPrice: '4151000000000000000.000000000',
        currentBounty: '41510000000000000',
        bountyMultiple: '0.01',
        quantity: 1,
        cancelled: false,
        paymentToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        markedInvalid: false
      }
    ]
  }
}
```
