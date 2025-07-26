const GetRowIndexWithId = async (sheetId,sheetName,docId) =>{
  const getData = {
    "sheetId":sheetId,
    "sheetName":sheetName,
    "docId":docId
  }
  const response = await fetch('https://spock-mauve.vercel.app/api/sheets/getWithId', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(getData)
    });
  
    if (response.ok) {
      const result  = await response.json()

      return{
          index:result.index,
      }
    } else {
      return undefined
    }
}

export const getDocs = async (sheetId,sheetName) => {
  const getData = {
    "sheetId": sheetId,
    "sheetName": sheetName
  }

  console.log("fething data");
  const response = await fetch('https://spock-mauve.vercel.app/api/sheets/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getData)
  });
  
  if (response.ok) {
    const result  = await response.json()

    var data = []
    result.data.forEach((row, index) => {
      var newData = {}
      row.forEach((row, index) => {
        const [key, acc] = row.split(':')
        newData[key] = acc
      })
      data[index] = newData;
    })

    return data
  } else {
    return undefined
  }
}

export const getDoc = async (sheetId, sheetName, docId) => {
  const getData = {
    "sheetId":sheetId,
    "sheetName":sheetName,
    "docId":docId
  }
  const response = await fetch('https://spock-mauve.vercel.app/api/sheets/getWithId', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(getData)
    });
  
    if (response.ok) {
      
    }else{
      return undefined;
    }
    const result  = await response.json()

    const data = await getDocs(sheetId,sheetName);

    return data[result.index];
}

export const addDoc = async (sheetId, sheetName, values) => {
  const result = await getDocs(sheetId, sheetName);

  const lastRowNo = result.length;
  const lastRow = result[lastRowNo - 1];
  const objectLength = Object.keys(lastRow).length + 1;

  const numbertoString = String.fromCharCode(objectLength + 64);

  const Range = `${sheetName}!A${lastRowNo + 1}:${numbertoString}${lastRowNo + 1}`;
  console.log(Range, "values");

  const generateId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < 20; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const docId = `docId:${generateId()}`;

  const transformedValues = [[docId, ...Object.entries(values).map(([key, value]) => `${key}:${value}`)]];

  const postData = {
    values: transformedValues,
    range: Range,
    sheetId: sheetId,
  };

  const response = await fetch('https://spock-mauve.vercel.app/api/sheets/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  return response.ok;
};

export const updateDoc = async (sheetId,sheetName,docId,update) =>{
  var data = await getDoc(sheetId,sheetName,docId);

  for (let key in update) {
    if (data.hasOwnProperty(key)) {
      data[key] = update[key];
    }
  }

  const lastRowNo = await GetRowIndexWithId(sheetId,sheetName,docId);
  const objectLength = Object.keys(data).length + 1;
  const numbertoString = String.fromCharCode(objectLength + 64);

  const transformedValues = [[...Object.entries(data).map(([key, value]) => `${key}:${value}`)]];
  const Range = `${sheetName}!A${lastRowNo.index + 1}:${numbertoString}${lastRowNo.index + 1}`;

  // console.log(lastRowNo.index,Object.keys(data).length,transformedValues,Range,"data from setDoc")

  const postData = {
    values: transformedValues,
    range: Range,
    sheetId: sheetId,
  };

  const response = await fetch('https://spock-mauve.vercel.app/api/sheets/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  return response.ok;

}



export const deleteDoc = async (sheetId,sheetName,docId) =>{

  const RowNo = await GetRowIndexWithId(sheetId,sheetName,docId);

  const postData = {
    sheetId: sheetId,
    sheetName:sheetName,
    index:RowNo.index+1
  };

  const response = await fetch('https://spock-mauve.vercel.app/api/sheets/deleteRow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  
  return response.ok;

}

export const setDoc = async (sheetId,sheetName,docId,update) =>{

  var data = await getDoc(sheetId,sheetName,docId);

  const lastRowNo = await GetRowIndexWithId(sheetId,sheetName,docId);
  const rowNumber = lastRowNo.index + 1;

  const clearRange = `${sheetName}!A${rowNumber}:Z${rowNumber}`;
  const resultFromClear = await fetch('https://spock-mauve.vercel.app/api/sheets/clear', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      range: clearRange,
      sheetId: sheetId,
    }),
  });

  console.log(resultFromClear.ok,"result from clear")

  console.log(data,"data before updating the row")

  const newData = {
    docId: docId,
    ...update,
  };

  const objectLength = Object.keys(data).length + 1;
  const numbertoString = String.fromCharCode(objectLength + 64);

  const transformedValues = [[...Object.entries(newData).map(([key, value]) => `${key}:${value}`)]];
  const Range = `${sheetName}!A${lastRowNo.index + 1}:${numbertoString}${lastRowNo.index + 1}`;

  console.log(lastRowNo.index,Object.keys(data).length,transformedValues,Range,"data from setDoc")

  const postData = {
    values: transformedValues,
    range: Range,
    sheetId: sheetId,
  };

  const response = await fetch('/api/sheets/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  return response;
  
}