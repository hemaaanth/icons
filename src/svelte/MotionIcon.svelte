<script>
  let {
    definition,
    size = 24,
    strokeWidth = 2,
    title,
    "aria-label": ariaLabel,
    class: className = "",
    ...rest
  } = $props();

  const escapeText = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-label={ariaLabel}
  aria-hidden={title || ariaLabel ? undefined : "true"}
  role={title || ariaLabel ? "img" : undefined}
  class={`mi mi-${definition.slug} ${className}`.trim()}
  {...rest}
>
  {@html `${title ? `<title>${escapeText(title)}</title>` : ""}${definition.body}`}
</svg>
