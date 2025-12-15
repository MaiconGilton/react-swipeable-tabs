import {
  Accessibility,
  Check,
  Copy,
  Fingerprint,
  Heart,
  Monitor,
  Palette,
  Smartphone,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { DashboardExample } from './examples/DashboardExample';
import { MobileAppExample } from './examples/MobileAppExample';
import { SimpleTabsExample } from './examples/SimpleTabsExample';
import './App.css';

function App() {
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install react-responsive-tabs');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-gray-200/80 dark:border-white/5 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="logo.svg" alt="logo" className="size-8" />
            <span>React Responsive Tabs</span>

            <div className="hidden sm:flex items-center px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                v0.1.0
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <a
              href="#documentation"
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/maicongilton/react-responsive-tabs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:hover:shadow-white/10"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <title>GitHub</title>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>Star on GitHub</span>
            </a>
            <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-1" />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 text-center">
          <div className="container">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
              Fluid feel of native
              <br />
              mobile tabs to the web
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              A high-performance, swipeable tab component enabling 1:1 touch
              tracking and 60fps animations. Unstyled, accessible, and
              lightweight.
            </p>
            <button
              type="button"
              className="bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-lg px-6 py-3 font-mono text-sm inline-flex items-center gap-3 cursor-pointer hover:border-primary transition-colors group relative w-full sm:w-auto"
              onClick={handleCopy}
            >
              <span className="select-none text-primary">$</span>
              <code className="text-gray-900 dark:text-white">
                npm install react-responsive-tabs
              </code>
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-1 rounded-md"
                aria-label="Copy to clipboard"
              >
                {isCopied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </button>
          </div>
        </section>

        <section className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
            {[
              {
                icon: Fingerprint,
                title: '1:1 Touch Tracking',
                description:
                  'Bind gestures directly to animations. Swipes feel stuck to your finger, not just triggered.',
              },
              {
                icon: Zap,
                title: 'Hardware Accelerated',
                description:
                  'Animations run on the compositor thread for butter-smooth 60fps performance on low-end devices.',
              },
              {
                icon: Palette,
                title: 'Headless UI',
                description:
                  'Zero styles included. You get the logic and behavior; you control the look with CSS or Tailwind.',
              },
              {
                icon: Accessibility,
                title: 'Fully Accessible',
                description:
                  'Follows WAI-ARIA authoring practices for tabs. Keyboard navigable and screen-reader friendly.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] p-6 rounded-xl hover:border-primary transition-colors group shadow-sm dark:shadow-none"
              >
                <div className="mb-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-gray-200 dark:border-[#333]">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                  Mobile Application
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                  {isMobileMode
                    ? 'Experience native-like swipe gestures with 1:1 touch tracking and smooth 60fps animations. Try swiping between tabs or using the bottom navigation.'
                    : 'See how tabs can transform a standard website into a mobile app experience. Toggle to mobile mode to try swipeable navigation with bottom tabs.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMode(!isMobileMode)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                {isMobileMode ? (
                  <Monitor size={18} />
                ) : (
                  <Smartphone size={18} />
                )}
                {isMobileMode
                  ? 'Switch to Desktop View'
                  : 'Switch to Mobile Mode'}
              </button>
            </div>

            <div className="border border-gray-200 dark:border-[#333] rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] transition-all duration-500">
              <MobileAppExample isMobileView={isMobileMode} />
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-gray-200 dark:border-[#333]">
          <div className="container">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                Desktop Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Horizontal tabs with nested tab groups. Shows how the component
                handles complex layouts and maintains smooth animations across
                multiple tab levels.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-[#333] rounded-2xl overflow-hidden">
              <div className="h-[600px] overflow-hidden  relative">
                <DashboardExample />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-gray-200 dark:border-[#333]">
          <div className="container">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                Simple Implementation
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Basic tab implementation with code preview. See the minimal
                setup required and toggle between live preview and source code
                to understand the API.
              </p>
            </div>

            <SimpleTabsExample />
          </div>
        </section>

        <section
          id="documentation"
          className="py-16 border-t border-gray-200 dark:border-[#333]"
        >
          <div className="container">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                API Reference
              </h2>
            </div>

            {/* Tabs Component */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] p-6 rounded-xl hover:border-primary transition-colors group shadow-sm dark:shadow-none mb-10">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white font-mono">
                &lt;Tabs&gt;
              </h4>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                The root component that manages tab state.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#333]">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Prop
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Type
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Default
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-100 dark:border-[#222]">
                      <td className="py-2 px-3 font-mono text-xs">
                        defaultValue
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">string</td>
                      <td className="py-2 px-3 font-mono text-xs">-</td>
                      <td className="py-2 px-3">
                        <strong>Required.</strong> Initial tab value.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-[#222]">
                      <td className="py-2 px-3 font-mono text-xs">onChange</td>
                      <td className="py-2 px-3 font-mono text-xs">
                        (value: string) =&gt; void
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">-</td>
                      <td className="py-2 px-3">
                        Callback when active tab changes.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-[#222]">
                      <td className="py-2 px-3 font-mono text-xs">lazy</td>
                      <td className="py-2 px-3 font-mono text-xs">boolean</td>
                      <td className="py-2 px-3 font-mono text-xs">false</td>
                      <td className="py-2 px-3">
                        Whether to lazy load tab pages.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-[#222]">
                      <td className="py-2 px-3 font-mono text-xs">threshold</td>
                      <td className="py-2 px-3 font-mono text-xs">number</td>
                      <td className="py-2 px-3 font-mono text-xs">50</td>
                      <td className="py-2 px-3">Swipe threshold in pixels.</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">
                        gesturesEnabled
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">boolean</td>
                      <td className="py-2 px-3 font-mono text-xs">true</td>
                      <td className="py-2 px-3">
                        Whether swipe gestures are enabled.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabs.Buttons Component */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] p-6 rounded-xl hover:border-primary transition-colors group shadow-sm dark:shadow-none mb-10">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white font-mono">
                &lt;Tabs.Buttons&gt;
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Container for the tab triggers with optional built-in animated
                indicator.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#333]">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Prop
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Type
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Default
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-100 dark:border-[#222]">
                      <td className="py-2 px-3 font-mono text-xs">
                        showIndicator
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">boolean</td>
                      <td className="py-2 px-3 font-mono text-xs">true</td>
                      <td className="py-2 px-3">
                        Whether to show the built-in animated indicator.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-[#222]">
                      <td className="py-2 px-3 font-mono text-xs">
                        indicatorClassName
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">string</td>
                      <td className="py-2 px-3 font-mono text-xs">-</td>
                      <td className="py-2 px-3">
                        Optional CSS class name for the built-in indicator.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">
                        onTabIndicatorChange
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">
                        (rect, shouldAnimate) =&gt; void
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">-</td>
                      <td className="py-2 px-3">
                        Callback for custom indicator. Rect contains left and
                        width.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tab.Button Component */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] p-6 rounded-xl hover:border-primary transition-colors group shadow-sm dark:shadow-none mb-10">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white font-mono">
                &lt;Tab.Button&gt;
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                The button that activates a tab.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#333]">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Prop
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Type
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-100 dark:border-[#222]">
                      <td className="py-2 px-3 font-mono text-xs">value</td>
                      <td className="py-2 px-3 font-mono text-xs">string</td>
                      <td className="py-2 px-3">
                        <strong>Required.</strong> Unique tab identifier.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">children</td>
                      <td className="py-2 px-3 font-mono text-xs">
                        ReactNode | Function
                      </td>
                      <td className="py-2 px-3">
                        Content or render function with isActive state.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tab.Page Component */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] p-6 rounded-xl hover:border-primary transition-colors group shadow-sm dark:shadow-none">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white font-mono">
                &lt;Tab.Page&gt;
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                The content for a specific tab. Once mounted, stays mounted
                (hidden via CSS) to preserve state.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#333]">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Prop
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Type
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-100 dark:border-[#222]">
                      <td className="py-2 px-3 font-mono text-xs">value</td>
                      <td className="py-2 px-3 font-mono text-xs">string</td>
                      <td className="py-2 px-3">
                        <strong>Required.</strong> Matches Tab.Button value.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">children</td>
                      <td className="py-2 px-3 font-mono text-xs">
                        ReactNode | Function
                      </td>
                      <td className="py-2 px-3">
                        Content or function receiving isActive state.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-10 text-gray-500 border-t border-gray-200 dark:border-[#333]">
        <p className="flex items-center justify-center gap-2">
          Built with <Heart size={16} className="fill-red-500 text-red-500" />{' '}
          for the React community.
        </p>
      </footer>
    </div>
  );
}

export default App;
