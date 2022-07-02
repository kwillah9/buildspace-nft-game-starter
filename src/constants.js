const CONTRACT_ADDRESS = '0x06f443eC8BD4Cd2E7f6709428058D2A48c54619A';

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