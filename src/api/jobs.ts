export const fetchJobs = async() => {
    const response = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
    const data = await response.json();
    return data;

}


export const fetchJobsById = async(id:string) => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    const data = await response.json();
    return data;
}