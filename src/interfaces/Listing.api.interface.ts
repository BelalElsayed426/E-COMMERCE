export interface ListingResponse<type> {
  results: number;
  metadata: Metadata;
  data: type[];
}
interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
