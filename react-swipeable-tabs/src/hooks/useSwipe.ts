import { useEffect, useRef } from 'react';

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export const useSwipe = (
  ref: React.RefObject<HTMLElement>,
  { onSwipeLeft, onSwipeRight, threshold = 50 }: UseSwipeOptions,
) => {
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef<boolean>(false);

  const minSwipeDistance = threshold;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onTouchStart = (e: TouchEvent) => {
      touchEnd.current = null;
      touchStart.current = e.targetTouches[0].clientX;
      touchStartY.current = e.targetTouches[0].clientY;
      isHorizontalSwipe.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStart.current || !touchStartY.current) return;

      touchEnd.current = e.targetTouches[0].clientX;
      const currentY = e.targetTouches[0].clientY;

      const deltaX = Math.abs(e.targetTouches[0].clientX - touchStart.current);
      const deltaY = Math.abs(currentY - touchStartY.current);

      // Determine if this is primarily a horizontal swipe
      if (deltaX > deltaY && deltaX > 10) {
        isHorizontalSwipe.current = true;
      }

      // Prevent vertical scrolling if horizontal swipe is detected
      if (isHorizontalSwipe.current) {
        e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      if (!touchStart.current || !touchEnd.current) return;

      const distance = touchStart.current - touchEnd.current;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft();
      }

      if (isRightSwipe && onSwipeRight) {
        onSwipeRight();
      }

      // Reset horizontal swipe flag
      isHorizontalSwipe.current = false;
    };

    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove, { passive: false });
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref, onSwipeLeft, onSwipeRight, minSwipeDistance]);
};
