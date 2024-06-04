# ChainCred

ChainCred is a decentralized review & loyalty app that allows users to verify their identity using their Ethereum address. It uses thirdweb's React Native SDK to interact with the blockchain and thirdweb's Authentication SDK to handle user authentication.

## Features

- User authentication using thirdweb's Authentication SDK
- Scan a QR code to send a review
- See your review score
- Verification of user identity using their Ethereum address
- Integration with thirdweb's React Native SDK for blockchain interactions
- Use of thirdweb's EAS SDK for attestation verification
- Support for multiple attestation types (e.g., action, review)
- Easy integration with thirdweb's EAS SDK for attestation verification

## Getting Started

To get started with ChainCred, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/ludwigw/chaincred.git
```

2. Install the dependencies:

```bash
bun install
```

3. Set up your environment variables:  
   Create a `.env` file in the root directory of the project and add the following variables:

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
   EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY=<your-thirdweb-auth-private-key>
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   EXPO_PUBLIC_SERVER_URL=<your-server-url>
   ```

4.

5. Run the app:

   ```
   yarn start
   ```

6. Open the app on your device or emulator.

## Contributing

We welcome contributions to ChainCred! If you have any ideas or suggestions for how to improve the app, please open an issue or submit a pull request on our GitHub repository.

## License

ChainCred is licensed under the Apache License 2.0.

## Contact

If you have any questions or comments, please reach out to us at [ludwigw@hey.com](mailto:ludwigw@hey.com).
