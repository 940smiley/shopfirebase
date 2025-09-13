#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');

const isDryRun = process.argv.includes('--dry-run');

async function getConfig() {
  if (isDryRun) {
    return { projectId: 'demo-project', publicDir: 'public' };
  }

return inquirer.prompt([
  {
    name: 'projectId',
    message: 'Firebase project ID:',
    validate: input => {
      if (!/^[a-z0-9-]+$/.test(input)) {
        return 'Project ID must contain only lowercase letters, numbers, or dashes';
      }
      return true;
    }
  },
    },
    {
      name: 'publicDir',
      message: 'Public directory for hosting:',
      default: 'public'
    }
  ]);
}

function createFiles(config) {
  const firebaseJson = {
    project: config.projectId,
    firestore: {
      rules: 'firestore.rules',
      indexes: 'firestore.indexes.json'
    },
    hosting: {
      public: config.publicDir,
      ignore: ['firebase.json', '**/.*', '**/node_modules/**']
    }
  };

  const firestoreRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}`;

  const indexes = { indexes: [] };

  if (isDryRun) {
    console.log('Dry run: the following files would be created:');
    console.log('firebase.json ->', JSON.stringify(firebaseJson, null, 2));
    console.log('firestore.rules ->', firestoreRules);
    console.log('firestore.indexes.json ->', JSON.stringify(indexes, null, 2));
    return;
  }

  fs.writeFileSync('firebase.json', JSON.stringify(firebaseJson, null, 2));
  fs.writeFileSync('firestore.rules', firestoreRules + '\n');
try {
  fs.writeFileSync('firebase.json', JSON.stringify(firebaseJson, null, 2));
  fs.writeFileSync('firestore.rules', firestoreRules + '\n');
  fs.writeFileSync('firestore.indexes.json', JSON.stringify(indexes, null, 2) + '\n');
  console.log('Firebase config files created.');
} catch (error) {
  console.error('Error creating configuration files:', error.message);
  process.exit(1);
}
async function main() {
  const config = await getConfig();
  createFiles(config);
}

main();
