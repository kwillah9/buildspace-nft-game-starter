import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';

import myEpicGame from '../../utils/MyEpicGame.json';
import './Arena.css';


const Arena = ({ characterNFT, setCharacterNFT, currentAccount }) => {

    const [gameContract, setGameContract] = useState(null);

    const [boss, setBoss] = useState(null);

    const [attackState, setAttackState] = useState("");

    const runAttackAction = async () => {
        try {
            if (gameContract) {
                setAttackState('attacking');
                console.log("Attacking boss...");
                const attackTxn = await gameContract.attackBoss();
                await attackTxn.wait();
                console.log("attackTxn: ", attackTxn);
                setAttackState('hit');
            }
        } catch (error) {
            console.error("Error attacking boss: ", error);
            setAttackState('');
        }
    };

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                myEpicGame.abi,
                signer
            );

            setGameContract(gameContract);
        } else {
            console.log("Ethereum object not found");
        }

    }, [])

    useEffect(() => {
        const fetchBoss = async () => {
            const bossTxn = await gameContract.getBigBoss();
            console.log("Boss: ", bossTxn);
            setBoss(transformCharacterData(bossTxn));
        };

        const onAttackComplete = (from, newBossHp, newPlayerHp) => {
            const bossHp = newBossHp.toNumber();
            const playerHp = newPlayerHp.toNumber();
            const sender = from.toString();

            console.log(`AttackComplete: Boss HP: ${bossHp} Player HP: ${playerHp}`);
            
            if (currentAccount === sender.toLowerCase()) {
                setBoss((preveState) => {
                    return { ...preveState, hp: bossHp};
                });
                
                setCharacterNFT((preveState) => {
                    return { ...preveState, hp: playerHp};
                });
            }
            else {
                setBoss((preveState) => {
                    return { ...preveState, hp: bossHp};
                });
            }
        }
        if (gameContract) {
            fetchBoss();
            gameContract.on("AttackComplete", onAttackComplete);
        }

        return () => {
            if (gameContract) {
                gameContract.off("AttackComplete", onAttackComplete);
            }
        }
    }, [gameContract]);

    return (
        <div className="arena-container">
          {/* Replace your Boss UI with this */}
          {boss && (
            <div className="boss-container">
              <div className={`boss-content`}>
                <div className= {`boss-content ${attackState}`}> 
                    <h2>🔥 {boss.name} 🔥</h2>
                    <div className="image-content">
                    <img src={`https://api.ipfsbrowser.com/ipfs/get.php?hash=${boss.imageURI}`} alt={`Boss ${boss.name}`} />
                    <div className="health-bar">
                        <progress value={boss.hp} max={boss.maxHp} />
                        <p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
                    </div>
                    </div>
                </div>
              </div>
              <div className="attack-container">
                <button className="cta-button" onClick={runAttackAction}>
                  {`💥 Attack ${boss.name}`}
                </button>
              </div>
            </div>
          )}
      
        {characterNFT && (
        <div className="players-container">
            <div className="player-container">
            <h2>Your Character</h2>
            <div className="player">
                <div className="image-content">
                <h2>{characterNFT.name}</h2>
                <img
                    src={characterNFT.imageURI}
                    alt={`Character ${characterNFT.name}`}
                />
                <div className="health-bar">
                    <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                    <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
                </div>
                </div>
                <div className="stats">
                <h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
                </div>
            </div>
            </div>
        </div>
        )}
    </div>
    );
};

export default Arena;