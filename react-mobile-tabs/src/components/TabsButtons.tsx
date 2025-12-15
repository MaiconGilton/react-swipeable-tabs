import React, { type ReactNode } from 'react';
import { useTabs } from './Tabs';

export interface TabsButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  showIndicator?: boolean;
  indicatorClassName?: string;
  onTabIndicatorChange?: (
    rect: { left: number; width: number },
    shouldAnimate?: boolean,
  ) => void;
}

export const TabsButtons: React.FC<TabsButtonsProps> = ({
  children,
  className,
  showIndicator = true,
  indicatorClassName,
  onTabIndicatorChange,
  ...props
}) => {
  const { setTabsOrder, activeTab, tabsOrder, subscribeSwipe } = useTabs();
  const listRef = React.useRef<HTMLDivElement>(null);
  const tabRects = React.useRef<Map<string, { left: number; width: number }>>(
    new Map(),
  );
  const indicatorRef = React.useRef<HTMLDivElement>(null);

  // 1. Register tabs order
  React.useEffect(() => {
    const values: string[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.value) {
        values.push(child.props.value);
      }
    });
    setTabsOrder(values);
  }, [children, setTabsOrder]);

  // 2. Measure tabs helper
  const measureTabs = React.useCallback(() => {
    if (!listRef.current) return;
    const map = new Map();

    // Simplest approach: Query all buttons and assume they match tabsOrder check
    const buttons = listRef.current.querySelectorAll('button[role="tab"]');
    buttons.forEach((btn, index) => {
      const val = tabsOrder[index];
      if (val) {
        map.set(val, {
          left: (btn as HTMLElement).offsetLeft,
          width: (btn as HTMLElement).offsetWidth,
        });
      }
    });
    tabRects.current = map;
  }, [tabsOrder]);

  // 3. Update indicator helper
  const updateIndicator = React.useCallback(
    (progress: number, shouldAnimate: boolean) => {
      if (tabRects.current.size === 0) return;

      const activeIndex = tabsOrder.indexOf(activeTab);
      if (activeIndex === -1) return;

      const currentRect = tabRects.current.get(activeTab);
      if (!currentRect) return;

      let targetRect = currentRect;
      let ratio = progress;

      // Moving to Next (progress > 0)
      if (progress > 0 && activeIndex < tabsOrder.length - 1) {
        const nextTab = tabsOrder[activeIndex + 1];
        targetRect = tabRects.current.get(nextTab) || currentRect;
      }
      // Moving to Prev (progress < 0)
      else if (progress < 0 && activeIndex > 0) {
        const prevTab = tabsOrder[activeIndex - 1];
        targetRect = tabRects.current.get(prevTab) || currentRect;
        ratio = Math.abs(ratio); // We want 0-1 for interpolation logic
      } else {
        // Boundary or no move
        ratio = 0;
      }

      // Linear Interpolation
      const left =
        currentRect.left + (targetRect.left - currentRect.left) * ratio;
      const width =
        currentRect.width + (targetRect.width - currentRect.width) * ratio;

      if (showIndicator && indicatorRef.current) {
        indicatorRef.current.style.width = `${width}px`;
        indicatorRef.current.style.transform = `translateX(${left}px)`;
        indicatorRef.current.style.transition = shouldAnimate
          ? 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          : 'none';
      }

      onTabIndicatorChange?.({ left, width }, shouldAnimate);
    },
    [activeTab, tabsOrder, showIndicator, onTabIndicatorChange],
  );

  // 4. Stable ResizeObserver
  const handlerRef = React.useRef({ measureTabs, updateIndicator });
  handlerRef.current = { measureTabs, updateIndicator };

  React.useEffect(() => {
    const handleResize = () => {
      handlerRef.current.measureTabs();
      handlerRef.current.updateIndicator(0, false); // No animation on resize
    };

    const element = listRef.current;
    if (!element) return;

    const observer = new ResizeObserver(handleResize);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 5. Initial Measure & Active Tab Change (Animate)
  React.useLayoutEffect(() => {
    measureTabs();
    updateIndicator(0, true);
  }, [updateIndicator, measureTabs]);

  // 5. Subscribe to swipe
  React.useEffect(() => {
    return subscribeSwipe((progress, shouldAnimate) => {
      updateIndicator(progress, shouldAnimate);
    });
  }, [subscribeSwipe, updateIndicator]);

  return (
    <div
      className={`relative ${className}`}
      role="tablist"
      ref={listRef}
      {...props}
    >
      <div
        ref={indicatorRef}
        className={`${indicatorClassName} absolute bottom-0 h-0.5 bg-blue-600`}
      />

      {children}
    </div>
  );
};
