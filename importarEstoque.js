/*
scripts/importarEstoque.js
Importa data/estoque.csv para Firestore (coleção 'produtos').
Uso:
  1) Preencha .env.local com variáveis VITE_FIREBASE_*
  2) node scripts/importarEstoque.js
*/
import fs from 'fs';
import csv from 'csv-parser';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const caminhoCSV = './data/estoque.csv';
if (!fs.existsSync(caminhoCSV)) {
  console.error('Arquivo data/estoque.csv não encontrado. Coloque seu CSV e tente novamente.');
  process.exit(1);
}

let contador = 0;
fs.createReadStream(caminhoCSV)
  .pipe(csv())
  .on('data', async (linha) => {
    // Convert fields
    const produto = {
      nome: linha.nome || '',
      categoria: linha.categoria || '',
      quantidade: parseInt(linha.quantidade || '0', 10),
      pontoDePedido: parseInt(linha.pontoDePedido || '0', 10),
      validade: linha.validade || null,
      precoUnitario: parseFloat(linha.precoUnitario || '0'),
      fornecedor: linha.fornecedor || ''
    };
    try {
      const id = linha.id || (`prod_${Date.now()}_${contador}`);
      await setDoc(doc(db, 'produtos', id), produto);
      contador++;
      if (contador % 100 === 0) console.log(`Imported ${contador} items...`);
    } catch (err) {
      console.error('Error importing', linha, err);
    }
  })
  .on('end', () => {
    console.log(`Import finished. Total: ${contador}`);
  });
