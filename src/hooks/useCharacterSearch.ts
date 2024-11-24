import { useState, useCallback, useEffect } from "react";
import { debounce } from "../utils/debounce";
import { Character, getCharacters } from "../services/getCharacters";

interface UseCharacterSearchResult {
  query: string;
  setQuery: (query: string) => void;
  prevPage: () => void;
  nextPage: () => void;
  error: string | null;
  loading: boolean;
  results: Character[];
  page: number;
  totalPages: number;
}

export function useCharacterSearch(): UseCharacterSearchResult {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Character[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce(
      async (name: string, page: number, controller: AbortController) => {
        setLoading(true);
        setError(null);
        try {
          const data = await getCharacters(name, page, {
            signal: controller.signal,
          });
          if ("error" in data) {
            setError(data.error);
            setResults([]);
            setTotalPages(1);
          } else {
            setResults(data.results);
            setTotalPages(data.info.pages);
          }
        } catch {
          setError("Произошла ошибка при загрузке данных");
        } finally {
          setLoading(false);
        }
      },
      500
    ),
    []
  );

  useEffect(() => {
    const queryTrim = query.trim();
    if (queryTrim) {
      const controller = new AbortController();
      debouncedFetch(queryTrim, page, controller);
      return () => {
        controller.abort();
      };
    } else {
      setResults([]);
      setError(null);
      setTotalPages(1);
    }
  }, [query, page, debouncedFetch]);

  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const queryChange = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  return {
    query,
    setQuery: queryChange,
    nextPage,
    prevPage,
    page,
    totalPages,
    loading,
    results,
    error,
  };
}
