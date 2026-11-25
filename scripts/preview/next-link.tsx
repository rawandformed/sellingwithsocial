/* Stand-in for next/link in the single-file preview: a plain <a>. */
export default function Link({ href, ...rest }: React.ComponentProps<"a">) {
  const h = typeof href === "string" && href.startsWith("/#") ? href.slice(1) : href;
  return <a href={h} {...rest} />;
}
