import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import debounce from 'lodash.debounce';
import { SearchHistory } from './components/SearchHistory';
import { ReposList } from './components/ReposList';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [queryToSearch, setQueryToSearch] = useState('');

  useEffect(() => {
    if (!queryToSearch) {
      return;
    }

    const str = localStorage.getItem('repos-search-key');
    const historyArr = str ? JSON.parse(str) : [];

    if (historyArr.length >= 5) {
      historyArr.shift();
    }

    historyArr.push(queryToSearch);

    localStorage.setItem('repos-search-key', JSON.stringify(historyArr));
  }, [queryToSearch]);

  const applyQuery = useCallback(debounce((value: string) => {
    if (!value) {
      return;
    }

    setQueryToSearch(value);
  }, 500), []);

  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">Github repos search app</h1>
      </header>
      <main className="App__main">
        <div className="App__search">
          <input
            className="input-field"
            value={query}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(event.target.value);
              applyQuery(event.target.value);
            }}
          />
          <SearchHistory />
        </div>
        <ReposList query={queryToSearch} />
      </main>
    </div>
  );
};
