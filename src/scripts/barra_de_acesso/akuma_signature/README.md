# Akuma Signature

Painel Tampermonkey para orquestrar os scripts de barra de acesso com uma interface unica no topo do Tribal Wars.

## Instalar

Abra este arquivo no navegador depois de publicar o repo:

```txt
https://cdn.jsdelivr.net/gh/joelkalil/tribal-wars-akuma@main/src/scripts/barra_de_acesso/akuma_signature/akuma_signature_panel.user.js
```

## Estrutura

- `akuma_signature_panel.user.js`: userscript principal do Tampermonkey.
- `registry.js`: lista de arquivos descriptor carregados pelo painel.
- `scripts/`: um descriptor por script original.

## Como Funciona

O painel carrega o `registry.js`, importa todos os descriptors de `scripts/`, lista tudo na interface e executa o script escolhido buscando o arquivo original em `../originals/`.

Os scripts com configuracao inicial, como webhook ou formato de etiqueta, recebem essa configuracao no descriptor antes de executar.
