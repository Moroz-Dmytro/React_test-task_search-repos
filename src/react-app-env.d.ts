/// <reference types="react-scripts" />

interface Repositories {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
}

interface ApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: repositories[];
}