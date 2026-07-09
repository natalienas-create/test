# portfolio — novelo de linha

Site de portfolio em HTML/CSS/JS puro (sem build step), pronto para o GitHub Pages.
Estilo: sketch preto e branco, baseado no conceito do vídeo — um novelo de linha
que se desenrola em estudos de caso, com um boneco de palito guiando o scroll e
um "buraco negro" que leva a cada case study.

## Estrutura

```
index.html          página única (hero, seção de trabalhos, sobre, contato)
css/style.css        todo o visual
js/script.js          dados dos projetos + interações (scroll, hover, buraco negro)
assets/               pasta vazia — coloque aqui imagens reais dos projetos
```

## Como editar o conteúdo

**Textos do topo (nome, título, sobre, contato):** edite diretamente em `index.html`.

**Projetos / estudos de caso:** tudo fica no topo do arquivo `js/script.js`, no array
`CASE_STUDIES`. Cada objeto vira automaticamente um "nó" na linha do tempo e uma
página de case study completa. Para adicionar um projeto novo, copie um bloco
existente e ajuste os textos — não precisa mexer no HTML.

**Imagens:** hoje as imagens dos cases são só uma moldura de placeholder
(`case__frame`). Para trocar por uma imagem real, em `js/script.js` procure a
linha com `case__frame` e troque por `<img src="assets/nome-do-arquivo.jpg" alt="...">`,
depois coloque o arquivo dentro de `assets/`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (pode ser `seu-usuario.github.io` para ficar na
   raiz, ou qualquer outro nome).
2. Suba estes arquivos para a branch `main` (mantendo a estrutura de pastas).
3. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from
   a branch**, escolha `main` e a pasta `/root`. Salve.
4. Em alguns minutos o site estará em `https://seu-usuario.github.io/nome-do-repo/`.

## Domínio personalizado

1. Compre o domínio no registrador de sua preferência.
2. No mesmo painel **Settings → Pages**, campo **Custom domain**, digite seu
   domínio (ex: `seunome.com`) e salve — o GitHub cria um arquivo `CNAME` na raiz
   do repositório automaticamente.
3. No painel do seu registrador de domínio, configure o DNS:
   - Para domínio raiz (`seunome.com`): quatro registros **A** apontando para
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Para subdomínio `www`: um registro **CNAME** apontando para
     `seu-usuario.github.io`.
4. Volte em Settings → Pages e marque **Enforce HTTPS** assim que o certificado
   ficar disponível (pode levar até 24h).

## Notas técnicas

- Sem dependências externas além das fontes do Google Fonts (Caveat, Space Mono,
  Inter), carregadas via `<link>` no `index.html`.
- Respeita `prefers-reduced-motion` (desativa animações para quem pediu menos
  movimento no sistema).
- Navegação por teclado: o "buraco negro" de cada projeto é focável (Tab) e abre
  com Enter/Espaço; a página de case study fecha com Esc ou pelo botão X.
- Totalmente responsivo, testado de 375px a desktop wide.
