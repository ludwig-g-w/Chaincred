<p align="center" style="border-radius: 10px">
  <img src="./assets/icon.png" width="200" />
</p>

# Chaincred

Chaincred is a decentralized review & loyalty app that allows users to attest an review with EAS scanning the Ethereum address of another user. It uses thirdweb's React Native SDK to interact
with the blockchain and thirdweb's Authentication SDK to handle user authentication.

## Demo

![Demo](./demo.gif)

## Tools

- [Thirdweb](https://www.thirdweb.com/)
- [EAS](https://attest.org/)
- [Supabase](https://supabase.com/)
- [Nativewind](https://nativewind.dev/)
- [Gluestack](https://gluestack.io/)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [tRPC](https://trpc.io/)
- [Prisma](https://prisma.io/)

## Features

- User authentication using thirdweb's Authentication SDK, SIWE (Sign In With Ethereum) and EIP-4361 (EIP-4361 Signature)
- Scan a QR code to send a review
- See your review score
- see where users are on the map
- Create profile
- Dark theme
- Integration with thirdweb's React Native SDK for blockchain interactions
- Use of thirdweb's EAS SDK for attestation verification
- Support for multiple attestation types (e.g., action, review)

## Getting Started

To get started with ChainCred, follow these steps:

### Prerequisites

- Node.js v18.x
- Bun v1.x
- Docker

1. Clone the repository to your local machine:

```bash
git clone https://github.com/ludwigw/chaincred.git
```

2. Install the dependencies:

```bash
bun install
```

3. Set up your environment variables:  
   Create a `.env.production.local` or file in the root directory of the project and add the following variables:

   ```
   EXPO_PUBLIC_TW_CLIENT_ID=<your-thirdweb-client-id>
   EXPO_PUBLIC_EAS_CONTRACT=<your-eas-contract-address>
   EXPO_PUBLIC_SCHEMA_ADRESS_ACTION=<your-schema-address-action>
   EXPO_PUBLIC_SCHEMA_ADRESS_REVIEW=<your-schema-address-review>
   EXPO_PUBLIC_EAS_SCHEMA_REGISTRY=<your-eas-schema-registry-address>
   EXPO_PUBLIC_EAS_GRAPHQL=<your-eas-graphql-endpoint>
   EXPO_PUBLIC_API_KEY_GOOGLE=<your-google-api-key>
   EXPO_PUBLIC_ORGANIZATION_MANAGER_ADDRESS=<your-organization-manager-address>
   EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
   THIRDWEB_AUTH_PRIVATE_KEY=<your-thirdweb-auth-private-key>
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   EXPO_PUBLIC_SERVER_URL=<your-server-url>
   EXPO_PUBLIC_POSTGRES_PRISMA_URL=<your-postgres-url>
   EXPO_PUBLIC_POSTGRES_URL_NON_POOLING=<your-postgres-url>
   ```

4. run docker-compose up

5. Run the app:

   ```
   bun ios
   ```

## Known issues

- social login doesn't work

## Roadmap

- Migrate to Gluestack Nativewind or remove
- Fix social login

## Contributing

We welcome contributions to ChainCred! If you have any ideas or suggestions for how to improve the app, please open an issue or submit a pull request on our GitHub repository.

## License

ChainCred is licensed under the Apache License 2.0.
