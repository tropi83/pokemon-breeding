import { PokemonModel } from "./PokemonModel";

/**
 * Résultat combinaison Pokémon Model class
 */
export class PokemonCombinationResultModel {
    combinations: IPokemonCombinationResult[] = [];

    /**
     * Constructor
     *
     * @param {IPokemonCombinationResult[]} combinations - Tableau des résultats de combinaison
     */
    constructor(combinations: IPokemonCombinationResult[]) {
        this.combinations = combinations;
    }
}

/**
 * Interface représentant une combinaison de Pokémon
 */
export interface IPokemonCombinationResult {
    pokemonA: PokemonModel;
    pokemonE1: PokemonModel;
    pokemonE2: PokemonModel;
    pokemonC1: PokemonModel;
    pokemonC2: PokemonModel;
    pokemonD1: PokemonModel;
    pokemonD2: PokemonModel;
    pokemonE3: PokemonModel;
    pokemonC3: PokemonModel;
    pokemonD3: PokemonModel;
    pokemonE4: PokemonModel;
    pokemonD4: PokemonModel;
    pokemonE5: PokemonModel;
    pokemonB1: PokemonModel;
    pokemonB2: PokemonModel;
    pokemonD5: PokemonModel;

    equals(other: IPokemonCombinationResult): boolean;
    displayText(): string;
}

/**
 * Implémentation de la classe représentant une combinaison de Pokémon
 */
export class PokemonCombinationResult implements IPokemonCombinationResult {
    pokemonA: PokemonModel;
    pokemonE1: PokemonModel;
    pokemonE2: PokemonModel;
    pokemonC1: PokemonModel;
    pokemonC2: PokemonModel;
    pokemonD1: PokemonModel;
    pokemonD2: PokemonModel;
    pokemonE3: PokemonModel;
    pokemonC3: PokemonModel;
    pokemonD3: PokemonModel;
    pokemonE4: PokemonModel;
    pokemonD4: PokemonModel;
    pokemonE5: PokemonModel;
    pokemonB1: PokemonModel;
    pokemonB2: PokemonModel;
    pokemonD5: PokemonModel;

    /**
     * Constructor
     *
     * @param {PokemonModel} pokemonA - Pokemon A
     * @param {PokemonModel} pokemonE1 - Pokemon E1
     * @param {PokemonModel} pokemonE2 - Pokemon E2
     * @param {PokemonModel} pokemonC1 - Pokemon C1
     * @param {PokemonModel} pokemonC2 - Pokemon C2
     * @param {PokemonModel} pokemonD1 - Pokemon D1
     * @param {PokemonModel} pokemonD2 - Pokemon D2
     * @param {PokemonModel} pokemonE3 - Pokemon E3
     * @param {PokemonModel} pokemonC3 - Pokemon C3
     * @param {PokemonModel} pokemonD3 - Pokemon D3
     * @param {PokemonModel} pokemonE4 - Pokemon E4
     * @param {PokemonModel} pokemonD4 - Pokemon D4
     * @param {PokemonModel} pokemonE5 - Pokemon E5
     * @param {PokemonModel} pokemonB1 - Pokemon B1
     * @param {PokemonModel} pokemonB2 - Pokemon B2
     * @param {PokemonModel} pokemonD5 - Pokemon D5
     */
    constructor(
        pokemonA: PokemonModel,
        pokemonE1: PokemonModel,
        pokemonE2: PokemonModel,
        pokemonC1: PokemonModel,
        pokemonC2: PokemonModel,
        pokemonD1: PokemonModel,
        pokemonD2: PokemonModel,
        pokemonE3: PokemonModel,
        pokemonC3: PokemonModel,
        pokemonD3: PokemonModel,
        pokemonE4: PokemonModel,
        pokemonD4: PokemonModel,
        pokemonE5: PokemonModel,
        pokemonB1: PokemonModel,
        pokemonB2: PokemonModel,
        pokemonD5: PokemonModel,
    ) {
        this.pokemonA = pokemonA;
        this.pokemonE1 = pokemonE1;
        this.pokemonE2 = pokemonE2;
        this.pokemonC1 = pokemonC1;
        this.pokemonC2 = pokemonC2;
        this.pokemonD1 = pokemonD1;
        this.pokemonD2 = pokemonD2;
        this.pokemonE3 = pokemonE3;
        this.pokemonC3 = pokemonC3;
        this.pokemonD3 = pokemonD3;
        this.pokemonE4 = pokemonE4;
        this.pokemonD4 = pokemonD4;
        this.pokemonE5 = pokemonE5;
        this.pokemonB1 = pokemonB1;
        this.pokemonB2 = pokemonB2;
        this.pokemonD5 = pokemonD5;
    }

    /**
     * Compare la combinaison actuelle avec une autre combinaison
     *
     * @param {IPokemonCombinationResult} other - L'autre combinaison à comparer
     * @returns {boolean} - Vrai si les combinaisons sont égales, faux sinon
     */
    equals(other: IPokemonCombinationResult): boolean {
        return this.pokemonA.id === other.pokemonA.id &&
            this.pokemonE1.id === other.pokemonE1.id &&
            this.pokemonE2.id === other.pokemonE2.id &&
            this.pokemonC1.id === other.pokemonC1.id &&
            this.pokemonC2.id === other.pokemonC2.id &&
            this.pokemonD1.id === other.pokemonD1.id &&
            this.pokemonD2.id === other.pokemonD2.id &&
            this.pokemonE3.id === other.pokemonE3.id &&
            this.pokemonC3.id === other.pokemonC3.id &&
            this.pokemonD3.id === other.pokemonD3.id &&
            this.pokemonE4.id === other.pokemonE4.id &&
            this.pokemonD4.id === other.pokemonD4.id &&
            this.pokemonE5.id === other.pokemonE5.id &&
            this.pokemonB1.id === other.pokemonB1.id &&
            this.pokemonB2.id === other.pokemonB2.id &&
            this.pokemonD5.id === other.pokemonD5.id;
    }

    /**
     * Affiche le texte de la combinaison de Pokémon
     *
     * @returns {string} - Texte représentant la combinaison
     */
    displayText(): string {
        return "Combinaison: \n" +
            "Faire PokemonA:  (" + this.pokemonA.id + ")  avec pokemonE1: (" + this.pokemonE1.id +  "); \n" +
            "Faire pokemonC1: (" + this.pokemonC1.id + ") avec pokemonE2: (" + this.pokemonE2.id +  "); \n" +
            "Faire pokemonC2: (" + this.pokemonC2.id + ") avec pokemonD1: (" + this.pokemonD1.id +  "); \n" +
            "Faire pokemonD2: (" + this.pokemonD2.id + ") avec pokemonE3: (" + this.pokemonE3.id +  "); \n" +
            "Faire pokemonC3: (" + this.pokemonC3.id + ") avec pokemonD3: (" + this.pokemonD3.id +  "); \n" +
            "Faire pokemonE4: (" + this.pokemonE4.id + ") avec pokemonD4: (" + this.pokemonD4.id +  "); \n" +
            "Faire pokemonE5: (" + this.pokemonE5.id + ") avec pokemonB1: (" + this.pokemonB1.id +  "); \n" +
            "Faire pokemonD5: (" + this.pokemonD5.id + ") avec pokemonB2: (" + this.pokemonB2.id +  ");"
    }
}
