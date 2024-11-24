import { useMemo } from "react";
import "./App.css";
import { useCharacterSearch } from "./hooks/useCharacterSearch";
import { useModal } from "./hooks/useModal";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { CharacterList } from "./components/CharacterList/CharacterList";
import { Modal } from "./components/Modal/Modal";
import { Pagination } from "./components/Pagination/Pagination";

function App() {
  const {
    query,
    setQuery,
    loading,
    error,
    results,
    prevPage,
    nextPage,
    page,
    totalPages,
  } = useCharacterSearch();

  const dataList = useMemo(
    () =>
      results.map((character) => ({
        imageUrl: character.image,
        name: character.name,
      })),
    [results]
  );

  const {
    isOpen,
    modalData,
    openModal,
    closeModal,
    navigatePrev,
    navigateNext,
    hasPrev,
    hasNext,
  } = useModal(dataList);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="main-container">
      <h1 className="title">Поиск героев</h1>
      <SearchBar query={query} onChange={handleChange} />
      {loading && <p className="loading">Загрузка...</p>}
      {error && <p className="error">{error}</p>}
      <CharacterList characters={results} onClick={openModal} />
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        page={page}
        totalPages={totalPages}
      />
      <Modal
        isOpen={isOpen}
        modalData={modalData}
        onClose={closeModal}
        onPrev={navigatePrev}
        onNext={navigateNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
}

export default App;
