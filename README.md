# Juiceswap Interface

[![Lint](https://github.com/Juiceswap/Juiceswap-interface/workflows/Lint/badge.svg)](https://github.com/Juiceswap/Juiceswap-interface/actions?query=workflow%3ALint)
[![Tests](https://github.com/Juiceswap/Juiceswap-interface/workflows/Tests/badge.svg)](https://github.com/Juiceswap/Juiceswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Juiceswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [juiceswap.finance](https://juiceswap.finance/)
- Interface: [app.juiceswap.com](https://app.juiceswap.finance)
- Docs: [juiceswap.finance/docs/](https://juiceswap.com/docs/)
- Twitter: [@JuiceswapProtocol](https://twitter.com/JuiceswapProtocol)
- Reddit: [/r/juiceswap](https://www.reddit.com/r/juiceswap/)
- Email: [contact@juiceswap.com](mailto:contact@juiceswap.finance)
- Discord: [juiceswap](https://discord.gg/Y7TF6QA)
- Whitepaper: [Link](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)

## Accessing the juiceswap Interface

To access the juiceswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/juiceswap/juiceswap-interface/releases/latest), 
or visit [app.juiceswap.com](https://app.juiceswap.finance).

## Listing a token

Please see the
[@juiceswap/default-token-list](https://github.com/juiceswap.finance/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Jusiceswap](https://juiceswap.finance/docs/smart-contracts/factory/) and 
[multicall](https://github.com/Juiceswap-finance) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.
