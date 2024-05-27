const logConsole = require('log-beautify');

import { PokemonModel } from "./src/Model/PokemonModel";
import { IPokemonSortByMaxIv, PokemonSortByMaxIvModel } from "./src/Model/PokemonSortByMaxIvModel";
import { IPokemonCombinationResult, PokemonCombinationResult } from "./src/Model/PokemonCombinationResultModel";

// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// MAIN PROCESS
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------

// Variable de résultat
let breedCombinaisonsResult: IPokemonCombinationResult[] = [];

// Génère les données d'entrée de tous les pokémons (tableau)
const nbPokemonsMax = 1000;
let generatedPokemonsList: PokemonModel[] = generateRandomPokemonList(nbPokemonsMax);

// Trie les pokemons par IV max et sexe
let pokemonListByBestIv = sortPokemonList(generatedPokemonsList);

// Sélectionne le tableau qui a le moins de pokemon
console.log('Nombre dans la catégorie E: ', pokemonListByBestIv.maxIvE.ivName, pokemonListByBestIv.maxIvE.count);
console.log('Nombre dans la catégorie D: ', pokemonListByBestIv.maxIvD.ivName, pokemonListByBestIv.maxIvD.count);
console.log('Nombre dans la catégorie C: ', pokemonListByBestIv.maxIvC.ivName, pokemonListByBestIv.maxIvC.count);
console.log('Nombre dans la catégorie B: ', pokemonListByBestIv.maxIvB.ivName, pokemonListByBestIv.maxIvB.count);
console.log('Nombre dans la catégorie A: ', pokemonListByBestIv.maxIvA.ivName, pokemonListByBestIv.maxIvA.count);

getCombinaisonResults();

// Affichage résultat
if (breedCombinaisonsResult.length === 0) {
    logConsole.warn('AUCUN RESULTAT');
} else {
    logConsole.info('Nombre de combinaisons max:', breedCombinaisonsResult.length);
    breedCombinaisonsResult.forEach(breedCombinaison => {
        console.log();
        logConsole.info(breedCombinaison.displayText());
    });

}



// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// FONCTIONS
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------

/**
 * Fonction qui calcul les résultats en attribuant à la variable global breedCombinaisonsResult
 *
 */
function getCombinaisonResults(): void {
    // Premier parcours de tableau des A (choisis le pokemon à accoupler parmi la liste triée avec le moins d'IV)
    outerALoop:
    for (let a = 0; a < pokemonListByBestIv.maxIvA.count; a++) {
        const pokemonA = pokemonListByBestIv.maxIvA.pokemons[a];
        for (let e = 0; e < pokemonListByBestIv.maxIvE.count; e++) {
            // Si la première paire est ok (A + E1)
            const pokemonE1 = pokemonListByBestIv.maxIvE.pokemons[e];
            if (pokemonA.sex !== pokemonE1.sex) {

                pokemonListByBestIv.maxIvE = deleteArrayElementById(pokemonListByBestIv.maxIvE, pokemonE1);

                const pokemonE2 = pokemonListByBestIv.maxIvE.pokemons[e + 1];
                for (let c = 0; c < pokemonListByBestIv.maxIvC.count; c++) {
                    // Si la deuxième paire est ok (E2 + C1)
                    const pokemonC1 = pokemonListByBestIv.maxIvC.pokemons[c];
                    if (pokemonE2 !== undefined && pokemonC1 !== undefined && pokemonE2.sex !== pokemonC1.sex) {
                        pokemonListByBestIv.maxIvE = deleteArrayElementById(pokemonListByBestIv.maxIvE, pokemonE2);
                        pokemonListByBestIv.maxIvC = deleteArrayElementById(pokemonListByBestIv.maxIvC, pokemonC1);

                        for (let d = 0; d < pokemonListByBestIv.maxIvC.count; d++) {
                            // Si la troisième paire est ok (C2 + D1)
                            const pokemonC2 = pokemonListByBestIv.maxIvC.pokemons[c + 2];
                            const pokemonD1 = pokemonListByBestIv.maxIvD.pokemons[d];
                            if (pokemonC2 !== undefined && pokemonD1 !== undefined && pokemonC2.sex !== pokemonD1.sex) {

                                pokemonListByBestIv.maxIvC = deleteArrayElementById(pokemonListByBestIv.maxIvC, pokemonC2);
                                pokemonListByBestIv.maxIvD = deleteArrayElementById(pokemonListByBestIv.maxIvD, pokemonD1);

                                // Si la quatrième paire est ok (D2 + E3)
                                const pokemonD2 = pokemonListByBestIv.maxIvD.pokemons[d + 2];
                                const pokemonE3 = pokemonListByBestIv.maxIvE.pokemons[e + 3];
                                if (pokemonD2 !== undefined && pokemonE3 !== undefined && pokemonD2.sex !== pokemonE3.sex) {

                                    pokemonListByBestIv.maxIvD = deleteArrayElementById(pokemonListByBestIv.maxIvD, pokemonD2);
                                    pokemonListByBestIv.maxIvE = deleteArrayElementById(pokemonListByBestIv.maxIvE, pokemonE3);

                                    // Si la cinquième paire est ok (C3 + D3)
                                    const pokemonC3 = pokemonListByBestIv.maxIvC.pokemons[c + 2];
                                    const pokemonD3 = pokemonListByBestIv.maxIvD.pokemons[d + 2];
                                    if (pokemonC3 !== undefined && pokemonD3 !== undefined && pokemonC3.sex !== pokemonD3.sex) {

                                        pokemonListByBestIv.maxIvC = deleteArrayElementById(pokemonListByBestIv.maxIvC, pokemonC3);
                                        pokemonListByBestIv.maxIvD = deleteArrayElementById(pokemonListByBestIv.maxIvD, pokemonD3);

                                        // Si la sixième paire est ok (E4 + D4)
                                        const pokemonE4 = pokemonListByBestIv.maxIvE.pokemons[e + 4];
                                        const pokemonD4 = pokemonListByBestIv.maxIvD.pokemons[d + 4];
                                        if (pokemonE4 !== undefined && pokemonD4 !== undefined && pokemonE4.sex !== pokemonD4.sex) {

                                            pokemonListByBestIv.maxIvE = deleteArrayElementById(pokemonListByBestIv.maxIvE, pokemonE4);
                                            pokemonListByBestIv.maxIvD = deleteArrayElementById(pokemonListByBestIv.maxIvD, pokemonD4);

                                            // Si la septième paire est ok (E5 + B1)
                                            const pokemonE5 = pokemonListByBestIv.maxIvE.pokemons[e + 5];
                                            const pokemonB1 = pokemonListByBestIv.maxIvB.pokemons[a + 1];
                                            if (pokemonE5 !== undefined && pokemonB1 !== undefined && pokemonE5.sex !== pokemonB1.sex) {

                                                pokemonListByBestIv.maxIvE = deleteArrayElementById(pokemonListByBestIv.maxIvE, pokemonE5);
                                                pokemonListByBestIv.maxIvB = deleteArrayElementById(pokemonListByBestIv.maxIvB, pokemonB1);

                                                // Si la huitième paire est ok (B2 + D5)
                                                const pokemonB2 = pokemonListByBestIv.maxIvB.pokemons[a + 2];
                                                const pokemonD5 = pokemonListByBestIv.maxIvD.pokemons[d + 5];
                                                if (pokemonB2 !== undefined && pokemonD5 !== undefined && pokemonB2.sex !== pokemonD5.sex) {

                                                    const newResult = new PokemonCombinationResult(
                                                        pokemonA,
                                                        pokemonE1,
                                                        pokemonE2,
                                                        pokemonC1,
                                                        pokemonC2,
                                                        pokemonD1,
                                                        pokemonD2,
                                                        pokemonE3,
                                                        pokemonC3,
                                                        pokemonD3,
                                                        pokemonE4,
                                                        pokemonD4,
                                                        pokemonE5,
                                                        pokemonB1,
                                                        pokemonB2,
                                                        pokemonD5
                                                    );

                                                    if (!breedCombinaisonsResult.some(result => result.equals(newResult))) {
                                                        breedCombinaisonsResult.push(newResult);
                                                        pokemonListByBestIv.maxIvA = deleteArrayElementById(pokemonListByBestIv.maxIvA, pokemonA.id);
                                                        continue outerALoop;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

/**
 * Fonction qui génére et retourne une liste de pokemon random
 *
 * @param  {number}         nbPokemonsMax           - Nombre de pokémon à générer
 * @return {PokemonModel[]} generatedPokemonsList   - Nouvelle liste de pokémon random
 */
function generateRandomPokemonList(nbPokemonsMax: number): PokemonModel[] {
    let generatedPokemonsList: PokemonModel[] = [];
    for (let p = 0; p < nbPokemonsMax; p++) {
        const randomIv = Math.floor(Math.random() * (6 - 1 + 1)) + 1;;
        let sex = 'male';
        if (generateBinary() === 1) {
            sex = 'male';
        } else {
            sex = 'female';
        }
        let newPokemon = null;
        if (randomIv === 1) {
            newPokemon = new PokemonModel(p.toString(), 'motisma' + p.toString(), sex, 31, 0, 0, 0, 0, 0);
        }
        else if (randomIv === 2) {
            newPokemon = new PokemonModel(p.toString(), 'motisma' + p.toString(), sex, 0, 31, 0, 0, 0, 0);
        }
        else if (randomIv === 3) {
            newPokemon = new PokemonModel(p.toString(), 'motisma' + p.toString(), sex, 0, 0, 31, 0, 0, 0);
        }
        else if (randomIv === 4) {
            newPokemon = new PokemonModel(p.toString(), 'motisma' + p.toString(), sex, 0, 0, 0, 31, 0, 0);
        }
        else if (randomIv === 5) {
            newPokemon = new PokemonModel(p.toString(), 'motisma' + p.toString(), sex, 0, 0, 0, 0, 31, 0);
        }
        else if (randomIv === 6) {
            newPokemon = new PokemonModel(p.toString(), 'motisma' + p.toString(), sex, 0, 0, 0, 0, 0, 31);
        }
        if (newPokemon != null) {
            generatedPokemonsList.push(newPokemon);
        }
    }
    return generatedPokemonsList;
}


/**
 * Fonction qui trie les pokémons dans des listes par max IV et sexe
 *
 * @param  {PokemonModel[]} generatedPokemonsList - NoListe de pokémon à trier
 * @return {PokemonModel[]} pokemonSortList       - Renvoi la liste de pokémon random trié par IV et sexe
 */
function sortPokemonList(generatedPokemonsList: PokemonModel[]): any {
    let pokemonListByBestIv = {
        hp: [],
        ivAttack: [],
        ivDefense: [],
        ivSpeAttack: [],
        ivSpeDefence: [],
        ivSpeed: [],
    };

    for (let i = 0; i < generatedPokemonsList.length; i++) {
        if (generatedPokemonsList[i].hp === 31) {
            pokemonListByBestIv.hp.push(generatedPokemonsList[i]);
        }
        if (generatedPokemonsList[i].ivAttack === 31) {
            pokemonListByBestIv.ivAttack.push(generatedPokemonsList[i]);
        }
        if (generatedPokemonsList[i].ivDefense === 31) {
            pokemonListByBestIv.ivDefense.push(generatedPokemonsList[i]);
        }
        if (generatedPokemonsList[i].ivSpeAttack === 31) {
            pokemonListByBestIv.ivSpeAttack.push(generatedPokemonsList[i]);
        }
        if (generatedPokemonsList[i].ivSpeDefence === 31) {
            pokemonListByBestIv.ivSpeDefence.push(generatedPokemonsList[i]);
        }
        if (generatedPokemonsList[i].ivSpeed === 31) {
            pokemonListByBestIv.ivSpeed.push(generatedPokemonsList[i]);
        }
    }

    let pokemonSortList = new PokemonSortByMaxIvModel(
        // TODO VOIR POUR LES HP
        //{ ivName: 'hp', count: pokemonListByBestIv.hp.length, pokemons: pokemonListByBestIv.hp },
        { ivName: 'ivAttack', count: pokemonListByBestIv.ivAttack.length, pokemons: pokemonListByBestIv.ivAttack },
        { ivName: 'ivDefense', count: pokemonListByBestIv.ivDefense.length, pokemons: pokemonListByBestIv.ivDefense },
        { ivName: 'ivSpeAttack', count: pokemonListByBestIv.ivSpeAttack.length, pokemons: pokemonListByBestIv.ivSpeAttack },
        { ivName: 'ivSpeDefence', count: pokemonListByBestIv.ivSpeDefence.length, pokemons: pokemonListByBestIv.ivSpeDefence },
        { ivName: 'ivSpeed', count: pokemonListByBestIv.ivSpeed.length, pokemons: pokemonListByBestIv.ivSpeed }
    );

    // Trier la liste par nombre d'éléments en ordre décroissant
    pokemonSortList.sortByCount();

    return pokemonSortList;

}

/**
 * Supprime un element d'un tableau donné
 *
 * @returns {[]}  - Retourne le tableau sans l'élément s'il existe dans le tableau
 */
function deleteArrayElementById(pokemonSortByMaxIv: IPokemonSortByMaxIv, pokemon: PokemonModel): IPokemonSortByMaxIv {
    let index = pokemonSortByMaxIv.pokemons.map(x => {
        return x.id;
    }).indexOf(pokemon.id);
    pokemonSortByMaxIv.pokemons.splice(index, 1);
    pokemonSortByMaxIv.count = pokemonSortByMaxIv.count - 1;

    return pokemonSortByMaxIv;
}


/**
 * Generate random (0 or 1)
 *
 * @returns {number}  - Returns random number (0 or 1)
 */
function generateBinary(): number {
    let state = Math.random();
    if (state < 0.5)
        state = 0;
    else
        state = 1;
    return state;
}
