
const PokemonGenerator = require('./src/Service/PokemonGenerator');
const PokemonBreedCalculator = require('./src/Service/PokemonBreedCalculator');

/**
 *
 * Entrypoint command
 */
(async function main()
{
    const pokemonGenerator = new PokemonGenerator(100, 'motisma');

    const pokemonBreedCalculator = new PokemonBreedCalculator(pokemonGenerator.generatedPokemonsList, 'ivSpeAttack');

    pokemonBreedCalculator.displayPokemonCombinationResults();

})();