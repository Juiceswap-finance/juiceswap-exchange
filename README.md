# Jusswap Interface

[![Lint](https://github.com/Jusswap/jusswap-interface/workflows/Lint/badge.svg)](https://github.com/Jusswap/jusswap-interface/actions?query=workflow%3ALint)
[![Tests](https://github.com/Jusswap/jusswap-interface/workflows/Tests/badge.svg)](https://github.com/Jusswap/jusswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Jusswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [jusswap.com](https://jusswap.com/)
- Interface: [app.jusswap.com](https://app.jusswap.com)
- Docs: [jusswap.com/docs/](https://jusswap.com/docs/)
- Twitter: [@JusswapProtocol](https://twitter.com/JusswapProtocol)
- Reddit: [/r/Jusswap](https://www.reddit.com/r/Jusswap/)
- Email: [contact@jusswap.com](mailto:contact@jusswap.com)
- Discord: [Jusswap](https://discord.gg/Y7TF6QA)
- Whitepaper: [Link](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)

## Accessing the Jusswap Interface

To access the Jusswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/Jusswap/jusswap-interface/releases/latest), 
or visit [app.jusswap.com](https://app.jusswap.com).

## Listing a token

Please see the
[@jusswap/default-token-list](https://github.com/jusswap/default-token-list) 
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
[Jusswap](https://jusswap.com/docs/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.
