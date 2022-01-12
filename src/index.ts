import axios from 'axios'
import QueryString from 'query-string'

type Address = string
type UnixTimestamp = number

type OpenseaAsset = {
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
export const lookupAccountAddress = async (
  address: Address,
): Promise<AssetRecord> => {
  let record: Record<Address, InternalOrder> = {}
  const assets = await getAssetsByAccountAddress(address)

  await Promise.all(
    assets.map((asset: OpenseaAsset) => {
      return new Promise<void>((resolve) => {
        const assetContractAddress = asset.asset_contract.address
        getOrdersByAssetContractAddress(assetContractAddress).then((orders) => {
          record[assetContractAddress] = {
            ...record[assetContractAddress],
            asset,
            orders,
          }
          resolve()
        })
      })
    }),
  )

  return record
}
