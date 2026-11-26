/* Stand-in for next/image in the single-file preview: a plain <img>. */
type Props = React.ComponentProps<"img"> & { preload?: boolean; priority?: boolean };

export default function Image({ preload, priority, alt = "", ...rest }: Props) {
  void preload;
  void priority;
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} {...rest} />;
}
