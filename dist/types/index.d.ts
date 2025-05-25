declare module 'sheetstore'{
    export const getDocs: (sheetId: string, sheetName: string) => Promise<Record<string, string>[] | undefined>;
    export const addDoc: (sheetId: string, sheetName: string, values: Record<string, string>) => Promise<Response>;
    export const getDoc: (sheetId: string, sheetName: string, docId: string) => Promise<Record<string, string> | undefined>;
    export const deleteDoc: (sheetId: string, sheetName: string, docId: string) => Promise<Record<string, string> | undefined>;
    export const setDoc: (sheetId: string, sheetName: string,docId : string, values: Record<string, string>) => Promise<Response>;
    export const updateDoc: (sheetId: string, sheetName: string,docId : string, values: Record<string, string>) => Promise<Response>;
}