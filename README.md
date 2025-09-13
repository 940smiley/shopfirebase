# Firebase E-commerce Shop Setup Assistant

This project provides a simple Node.js script to scaffold Firebase configuration files for an e-commerce shop.

## Prerequisites
- [Node.js](https://nodejs.org/) v20 or later

## Usage
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the setup assistant:
   ```bash
   npm run setup
   ```
   Provide the requested information when prompted. The script will generate:
   - `firebase.json`
   - `firestore.rules`
   - `firestore.indexes.json`

## Dry Run / Testing
To verify the script without creating files:
```bash
npm test
```
This executes the setup in dry-run mode and prints the files that would be generated.
