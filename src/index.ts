import axios from 'axios'
import QueryString from 'query-string'

type Address = string
type UnixTimestamp = number

type OpenseaAsset = {
  token_id: string
  asset_contract: {
    address: Address
  }
}
type OpenseaOrder = {
  id: number
  listing_time: UnixTimestamp
  expiration_time: UnixTimestamp
  maker: {
    address: Address
  }
  current_price: string
  current_bounty: string
  bounty_multiple: string
  quantity: string
  approved_on_chain: boolean
  cancelled: boolean
  finalized: boolean
  payment_token: string
  marked_invalid: boolean

  maker_relayer_fee: string
  taker_relayer_fee: string
  maker_protocol_fee: string
  taker_protocol_fee: string
  maker_referrer_fee: string
  taker_referrer_fee: undefined
}

// FIXME: Update types
type InternalAsset = any
type InternalOrder = any

export const getAssetsByAccountAddress = async (
  address: Address,
): Promise<InternalAsset> => {
  const url = `https://api.opensea.io/api/v1/assets`
  const {
    data: { assets },
  } = await axios.get(
    QueryString.stringifyUrl({
      url,
      query: {
        owner: address,
        limit: 50,
        order_by: 'sale_price',
      },
    }),
  )
  return assets
}

export const getOrdersByAssetContractAddress = async (
  assetContractAddress: Address,
  tokenId: string,
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
        limit: 20,
        offset: 0,
        token_id: tokenId,
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

    cancelled: order.cancelled,
    paymentToken: order.payment_token,
    markedInvalid: order.marked_invalid,
  }))
}

export const getOrdersByAccountAddress = async (
  address: Address,
): Promise<InternalOrder[]> => {
  const url = `https://api.opensea.io/wyvern/v1/orders`
  const {
    data: { orders },
  } = await axios.get(
    QueryString.stringifyUrl({
      url,
      query: {
        maker: address,
        bundled: false,
        include_bundled: false,
        limit: 20,
        offset: 0,
        order_by: 'created_date',
        order_direction: 'desc',
      },
    }),
    {
      headers: {
        'x-api-key': 'bea970cbbdae445a9f01b827f9ac227e',
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

    cancelled: order.cancelled,
    paymentToken: order.payment_token,
    markedInvalid: order.marked_invalid,
  }))
}

type AssetRecord = Record<
  Address,
  {
    asset: OpenseaAsset
    orders: InternalOrder[]
  }
>

type LookupInformation = {
  orders: InternalOrder[]
  assets: AssetRecord
}
export const lookupAccountAddress = async (
  address: Address,
  maxAssets: number = 10,
): Promise<LookupInformation> => {
  let assetRecord: Record<Address, InternalOrder> = {}
  const assets = await getAssetsByAccountAddress(address)

  await Promise.all(
    assets.slice(0, maxAssets).map((asset: OpenseaAsset) => {
      return new Promise<void>((resolve) => {
        const tokenId = asset.token_id
        const assetContractAddress = asset.asset_contract.address
        getOrdersByAssetContractAddress(assetContractAddress, tokenId)
          .then((orders) => {
            assetRecord[assetContractAddress] = {
              ...assetRecord[assetContractAddress],
              asset,
              orders,
            }
            resolve()
          })
          .catch((error) => console.log(error.message, error.response.data))
      })
    }),
  )

  const orders = await getOrdersByAccountAddress(address).catch((error) => {
    console.log(
      'Error while fetching orders by account',
      error.message,
      error.response.data,
    )
    return []
  })
  return {
    orders,
    assets: assetRecord,
  }
}
