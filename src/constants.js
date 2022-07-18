const CONTRACT_ADDRESS = '0xbb4a3615846DfC247249e3a1e881ED51254fF9fc';

const transformCharacterData = (characterData) => {
    return {
      name: characterData.name,
      imageURI: characterData.imageURI,
      hp: characterData.hp.toNumber(),
      maxHp: characterData.maxHp.toNumber(),
      attackDamage: characterData.attackDamage.toNumber(),
    };
  };
  
export { CONTRACT_ADDRESS, transformCharacterData };