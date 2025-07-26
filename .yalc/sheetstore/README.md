# SheetStore

[![npm version](https://img.shields.io/npm/v/sheetstore.svg)](https://www.npmjs.com/package/sheetstore)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

SheetStore is a lightweight JavaScript library that provides a Firestore-like API for storing and retrieving data using Google Sheets as your backend database. It's perfect for small to medium-sized projects where you want a simple, cost-effective alternative to Firebase Firestore.

## 🚀 Features

- Familiar Firestore-like API (getDocs, getDoc, addDoc, etc.)
- Use Google Sheets as your database
- Free tier usage with Google Sheets API
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
4. Make sure your Google Sheet is shared with the appropriate permissions:
   - For development: "Anyone with the link can edit"
   - For production: Use a service account with Google Sheets API

### 2. Get Your Google Sheet ID

The Sheet ID is the long string in your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit#gid=0
```

### 3. Set Up API Routes

SheetStore requires API routes to interact with Google Sheets. Create the following API endpoints in your application:

#### API Routes to Implement

| Endpoint | Purpose |
|----------|---------|
| `/api/sheets/get` | Get all documents |
| `/api/sheets/getWithId` | Get document by ID |
| `/api/sheets/add` | Add or update document |
| `/api/sheets/clear` | Clear document (for setDoc) |
| `/api/sheets/deleteRow` | Delete document |

You'll need to implement these endpoints using the Google Sheets API. Here's a sample implementation using Next.js API routes (you can adapt this for other frameworks):

<details>
<summary>Sample API Implementation (Next.js)</summary>

```javascript
// pages/api/sheets/get.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { sheetId, sheetName } = req.body;
    
    // Initialize the Sheets API (you'll need to set up authentication)
    const sheets = google.sheets({ version: 'v4', auth: /* your auth here */ });
    
    // Get the data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:Z`,
    });
    
    const rows = response.data.values || [];
    
    return res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    return res.status(500).json({ message: 'Error fetching data' });
  }
}
```

Similar implementations would be needed for the other endpoints.
</details>

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

## 🔄 Comparison with Firebase Firestore

| Feature | SheetStore | Firestore |
|---------|------------|-----------|
| Cost | Free (with Google Sheets) | Free tier limited, then paid |
| Setup | Simple | Complex |
| Authentication | Optional | Required |
| Real-time Updates | No | Yes |
| Complex Queries | Limited | Extensive |
| Scalability | Limited | High |
| Offline Support | No | Yes |
| Transactions | No | Yes |
| Best For | Small projects, prototypes | Production apps, complex data |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## ✨ Acknowledgements

- Inspired by Firebase Firestore
- Built with Google Sheets API
- Developed by [Milanjiji](https://github.com/Milanjiji)

