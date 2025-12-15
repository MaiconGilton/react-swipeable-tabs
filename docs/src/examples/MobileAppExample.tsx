import { Home, Search, User } from 'lucide-react';
import { useRef, useState } from 'react';
import { Tab, Tabs } from 'react-responsive-tabs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { MobileLogo } from '../components/Logo';
import PreviewCodeToggle from '../components/PreviewCodeToggle';

// --- Content Components ---

const FeedContent = ({ isDesktop = false }: { isDesktop?: boolean }) => (
  <>
    {isDesktop ? (
      <div className="pt-8 pb-6 px-8 max-w-6xl mx-auto">
        <h1 className="font-bold text-4xl tracking-tight text-gray-900 dark:text-white">
          Your Feed
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          Latest updates from your network.
        </p>
      </div>
    ) : (
      <header className="pt-6 pb-3 px-5 bg-white/90 dark:bg-[#111]/90 backdrop-blur-sm border-b border-black/5 dark:border-white/10 sticky top-0 z-10 transition-colors">
        <h1 className="font-bold text-2xl tracking-tight text-black dark:text-white">
          Feed
        </h1>
      </header>
    )}

    <div
      className={`flex flex-col gap-4 ${isDesktop ? 'px-8 pb-8 grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start' : 'p-4'}`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5"
        >
          <div className="h-40 bg-gray-100 dark:bg-[#222] rounded-xl mb-4 w-full" />
          <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-1/2" />
        </div>
      ))}
    </div>
  </>
);

const SearchContent = ({ isDesktop = false }: { isDesktop?: boolean }) => (
  <>
    {isDesktop ? (
      <div className="pt-8 pb-6 px-8 max-w-6xl mx-auto">
        <h1 className="font-bold text-4xl tracking-tight text-gray-900 dark:text-white">
          Search
        </h1>
      </div>
    ) : (
      <header className="pt-6 pb-3 px-5 bg-white/90 dark:bg-[#111]/90 backdrop-blur-sm border-b border-black/5 dark:border-white/10 sticky top-0 z-10 transition-colors">
        <h1 className="font-bold text-2xl tracking-tight text-black dark:text-white">
          Search
        </h1>
      </header>
    )}
    <div className={`p-4 ${isDesktop ? 'px-8 max-w-6xl mx-auto' : ''}`}>
      <div className="bg-gray-100 dark:bg-[#222] h-12 rounded-xl flex items-center px-4 md:max-w-md">
        <Search className="text-gray-400 w-5 h-5 mr-3" />
        <span className="text-gray-400">Search...</span>
      </div>
    </div>
  </>
);

const ProfileContent = ({ isDesktop = false }: { isDesktop?: boolean }) => (
  <>
    {isDesktop ? (
      <div className="pt-8 pb-6 px-8 max-w-6xl mx-auto">
        <h1 className="font-bold text-4xl tracking-tight text-gray-900 dark:text-white">
          Profile
        </h1>
      </div>
    ) : (
      <header className="pt-6 pb-3 px-5 bg-white/90 dark:bg-[#111]/90 backdrop-blur-sm border-b border-black/5 dark:border-white/10 sticky top-0 z-10 transition-colors">
        <h1 className="font-bold text-2xl tracking-tight text-black dark:text-white">
          Profile
        </h1>
      </header>
    )}
    <div className={`p-4 ${isDesktop ? 'px-8 max-w-6xl mx-auto' : ''}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 dark:bg-[#333] rounded-full" />
        <div>
          <div className="h-5 bg-gray-200 dark:bg-[#333] rounded w-32 mb-2" />
          <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-24" />
        </div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-12 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl w-full border border-gray-100 dark:border-white/5"
          />
        ))}
      </div>
    </div>
  </>
);

// --- Layouts ---

const DesktopLayout = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="h-full bg-white dark:bg-[#111] flex flex-col font-sans">
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 dark:border-[#333]">
          <div className="max-w-6xl mx-auto px-8 flex items-center h-16 gap-8">
            <div className="flex items-center gap-2 mr-4">
              <MobileLogo className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                App
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="flex h-full relative space-x-8">
              {[
                { value: 'feed', label: 'Feed' },
                { value: 'search', label: 'Search' },
                { value: 'profile', label: 'Profile' },
              ].map(({ value, label }) => {
                const isActive = activeTab === value;
                return (
                  <button
                    key={value}
                    onClick={() => setActiveTab(value)}
                    className="relative h-full flex items-center px-1 cursor-pointer outline-none group"
                    type="button"
                  >
                    <span
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-primary'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50 dark:bg-black/20 overflow-hidden relative overflow-y-auto">
          {activeTab === 'feed' && <FeedContent isDesktop />}
          {activeTab === 'search' && <SearchContent isDesktop />}
          {activeTab === 'profile' && <ProfileContent isDesktop />}
        </div>
      </div>
    </div>
  );
};

const MobileLayout = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full bg-white dark:bg-[#111] flex flex-col font-sans select-none">
      <Tabs defaultValue="feed" className="flex flex-col h-full">
        <Tabs.Content className="flex-1 overflow-hidden relative">
          <Tab.Page value="feed" className="h-full w-full overflow-y-auto">
            <FeedContent />
          </Tab.Page>
          <Tab.Page value="search" className="h-full w-full overflow-y-auto">
            <SearchContent />
          </Tab.Page>
          <Tab.Page value="profile" className="h-full w-full overflow-y-auto">
            <ProfileContent />
          </Tab.Page>
        </Tabs.Content>

        <Tabs.Buttons
          className="flex bg-white dark:bg-[#111] border-t border-gray-100 dark:border-white/10 pb-safe pt-2 px-6 safe-area-bottom h-[85px] relative"
          showIndicator={false}
          onTabIndicatorChange={(rect, shouldAnimate) => {
            if (indicatorRef.current) {
              const indicator = indicatorRef.current;
              indicator.style.width = `${rect.width}px`;
              indicator.style.transform = `translateX(${rect.left}px)`;
              indicator.style.transition = shouldAnimate
                ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none';
            }
          }}
        >
          <div
            ref={indicatorRef}
            className="absolute top-3 -left-0 h-[calc(100%-25px)] bg-primary/10 dark:bg-primary/20 rounded-2xl -z-0 pointer-events-none transition-all"
          />

          {[
            { value: 'feed', label: 'Feed', Icon: Home },
            { value: 'search', label: 'Search', Icon: Search },
            { value: 'profile', label: 'Profile', Icon: User },
          ].map(({ value, label, Icon }) => (
            <Tab.Button
              key={value}
              value={value}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 cursor-pointer select-none active:scale-95 transition-transform outline-none z-10"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={24}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-colors duration-300 ${
                      isActive
                        ? 'text-primary'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-primary'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </Tab.Button>
          ))}
        </Tabs.Buttons>
      </Tabs>
    </div>
  );
};

const EXAMPLE_CODE = `import { Home, Search, User } from 'lucide-react';
import { useRef, useState } from 'react';
import { Tab, Tabs } from 'react-responsive-tabs';
import { MobileLogo } from '../components/Logo';

// --- Content Components ---

const FeedContent = ({ isDesktop = false }: { isDesktop?: boolean }) => (
  <>
    {isDesktop ? (
      <div className="pt-8 pb-6 px-8 max-w-6xl mx-auto">
        <h1 className="font-bold text-4xl tracking-tight text-gray-900 dark:text-white">
          Your Feed
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          Latest updates from your network.
        </p>
      </div>
    ) : (
      <header className="pt-6 pb-3 px-5 bg-white/90 dark:bg-[#111]/90 backdrop-blur-sm border-b border-black/5 dark:border-white/10 sticky top-0 z-10 transition-colors">
        <h1 className="font-bold text-2xl tracking-tight text-black dark:text-white">
          Feed
        </h1>
      </header>
    )}

    <div
      className={\`flex flex-col gap-4 \${isDesktop ? 'px-8 pb-8 grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start' : 'p-4'}\`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5"
        >
          <div className="h-40 bg-gray-100 dark:bg-[#222] rounded-xl mb-4 w-full" />
          <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-1/2" />
        </div>
      ))}
    </div>
  </>
);

const SearchContent = ({ isDesktop = false }: { isDesktop?: boolean }) => (
  <>
    {isDesktop ? (
      <div className="pt-8 pb-6 px-8 max-w-6xl mx-auto">
        <h1 className="font-bold text-4xl tracking-tight text-gray-900 dark:text-white">
          Search
        </h1>
      </div>
    ) : (
      <header className="pt-6 pb-3 px-5 bg-white/90 dark:bg-[#111]/90 backdrop-blur-sm border-b border-black/5 dark:border-white/10 sticky top-0 z-10 transition-colors">
        <h1 className="font-bold text-2xl tracking-tight text-black dark:text-white">
          Search
        </h1>
      </header>
    )}
    <div className={\`p-4 \${isDesktop ? 'px-8 max-w-6xl mx-auto' : ''}\`}>
      <div className="bg-gray-100 dark:bg-[#222] h-12 rounded-xl flex items-center px-4 md:max-w-md">
        <Search className="text-gray-400 w-5 h-5 mr-3" />
        <span className="text-gray-400">Search...</span>
      </div>
    </div>
  </>
);

const ProfileContent = ({ isDesktop = false }: { isDesktop?: boolean }) => (
  <>
    {isDesktop ? (
      <div className="pt-8 pb-6 px-8 max-w-6xl mx-auto">
        <h1 className="font-bold text-4xl tracking-tight text-gray-900 dark:text-white">
          Profile
        </h1>
      </div>
    ) : (
      <header className="pt-6 pb-3 px-5 bg-white/90 dark:bg-[#111]/90 backdrop-blur-sm border-b border-black/5 dark:border-white/10 sticky top-0 z-10 transition-colors">
        <h1 className="font-bold text-2xl tracking-tight text-black dark:text-white">
          Profile
        </h1>
      </header>
    )}
    <div className={\`p-4 \${isDesktop ? 'px-8 max-w-6xl mx-auto' : ''}\`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 dark:bg-[#333] rounded-full" />
        <div>
          <div className="h-5 bg-gray-200 dark:bg-[#333] rounded w-32 mb-2" />
          <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-24" />
        </div>
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-12 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl w-full border border-gray-100 dark:border-white/5"
          />
        ))}
      </div>
    </div>
  </>
);

// --- Layouts ---

const DesktopLayout = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="h-full bg-white dark:bg-[#111] flex flex-col font-sans">
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 dark:border-[#333]">
          <div className="max-w-6xl mx-auto px-8 flex items-center h-16 gap-8">
            <div className="flex items-center gap-2 mr-4">
              <MobileLogo className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                App
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="flex h-full relative space-x-8">
              {[
                { value: 'feed', label: 'Feed' },
                { value: 'search', label: 'Search' },
                { value: 'profile', label: 'Profile' },
              ].map(({ value, label }) => {
                const isActive = activeTab === value;
                return (
                  <button
                    key={value}
                    onClick={() => setActiveTab(value)}
                    className="relative h-full flex items-center px-1 cursor-pointer outline-none group"
                  >
                    <span
                      className={\`text-sm font-medium transition-colors duration-200 \${
                        isActive
                          ? 'text-primary'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }\`}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50 dark:bg-black/20 overflow-hidden relative overflow-y-auto">
          {activeTab === 'feed' && <FeedContent isDesktop />}
          {activeTab === 'search' && <SearchContent isDesktop />}
          {activeTab === 'profile' && <ProfileContent isDesktop />}
        </div>
      </div>
    </div>
  );
};

const MobileLayout = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full bg-white dark:bg-[#111] flex flex-col font-sans select-none">
      <Tabs defaultValue="feed" className="flex flex-col h-full">
        <Tabs.Content className="flex-1 overflow-hidden relative">
          <Tab.Page value="feed" className="h-full w-full overflow-y-auto">
            <FeedContent />
          </Tab.Page>
          <Tab.Page value="search" className="h-full w-full overflow-y-auto">
            <SearchContent />
          </Tab.Page>
          <Tab.Page value="profile" className="h-full w-full overflow-y-auto">
            <ProfileContent />
          </Tab.Page>
        </Tabs.Content>

        <Tabs.Buttons
          className="flex bg-white dark:bg-[#111] border-t border-gray-100 dark:border-white/10 pb-safe pt-2 px-6 safe-area-bottom h-[85px] relative"
          onTabIndicatorChange={(rect, shouldAnimate) => {
            if (indicatorRef.current) {
              const indicator = indicatorRef.current;
              indicator.style.width = \`\${rect.width}px\`;
              indicator.style.transform = \`translateX(\${rect.left}px)\`;
              // Use standard CSS transition for smooth movement
              indicator.style.transition = shouldAnimate
                ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none';
            }
          }}
        >
          <div
            ref={indicatorRef}
            className="absolute top-3 -left-0 h-[calc(100%-25px)] bg-primary/10 dark:bg-primary/20 rounded-2xl -z-0 pointer-events-none transition-all"
          />

          {[
            { value: 'feed', label: 'Feed', Icon: Home },
            { value: 'search', label: 'Search', Icon: Search },
            { value: 'profile', label: 'Profile', Icon: User },
          ].map(({ value, label, Icon }) => (
            <Tab.Button
              key={value}
              value={value}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 cursor-pointer select-none active:scale-95 transition-transform outline-none z-10"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={24}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={\`transition-colors duration-300 \${
                      isActive
                        ? 'text-primary'
                        : 'text-gray-400 dark:text-gray-500'
                    }\`}
                  />

                  <span
                    className={\`text-[10px] font-medium transition-colors duration-300 \${
                      isActive
                        ? 'text-primary'
                        : 'text-gray-400 dark:text-gray-500'
                    }\`}
                  >
                    {label}
                  </span>
                </>
              )}
            </Tab.Button>
          ))}
        </Tabs.Buttons>
      </Tabs>
    </div>
  );
};`;

export const MobileAppExample = ({
  isMobileView = false,
}: {
  isMobileView?: boolean;
}) => {
  return (
    <PreviewCodeToggle
      title=" Mobile Tab Bar Example"
      renderPreview={
        <div
          className={`flex justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#111] dark:to-[#0a0a0a] mobile-mockup-wrapper transition-all duration-500 ${
            isMobileView ? 'p-10' : 'p-0'
          }`}
        >
          <div
            className={`relative overflow-hidden bg-white shadow-2xl isolate transform-gpu transition-all duration-500 ease-in-out ${
              isMobileView
                ? 'w-[300px] h-[550px] border-[10px] border-gray-800 dark:border-[#2a2a2a] rounded-[30px]'
                : 'w-full h-[600px] border-none rounded-none'
            }`}
          >
            <div className={isMobileView ? 'contents' : 'w-full h-full'}>
              {isMobileView ? <MobileLayout /> : <DesktopLayout />}
            </div>
          </div>
        </div>
      }
      renderCode={
        <SyntaxHighlighter
          language="tsx"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            height: '600px',
            padding: '30px',
            borderRadius: 0,
            fontSize: '13px',
            maxWidth: '100%',
            overflowX: 'auto',
            overflowY: 'auto',
          }}
          showLineNumbers={false}
          wrapLines={true}
        >
          {EXAMPLE_CODE}
        </SyntaxHighlighter>
      }
    />
  );
};
