import { Character } from "../../services/getCharacters";
import "./CharacterList.css"

interface ICharacterList {
  characters: Character[];
  onClick: (index: number) => void;
}

export const CharacterList = ({
  characters,
  onClick,
}: ICharacterList): JSX.Element => (
  <div>
    <ul className="character-list">
      {characters.map((character, index) => (
        <div className="character-item-container" key={character.id}>
          <li className="character-item-name">{character.name}</li>
          <img
            className="character-item-image"
            src={character.image}
            alt={character.name}
            onClick={() => onClick(index)}
          />
        </div>
      ))}
    </ul>
  </div>
);
