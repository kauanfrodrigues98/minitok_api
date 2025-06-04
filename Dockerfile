# Usa imagem oficial do Node
FROM node:23-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (otimiza cache)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Compila o TypeScript (gera a pasta dist/)
RUN npm run build

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]