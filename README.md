# Job Board

## Overview

This job board application retrieves the latest job postings from HackerNews and displays them in a user-friendly format. It uses the HackerNews API to fetch job post IDs and metadata, showing the latest 9 job postings initially, with an option to load more.

## Features

- **Display Latest Job Postings**: Shows the most recent 9 job postings on initial load.
- **Load More Jobs**: Fetches and displays 6 additional job postings when the 'Load more' button is clicked.
- **Job Posting Cards**:
  - **Company Name**: Displayed at the top of each card, including YC(22) if present.
  - **Role Description**: Centered on the card.
  - **Date**: Displayed at the bottom of the card in a chosen date format.
- **Link Handling**:
  - **With URL**: Clicking the card opens the provided URL in a new tab.
  - **Without URL**: Clicking the card opens the HackerNews item page in a new tab.

## API Endpoints

### Get Latest Job Post IDs

- **Method**: GET
- **URL**: [HackerNews Job Stories](https://hacker-news.firebaseio.com/v0/jobstories.json)
- **Description**: Retrieves a list of job post IDs.
- **Example Response**:
  ```json
  [30000051, 29996298, 29992568, 29985735, 29982031, ...]
  ```

### Get Metadata for a Single Post

- **Method**: GET
- **URL**: `https://hacker-news.firebaseio.com/v0/item/<POST_ID>.json`
- **Description**: Retrieves metadata for an individual job post.
- **Example Response**:
  ```json
  {
    "by": "company_name",
    "id": 30000051,
    "type": "job",
    "title": "Company Name (YC21) Is Hiring Senior Back End Engineers",
    "url": "https://example.com/job-posting",
    "time": 1653576000
  }
  ```

## Requirements

1. **Initial Display**: Fetch and display the latest 9 job postings when the application loads.
2. **Card Formatting**:
   - Extract and display the **Company Name** (e.g., "Company Name (YC21)").
   - Display the **Role Description** (e.g., "Is Hiring Senior Back End Engineers") in the center.
   - Show the **Date** (formatted as desired) at the bottom of the card.
3. **Link Handling**:
   - If the metadata includes a URL, open it in a new tab.
   - If no URL is provided, open the HackerNews item page (e.g., `https://news.ycombinator.com/item?id=<POST_ID>`) in a new tab.
4. **Load More Functionality**: Fetch and display 6 more job postings when the 'Load more' button is clicked.

## Development

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd job-board
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. **Start the Development Server**:
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Open Your Browser**: Navigate to `http://http://localhost:5173` to view the application.

### Testing

1. **Run Tests**:
   ```bash
   npm test
   # or
   yarn test
   ```
