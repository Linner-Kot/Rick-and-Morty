import "./Pagination.css";

interface Pagination {
  prevPage: () => void;
  nextPage: () => void;
  page: number;
  totalPages: number;
}

export const Pagination = ({
  prevPage,
  nextPage,
  page,
  totalPages,
}: Pagination): JSX.Element => (
  <div className="pagination">
    <button onClick={prevPage} disabled={page === 1}>
      Назад
    </button>
    <span>
      Страница {page} из {totalPages}
    </span>
    <button onClick={nextPage} disabled={page === totalPages}>
      Вперед
    </button>
  </div>
);
