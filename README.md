# SheetStore

[![npm version](https://img.shields.io/npm/v/sheetstore.svg)](https://www.npmjs.com/package/sheetstore)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 🚀 Try It Live

Try SheetStore right now with our live demo at [https://spock-mauve.vercel.app/](https://spock-mauve.vercel.app/)

SheetStore is a lightweight JavaScript library that provides a Firestore-like API for storing and retrieving data using Google Sheets as your backend database. It's perfect for small to medium-sized projects where you want a simple, cost-effective alternative to Firebase Firestore.

## 🚀 Features

- Familiar Firestore-like API (getDocs, getDoc, addDoc, etc.)
- Use Google Sheets as your database
- Free tier usage with Google Sheets
- No complex setup or authentication required (compared to Firestore)
- Simple document-based data structure
- Minimal dependencies

## 📦 Installation

```bash
npm install sheetstore
```

or

```bash
yarn add sheetstore
```

## 🔧 Setup

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name your spreadsheet (e.g., "MyAppDatabase")
3. Create worksheets for your collections (e.g., "users", "posts")
4. Share the sheet with the service account email:
   - Email: `spock-707@spock-32d7d.iam.gserviceaccount.com`
   - Permission: Editor
5. Make sure your Google Sheet is shared with the appropriate permissions:
   - For development: "Anyone with the link can edit"
   - For production: Use a service account with Google Sheets API

### 2. Get Your Google Sheet ID

The Sheet ID is the long string in your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit#gid=0
```

## 📖 Usage Examples

### Import SheetStore

```javascript
import { getDocs, getDoc, addDoc, updateDoc, setDoc, deleteDoc } from 'sheetstore';
```

### Fetching All Documents

```javascript
const fetchUsers = async () => {
  const sheetId = 'YOUR_GOOGLE_SHEET_ID';
  const sheetName = 'users';
  
  const users = await getDocs(sheetId, sheetName);
  console.log(users);
  // Returns an array of all user documents
};
```

### Fetching a Single Document

```javascript
const fetchUser = async (userId) => {
  const sheetId = 'YOUR_GOOGLE_SHEET_ID';
  const sheetName = 'users';
  
  const user = await getDoc(sheetId, sheetName, userId);
  console.log(user);
  // Returns a single user document
};
```

### Adding a New Document

```javascript
const addUser = async () => {
  const sheetId = 'YOUR_GOOGLE_SHEET_ID';
  const sheetName = 'users';
  
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  };
  
  const response = await addDoc(sheetId, sheetName, userData);
  
  if (response.ok) {
    console.log('User added successfully!');
  }
};
```

### Updating a Document

```javascript
const updateUser = async (userId) => {
  const sheetId = 'YOUR_GOOGLE_SHEET_ID';
  const sheetName = 'users';
  
  const updates = {
    age: 31,
    status: 'active'
  };
  
  const response = await updateDoc(sheetId, sheetName, userId, updates);
  
  if (response.ok) {
    console.log('User updated successfully!');
  }
};
```

### Replacing a Document

```javascript
const replaceUser = async (userId) => {
  const sheetId = 'YOUR_GOOGLE_SHEET_ID';
  const sheetName = 'users';
  
  const newData = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    age: 32
  };
  
  const response = await setDoc(sheetId, sheetName, userId, newData);
  
  if (response.ok) {
    console.log('User replaced successfully!');
  }
};
```

### Deleting a Document

```javascript
const removeUser = async (userId) => {
  const sheetId = 'YOUR_GOOGLE_SHEET_ID';
  const sheetName = 'users';
  
  const response = await deleteDoc(sheetId, sheetName, userId);
  
  if (response.ok) {
    console.log('User deleted successfully!');
  }
};
```

## 📊 Data Structure

SheetStore stores data in Google Sheets with the following structure:

- Each worksheet corresponds to a collection
- Each row represents a document
- The first column contains a unique document ID
- Other columns store data in the format `key:value`

Example Sheet Structure:

| docId:abc123 | name:John Doe | email:john@example.com | age:30 |
|--------------|---------------|------------------------|--------|
| docId:def456 | name:Jane Smith | email:jane@example.com | age:25 |

## 🤝 Contributing

Contributions are welcome! Whether you're reporting bugs, suggesting features, or submitting code, your help is greatly appreciated. Feel free to open issues or submit pull requests.

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## ✨ Acknowledgements

- Inspired by Firebase Firestore
- Built with Google Sheets API
