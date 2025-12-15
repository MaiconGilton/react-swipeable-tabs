import { Code, Eye } from 'lucide-react';
import type { ReactNode } from 'react';
import { Tab, Tabs } from 'react-responsive-tabs';

const PreviewCodeToggle = ({
  title,
  renderPreview,
  renderCode,
}: {
  title: string;
  renderPreview: ReactNode;
  renderCode: ReactNode;
}) => {
  return (
    <Tabs
      defaultValue="preview"
      gesturesEnabled={false}
      className="flex flex-col h-full border border-gray-200 dark:border-[#333] rounded-2xl overflow-hidden"
    >
      <div className="flex-none border-b border-gray-200 dark:border-[#333] bg-white dark:bg-[#111] px-4 flex items-center justify-between">
        <div className="font-semibold text-gray-900 dark:text-white py-4">
          {title}
        </div>

        <Tabs.Buttons
          className="flex gap-2 relative"
          indicatorClassName="bg-primary"
        >
          <Tab.Button
            value="preview"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-[#222] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-colors"
          >
            {({ isActive }) => (
              <>
                <Eye
                  size={14}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={
                    isActive
                      ? 'text-primary'
                      : 'text-[#8e8e93] dark:text-gray-500'
                  }
                />
                <span
                  className={
                    isActive
                      ? 'text-primary'
                      : 'text-[#8e8e93] dark:text-gray-500'
                  }
                >
                  Preview
                </span>
              </>
            )}
          </Tab.Button>

          <Tab.Button
            value="code"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-[#222] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-colors"
          >
            {({ isActive }) => (
              <>
                <Code
                  size={14}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={
                    isActive
                      ? 'text-primary'
                      : 'text-[#8e8e93] dark:text-gray-500'
                  }
                />
                <span
                  className={
                    isActive
                      ? 'text-primary'
                      : 'text-[#8e8e93] dark:text-gray-500'
                  }
                >
                  Code
                </span>
              </>
            )}
          </Tab.Button>
        </Tabs.Buttons>
      </div>

      <Tabs.Content className="flex-1 overflow-hidden relative">
        <Tab.Page value="preview" className="h-full w-full">
          {renderPreview}
        </Tab.Page>

        <Tab.Page
          value="code"
          className="h-full w-full overflow-hidden bg-[#1e1e1e]"
        >
          {renderCode}
        </Tab.Page>
      </Tabs.Content>
    </Tabs>
  );
};
export default PreviewCodeToggle;
