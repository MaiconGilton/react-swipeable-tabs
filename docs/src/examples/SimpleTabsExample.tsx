import { Tab, Tabs } from 'react-responsive-tabs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import PreviewCodeToggle from '../components/PreviewCodeToggle';

const SIMPLE_TABS_CODE = `import { Tabs, Tab } from 'react-responsive-tabs';

export const SimpleTabsExample = () => {
  return (
    <div className="p-5 border border-gray-200 dark:border-[#333] rounded-lg bg-white dark:bg-[#111]">
      <Tabs defaultValue="tab1">
        <Tabs.Buttons className="flex gap-2.5 border-b border-gray-100 dark:border-[#333] mb-5">
          {[
            { id: 'tab1', label: 'Tab 1' },
            { id: 'tab2', label: 'Tab 2' },
          ].map((i) => (
            <Tab.Button
              key={i.id}
              value={i.id}
              className="px-5 py-2.5 cursor-pointer bg-transparent border-b-2 border-transparent transition-all outline-none"
            >
              {({ isActive }) => (
                <span className={\`\${isActive
                  ? 'font-bold text-primary'
                  : 'border-transparent font-normal text-gray-600 dark:text-gray-400'
                  } pb-2.5 transition-all\`}
                >
                  {i.label}
                </span>
              )}
            </Tab.Button>
          ))}      
        </Tabs.Buttons>

        <Tabs.Content>
          <Tab.Page value="tab1">
            <div className="p-5 bg-gray-50 dark:bg-[#1a1a1a] rounded-md text-gray-900 dark:text-white">
              <h3 className="font-bold mb-2">Simple Content 1</h3>
              <p className="text-gray-600 dark:text-gray-400">
                This is a basic example of swipeable tabs.
              </p>
            </div>
          </Tab.Page>

          <Tab.Page value="tab2">
            <div className="p-5 bg-gray-50 dark:bg-[#1a1a1a] rounded-md text-gray-900 dark:text-white">
              <h3 className="font-bold mb-2">Simple Content 2</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can swipe between these panels on mobile.
              </p>
            </div>
          </Tab.Page>
        </Tabs.Content>
      </Tabs>
    </div>
  );
};`;

export const SimpleTabsExample = () => {
  return (
    <PreviewCodeToggle
      title="Simple Tabs Example"
      renderPreview={
        <div className="p-5 m-10 border border-gray-200 dark:border-[#333] rounded-lg bg-white dark:bg-[#111]">
          <Tabs defaultValue="tab1">
            <Tabs.Buttons
              className="flex gap-2.5 border-b border-gray-100 dark:border-[#333] mb-5"
              showIndicator={false}
            >
              {[
                { id: 'tab1', label: 'Tab 1' },
                { id: 'tab2', label: 'Tab 2' },
              ].map((i) => (
                <Tab.Button
                  key={i.id}
                  value={i.id}
                  className="px-5 py-2.5 cursor-pointer bg-transparent border-b-2 border-transparent transition-all outline-none"
                >
                  {({ isActive }) => (
                    <span
                      className={`${
                        isActive
                          ? ' font-bold text-primary'
                          : 'border-transparent font-normal text-gray-600 dark:text-gray-400'
                      } pb-2.5 transition-all`}
                    >
                      {i.label}
                    </span>
                  )}
                </Tab.Button>
              ))}
            </Tabs.Buttons>

            <Tabs.Content>
              <Tab.Page value="tab1">
                <div className="p-5 bg-gray-50 dark:bg-[#1a1a1a] rounded-md text-gray-900 dark:text-white">
                  <h3 className="font-bold mb-2">Simple Content 1</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    This is a basic example of swipeable tabs.
                  </p>
                </div>
              </Tab.Page>

              <Tab.Page value="tab2">
                <div className="p-5 bg-gray-50 dark:bg-[#1a1a1a] rounded-md text-gray-900 dark:text-white">
                  <h3 className="font-bold mb-2">Simple Content 2</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You can swipe between these panels on mobile.
                  </p>
                </div>
              </Tab.Page>
            </Tabs.Content>
          </Tabs>
        </div>
      }
      renderCode={
        <SyntaxHighlighter
          language="tsx"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            height: '600px',
            padding: '20px',
            borderRadius: 0,
            fontSize: '13px',
            maxWidth: '100%',
            overflowX: 'auto',
            overflowY: 'auto',
          }}
          showLineNumbers={false}
          wrapLines={true}
        >
          {SIMPLE_TABS_CODE}
        </SyntaxHighlighter>
      }
    />
  );
};
