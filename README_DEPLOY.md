# Mendonça Gestão — Deploy na Vercel (Guia Rápido)

Este projeto está configurado para deploy instantâneo na Vercel e integração com Firebase Firestore.

## Passos principais

1. Renomeie `.env.example` para `.env.local` e preencha com as credenciais do Firebase (projeto `mendonca-gestao-app`).
2. Instale dependências:
   ```
   npm install
   ```
3. Teste localmente:
   ```
   npm run dev
   ```
   Acesse http://localhost:5173

4. (Opcional) Execute o script de importação se tiver `data/estoque.csv`:
   ```
   node scripts/importarEstoque.js
   ```

5. Suba o código para um repositório GitHub e importe no Vercel:
   - Ao importar, configure as mesmas variáveis de ambiente (copiar de `.env.local`).
   - Deploy será automático. A Vercel servirá a pasta `dist` se houver.

## Notas
- O arquivo `vercel.json` garante roteamento correto para aplicações SPA (React/Vite).
- O script `scripts/importarEstoque.js` usa variáveis do environment; verifique `.env.local` antes de rodar.
