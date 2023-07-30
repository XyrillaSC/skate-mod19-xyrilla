import { openDB } from 'idb';

const initdb = async () =>
  openDB('skate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('skate')) {
        console.log('skate database already exists');
        return;
      }
      db.createObjectStore('skate', { keyPath: 'id', autoIncrement: true });
      console.log('skate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const skateDb = await openDB('skate', 1);
  const tx = skateDb.transaction('skate', 'readwrite');
  const store = tx.objectStore('skate');
  const request = store.put({ content: content });
  const result = await request;
  console.log('content saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const skateDb = await openDB('skate', 1);
  const tx = skateDb.transaction('skate', 'readonly');
  const store = tx.objectStore('skate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
