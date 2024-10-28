export const fetchAllJobIds = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/jobstories.json"
  );
  const data: number[] = await response.json();
  return Array.from(new Set(data));
};

export const fetchJobById = async (id: string) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  );
  const data = await response.json();
  return data;
};
