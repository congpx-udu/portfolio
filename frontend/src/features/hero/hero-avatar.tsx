import Image from 'next/image';

import { siteConfig } from '@/config/site';

export function HeroAvatar() {
  return (
    <div className="relative">
      <span aria-hidden className="absolute -inset-8 rounded-full bg-primary/30 blur-3xl" />
      <div className="relative rounded-full bg-gradient-green-pink p-1 shadow-card">
        <div className="relative size-44 overflow-hidden rounded-full bg-muted xs:size-56 lg:size-80 xl:size-96">
          <Image
            src={siteConfig.avatar}
            alt={`Ảnh chân dung ${siteConfig.name}`}
            fill
            priority
            sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 450px) 224px, 176px"
            // Keep the face in frame when the portrait photo is cropped to a circle.
            className="object-cover object-[50%_25%]"
          />
        </div>
      </div>
    </div>
  );
}
