import {PokemonModel} from "./PokemonModel";

/**
 * Pokemonss triés par max Iv Model class dans l'ordre décroissant
 */
export class PokemonSortByMaxIvModel
{
    maxIvE: IPokemonSortByMaxIv;
    maxIvD: IPokemonSortByMaxIv;
    maxIvC: IPokemonSortByMaxIv;
    maxIvB: IPokemonSortByMaxIv;
    maxIvA: IPokemonSortByMaxIv;

    /**
     * Constructor
     *
     * @param {IPokemonSortByMaxIv} maxIvE      - Tableau des pokemon par max Iv E (liste la plus remplie)
     * @param {IPokemonSortByMaxIv} maxIvD      - Tableau des pokemon par max Iv E (liste la deuxième plus remplie)
     * @param {IPokemonSortByMaxIv} maxIvC      - Tableau des pokemon par max Iv E (liste remplie au milieu)
     * @param {IPokemonSortByMaxIv} maxIvB      - Tableau des pokemon par max Iv B (liste avant-dernière moins remplie)
     * @param {IPokemonSortByMaxIv} maxIvA      - Tableau des pokemon par max Iv A (liste la moins remplie)
     */
    constructor(
        maxIvE: IPokemonSortByMaxIv,
        maxIvD: IPokemonSortByMaxIv,
        maxIvC: IPokemonSortByMaxIv,
        maxIvB: IPokemonSortByMaxIv,
        maxIvA: IPokemonSortByMaxIv
    )
    {
        this.maxIvE = maxIvE;
        this.maxIvD = maxIvD;
        this.maxIvC = maxIvC;
        this.maxIvC = maxIvC;
        this.maxIvB = maxIvB;
        this.maxIvA = maxIvA;
    }

    /**
     * Trie les propriétés de l'instance par nombre d'éléments en ordre décroissant
     */
    sortByCount() {
        // Convertir les propriétés en un tableau
        const sortableList = [
            this.maxIvE,
            this.maxIvD,
            this.maxIvC,
            this.maxIvB,
            this.maxIvA
        ];

        // Trier le tableau
        sortableList.sort((a, b) => b.count - a.count);

        // Réassigner les propriétés
        [this.maxIvE, this.maxIvD, this.maxIvC, this.maxIvB, this.maxIvA] = sortableList;
    }

}

export interface IPokemonSortByMaxIv
{
    ivName: string,
    count: number,
    pokemons: PokemonModel[]
}
