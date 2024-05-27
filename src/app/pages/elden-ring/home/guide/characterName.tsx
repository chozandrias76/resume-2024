import { styles, blockTextStyles } from "@/util/styles";

const CharacterName = ({ name }: { name: string }) => {
  return (
    <div>
      <h1 className={styles(blockTextStyles)}>{name}</h1>
    </div>
  );
};

export default CharacterName