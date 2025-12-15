import { TabButton } from './components/TabButton';
import { TabPage } from './components/TabPage';
import { Tabs as TabsRoot } from './components/Tabs';
import { TabsButtons } from './components/TabsButtons';
import { TabsContent } from './components/TabsContent';

// Namespaced Exports
export const Tabs = Object.assign(TabsRoot, {
  Buttons: TabsButtons,
  Content: TabsContent,
});

export const Tab = {
  Button: TabButton,
  Page: TabPage,
};
