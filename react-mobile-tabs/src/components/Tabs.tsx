import type React from 'react';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabsOrder: string[];
  setTabsOrder: (order: string[]) => void;
  direction: 'left' | 'right' | null;
  subscribeSwipe: (
    callback: (progress: number, shouldAnimate: boolean) => void,
  ) => () => void;
  notifySwipe: (progress: number, shouldAnimate?: boolean) => void;
  lazy: boolean;
  threshold: number;
  gesturesEnabled: boolean;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: ReactNode;
  defaultValue: string;
  className?: string;
  onChange?: (value: string) => void;
  /**
   * Whether to lazy load tab content.
   * If true, content is only mounted when the tab becomes active.
   * @default false
   */
  lazy?: boolean;
  /**
   * Threshold in pixels to trigger tab switch
   * @default 50
   */
  threshold?: number;
  /**
   * Whether swipe gestures are enabled
   * @default true
   */
  gesturesEnabled?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  className,
  onChange,
  lazy = false,
  threshold = 50,
  gesturesEnabled = true,
  ...props
}) => {
  const [activeTab, setActiveTabState] = useState(defaultValue);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [tabsOrder, setTabsOrder] = useState<string[]>([]);

  const swipeCallbacks = useRef<
    Set<(progress: number, shouldAnimate: boolean) => void>
  >(new Set());

  const subscribeSwipe = useCallback(
    (callback: (progress: number, shouldAnimate: boolean) => void) => {
      swipeCallbacks.current.add(callback);
      return () => {
        swipeCallbacks.current.delete(callback);
      };
    },
    [],
  );

  const notifySwipe = useCallback(
    (progress: number, shouldAnimate: boolean = false) => {
      swipeCallbacks.current.forEach((cb) => cb(progress, shouldAnimate));
    },
    [],
  );

  const setActiveTab = useCallback(
    (id: string) => {
      setActiveTabState((prev) => {
        const prevIndex = tabsOrder.indexOf(prev);
        const newIndex = tabsOrder.indexOf(id);
        if (prevIndex !== -1 && newIndex !== -1) {
          setDirection(newIndex > prevIndex ? 'right' : 'left');
        }
        return id;
      });
      if (onChange) {
        onChange(id);
      }
    },
    [onChange, tabsOrder],
  );

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        tabsOrder,
        setTabsOrder,
        direction,
        subscribeSwipe,
        notifySwipe,
        lazy,
        threshold,
        gesturesEnabled,
      }}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};
