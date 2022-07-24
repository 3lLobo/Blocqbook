// import {
//   SupportedChainId,
//   SupportedL1ChainId,
//   SupportedL2ChainId,
// } from './chains.ts'

export enum NetworkType {
  L1,
  L2,
}

/**
 * List of all the networks supported by the Uniswap Interface
 */
 export enum SupportedChainId {
  MAINNET = 1,
  // ROPSTEN = 3,
  // RINKEBY = 4,
  // GOERLI = 5,
  KOVAN = 42,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001,

  BSC = 56,

  FANTOM = 250,
  FANTOM_TESTNET = 4002,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,

  // OPTIMISM = 10,
  // OPTIMISTIC_KOVAN = 69,

  AVALANCHE = 43114,
  AVALANCHE_FUJI = 43113,

  HARMONY = 1666600000,

  AURORA = 1313161554,

  // CRONOS = 25,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: 'mainnet',
  // [SupportedChainId.ROPSTEN]: 'ropsten',
  // [SupportedChainId.RINKEBY]: 'rinkeby',
  // [SupportedChainId.GOERLI]: 'goerli',
  [SupportedChainId.KOVAN]: 'kovan',
  [SupportedChainId.POLYGON]: 'polygon',
  [SupportedChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
  [SupportedChainId.ARBITRUM_ONE]: 'arbitrum',
  [SupportedChainId.ARBITRUM_RINKEBY]: 'arbitrum_rinkeby',
  // [SupportedChainId.OPTIMISM]: 'optimism',
  // [SupportedChainId.OPTIMISTIC_KOVAN]: 'optimistic_kovan',
  [SupportedChainId.AVALANCHE]: 'avalanche',
  [SupportedChainId.AVALANCHE_FUJI]: 'avalanche_fuji',
  [SupportedChainId.BSC]: 'bsc',
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === 'number') as SupportedChainId[]

// export const SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [
//   SupportedChainId.MAINNET,
//   SupportedChainId.POLYGON,
//   SupportedChainId.OPTIMISM,
//   SupportedChainId.ARBITRUM_ONE,
// ]

/**
 * Unsupported networks for V2 pool behavior.
 */
// export const UNSUPPORTED_V2POOL_CHAIN_IDS = [
//   SupportedChainId.POLYGON,
//   SupportedChainId.OPTIMISM,
//   SupportedChainId.ARBITRUM_ONE,
// ]

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  // SupportedChainId.ROPSTEN,
  // SupportedChainId.RINKEBY,
  // SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.AVALANCHE,
  SupportedChainId.AVALANCHE_FUJI,
  SupportedChainId.FANTOM,
  SupportedChainId.FANTOM_TESTNET,
] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
export const L2_CHAIN_IDS = [
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  // SupportedChainId.OPTIMISM,
  // SupportedChainId.OPTIMISTIC_KOVAN,
] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]


interface BaseChainInfo {
  readonly networkType?: NetworkType
  // readonly // blockWaitMsBeforeWarning?: number
  readonly docs?: string
  readonly bridge?: string
  readonly explorer?: string
  readonly infoLink?: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency?: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
}

export interface L1ChainInfo extends BaseChainInfo {
  readonly networkType?: NetworkType.L1
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType?: NetworkType.L2
  readonly bridge?: string
  readonly statusPage?: string
  readonly defaultListUrl?: string
}

export type ChainInfoMap = {
  readonly [chainId: number]: L1ChainInfo | L2ChainInfo
} & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ethereum',
    logoUrl: '/assets/images/ethereum-logo.png',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  // [SupportedChainId.RINKEBY]: {
  //   networkType: NetworkType.L1,
  //   docs: 'https://docs.uniswap.org/',
  //   explorer: 'https://rinkeby.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/',
  //   label: 'Rinkeby',
  //   logoUrl: '/assets/images/ethereum-logo.png',
  //   nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
  // },
  // [SupportedChainId.ROPSTEN]: {
  //   networkType: NetworkType.L1,
  //   docs: 'https://docs.uniswap.org/',
  //   explorer: 'https://ropsten.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/',
  //   label: 'Ropsten',
  //   logoUrl: '/assets/images/ethereum-logo.png',
  //   nativeCurrency: { name: 'Ropsten Ether', symbol: 'ropETH', decimals: 18 },
  // },
  [SupportedChainId.KOVAN]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://kovan.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Kovan',
    logoUrl: '/assets/images/ethereum-logo.png',
    nativeCurrency: { name: 'Kovan Ether', symbol: 'kovETH', decimals: 18 },
  },
  // [SupportedChainId.GOERLI]: {
  //   networkType: NetworkType.L1,
  //   docs: 'https://docs.uniswap.org/',
  //   explorer: 'https://goerli.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/',
  //   label: 'Görli',
  //   logoUrl: '/assets/images/ethereum-logo.png',
  //   nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
  // },
  // [SupportedChainId.OPTIMISM]: {
  //   networkType: NetworkType.L2,
  //   // blockWaitMsBeforeWarning: `25m`,
  //   bridge: 'https://app.optimism.io/bridge',
  //   defaultListUrl: '',
  //   docs: 'https://optimism.io/',
  //   explorer: 'https://optimistic.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/optimism/',
  //   label: 'Optimism',
  //   logoUrl: '/assets/svg/optimistic_ethereum.svg',
  //   statusPage: 'https://optimism.io/status',
  //   helpCenterUrl:
  //     'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
  //   nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  // },
  // [SupportedChainId.OPTIMISTIC_KOVAN]: {
  //   networkType: NetworkType.L2,
  //   // blockWaitMsBeforeWarning: `25m`,
  //   bridge: 'https://app.optimism.io/bridge',
  //   defaultListUrl: '',
  //   docs: 'https://optimism.io/',
  //   explorer: 'https://optimistic.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/optimism/',
  //   label: 'Optimistic Kovan',
  //   logoUrl: '/assets/svg/optimistic_ethereum.svg',
  //   statusPage: 'https://optimism.io/status',
  //   helpCenterUrl:
  //     'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
  //   nativeCurrency: {
  //     name: 'Optimistic Kovan Ether',
  //     symbol: 'kovOpETH',
  //     decimals: 18,
  //   },
  // },
  [SupportedChainId.ARBITRUM_ONE]: {
    networkType: NetworkType.L2,
    // blockWaitMsBeforeWarning: `10m`,
    bridge: 'https://bridge.arbitrum.io/',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://arbiscan.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum',
    label: 'Arbitrum',
    logoUrl: '/assets/svg/arbitrum_logo.svg',
    defaultListUrl: '',
    helpCenterUrl:
      'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_RINKEBY]: {
    networkType: NetworkType.L2,
    // blockWaitMsBeforeWarning: `10m`,
    bridge: 'https://bridge.arbitrum.io/',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://rinkeby-explorer.arbitrum.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum/',
    label: 'Arbitrum Rinkeby',
    logoUrl: '/assets/svg/arbitrum_logo.svg',
    defaultListUrl: '',
    helpCenterUrl:
      'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
    nativeCurrency: {
      name: 'Rinkeby Arbitrum Ether',
      symbol: 'rinkArbETH',
      decimals: 18,
    },
  },
  [SupportedChainId.POLYGON]: {
    networkType: NetworkType.L1,
    // blockWaitMsBeforeWarning: `10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon',
    logoUrl: '/assets/svg/polygon-matic-logo.svg',
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    networkType: NetworkType.L1,
    // blockWaitMsBeforeWarning: `10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://mumbai.polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon Mumbai',
    logoUrl: '/assets/svg/polygon-matic-logo.svg',
    nativeCurrency: {
      name: 'Polygon Mumbai Matic',
      symbol: 'mMATIC',
      decimals: 18,
    },
  },
  [SupportedChainId.AVALANCHE]: {
    networkType: NetworkType.L1,
    // blockWaitMsBeforeWarning: `3000m`,
    bridge: 'https://wallet.avalanche.technology/bridge',
    docs: 'https://avalanche.io/',
    explorer: 'https://cchain.explorer.avax.network/',
    infoLink: 'https://info.uniswap.org/#/avalanche/',
    label: 'Avalanche',
    logoUrl: '/assets/svg/avalanche-logo.svg',
    nativeCurrency: { name: 'Avalanche', symbol: 'AVA', decimals: 18 },
  },
  [SupportedChainId.AVALANCHE_FUJI]: {
    networkType: NetworkType.L1,
    // blockWaitMsBeforeWarning: `3000m`,
    bridge: 'https://wallet.avalanche.technology/bridge',
    docs: 'https://avalanche.io/',
    explorer: 'https://cchain.explorer.avax.network/',
    infoLink: 'https://info.uniswap.org/#/avalanche/',
    label: 'Avalanche Fuji',
    logoUrl: '/assets/svg/avalanche-logo.svg',
    nativeCurrency: { name: 'Avalanche', symbol: 'AVA', decimals: 18 },
  },
  [SupportedChainId.BSC]: {
    networkType: NetworkType.L1,
    // blockWaitMsBeforeWarning: `3000m`,
    // bridge: 'https://wallet.bsc.network/bridge',
    // docs: 'https://bsc.network/',
    explorer: 'https://bscscan.com/',
    // infoLink: 'https://info.uniswap.org/#/bsc/',
    label: 'Binance Smart Chain',
    logoUrl: '/assets/svg/binance-logo.svg',
    nativeCurrency: { name: 'Binance Coin', symbol: 'BNB', decimals: 8 },
  },
  [SupportedChainId.FANTOM]: {
    explorer: 'https://ftmscan.com/',
    label: 'Fantom',
    logoUrl: '/assets/svg/fantom-logo.svg',
  },
  [SupportedChainId.FANTOM_TESTNET]: {
    explorer: 'https://testnet.ftmscan.com/',
    label: 'Fantom Testnet',
    logoUrl: '/assets/svg/fantom-logo.svg',
  },
  [SupportedChainId.HARMONY]: {
    explorer: 'https://explorer.harmony.one/',
    label: 'Harmony',
    logoUrl: '/assets/svg/harmony-logo.svg',
  },
  [SupportedChainId.AURORA]: {
    explorer: 'https://aurorascan.dev/',
    label: 'Aurora',
    logoUrl: '/assets/svg/aurora-logo.svg',
  },
  // [SupportedChainId.CRONOS]: {
  //   explorer: 'https://cronoscan.com/',
  //   label: 'Cronos',
  //   logoUrl: '/assets/svg/cronos-logo.svg',
  // },
}
