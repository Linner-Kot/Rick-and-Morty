export type Info = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export type Character = {
  id: number
  name: string
  image: string
}

export type GetCharactersResponse = {
  info: Info
  results: Character[]
}

export type GetCharactersError = {
  error: string
}

type GetPCharactersResult = GetCharactersResponse | GetCharactersError

export function getCharacters(name: string, page = 1, options = {}): Promise<GetPCharactersResult> {
  return fetch(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`, options)
    .then((res) => res.json())
    .then((data) => {
      if ("error" in data) {
        return data as GetCharactersError
      } else {
        return data as GetCharactersResponse
      }
    })
}
