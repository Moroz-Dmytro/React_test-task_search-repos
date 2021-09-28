import React, { useState, useEffect } from 'react';
import { loadRepos } from '../../api/loadRepos';

import './ReposList.scss';

interface Props {
  query: string;
}

export const ReposList: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputCheck, setInputCheck] = useState(false);
  const [repos, setRepos] = useState<Repositories[]>([]);

  const { query } = props;

  useEffect(() => {
    (async () => {
      try {
        if (!query) {
          return;
        }

        setLoading(true);

        const reposFromApi = await loadRepos(query);

        setInputCheck(true);
        setLoading(false);
        setError(false);
        setRepos(reposFromApi);
      } catch {
        setLoading(false);
        setError(true);
      }
    })();
  }, [query]);

  return (
    <>
      {loading && (
        <h2>Please, wait. Loading...</h2>
      )}
      {!loading && (
        error ? (
          <h2>Ups... Something went wrong :(</h2>
        ) : (
          <>
            {!repos.length && inputCheck && (
              <h2>There are no repos with such name</h2>
            )}
            {!!repos.length && (
              <ul className="list">
                {repos.map(repo => (
                  <li key={repo.id} className="card">
                    <div className="card-body">
                      <a
                        href={repo.html_url}
                        className="card-title card__title"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {repo.name}
                      </a>
                      <div className="card-text">
                        {'Language: '}
                        <span className="card__description">{repo.language || 'Not defined'}</span>
                      </div>
                      <div className="card-text">
                        {'Description: '}
                        <span className="card__description">{repo.description}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )
      )}
    </>
  );
};
