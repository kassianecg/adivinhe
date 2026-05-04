# Adivinhe 🎮

Jogo de adivinhação de palavras desenvolvido com React e TypeScript. O jogador recebe uma dica e deve descobrir a palavra letra por letra antes de esgotar as tentativas.

## Como jogar

1. Uma dica é exibida no ecrã
2. Digite uma letra no campo de palpite e clique em **Confirmar** ou pressione **Enter**
3. As letras corretas são reveladas na palavra
4. Tens `tamanho da palavra + 5` tentativas no total
5. Acerta todas as letras para ganhar — se esgotares as tentativas, o jogo reinicia automaticamente

## Funcionalidades

- Palavra aleatória a cada jogo
- Dica exibida para ajudar o jogador
- Contador de tentativas no cabeçalho
- Letras corretas reveladas na palavra
- Letras utilizadas exibidas em verde (corretas) ou amarelo (erradas)
- Aviso ao tentar usar uma letra já utilizada
- Confirmação ao reiniciar o jogo
- Suporte a tecla **Enter** para confirmar o palpite
- Campo de palpite aceita apenas letras (números e caracteres especiais são bloqueados)

## Tecnologias

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- CSS Modules

## Estrutura do projeto

```
src/
├── components/
│   ├── Button/       # Botão de confirmar
│   ├── Header/       # Cabeçalho com logo e tentativas
│   ├── Input/        # Campo de entrada da letra
│   ├── Letter/       # Quadrado de cada letra da palavra
│   ├── LettersUsed/  # Letras já utilizadas
│   └── Tips/         # Componente de dica
├── utils/
│   └── words.ts      # Lista de palavras e dicas
└── App.tsx           # Lógica principal do jogo
```

## Instalação e execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```
