'use client';
import classNames from 'classnames';
import { useEffect } from 'react';

import Image from 'next/image';
import './style.scss';
import type Props from './type';

let timeoutImage: ReturnType<typeof setTimeout>;
const lightbox: Record<string, { destroy: () => void } | undefined> = {};

const Component = ({ src, className, alt, selector, width = 100, height = 100 }: Props) => {
  const setupLightbox = () => {
    if (timeoutImage) {
      clearTimeout(timeoutImage);
    }
    timeoutImage = setTimeout(() => {
      const classLightbox = '.' + (selector ?? 'glightbox');
      if (lightbox[classLightbox]) lightbox[classLightbox].destroy();
      lightbox[classLightbox] = GLightbox({ selector: classLightbox });
    }, 400);
  };

  useEffect(() => {
    setupLightbox();

    return () => {
      if (timeoutImage) clearTimeout(timeoutImage);
      const classLightbox = '.' + (selector ?? 'glightbox');
      if (lightbox[classLightbox]) lightbox[classLightbox].destroy();
    };
  }, [src]);

  return (
    <a href={src} className={classNames('glightbox', selector)}>
      <Image width={width} height={height} alt={alt ?? ''} src={src} className={className} />
    </a>
  );
};

export default Component;
