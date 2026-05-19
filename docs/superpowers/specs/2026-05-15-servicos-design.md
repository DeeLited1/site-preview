# Seção Serviços — Design Spec
**Data:** 2026-05-15  
**Projeto:** Portfólio Daniele Pimentel  
**Status:** Aprovado

---

## Objetivo

Adicionar a seção `#serviços` ao portfólio, listando os serviços oferecidos por Daniele Pimentel com hierarquia clara entre serviços principais e secundários, encerrando com CTA para contato.

---

## Conteúdo

### Serviços principais (numerados 01–04)

| # | Título | Descrição |
|---|--------|-----------|
| 01 | Montagem | Construção narrativa do corte bruto ao corte fino: ritmo, emoção e coerência de cada cena. |
| 02 | Assistência de Montagem | Suporte técnico e criativo ao editor — do ingest e organização até a preparação para o corte. |
| 03 | Colorização | Identidade visual de cor do filme: da correção técnica à paleta que reforça a narrativa. |
| 04 | Finalização | Entrega do projeto nos formatos exigidos — cinema, TV, streaming ou web. |

### Serviços secundários (sem número, menor destaque)

- Direção de produtos documentais
- Edição de produto para TV e Web

### CTA

Botão "falar comigo" linkando para `#contact`.

---

## Layout

**Estrutura vertical (lista editorial numerada):**

```
[label]        "o que eu faço"  — font-general, uppercase, text-[#00e5ff], tracking-[4px], text-sm
[título]       AnimatedTitle com "Ser<b>v</b>iços"
[lista 01-04]  cada item é uma linha horizontal com linha separadora entre eles
[separador]    linha sutil (border-white/10)
[secundários]  texto corrido menor, opacity-50, separados por " · "
[CTA]          botão centralizado "falar comigo" → #contact
```

**Anatomia de cada item principal:**

```
[número]   "01"  — text-[#00e5ff], font-zentry, text-sm, opacity-60
[título]   "MONTAGEM"  — font-zentry, text-3xl md:text-5xl, text-blue-50, uppercase
[desc]     frase curta  — font-circular-web, text-sm md:text-base, text-blue-50/50, max-w-md
```

Layout de cada item: número à esquerda fixo (w-16), título + descrição em coluna à direita. Linha divisória `border-white/10` entre os itens.

---

## Animações

- Entrada com GSAP ScrollTrigger: cada item desliza `y: 40 → 0` com `opacity: 0 → 1`, stagger de 0.12s
- Trigger: `start: "top 80%"`

---

## Integração

- **Arquivo novo:** `src/components/Services.jsx`
- **App.jsx:** importar e inserir `<Services />` entre `<Features />` e `<Story />`
- **Navbar:** `#serviços` já existe no `navItems` — o `id="serviços"` na seção resolve o link automaticamente

---

## Design tokens utilizados

| Token | Valor |
|-------|-------|
| Acento | `#00e5ff` |
| Texto principal | `text-blue-50` |
| Texto secundário | `text-blue-50/50` |
| Fundo | `bg-black` |
| Fonte títulos | `font-zentry` |
| Fonte corpo | `font-circular-web` |
| Separadores | `border-white/10` |
