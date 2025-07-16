'use client';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect } from 'react';

import type Props from './type';

let timeoutCImage: ReturnType<typeof setTimeout>;
const lightbox: Record<string, typeof GLightbox> = {};

const Component = ({ src, className, alt, selector, ...props }: Props) => {
  useEffect(() => {
    if (timeoutCImage) {
      clearTimeout(timeoutCImage);
    }
    timeoutCImage = setTimeout(() => {
      const classLightbox = '.' + (selector ?? 'glightbox');
      if (lightbox[classLightbox]) lightbox[classLightbox].destroy();
      lightbox[classLightbox] = GLightbox({ selector: classLightbox });
    }, 400);
  }, [src]);

  return (
    <a href={src} className={classNames('glightbox', selector)}>
      <Image {...props} alt={alt ?? ''} src={src} className={className} />
    </a>
  );
};

export default Component;
