'use client';

import { forwardRef } from 'react';

const SHOWREEL_SRC = 'https://player.cloudinary.com/embed/?cloud_name=dnf6zexsv&public_id=velnox_video_rtud9u&player[autoplay]=true&player[muted]=true&player[loop]=true&player[controls]=false';

const MediaVideo = forwardRef(function MediaVideo({ className = '', ...props }, ref) {
  return (
    <iframe
      ref={ref}
      src={SHOWREEL_SRC}
      className={`${className} pointer-events-none`}
      allow="autoplay; fullscreen"
      frameBorder="0"
      {...props}
    />
  );
});

export { SHOWREEL_SRC };
export default MediaVideo;
