import BigNumber from 'bignumber.js'

// https://github.com/ProjectWyvern/wyvern-schemas/blob/master/src/types.ts
export interface Token {
  name: string
  symbol: string
  decimals: number
  address: string
}

// https://github.com/ProjectWyvern/wyvern-js/blob/master/src/types.ts
export interface ECSignature {
  v: number
  r: string
  s: string
}

export enum HowToCall {
  Call = 0,
  DelegateCall = 1,
  StaticCall = 2,
  Create = 3,
}

export enum Network {
  Main = 'main',
  Rinkeby = 'rinkeby',
}

export interface WyvernOrder {
  exchange: string
  maker: string
  taker: string
  makerRelayerFee: BigNumber
  takerRelayerFee: BigNumber
  makerProtocolFee: BigNumber
  takerProtocolFee: BigNumber
  feeRecipient: string
  feeMethod: number
  side: number
  saleKind: number
  target: string
  howToCall: number
  calldata: string
  replacementPattern: string
  staticTarget: string
  staticExtradata: string
  paymentToken: string
  basePrice: BigNumber
  extra: BigNumber
  listingTime: BigNumber
  expirationTime: BigNumber
  salt: BigNumber
}
