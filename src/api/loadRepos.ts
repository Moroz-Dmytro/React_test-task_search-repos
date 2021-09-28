const getData = async (query: string): Promise<ApiResponse> => {
  const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=50`);

  if (!response.ok) {
    return Promise.reject(new Error(`${response.status} - ${response.statusText}`));
  }

  return response.json();
};

export const loadRepos = async (query: string) => {
  const response = await getData(query);

  return response.items;
};
