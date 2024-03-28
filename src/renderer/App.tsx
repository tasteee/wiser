import './App.css';
import { Link, Route, Router, Switch } from 'wouter';
import { AppFrame } from './components/AppFrame/AppFrame';
import { SearchProvider } from './contexts/search';
import { SettingsProvider } from './contexts/settings';
import { Settings } from './views/Settings';
import { Theme } from '@radix-ui/themes';
import { Search } from './views/Search';

const RouterHandler = () => {
  return (
    <Router base="">
      <Switch>
        <Route path="/" component={Search} />
        {/* <Route path="/collections" component={Collections} /> */}
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
};

export const App = () => {
  return (
    <Theme appearance="dark">
      <SettingsProvider>
        <SearchProvider>
          <AppFrame>
            <RouterHandler />
          </AppFrame>
        </SearchProvider>
      </SettingsProvider>
    </Theme>
  );
};
