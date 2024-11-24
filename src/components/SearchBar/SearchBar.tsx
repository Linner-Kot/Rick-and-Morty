import "./SearchBar.css";

interface ISearchBar {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ query, onChange }: ISearchBar) => (
  <div>
    <input
      className="search"
      type="text"
      placeholder="Введите имя героя"
      value={query}
      onChange={onChange}
    />
  </div>
);
