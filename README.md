# Juiceswap Interface

[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Juiceswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [juiceswap.finance](https://juiceswap.finance/)
- Interface: [app.juiceswap.com](https://exchange.juiceswap.finance)
- Docs: [juiceswap.finance/docs/](https://info.juiceswap.finance)
- Twitter: [@JuiceswapProtocol](https://twitter.com/Juice_Swap)
- Email: [contact@juiceswap.com](mailto:contact@juiceswap.finance)
- Discord: [juiceswap](https://discord.com/channels/795221735771209738/795221736240185395)
- Whitepaper: [Link](https://juiceswap.finance/whitepaper.pdf)

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
