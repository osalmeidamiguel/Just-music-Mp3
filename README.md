# Just Music MP3

Interface web responsiva inspirada na linguagem visual do Spotify e do Apple Music. Preparada para publicação no **GitHub Pages**.

## O que já está pronto
- Layout responsivo, navegação, busca, filtros YouTube/SoundCloud e player inferior.
- Estrutura para renderizar resultados vindos de uma API própria.
- Reprodução somente quando o backend fornece um `streamUrl` autorizado ou uma incorporação oficial (`embedUrl`).
- Sem anúncios inseridos pelo código do Just Music MP3.

## Limites importantes das plataformas
- **YouTube / YouTube Music:** não existe API pública oficial que entregue o áudio bruto do catálogo para um player MP3 independente ou permita baixar livremente as músicas. Use os mecanismos oficiais de incorporação/reprodução e respeite as regras da plataforma.
- **SoundCloud:** a API exige autenticação e as permissões variam. Só reproduza streams disponibilizados oficialmente e só ofereça download quando a faixa tiver download habilitado pelo titular dos direitos.
- Não é possível prometer “todas as músicas e todos os artistas”: os catálogos mudam, têm restrições territoriais e dependem das permissões de cada serviço.
- “Sem anúncios” vale para a interface própria. Conteúdo incorporado pode exibir publicidade ou elementos da plataforma, que o site não controla.

O projeto não contorna paywalls, anúncios, DRM, autenticação ou restrições de download.

## Publicar no GitHub Pages
1. Crie um repositório público chamado `just-music-mp3`.
2. Envie `index.html`, `style.css`, `app.js` e `README.md` para a raiz.
3. Em **Settings → Pages**, selecione `Deploy from a branch`, branch `main`, pasta `/ (root)`.
4. Salve e aguarde a URL publicada.

## Conectar uma API
GitHub Pages hospeda arquivos estáticos e **não executa backend**. O front-end espera uma rota HTTPS:
`GET /api/search?q=termo&source=all|youtube|soundcloud`

Formato esperado:
```json
{
  "results": [
    {
      "title": "Nome da faixa",
      "artist": "Artista",
      "source": "SoundCloud",
      "url": "https://soundcloud.com/...",
      "streamUrl": "https://stream-autorizado..."
    }
  ]
}
```
`streamUrl` só deve ser preenchido quando a API/plataforma autorizar a reprodução direta. Para YouTube, prefira a incorporação oficial em vez de extrair áudio. Não coloque client secrets, tokens privados ou chaves administrativas em `app.js`; mantenha-os no backend/worker e use variáveis de ambiente.

## Downloads
Para adicionar download, implemente no backend um botão apenas para arquivos/faixas cujo titular habilitou oficialmente o download, ou para conteúdo próprio/licenciado. Não crie um proxy para baixar áudio de vídeos ou faixas sem autorização.
