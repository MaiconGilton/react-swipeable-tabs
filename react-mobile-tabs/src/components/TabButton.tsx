import type React from 'react';
import type { ReactNode } from 'react';
import { useTabs } from './Tabs';

export interface TabButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  value: string;
  children: ReactNode | ((props: { isActive: boolean }) => ReactNode);
  className?: string;
  activeClassName?: string;
}

export const TabButton: React.FC<TabButtonProps> = ({
  value,
  children,
  className,
  activeClassName = 'active',
  onClick,
  ...props
}) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  const content =
    typeof children === 'function' ? children({ isActive }) : children;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={`${className || ''} ${isActive ? activeClassName : ''}`}
      onClick={(e) => {
        setActiveTab(value);
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {content}
    </button>
  );
};
