import type { ERApiData } from "./erApiData.interface";

export interface IDatabase {
  getImageKeyByName: (name: string) => Promise<{ image_key: string }>;
}

interface ImageTable {
  image_name: string;
  image_key: string;
  created_at: string;
}

interface BioTable {
  id: number;
  content: string;
  created_at: string;
}

interface ApiDataTable {
  api_id: string;
  data: ERApiData;
  updated_at: Date;
}

interface ExperienceTable {
  company: string;
  title: string;
  start_date: string;
  end_date: string;
}

export interface Database {
  api_data: ApiDataTable;
  image_store: ImageTable;
  bio: BioTable;
  experience: ExperienceTable;
}
