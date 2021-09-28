import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './SearchHistory.scss';

export const SearchHistory: React.FC = () => {
  const historyFromLS = localStorage.getItem('repos-search-key');
  const historyItems = historyFromLS ? JSON.parse(historyFromLS) : [];

  return (
    <section className="history App__history">
      <h6>Search history:</h6>
      {historyItems.length ? (
        <ul className="history__list">
          {
            historyItems.map((item: string) => (
              <li key={uuidv4()} className="history__link">
                {item}
              </li>
            ))
          }
        </ul>
      ) : (
        <h5>History is empty</h5>
      )}
    </section>
  );
};
