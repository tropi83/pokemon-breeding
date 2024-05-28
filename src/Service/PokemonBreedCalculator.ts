const logConsole = require('log-beautify');

import { PokemonModel } from "../Model/PokemonModel";
import { PokemonSortByMaxIvModel } from "../Model/PokemonSortByMaxIvModel";
import { IPokemonCombinationResult, PokemonCombinationResult } from "../Model/PokemonCombinationResultModel";


/**
 * class PokemonBreedCalculator
 */
export class PokemonBreedCalculator
{

    public pokemonsList: PokemonModel[] = [];                         // Pokemons à trier
    public pokemonListByBestIv: PokemonSortByMaxIvModel = null;       // Pokemons trié par IV max et sexe
    public breedCombinationsResult: IPokemonCombinationResult[] = []; // Variable de résultat des combinaisons
    public bannedPokemonsIds: any = [];                               // Id des Pokemon bannis des résultats

    /**
     * Constructor
     *
     * @param {PokemonModel[]} pokemonsList - Liste de pokemon à accoupler
     */
    constructor(pokemonsList: PokemonModel[]) {
        this.pokemonsList = pokemonsList;
    }


    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    // FONCTIONS
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------

    /**
     * Affiche les résultats des combinaisons trouvées
     */
    public displayPokemonCombinationResults () {
        logConsole.info('Génération de  ' + this.pokemonsList.length + ' pokemons...');

        this.pokemonListByBestIv   = this.sortPokemonList(this.pokemonsList);

        // Sélectionne le tableau qui a le moins de pokemon
        console.log('Nombre dans la catégorie E: ', this.pokemonListByBestIv.maxIvE.ivName, this.pokemonListByBestIv.maxIvE.count);
        console.log('Nombre dans la catégorie D: ', this.pokemonListByBestIv.maxIvD.ivName, this.pokemonListByBestIv.maxIvD.count);
        console.log('Nombre dans la catégorie C: ', this.pokemonListByBestIv.maxIvC.ivName, this.pokemonListByBestIv.maxIvC.count);
        console.log('Nombre dans la catégorie B: ', this.pokemonListByBestIv.maxIvB.ivName, this.pokemonListByBestIv.maxIvB.count);
        console.log('Nombre dans la catégorie A: ', this.pokemonListByBestIv.maxIvA.ivName, this.pokemonListByBestIv.maxIvA.count);

        this.calculCombinationResults();

        // Affichage résultat
        if (this.breedCombinationsResult.length === 0) {
            logConsole.warn('AUCUN RESULTAT');
        } else {

            logConsole.info('Nombre de combinaisons max:', this.breedCombinationsResult.length);
            this.breedCombinationsResult.forEach(breedCombination => {
                console.log();
                logConsole.info(breedCombination.displayText());
            });

            // Debug (calcul le nome de combinaison possible)
            //this.checkBreedCombinationResult(this.breedCombinationsResult);

        }
    }

    /**
     * Fonction qui calcul les résultats des combinaisons des pokémons qui peuvent s'accoupler, en insérant un résultat valide de la combinaison
     * dans la variable global tableau/liste breedCombinationsResult si le résultat n'existe pas dans le tableau/liste
     */
    private calculCombinationResults(): void {
        outerALoop:
            for (let a = 0; a < this.pokemonListByBestIv.maxIvA.count; a++) {
                const pokemonA = this.pokemonListByBestIv.maxIvA.pokemons[a];
                const pokemonAIsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonA?.id);

                if(pokemonA && !pokemonAIsBanned) {
                    for (let e = 0; e < this.pokemonListByBestIv.maxIvE.count; e++) {

                        // Si la première paire est ok (A + E1)
                        const pokemonE1 = this.pokemonListByBestIv.maxIvE.pokemons[e];
                        const pokemonE1IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonE1?.id);
                        if (pokemonA && pokemonE1 && pokemonA.sex !== pokemonE1.sex && !pokemonE1IsBanned) {

                            for (let c = 0; c < this.pokemonListByBestIv.maxIvC.count; c++) {
                                // Si la deuxième paire est ok (E2 + C1) ou cet id est déja utilisé/banni
                                const pokemonE2 = this.pokemonListByBestIv.maxIvE.pokemons[e + 1];
                                const pokemonE2IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonE2?.id);
                                const pokemonC1 = this.pokemonListByBestIv.maxIvC.pokemons[c];
                                const pokemonC1IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonC1?.id);
                                if (pokemonE2 && pokemonC1 && pokemonE2.sex !== pokemonC1.sex && !pokemonE2IsBanned && !pokemonC1IsBanned) {

                                    for (let d = 0; d < this.pokemonListByBestIv.maxIvC.count; d++) {
                                        // Si la troisième paire est ok (C2 + D1)
                                        const pokemonC2 = this.pokemonListByBestIv.maxIvC.pokemons[c + 1];
                                        const pokemonC2IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonC2?.id);
                                        const pokemonD1 = this.pokemonListByBestIv.maxIvD.pokemons[d];
                                        const pokemonD1IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonD1?.id);
                                        if (pokemonC2 && pokemonD1 && pokemonC2.sex !== pokemonD1.sex && !pokemonC2IsBanned && !pokemonD1IsBanned) {

                                            // Si la quatrième paire est ok (D2 + E3)
                                            const pokemonD2 = this.pokemonListByBestIv.maxIvD.pokemons[d + 1];
                                            const pokemonD2IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonD2?.id);
                                            const pokemonE3 = this.pokemonListByBestIv.maxIvE.pokemons[e + 2];
                                            const pokemonE3IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonE3?.id);
                                            if (pokemonD2 && pokemonE3 && pokemonD2.sex !== pokemonE3.sex && !pokemonD2IsBanned && !pokemonE3IsBanned) {

                                                // Si la cinquième paire est ok (C3 + D3)
                                                const pokemonC3 = this.pokemonListByBestIv.maxIvC.pokemons[c + 2];
                                                const pokemonC3IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonC3?.id);
                                                const pokemonD3 = this.pokemonListByBestIv.maxIvD.pokemons[d + 2];
                                                const pokemonD3IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonD3?.id);
                                                if (pokemonC3 && pokemonD3 && pokemonC3.sex !== pokemonD3.sex && !pokemonC3IsBanned && !pokemonD3IsBanned) {

                                                    // Si la sixième paire est ok (E4 + D4)
                                                    const pokemonE4 = this.pokemonListByBestIv.maxIvE.pokemons[e + 3];
                                                    const pokemonE4IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonE4?.id);
                                                    const pokemonD4 = this.pokemonListByBestIv.maxIvD.pokemons[d + 3];
                                                    const pokemonD4IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonD4?.id);
                                                    if (pokemonE4 && pokemonD4 && pokemonE4.sex !== pokemonD4.sex && !pokemonE4IsBanned && !pokemonD4IsBanned) {

                                                        // Si la septième paire est ok (E5 + B1)
                                                        for (let b = 0; b < this.pokemonListByBestIv.maxIvB.count; b++) {
                                                            const pokemonE5 = this.pokemonListByBestIv.maxIvE.pokemons[e + 4];
                                                            const pokemonE5IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonE5?.id);
                                                            const pokemonB1 = this.pokemonListByBestIv.maxIvB.pokemons[b];
                                                            const pokemonB1IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonB1?.id);
                                                            if (pokemonE5 && pokemonB1 && pokemonE5.sex !== pokemonB1.sex && !pokemonE5IsBanned && !pokemonB1IsBanned ) {

                                                                // Si la huitième paire est ok (B2 + D5)
                                                                const pokemonB2 = this.pokemonListByBestIv.maxIvB.pokemons[b + 1];
                                                                const pokemonB2IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonB2?.id);
                                                                const pokemonD5 = this.pokemonListByBestIv.maxIvD.pokemons[d + 4];
                                                                const pokemonD5IsBanned = this.isPokemonBannedFromList(this.bannedPokemonsIds, pokemonD5?.id);
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

                                                                    if (!this.breedCombinationsResult.some(result => result.equals(newResult))) {
                                                                        this.breedCombinationsResult.push(newResult);
                                                                        this.bannedPokemonsIds.push(pokemonA.id);
                                                                        this.bannedPokemonsIds.push(pokemonB1.id);
                                                                        this.bannedPokemonsIds.push(pokemonB2.id);
                                                                        this.bannedPokemonsIds.push(pokemonC1.id);
                                                                        this.bannedPokemonsIds.push(pokemonC2.id);
                                                                        this.bannedPokemonsIds.push(pokemonC3.id);
                                                                        this.bannedPokemonsIds.push(pokemonD1.id);
                                                                        this.bannedPokemonsIds.push(pokemonD2.id);
                                                                        this.bannedPokemonsIds.push(pokemonD3.id);
                                                                        this.bannedPokemonsIds.push(pokemonD4.id);
                                                                        this.bannedPokemonsIds.push(pokemonD5.id);
                                                                        this.bannedPokemonsIds.push(pokemonE1.id);
                                                                        this.bannedPokemonsIds.push(pokemonE2.id);
                                                                        this.bannedPokemonsIds.push(pokemonE3.id);
                                                                        this.bannedPokemonsIds.push(pokemonE4.id);
                                                                        this.bannedPokemonsIds.push(pokemonE5.id);
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
     * Fonction qui trie les pokémons dans des listes par IV max
     *
     * @param  {PokemonModel[]} pokemonsList    - Liste de pokémon à trier
     * @return {PokemonModel[]} pokemonSortList - Renvoi la liste de pokémon random trié par IV max
     */
    private sortPokemonList(pokemonsList: PokemonModel[]): any {
        let pokemonListByBestIv = {
            hp: [],
            ivAttack: [],
            ivDefense: [],
            ivSpeAttack: [],
            ivSpeDefence: [],
            ivSpeed: [],
        };

        for (let i = 0; i < pokemonsList.length; i++) {
            // TODO VOIR POUR LES HP
            // if (pokemonsList[i].hp === 31) {
            //     pokemonListByBestIv.hp.push(pokemonsList[i]);
            // }
            if (pokemonsList[i].ivAttack === 31) {
                pokemonListByBestIv.ivAttack.push(pokemonsList[i]);
            }
            if (pokemonsList[i].ivDefense === 31) {
                pokemonListByBestIv.ivDefense.push(pokemonsList[i]);
            }
            if (pokemonsList[i].ivSpeAttack === 31) {
                pokemonListByBestIv.ivSpeAttack.push(pokemonsList[i]);
            }
            if (pokemonsList[i].ivSpeDefence === 31) {
                pokemonListByBestIv.ivSpeDefence.push(pokemonsList[i]);
            }
            if (pokemonsList[i].ivSpeed === 31) {
                pokemonListByBestIv.ivSpeed.push(pokemonsList[i]);
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
     * Vérifie si un pokemon est bannis d'une des listes
     * @param {string[]|number[]} bannedListIds - Liste des ids qui ne doivent, qui sera comparé av
     * @param {string|number} pokemonId         - Id du pokemon à vérifier dans la liste
     * @returns {boolean}                       - Returns true si le pokemon est bannis, et false s'il ne l'est pas
     */
    private isPokemonBannedFromList(bannedListIds: string[]| number[], pokemonId : number|string): boolean {
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

     private checkBreedCombinationResult(breedCombinationsResult: IPokemonCombinationResult[] = []): void {
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


}

module.exports = PokemonBreedCalculator;

