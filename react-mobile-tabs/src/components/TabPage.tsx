import React, { type ReactNode } from 'react';
import { useTabs } from './Tabs';

export interface TabPageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  value: string;
  children: ReactNode | ((props: { isActive: boolean }) => ReactNode);
  className?: string;
}

export const TabPage: React.FC<TabPageProps> = ({
  value,
  children,
  className,
  style,
  ...props
}) => {
  const { activeTab, direction, lazy: globalLazy } = useTabs();
  const isActive = activeTab === value;
  const [hasBeenActive, setHasBeenActive] = React.useState(isActive);

  React.useEffect(() => {
    if (isActive && !hasBeenActive) {
      setHasBeenActive(true);
    }
  }, [isActive, hasBeenActive]);

  const isFunctionChild = typeof children === 'function';

  // Render Logic:
  // 1. If child is a function, we ALWAYS render the wrapper so the function can decide
  // 2. If it's a standard node, we obey strict lazy/persistent logic
  const shouldRenderWrapper = isFunctionChild || !globalLazy || hasBeenActive;

  if (!shouldRenderWrapper) return null;

  const content = isFunctionChild
    ? (children as Function)({ isActive })
    : children;

  return (
    <div
      role="tabpanel"
      className={className}
      data-state={isActive ? 'active' : 'inactive'}
      data-move-direction={direction}
      style={{
        ...style,
      }}
      {...props}
    >
      {content}
    </div>
  );
};
