export type Paging = {
  items: any[];
  pagingation: Pagingnation;
};

export type Pagingnation = {
  total: number;
  offset: number;
  limit: number;
};
