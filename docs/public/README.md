# React Responsive Tabs

A highly performant, accessible, and swipeable tab component for React that mimics native mobile gestures.

![License](https://img.shields.io/npm/l/react-responsive-tabs)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Size](https://img.shields.io/bundlephobia/minzip/react-responsive-tabs)

**react-responsive-tabs** brings the fluid feel of native mobile tabs to the web. It features real-time 1:1 swipe tracking, smooth interruptions, and fully customizable animations, all while maintaining strict accessibility standards.

## Features

- 👆 **Native-like Gestures**: Real-time 1:1 swipe tracking with resistance and velocity handling.
- ⚡ **Performance**: Optimized for 60fps+ animations using hardware-accelerated transforms.
- 🎨 **Headless & Flexible**: Full control over styling. Comes unstyled by default.
- ♿ **Accessible**: Follows WAI-ARIA patterns for tab functionality.
- 📦 **Lightweight**: Zero heavy dependencies. Tiny bundle size.
- 🔄 **Smart Recovery**: Smoothly animates back if a drag is cancelled.

## Installation

```bash
npm install react-responsive-tabs
# or
yarn add react-responsive-tabs
# or
pnpm add react-responsive-tabs
```

## Quick Start

```tsx
import { Tab, Tabs } from 'react-responsive-tabs';

function App() {
  return (
    <Tabs defaultValue="home">
      <Tabs.Buttons>
        <Tab.Button value="home">Home</Tab.Button>
        <Tab.Button value="profile">Profile</Tab.Button>
      </Tabs.Buttons>

      <Tabs.Content>
        <Tab.Page value="home">
          <div>Home Content</div>
        </Tab.Page>
        <Tab.Page value="profile">
          <div>Profile Content</div>
        </Tab.Page>
      </Tabs.Content>
    </Tabs>
  );
}
```

## API Reference

### `<Tabs>`
The root component that manages state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | - | **Required**. The value of the tab to show initially. |
| `className` | `string` | - | Optional CSS class name. |
| `onChange` | `(value: string) => void` | - | Callback fired when the active tab changes. |
| `lazy` | `boolean` | `false` | Whether to lazy load tab pages. |
| `threshold` | `number` | `50` | Swipe threshold in pixels. |
| `gesturesEnabled` | `boolean` | `true` | Whether swipe gestures are enabled. |

### `<Tabs.Buttons>`
Container for the tab triggers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Optional CSS class name. |
| `onTabIndicatorChange` | `(rect: Rect, shouldAnimate: boolean) => void` | - | Callback to update a custom active tab indicator. `Rect` contains `left` and `width`. |

### `<Tab.Button>`
The button that activates a tab.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | **Required**. A unique value that identifies the tab. |
| `children` | `ReactNode \| ((props: { isActive: boolean }) => ReactNode)` | - | Render function supported for dynamic styling. |
| `className` | `string` | - | Optional CSS class name. |
| `activeClassName` | `string` | `'active'` | Class name appended when the tab is active. |

### `<Tabs.Content>`
Wrapper for the swipeable pages.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Optional CSS class name. |

### `<Tab.Page>`
The content for a specific tab.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | **Required**. The value matching the associated trigger. |
| `children` | `ReactNode \| ((props: { isActive: boolean }) => ReactNode)` | - | Children to render. Can be a function to receive active state. |
| `className` | `string` | - | Optional CSS class name. |

> **Note on Behavior**: `Tab.Page` is lazy by default (if `Tabs lazy={true}`). Content is only mounted when the tab becomes active. Once mounted, it **stays mounted** (hidden via CSS) to preserve state.

## Custom Rendering Control

If you need full control over rendering (e.g., for complex animations or custom visibility logic), pass a function as the child of `Tab.Page`.

**Note**: When using a function child, `Tab.Page` **always** renders its wrapper immediately, upgrading the rendering decision to your function.

```tsx
<Tab.Page value="profile">
  {({ isActive }) => (
    <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      <HeavyProfileComponent active={isActive} />
    </div>
  )}
</Tab.Page>
```

## Advanced Usage: Animated Indicator

To implement a sliding indicator (like Material UI or iOS Segments), use the `onTabIndicatorChange` prop on `Tabs.Buttons`.

```tsx
import { useRef } from 'react';
import { Tab, Tabs } from 'react-responsive-tabs';

function AnimatedTabs() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  return (
    <Tabs defaultValue="tab1">
      <div className="relative border-b">
        <Tabs.Buttons
          className="flex gap-4"
          onTabIndicatorChange={(rect, shouldAnimate) => {
             // 🚀 Direct DOM manipulation for maximum performance
            if (indicatorRef.current) {
              indicatorRef.current.style.width = `${rect.width}px`;
              indicatorRef.current.style.transform = `translateX(${rect.left}px)`;
              indicatorRef.current.style.transition = shouldAnimate 
                ? 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'none';
            }
          }}
        >
          <div 
            ref={indicatorRef} 
            className="absolute bottom-0 h-0.5 bg-blue-600 transition-all" 
          />
          
          <Tab.Button value="tab1" className="px-4 py-2">Tab 1</Tab.Button>
          <Tab.Button value="tab2" className="px-4 py-2">Tab 2</Tab.Button>
        </Tabs.Buttons>
      </div>
      
      <Tabs.Content>
        <Tab.Page value="tab1">Content 1</Tab.Page>
        <Tab.Page value="tab2">Content 2</Tab.Page>
      </Tabs.Content>
    </Tabs>
  );
}
```

## License

MIT
