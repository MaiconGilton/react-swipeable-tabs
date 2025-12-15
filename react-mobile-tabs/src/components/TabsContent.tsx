import React, {
  type ReactElement,
  type TouchEvent,
  useRef,
  useState,
} from 'react';
import { useTabs } from './Tabs';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  children,
  className,
  style,
  ...props
}) => {
  const {
    activeTab,
    setActiveTab,
    tabsOrder,
    notifySwipe,
    threshold,
    gesturesEnabled,
  } = useTabs();
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate index
  const activeIndex = tabsOrder.indexOf(activeTab);
  const count = tabsOrder.length;

  const touchStartY = useRef<number | null>(null);
  const directionLock = useRef<'vertical' | 'horizontal' | null>(null);

  // Calculate current translate
  const getTranslateX = () => {
    const baseTranslate = (-100 / count) * activeIndex;

    if (
      !isDragging ||
      touchStart === null ||
      touchCurrent === null ||
      !containerRef.current
    ) {
      return `${baseTranslate}%`;
    }

    const deltaX = touchCurrent - touchStart;
    const containerWidth = containerRef.current.offsetWidth * count;
    const deltaPercent = (deltaX / containerWidth) * 100;

    return `${baseTranslate + deltaPercent}%`;
  };

  /* Common Logic */
  const handleStart = (x: number, y: number) => {
    if (!gesturesEnabled) return;
    setTouchStart(x);
    setTouchCurrent(x);
    touchStartY.current = y;
    directionLock.current = null;
    setIsDragging(false);
  };

  const handleMove = (x: number, y: number, cancelCallback?: () => void) => {
    if (!gesturesEnabled) return;
    // ... (rest of logic relies on touchStart being set, which handleStart controls)
    if (directionLock.current === 'vertical') return;

    if (directionLock.current === 'horizontal') {
      if (cancelCallback) cancelCallback();
      setTouchCurrent(x);

      // Notify swipe progress
      if (touchStart !== null && containerRef.current) {
        const deltaX = x - touchStart;
        const containerWidth = containerRef.current.offsetWidth;
        const ratio = -(deltaX / containerWidth);
        notifySwipe(ratio);
      }
      return;
    }

    if (touchStart !== null && touchStartY.current !== null) {
      const diffX = Math.abs(x - touchStart);
      const diffY = Math.abs(y - touchStartY.current);
      const moveThreshold = 10;

      if (diffX > moveThreshold || diffY > moveThreshold) {
        if (diffY > diffX) {
          directionLock.current = 'vertical';
        } else {
          directionLock.current = 'horizontal';
          setIsDragging(true);
        }
      }
    }
  };

  const handleEnd = () => {
    if (!gesturesEnabled) return;
    directionLock.current = null;
    touchStartY.current = null;

    if (!isDragging || touchStart === null || touchCurrent === null) {
      setIsDragging(false);
      setTouchStart(null);
      setTouchCurrent(null);
      return;
    }

    const currentIndex = activeIndex;
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === count - 1;

    const diffX = touchStart - touchCurrent; // Positive for left swipe, negative for right swipe
    const absDiffX = Math.abs(diffX);

    const shouldChange = absDiffX > threshold;

    let changed = false;

    if (shouldChange) {
      if (diffX > 0) {
        // Dragged Left -> Go Next
        if (!isLast) {
          const nextTab = tabsOrder[currentIndex + 1];
          setActiveTab(nextTab);
          changed = true;
        }
      } else if (diffX < 0) {
        // Dragged Right -> Go Prev
        if (!isFirst) {
          const prevTab = tabsOrder[currentIndex - 1];
          setActiveTab(prevTab);
          changed = true;
        }
      }
    }

    // If we didn't change tab (cancelled or boundary), animate back to 0
    if (!changed) {
      notifySwipe(0, true);
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchCurrent(null);
  };

  /* Touch Handlers */
  const handleTouchStart = (e: TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY, () => {
      if (e.cancelable) e.preventDefault();
    });
  };

  /* Mouse Handlers */
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStart === null) return; // Only track if mouse is down
    handleMove(e.clientX, e.clientY, () => {
      e.preventDefault();
    });
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) handleEnd();
  };

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        touchAction: gesturesEnabled ? 'pan-y' : 'auto',
        cursor: gesturesEnabled
          ? isDragging
            ? 'grabbing'
            : 'grab'
          : 'default',
        ...style,
      }}
      ref={containerRef}
      onTouchStart={gesturesEnabled ? handleTouchStart : undefined}
      onTouchMove={gesturesEnabled ? handleTouchMove : undefined}
      onTouchEnd={gesturesEnabled ? handleEnd : undefined}
      onTouchCancel={gesturesEnabled ? handleEnd : undefined}
      onMouseDown={gesturesEnabled ? handleMouseDown : undefined}
      onMouseMove={gesturesEnabled ? handleMouseMove : undefined}
      onMouseUp={gesturesEnabled ? handleMouseUp : undefined}
      onMouseLeave={gesturesEnabled ? handleMouseLeave : undefined}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          width: `${count * 100}%`,
          transform: `translateX(${getTranslateX()})`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          height: '100%',
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return (
              <div
                style={{
                  width: count > 0 ? `${100 / count}%` : '100%',
                  flexShrink: 0,
                  height: '100%',
                }}
              >
                {React.cloneElement(child as ReactElement<any>, {
                  style: { height: '100%', width: '100%' },
                })}
              </div>
            );
          }
          return child;
        })}
      </div>
    </div>
  );
};
