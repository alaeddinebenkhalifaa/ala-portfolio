// Flattens an item's per-language sub-object onto its shared/language-agnostic fields.
export function localize(items, lang) {
  return items.map(item => ({ ...item, ...item[lang] }))
}
