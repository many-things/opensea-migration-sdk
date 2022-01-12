# 🌊 @manythings/opensea-migration-sdk
- SDK to migrate orders & sales from OpenSea
- Methods are to be separated more precisely

```ts
/**
  * @description Get assets and orders from address
  */
getAssetsByAccountAddress(address)
getOrdersByAccountAddress(address)

/**
  * @description Returns list of orders made at specific asset
  */
getOrdersByAssetContractAddress(assetContractAddress, tokenId)
```

## ⚡️ Action
```ts
/**
 * @param {string} accountAddress - Someone's wallet address
 */
lookupAccountAddress('0x8ee55f30b24e42827cb4aad0b75454b92b99f106')
```

```js
{
  /**
   * @description Orders made by account
   */
  "orders": [
    {
      "id": 2298791581,
      "createdAt": "2022-01-08T10:58:52.000Z",
      "expireAt": "2022-01-15T11:00:21.000Z",
      "maker": "0x8ee55f30b24e42827cb4aad0b75454b92b99f106",
      "currentPrice": "1000000000000000000.000000000",
      "currentBounty": "10000000000000000",
      "bountyMultiple": "0.01",
      "quantity": 1,
      "cancelled": false,
      "paymentToken": "0x0000000000000000000000000000000000000000",
      "markedInvalid": false
    },
  ],

  /**
   * @description Assets held by account
   */
 "assets": {
   "0x80a4b80c653112b789517eb28ac111519b608b19": {
      /**
       * @description Asset information
       * @todo Pick fields from OpenSea response
       */
      "asset": {
        "id": 35131821,
        "token_id": "7826",
        "num_sales": 2,
        "image_original_url": "https://api.cryptocannabisclub.com/image/7826",
        "name": "NFToker #7826",
        "description": "The Crypto Cannabis Club is a collection of 10k NFTokers chilling in the metaverse, growing digital weed, and competing for the title of the best grower on the blockchain.",
        "external_link": "https://cryptocannabisclub.com/",
        ...
      },
      /**
       * @description Orders made to asset
       */
      "orders": [
        {
          "id": 2329190168,
          "createdAt": "2022-01-11T23:57:52.000Z",
          "expireAt": "2022-01-12T13:59:31.000Z",
          "maker": "0x4df2be1c2f3865a42e5aa54c99f0406828b18f75",
          "currentPrice": "100000000000000000.0000000000",
          "currentBounty": "1000000000000000",
          "bountyMultiple": "0.01",
          "quantity": 1,
          "cancelled": false,
          "paymentToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "markedInvalid": false
        },
        {
          "id": 982411101,
          "createdAt": "2021-09-28T07:11:22.000Z",
          "expireAt": "1970-01-01T00:00:00.000Z",
          "maker": "0x8ee55f30b24e42827cb4aad0b75454b92b99f106",
          "currentPrice": "2500000000000000000",
          "currentBounty": "25000000000000000",
          "bountyMultiple": "0.01",
          "quantity": 1,
          "cancelled": false,
          "paymentToken": "0x0000000000000000000000000000000000000000",
          "markedInvalid": false
        },
        {
          "id": 848534619,
          "createdAt": "2021-09-20T08:05:19.000Z",
          "expireAt": "1970-01-01T00:00:00.000Z",
          "maker": "0x8ee55f30b24e42827cb4aad0b75454b92b99f106",
          "currentPrice": "2999900000000000000",
          "currentBounty": "29999000000000000",
          "bountyMultiple": "0.01",
          "quantity": 1,
          "cancelled": false,
          "paymentToken": "0x0000000000000000000000000000000000000000",
          "markedInvalid": false
        },
        {
          "id": 714027345,
          "createdAt": "2021-09-11T10:36:54.000Z",
          "expireAt": "1970-01-01T00:00:00.000Z",
          "maker": "0x8ee55f30b24e42827cb4aad0b75454b92b99f106",
          "currentPrice": "3940000000000000000",
          "currentBounty": "39400000000000000",
          "bountyMultiple": "0.01",
          "quantity": 1,
          "cancelled": false,
          "paymentToken": "0x0000000000000000000000000000000000000000",
          "markedInvalid": false
        },
        {
          "id": 606895148,
          "createdAt": "2021-09-03T01:32:08.000Z",
          "expireAt": "1970-01-01T00:00:00.000Z",
          "maker": "0x8ee55f30b24e42827cb4aad0b75454b92b99f106",
          "currentPrice": "20000000000000000000",
          "currentBounty": "200000000000000000",
          "bountyMultiple": "0.01",
          "quantity": 1,
          "cancelled": false,
          "paymentToken": "0x0000000000000000000000000000000000000000",
          "markedInvalid": false
        }
      ]
    },
  }
}
```
