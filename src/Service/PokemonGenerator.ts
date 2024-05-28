import { PokemonModel } from "../Model/PokemonModel";

/**
 * class PokemonGenerator
 */
export class PokemonGenerator
{

    public nbPokemonsMax: number = 100;
    public pokemonName: string = 'motisma';
    public generatedPokemonsList: PokemonModel[] = []; // Pokemons générés

    /**
     * Constructor
     *
     * @param {number} nbPokemonsMax        - Nombre de pokemon à générer
     * @param {string} pokemonName          - Nom du pokemon à générer
     */
    constructor(nbPokemonsMax: number, pokemonName: string= 'motisma') {
        this.nbPokemonsMax = nbPokemonsMax;
        this.pokemonName = pokemonName;
        this.generatedPokemonsList = this.generateRandomPokemonList(this.nbPokemonsMax, this.pokemonName)
    }


    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    // FONCTIONS
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------

    /**
     * Fonction qui génère et retourne une liste de pokemon random
     *
     * @param  {number}         nbPokemonsMax           - Nombre de pokémon à générer
     * @param  {string}         pokemonName             - Nom du pokemon à générer
     * @return {PokemonModel[]} generatedPokemonsList   - Nouvelle liste de pokémon random
     */
    private generateRandomPokemonList(nbPokemonsMax: number, pokemonName: string = 'motisma'): PokemonModel[] {
        let generatedPokemonsList: PokemonModel[] = [];
        for (let p = 0; p < nbPokemonsMax; p++) {
            const randomIv = Math.floor(Math.random() * (6 - 1 + 1)) + 1;;
            let sex = 'male';
            if (this.generateBinary() === 1) {
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
     * Generate random (0 or 1)
     *
     * @returns {number}  - Returns random number (0 or 1)
     */
    private generateBinary(): number {
        let state = Math.random();
        if (state < 0.5)
            state = 0;
        else
            state = 1;
        return state;
    }

}

module.exports = PokemonGenerator;

