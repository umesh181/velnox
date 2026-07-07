import Image from 'next/image';

export default function MediaImage({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  sizes = '100vw',
  priority = false,
}) {
  const shared = {
    src,
    alt,
    className,
    priority,
    decoding: 'async',
    ...(priority ? {} : { loading: 'lazy' }),
  };

  if (fill) {
    return <Image {...shared} fill sizes={sizes} />;
  }

  return <Image {...shared} width={width} height={height} sizes={sizes} />;
}
