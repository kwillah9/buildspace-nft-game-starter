const CONTRACT_ADDRESS = '0xA2b76907eB72C577DE7f69186446e3D7d832299a';

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