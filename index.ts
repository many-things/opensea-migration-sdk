import axios from 'axios'
import QueryString from 'query-string'

type Address = string
type OpenseaAsset = {
  asset_contract: {
    address: Address
  }
}
type OpenseaOrder = any

type InternalAsset = any
type InternalOrder = any

export const getAssetsByAccountAddress = async (
  address: string,
): Promise<InternalAsset> => {
  const url = `https://api.opensea.io/api/v1/assets`
  const {
    data: { assets },
  } = await axios.get(
    QueryString.stringifyUrl({
      url,
      query: { owner: address, limit: 50 },
    }),
  )
  return assets
}

export const getOrdersByAssetContractAddress = async (
  assetContractAddress: Address,
): Promise<InternalOrder[]> => {
  const url = `https://api.opensea.io/wyvern/v1/orders`
  const {
    data: { orders },
  } = await axios.get(
    QueryString.stringifyUrl({
      url,
      query: {
        asset_contract_address: assetContractAddress,
        bundled: false,
        include_bundled: false,
        token_id: '8694',
        limit: 20,
        offset: 0,
        order_by: 'created_date',
        order_direction: 'desc',
      },
    }),
    {
      headers: {
        'X-API-KEY': 'bea970cbbdae445a9f01b827f9ac227e',
      },
    },
  )
  return orders.map((order: OpenseaOrder) => ({
    id: order.id,
    createdAt: new Date(order.listing_time * 1_000),
    expireAt: new Date(order.expiration_time * 1_000),
    maker: order.maker.address,
    currentPrice: order.current_price,
    currentBounty: order.current_bounty,
    bountyMultiple: order.bounty_multiple,
    quantity: parseInt(order.quantity),

    // approvedOnChain: order.approved_on_chain,
    cancelled: order.cancelled,
    // finalized: order.finalized,
    paymentToken: order.payment_token,
    markedInvalid: order.marked_invalid,

    // relayerFee: {
    //   maker: order.maker_relayer_fee,
    //   taker: order.taker_relayer_fee,
    // },
    // protocolFee: {
    //   maker: order.maker_protocol_fee,
    //   taker: order.taker_protocol_fee,
    // },
    // referrerFee: {
    //   maker: order.maker_referrer_fee,
    //   taker: order.taker_referrer_fee,
    // },
  }))
}

export const lookupAccountAddress = async (address: Address) => {
  let record: Record<Address, InternalOrder> = {}
  const assets = await getAssetsByAccountAddress(address)

  await Promise.all(
    assets.map((asset: OpenseaAsset) => {
      return new Promise<void>((resolve) => {
        const assetContractAddress = asset.asset_contract.address
        getOrdersByAssetContractAddress(assetContractAddress).then((orders) => {
          record[assetContractAddress] = {
            ...record[assetContractAddress],
            orders,
          }
          resolve()
        })
      })
    }),
  )

  return record
}
