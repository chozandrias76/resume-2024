export interface IDatabase {
  getImageKeyByName: (name: string) => Promise<{image_key: string}> 
}

interface ImageTable {
  image_name: string;
  image_key: string;
  created_at: string;
}

export interface Database {
  image_store: ImageTable;
}