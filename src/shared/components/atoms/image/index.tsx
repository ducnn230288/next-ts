'use client';
import classNames from 'classnames';
import { useEffect } from 'react';

import type Props from './type';

let timeoutImage: ReturnType<typeof setTimeout>;
const lightbox: Record<string, { destroy: () => void } | undefined> = {};

const Component = ({ src, className, alt, selector, width, height }: Props) => {
  useEffect(() => {
    if (timeoutImage) {
      clearTimeout(timeoutImage);
    }
    timeoutImage = setTimeout(() => {
      const classLightbox = '.' + (selector ?? 'glightbox');
      if (lightbox[classLightbox]) lightbox[classLightbox].destroy();
      lightbox[classLightbox] = GLightbox({ selector: classLightbox });
    }, 400);
  }, [src]);

  return (
    <a href={src} className={classNames('glightbox', selector)}>
      <img width={width} height={height} alt={alt ?? ''} src={src} className={className} />
    </a>
  );
};

export default Component;
