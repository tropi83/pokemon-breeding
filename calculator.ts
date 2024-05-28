const logConsole = require('log-beautify');

import { PokemonModel } from "./src/Model/PokemonModel";
import { PokemonSortByMaxIvModel } from "./src/Model/PokemonSortByMaxIvModel";
import { IPokemonCombinationResult, PokemonCombinationResult } from "./src/Model/PokemonCombinationResultModel";

// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// MAIN PROCESS
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------

// Variable de résultat
let breedCombinationsResult: IPokemonCombinationResult[] = [];
let bannedPokemonsIds: any = [];

// Génère les données d'entrée de tous les pokémons (tableau)
const nbPokemonsMax = 100;
logConsole.info('Génération de  ' + nbPokemonsMax + ' pokemons...');
let generatedPokemonsList: PokemonModel[] = generateRandomPokemonList(nbPokemonsMax, 'motisma');

// Trie les pokemons par IV max et sexe
let pokemonListByBestIv = sortPokemonList(generatedPokemonsList);

// Sélectionne le tableau qui a le moins de pokemon
console.log('Nombre dans la catégorie E: ', pokemonListByBestIv.maxIvE.ivName, pokemonListByBestIv.maxIvE.count);
console.log('Nombre dans la catégorie D: ', pokemonListByBestIv.maxIvD.ivName, pokemonListByBestIv.maxIvD.count);
console.log('Nombre dans la catégorie C: ', pokemonListByBestIv.maxIvC.ivName, pokemonListByBestIv.maxIvC.count);
console.log('Nombre dans la catégorie B: ', pokemonListByBestIv.maxIvB.ivName, pokemonListByBestIv.maxIvB.count);
console.log('Nombre dans la catégorie A: ', pokemonListByBestIv.maxIvA.ivName, pokemonListByBestIv.maxIvA.count);

getCombinationResults();

// Affichage résultat
if (breedCombinationsResult.length === 0) {
    logConsole.warn('AUCUN RESULTAT');
} else {

    logConsole.info('Nombre de combinaisons max:', breedCombinationsResult.length);
    breedCombinationsResult.forEach(breedCombination => {
        console.log();
        logConsole.info(breedCombination.displayText());
    });

    // Debug (calcul le nome de combinaison possible)
    // checkBreedCombinationResult(breedCombinationsResult);

}



// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// FONCTIONS
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------

/**
 * Fonction qui calcul les résultats des combinaisons des pokémons qui peuvent s'accoupler, en insérant un résultat valide de la combinaison
 * dans la variable global tableau/liste breedCombinationsResult si le résultat n'existe pas dans le tableau/liste
 */
function getCombinationResults(): void {
    outerALoop:
    for (let a = 0; a < pokemonListByBestIv.maxIvA.count; a++) {
        const pokemonA = pokemonListByBestIv.maxIvA.pokemons[a];
        const pokemonAIsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonA?.id);

        if(pokemonA && !pokemonAIsBanned) {
            for (let e = 0; e < pokemonListByBestIv.maxIvE.count; e++) {

                // Si la première paire est ok (A + E1)
                const pokemonE1 = pokemonListByBestIv.maxIvE.pokemons[e];
                const pokemonE1IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonE1?.id);
                if (pokemonA && pokemonE1 && pokemonA.sex !== pokemonE1.sex && !pokemonE1IsBanned) {

                    for (let c = 0; c < pokemonListByBestIv.maxIvC.count; c++) {
                        // Si la deuxième paire est ok (E2 + C1) ou cet id est déja utilisé/banni
                        const pokemonE2 = pokemonListByBestIv.maxIvE.pokemons[e + 1];
                        const pokemonE2IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonE2?.id);
                        const pokemonC1 = pokemonListByBestIv.maxIvC.pokemons[c];
                        const pokemonC1IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonC1?.id);
                        if (pokemonE2 && pokemonC1 && pokemonE2.sex !== pokemonC1.sex && !pokemonE2IsBanned && !pokemonC1IsBanned) {

                            for (let d = 0; d < pokemonListByBestIv.maxIvC.count; d++) {
                                // Si la troisième paire est ok (C2 + D1)
                                const pokemonC2 = pokemonListByBestIv.maxIvC.pokemons[c + 1];
                                const pokemonC2IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonC2?.id);
                                const pokemonD1 = pokemonListByBestIv.maxIvD.pokemons[d];
                                const pokemonD1IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonD1?.id);
                                if (pokemonC2 && pokemonD1 && pokemonC2.sex !== pokemonD1.sex && !pokemonC2IsBanned && !pokemonD1IsBanned) {

                                    // Si la quatrième paire est ok (D2 + E3)
                                    const pokemonD2 = pokemonListByBestIv.maxIvD.pokemons[d + 1];
                                    const pokemonD2IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonD2?.id);
                                    const pokemonE3 = pokemonListByBestIv.maxIvE.pokemons[e + 2];
                                    const pokemonE3IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonE3?.id);
                                    if (pokemonD2 && pokemonE3 && pokemonD2.sex !== pokemonE3.sex && !pokemonD2IsBanned && !pokemonE3IsBanned) {

                                        // Si la cinquième paire est ok (C3 + D3)
                                        const pokemonC3 = pokemonListByBestIv.maxIvC.pokemons[c + 2];
                                        const pokemonC3IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonC3?.id);
                                        const pokemonD3 = pokemonListByBestIv.maxIvD.pokemons[d + 2];
                                        const pokemonD3IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonD3?.id);
                                        if (pokemonC3 && pokemonD3 && pokemonC3.sex !== pokemonD3.sex && !pokemonC3IsBanned && !pokemonD3IsBanned) {

                                            // Si la sixième paire est ok (E4 + D4)
                                            const pokemonE4 = pokemonListByBestIv.maxIvE.pokemons[e + 3];
                                            const pokemonE4IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonE4?.id);
                                            const pokemonD4 = pokemonListByBestIv.maxIvD.pokemons[d + 3];
                                            const pokemonD4IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonD4?.id);
                                            if (pokemonE4 && pokemonD4 && pokemonE4.sex !== pokemonD4.sex && !pokemonE4IsBanned && !pokemonD4IsBanned) {

                                                // Si la septième paire est ok (E5 + B1)
                                                for (let b = 0; b < pokemonListByBestIv.maxIvB.count; b++) {
                                                    const pokemonE5 = pokemonListByBestIv.maxIvE.pokemons[e + 4];
                                                    const pokemonE5IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonE5?.id);
                                                    const pokemonB1 = pokemonListByBestIv.maxIvB.pokemons[b];
                                                    const pokemonB1IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonB1?.id);
                                                    if (pokemonE5 && pokemonB1 && pokemonE5.sex !== pokemonB1.sex && !pokemonE5IsBanned && !pokemonB1IsBanned ) {

                                                        // Si la huitième paire est ok (B2 + D5)
                                                        const pokemonB2 = pokemonListByBestIv.maxIvB.pokemons[b + 1];
                                                        const pokemonB2IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonB2?.id);
                                                        const pokemonD5 = pokemonListByBestIv.maxIvD.pokemons[d + 4];
                                                        const pokemonD5IsBanned = isPokemonBannedFromList(bannedPokemonsIds, pokemonD5?.id);
                                                        if (pokemonB2 && pokemonD5 && pokemonB2.sex !== pokemonD5.sex && !pokemonB2IsBanned && !pokemonD5IsBanned) {

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

                                                            if (!breedCombinationsResult.some(result => result.equals(newResult))) {
                                                                breedCombinationsResult.push(newResult);
                                                                bannedPokemonsIds.push(pokemonA.id);
                                                                bannedPokemonsIds.push(pokemonB1.id);
                                                                bannedPokemonsIds.push(pokemonB2.id);
                                                                bannedPokemonsIds.push(pokemonC1.id);
                                                                bannedPokemonsIds.push(pokemonC2.id);
                                                                bannedPokemonsIds.push(pokemonC3.id);
                                                                bannedPokemonsIds.push(pokemonD1.id);
                                                                bannedPokemonsIds.push(pokemonD2.id);
                                                                bannedPokemonsIds.push(pokemonD3.id);
                                                                bannedPokemonsIds.push(pokemonD4.id);
                                                                bannedPokemonsIds.push(pokemonD5.id);
                                                                bannedPokemonsIds.push(pokemonE1.id);
                                                                bannedPokemonsIds.push(pokemonE2.id);
                                                                bannedPokemonsIds.push(pokemonE3.id);
                                                                bannedPokemonsIds.push(pokemonE4.id);
                                                                bannedPokemonsIds.push(pokemonE5.id);
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
    }
}

/**
 * Fonction qui génére et retourne une liste de pokemon random
 *
 * @param  {number}         nbPokemonsMax           - Nombre de pokémon à générer
 * @param  {string}         pokemonName             - Nom du pokemon à générer
 * @return {PokemonModel[]} generatedPokemonsList   - Nouvelle liste de pokémon random
 */
function generateRandomPokemonList(nbPokemonsMax: number, pokemonName: string = 'motisma'): PokemonModel[] {
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
            newPokemon = new PokemonModel(p.toString(), pokemonName + p.toString(), sex, 31, 0, 0, 0, 0, 0);
        }
        else if (randomIv === 2) {
            newPokemon = new PokemonModel(p.toString(), pokemonName + p.toString(), sex, 0, 31, 0, 0, 0, 0);
        }
        else if (randomIv === 3) {
            newPokemon = new PokemonModel(p.toString(), pokemonName + p.toString(), sex, 0, 0, 31, 0, 0, 0);
        }
        else if (randomIv === 4) {
            newPokemon = new PokemonModel(p.toString(), pokemonName + p.toString(), sex, 0, 0, 0, 31, 0, 0);
        }
        else if (randomIv === 5) {
            newPokemon = new PokemonModel(p.toString(), pokemonName + p.toString(), sex, 0, 0, 0, 0, 31, 0);
        }
        else if (randomIv === 6) {
            newPokemon = new PokemonModel(p.toString(), pokemonName + p.toString(), sex, 0, 0, 0, 0, 0, 31);
        }
        if (newPokemon != null) {
            generatedPokemonsList.push(newPokemon);
        }
    }
    return generatedPokemonsList;
}


/**
 * Fonction qui trie les pokémons dans des listes par IV max
 *
 * @param  {PokemonModel[]} generatedPokemonsList - Liste de pokémon à trier
 * @return {PokemonModel[]} pokemonSortList       - Renvoi la liste de pokémon random trié par IV max
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
        // TODO VOIR POUR LES HP
        // if (generatedPokemonsList[i].hp === 31) {
        //     pokemonListByBestIv.hp.push(generatedPokemonsList[i]);
        // }
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

/**
 * Vérifie si un pokemon est bannis d'une des listes
 * @param {string[]|number[]} bannedListIds - Liste des ids qui ne doivent, qui sera comparé av
 * @param {string|number} pokemonId         - Id du pokemon à vérifier dans la liste
 * @returns {boolean}                       - Returns true si le pokemon est bannis, et false s'il ne l'est pas
 */
function isPokemonBannedFromList(bannedListIds: string[]| number[], pokemonId : number|string): boolean {
    if (pokemonId === null || pokemonId === undefined) {
        return true;
    }
    const isFound = bannedListIds.find(x => x === pokemonId || x === pokemonId);
    if (isFound) {
        return true;
    }
    return false;

}

/**
 * Test pour voir si le résultat est cohérent (vérifie les doublons d'id et affiche le nombre max de combinaison)
 * @param {IPokemonCombinationResult[]} breedCombinationsResult - Liste des combinaisons de pokemon

function checkBreedCombinationResult(breedCombinationsResult: IPokemonCombinationResult[] = []): void {
    const trueBreeds = [];
    const ids = [];

    breedCombinationsResult.forEach(breedCombination => {
        if(!ids.includes(breedCombination.pokemonE1.id) && !ids.includes(breedCombination.pokemonE2.id) && !ids.includes(breedCombination.pokemonE3.id)
            && !ids.includes(breedCombination.pokemonE4.id) && !ids.includes(breedCombination.pokemonE5.id) && !ids.includes(breedCombination.pokemonD1.id)
            && !ids.includes(breedCombination.pokemonD2.id) && !ids.includes(breedCombination.pokemonD3.id)  && !ids.includes(breedCombination.pokemonD4.id)
            && !ids.includes(breedCombination.pokemonD5.id) && !ids.includes(breedCombination.pokemonC1.id)  && !ids.includes(breedCombination.pokemonC2.id)
            && !ids.includes(breedCombination.pokemonC3.id) && !ids.includes(breedCombination.pokemonB1.id) && !ids.includes(breedCombination.pokemonB2.id)
            && !ids.includes(breedCombination.pokemonA.id) ) {
                ids.push(breedCombination.pokemonE1.id);
                ids.push(breedCombination.pokemonE2.id);
                ids.push(breedCombination.pokemonE3.id);
                ids.push(breedCombination.pokemonE4.id);
                ids.push(breedCombination.pokemonE5.id);
                ids.push(breedCombination.pokemonD1.id);
                ids.push(breedCombination.pokemonD2.id);
                ids.push(breedCombination.pokemonD3.id);
                ids.push(breedCombination.pokemonD4.id);
                ids.push(breedCombination.pokemonD5.id);
                ids.push(breedCombination.pokemonC1.id);
                ids.push(breedCombination.pokemonC2.id);
                ids.push(breedCombination.pokemonC3.id);
                ids.push(breedCombination.pokemonB1.id);
                ids.push(breedCombination.pokemonB2.id);
                ids.push(breedCombination.pokemonA.id);
                trueBreeds.push(breedCombination);
        }
    });

    logConsole.info('VERIFICATION: Nombre de combinaisons max:', trueBreeds.length);
}
 */

