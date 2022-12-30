export default interface RequestPagination<T> {
	page: number;
	perPage: number;
	filter?: T;
}
