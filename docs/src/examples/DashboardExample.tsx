import { Activity } from 'lucide-react';
import { Tab, Tabs } from 'react-responsive-tabs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import PreviewCodeToggle from '../components/PreviewCodeToggle';

const DashboardContent = () => {
  return (
    <div className="w-full h-full bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden flex flex-col font-sans transition-colors duration-300">
      <Tabs defaultValue="overview" className="flex flex-col h-full">
        {/* Header */}
        <header className="flex-none bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#222] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <Activity />
            </div>
            <h1 className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">
              Analytics
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#222] px-3 py-1.5 rounded-lg border border-transparent dark:border-[#333]">
              Last 30 Days
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333] border-2 border-white dark:border-[#111] shadow-sm" />
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex-none bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#222] px-6">
          <Tabs.Buttons
            className="flex gap-8 relative"
            indicatorClassName="bg-indigo-600 dark:bg-indigo-400 rounded-t-full transition-all"
          >
            {[
              { value: 'overview', label: 'Overview' },
              { value: 'performance', label: 'Performance' },
              { value: 'settings', label: 'Settings' },
            ].map(({ value, label }) => (
              <Tab.Button
                key={value}
                value={value}
                className="group relative py-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors outline-none cursor-pointer"
              >
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? 'text-indigo-600 dark:text-indigo-400' : ''
                    }
                  >
                    {label}
                  </span>
                )}
              </Tab.Button>
            ))}
          </Tabs.Buttons>
        </div>

        {/* Content Area */}
        <Tabs.Content className="flex-1 overflow-hidden bg-gray-50 dark:bg-[#0a0a0a] relative">
          <Tab.Page
            value="overview"
            className="h-full w-full overflow-y-auto p-6"
          >
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 h-40"
                  >
                    <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-1/2" />
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 transition-colors h-[340px]">
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-1/3 mb-3" />

                  <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-40 mb-3" />
                </div>

                {/* Chart Simulation */}
                <div className="w-full h-[220px] flex items-end gap-3 md:gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col justify-end gap-2 group bg-gray-100 dark:bg-[#222] rounded"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        minHeight: '20px',
                      }}
                    >
                      <div className="text-center text-[10px] md:text-xs text-gray-400 group-hover:text-primary transition-colors uppercase font-medium">
                        {
                          [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                          ][i]
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tab.Page>

          <Tab.Page
            value="performance"
            className="h-full w-full overflow-y-auto p-6"
          >
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
              Performance Metrics
            </div>
          </Tab.Page>

          <Tab.Page
            value="settings"
            className="h-full w-full overflow-y-auto p-6 bg-white dark:bg-[#0a0a0a]"
          >
            <div className="p-4 px-8 max-w-6xl mx-auto">
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
          </Tab.Page>
        </Tabs.Content>
      </Tabs>
    </div>
  );
};

const EXAMPLE_CODE = `import { Activity, DollarSign, Layers, TrendingUp, Users } from 'lucide-react';
import { useRef } from 'react';
import { Tab, Tabs } from 'react-responsive-tabs';

const DashboardExample = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-xl overflow-hidden flex flex-col font-sans transition-colors duration-300">
      <Tabs defaultValue="overview" className="flex flex-col h-full">
        {/* Header */}
        <header className="flex-none bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#222] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <Activity />
            </div>
            <h1 className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">
              Analytics
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#222] px-3 py-1.5 rounded-lg border border-transparent dark:border-[#333]">
              Last 30 Days
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333] border-2 border-white dark:border-[#111] shadow-sm" />
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex-none bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#222] px-6">
          <Tabs.Buttons className="flex gap-8 relative">
            {[
              { value: 'overview', label: 'Overview' },
              { value: 'performance', label: 'Performance' },
              { value: 'settings', label: 'Settings' },
            ].map(({ value, label }) => (
              <Tab.Button
                key={value}
                value={value}
                className="group relative py-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors outline-none cursor-pointer"
              >
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? 'text-indigo-600 dark:text-indigo-400' : ''
                    }
                  >
                    {label}
                  </span>
                )}
              </Tab.Button>
            ))}
          </Tabs.Buttons>
        </div>

        {/* Content Area */}
        <Tabs.Content className="flex-1 overflow-hidden bg-gray-50 dark:bg-[#0a0a0a] relative">
          <Tab.Page
            value="overview"
            className="h-full w-full overflow-y-auto p-6"
          >
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 h-40"
                  >
                    <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-1/2" />
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 transition-colors h-[340px]">
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-1/3 mb-3" />

                  <div className="h-4 bg-gray-100 dark:bg-[#222] rounded w-40 mb-3" />
                </div>

                {/* Chart Simulation */}
                <div className="w-full h-[220px] flex items-end gap-3 md:gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col justify-end gap-2 group bg-gray-100 dark:bg-[#222] rounded"
                      style={{
                        height: \`\${Math.random() * 80 + 20}%\`,
                        minHeight: '20px',
                      }}
                    >
                      <div className="text-center text-[10px] md:text-xs text-gray-400 group-hover:text-primary transition-colors uppercase font-medium">
                        {
                          [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                          ][i]
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tab.Page>

          <Tab.Page
            value="performance"
            className="h-full w-full overflow-y-auto p-6"
          >
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
              Performance Metrics
            </div>
          </Tab.Page>

          <Tab.Page
            value="settings"
            className="h-full w-full overflow-y-auto p-6 bg-white dark:bg-[#0a0a0a]"
          >
            <div className="p-4 px-8 max-w-6xl mx-auto">
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
          </Tab.Page>
        </Tabs.Content>
      </Tabs>
    </div>
  );
};`;

export const DashboardExample = () => {
  return (
    <PreviewCodeToggle
      title="Dashboard Example"
      renderPreview={<DashboardContent />}
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
