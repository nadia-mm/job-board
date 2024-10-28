import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchJobs, fetchJobsById } from './jobs';

jest.Mock("./jobs",()=> {
    fetchJobs: () => vi.fn(() => [1,2,3]);
    fetchJobsById: ()=>vi.fn(()=>{
        "by": "smilliken",
        "id": 41913403,
        "score": 1,
        "text": "Work should be fun. At MixRank, we get to work with distributed systems, databases, data science, and big data. No meetings, no bureaucracy, no office, no time tracking— just challenging problems you can devote your full attention to.<p>MixRank processes petabytes of data every month from web crawling. We have hundreds of customers using our data products including Google, Amazon, Facebook, Intel, and Adobe, across industries including Finance, Recruiting, Sales, Marketing, and Security. The company was founded in 2011 and received investment from top-tier investors including Y Combinator and Mark Cuban.<p>We’re a fully-remote company with a global footprint in over 22 countries. We&#x27;re growing, profitable, employee-owned, no dependence on outside funding. Applicants from all geographies and backgrounds are welcome.<p>We are looking for passionate individuals for whom programming is not just a job but it&#x27;s something they love to do. We&#x27;re obsessed with computers, programming, big data, databases, compilers, hardware, math, data science, and the internet. Does this sound like you? Please apply to join our team.<p>Our code base is very friendly to new contributors. You&#x27;ll have a fully-automated development environment and be pushing commits on your first day. Deployments to production happen multiple times per day and finish in less than 2 minutes. Our codebase is written in Python, SQL, Javascript&#x2F;TypeScript, Rust, and Nix. To start working on our codebase, you&#x27;ll need to be familiar with Python, PostgreSQL, Linux, and Git.<p>We operate at a larger scale than typical startups. We operate three datacenters with high performance servers we&#x27;ve built that are capable of dealing with the volumes of data we process. We&#x27;ve implemented our own distributed file system. We do full-scale web crawls. We download and perform static analysis on the entire universe of Android APKs and iOS IPAs that are published. Unlike a typical company where you&#x27;ll spend half of your time in meetings— at MixRank you&#x27;ll get to direct your entire focus into difficult technical problems that will help you to grow as an individual.<p>We&#x27;re hiring continuously for the positions below— they aren&#x27;t singular positions that will close once filled. Our philosophy on hiring is that the candidate is more important than the position. For each new member of the team, we design a custom role and responsibilities that are specialized to their interests. Other companies will come up with a long list of specific requirements for a position with the expectation that you&#x27;ll exactly replace someone from the team, or that you&#x27;ll be the perfect tetris piece that satisfies the job requirements decided by a committee. MixRank is more pragmatic: we&#x27;ll first get excited about having a unique individual on the team, then we&#x27;ll figure out the best way to accommodate their specific talents.<p>--<p>Junior Software Engineer<p>We&#x27;re looking for remote junior engineers that have 0-3 years of professional experience in software, and 5+ years of curiosity exploring computers, programming, and technical hobby projects. This is an open-ended entry role with mentorship and diverse opportunities to work on all areas of our product: databases, distributed systems, infrastructure and tooling, data analysis, machine learning, frontend&#x2F;backend web development, APIs, data mining, data modeling, and more. To stand out, please highlight what makes you unique: passion for computing, curiosity and side projects, work ethic, niche research, etc.<p>Ideally you&#x27;ve already finished with school, but if you still have one or more years left please feel free to apply anyway. If you&#x27;re the right fit for the team we&#x27;ll figure out a way to accommodate your schedule.<p>Please apply here: <a href=\"https:&#x2F;&#x2F;app.dover.com&#x2F;jobs&#x2F;mixrank\">https:&#x2F;&#x2F;app.dover.com&#x2F;jobs&#x2F;mixrank</a><p>--<p>Software Engineer<p>We&#x27;re hiring generalist software engineers to work on web applications, data mining, machine learning&#x2F;data science, data transformation&#x2F;ETL, data modeling, database scaling, infrastructure, devops, and more. We&#x27;ll customize the role to whatever subset of these areas match your interests.<p>Beneficial experience includes PostgreSQL, Python, Linux, TypeScript, Rust, Nix, frontend&#x2F;backend web development, and data mining.<p>Please apply here: <a href=\"https:&#x2F;&#x2F;app.dover.com&#x2F;jobs&#x2F;mixrank\">https:&#x2F;&#x2F;app.dover.com&#x2F;jobs&#x2F;mixrank</a><p>--<p>We especially encourage ex-founders in software engineering, sales, marketing, customer success, design, and product to reach out. If you don&#x27;t see a relevant position open, reach out to jobs at mixrank.com. We care more about the person than the job position, and we&#x27;re happy to craft the perfect position for anyone that joins our team.",
        "time": 1729598464,
        "title": "MixRank (YC S11) Is Hiring Software Engineers and Ex-Founders Globally",
        "type": "job"
    })
})

describe('API Functions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetchJobs should fetch job stories', async () => {
    const mockData = [1, 2, 3]; 
    (fetch as jest.Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockData),
    });

    const result = await fetchJobs();

    expect(fetch).toHaveBeenCalledWith("https://hacker-news.firebaseio.com/v0/jobstories.json");
    expect(result).toEqual(mockData);
  });

  it('fetchJobsById should fetch a job by ID', async () => {
    const mockJob = { id: 1, title: 'Test Job' }; // Sample job data
    const jobId = '1';
    (fetch as jest.Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockJob),
    });

    const result = await fetchJobsById(jobId);

    expect(fetch).toHaveBeenCalledWith(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json?print=pretty`);
    expect(result).toEqual(mockJob);
  });
});
