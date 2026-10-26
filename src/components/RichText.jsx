// Texto con formato mínimo: **negrita**, `código` y {{Ctrl+K}} para teclas
const TOKEN = /(\*\*.+?\*\*|`.+?`|\{\{.+?\}\})/g;

function Keys({ combo }) {
  const keys = combo.length > 1 ? combo.split('+') : [combo];
  return (
    <span className="inline-flex items-center gap-0.5 align-baseline">
      {keys.map((k, i) => (
        <kbd
          key={`${k}-${i}`}
          className="px-1.5 py-0.5 rounded-md border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-main)] text-[0.8em] font-semibold font-sans shadow-[var(--shadow-sm)]"
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}

export function RichText({ text }) {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-[var(--text-main)]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--primary)] font-mono text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('{{') && part.endsWith('}}')) {
      return <Keys key={i} combo={part.slice(2, -2)} />;
    }
    return part;
  });
}
