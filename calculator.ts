
const PokemonGenerator = require('./src/Service/PokemonGenerator');
const PokemonBreedCalculator = require('./src/Service/PokemonBreedCalculator');

/**
 *
 * Entrypoint command
 */
(async function main()
{
    // CHECK ARGUMENT OF COMMAND
    let nbMaxPokemon: number = 100;
    let ignoredIv: string = 'ivSpeAttack';
    const args = process.argv.slice(2);
    if (args && args.length > 0) {
        if(Number.isInteger(parseInt(args[0]))){
            if(parseInt(args[0]) > 0){
                nbMaxPokemon = parseInt(args[0]);
            }
        }
        if(args[1]){
            ignoredIv = args[1];
        }
    }

    const pokemonGenerator = new PokemonGenerator(nbMaxPokemon, 'motisma');
    const pokemonBreedCalculator = new PokemonBreedCalculator(pokemonGenerator.generatedPokemonsList, ignoredIv);

    pokemonBreedCalculator.displayPokemonCombinationResults();

})();