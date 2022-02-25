import { openDB } from 'idb';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CURRENT_CLIENT_TYPE } from './cyberConnect';
import { CLIENT_TYPE } from './types';

const isRN = () => CURRENT_CLIENT_TYPE === CLIENT_TYPE.RN;

let dbPromise: any = null;

if (
  isRN() &&
  typeof window !== 'undefined' &&
  typeof window.indexedDB !== 'undefined'
) {
  dbPromise = openDB('CyberConnect', 1, {
    upgrade(db) {
      db.createObjectStore('store');
    },
  });
}

const getIDB = async (key: string) => {
  if (dbPromise) {
    return (await dbPromise).get('store', key);
  }

  return;
};

const setIDB = async (key: string, val: CryptoKeyPair) => {
  if (dbPromise) {
    return (await dbPromise).put('store', val, key);
  }

  return;
};

const clearIDBByAddress = async (key: string) => {
  return (await dbPromise).delete('store', key);
};

const clearIDB = async () => {
  return (await dbPromise).clear('store');
};

const setASG = (key: string, val: CryptoKeyPair) =>
  AsyncStorage.setItem(key, JSON.stringify(val))
    .then((data) => data)
    .catch((err) => err);

const getASG = (key: string) =>
  AsyncStorage.getItem(key).then((data: any) => JSON.parse(data));

const clearASG = () => AsyncStorage.clear();

const clearASGByKey = (k: string) => AsyncStorage.removeItem(k);

const set = (...args: [string, CryptoKeyPair]) => {
  if (isRN()) {
    return setASG(...args);
  }

  return setIDB(...args);
};

const get = (key: string) => {
  if (isRN()) {
    return getASG(key);
  }

  return getIDB(key);
};

const clear = () => {
  if (isRN()) {
    return clearASG();
  }

  return clearIDB();
};

const clearByAddr = (key: string) => {
  if (isRN()) {
    return clearASGByKey(key);
  }
  return clearIDBByAddress(key);
};

export { clear, set, get, clearByAddr };
