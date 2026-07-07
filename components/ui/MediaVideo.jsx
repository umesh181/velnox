'use client';

import { forwardRef } from 'react';

const SHOWREEL_SRC = '/media/velnox_video.mp4';

const MediaVideo = forwardRef(function MediaVideo({ className = '', ...props }, ref) {
  return (
    <video
      ref={ref}
      src={SHOWREEL_SRC}
      loop
      muted
      playsInline
      preload="none"
      className={className}
      onClick={(e) => e.stopPropagation()}
      onError={(e) => {
        // Prevent media error events from bubbling into React's runtime overlay.
        e.stopPropagation();
      }}
      {...props}
    />
  );
});

export { SHOWREEL_SRC };
export default MediaVideo;
