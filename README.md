# CyberConnect

The JavaScript library provides `CyberConnect` class which includes functions to allows users to control their decentralized identity([DIDs](https://www.w3.org/TR/did-core/)) and social graph data. The library encapsulates the complex authentication logic (authenticate to Ceramic Network) into easy-to-use functions.
[CyberConnect API](https://docs.cyberconnect.me/connect-and-disconnect).

## Getting started

### Installation

```sh
npm install @cyberlab/cyberconnect
or
yarn add @cyberlab/cyberconnect
```

### Basic usage

#### Init CyberConnect

```ts
import CyberConnect, {
  Env,
  Blockchain,
} from '@cyberlab/cyberconnect';

const cyberConnect = new CyberConnect({
  namespace: 'CyberConnect',
  env: Env.Production,
  chain: Blockchain.ETH,
  provider: provider,
  signingMessageEntity: 'CyberConnect' || your entity,
});
```

- `namespace` - Your applciation name.
- `env` - (optional) Env decides the endpoints. Now we have `staging` and `production`. (The default value is `Env.Production`).
- `chain` - (optional) The blockchain you want to connect with. Now we support `ethereum` and `solana`. (The default is `Blockchain.ETH`).
- `provider` - The corresponding provider of the given chain.
- `signingMessageEntity` - (optional) Use to describe the entity users sign their message with. Users will see it when authorizing in the wallet `I authorize ${signingMessageEntity} from this device using signing key:`. The default entity is `CyberConnect`.

See [Solana](#Solana) for Solana demo.

#### Authenticate

The `authenticate()` includes two signs for `AuthProvider` and [Capi10Link]("https://developers.ceramic.network/streamtypes/caip-10-link/api/").

All users should sign for `AuthProvider` every session.

Only first time users need to sign for `Capi10Link` and it may takes 5-10 seconds.

Only authenticate once if call `cyberconnect.authenticate()` multiple time.

You can run `cyberconnect.authenticate()` somewhere before doing `connect` to do the authentication first, then the user doesn't need to sign when calling `connect`.

You can also call `connect` directly, then the user have to sign during the function call.

```ts
await cyberConnect.authenticate();
```

#### Connect

```ts
cyberConnect.connect(targetAddr, alias, connectionType);
```

- `targetAddr` - The target wallet address to connect.
- `alias` - (optional) Alias for the target address.
- `connectionType` - (optional) The type of the connection. The default value is `Connection.FOLLOW`. See [Connection Type](#ConnectionType) for more details.

#### Disconnect

```ts
cyberConnect.disconnect(targetAddr);
```

- `targetAddr` - The target wallet address to disconnect.

#### BatchConnect

```ts
cyberConnect.batchConnect(targetAddrs, connectionType);
```

- `targetAddrs` - A list of wallet addresses to connect.
- `connectionType` - (optional) The type of the connection. The default value is `Connection.FOLLOW`. See [Connection Type](#ConnectionType) for more details.

#### SetAlias

```ts
cyberConnect.setAlias(targetAddr, alias);
```

- `targetAddr` - The target wallet address to disconnect.
- `alias` - The alias for the target address.

### Connection Type

You can create different types of connections for different purposes.

E.g: You can like a NFT by creating a "LIKE" connection from you to the NFT.

```ts
import { ConnectionType } from '@cyberlab/cyberconnect';

cyberConnect.connect(targetAddr, alias, ConnectionType.LIKE);
```

Those types we support: `FOLLOW`, `LIKE`, `REPORT`, `WATCH` and `VOTE`

<b>Note</b>: Only one type connection can be created from one to another, which means you can't create both "FOLLOW" connection and "LIKE" connection from you to "Ryan".

### Solana

You can get Solana provider from [@solana/wallet-adapter-react]('https://github.com/solana-labs/wallet-adapter)

```ts
import { useWallet } from '@solana/wallet-adapter-react';
const solanaProvider = useWallet();
```

<b>Note</b>: You need to pass `chainRef` when you connect to Solana. Now we have three options: `Solana.SOLANA_MAINNET_CHAIN_REF`, `Solana.SOLANA_DEVNET_CHAIN_REF` and `Solana.SOLANA_TESTNET_CHAIN_REF`

```ts
import CyberConnect, {
  Env,
  Blockchain,
  Solana,
} from 'npm install @cyberlab/cyberconnect';

const cyberConnect = new CyberConnect({
  namespace: 'CyberConnect',
  env: Env.Production,
  chain: Blockchain.ETH,
  provider: solanaProvider,
  chainRef: Solana.SOLANA_MAINNET_CHAIN_REF,
});
```

## Contributing

We are happy to accept small and large contributions, feel free to make a suggestion or submit a pull request.
