/**
 * Pokémon Model class
 */
export class PokemonModel
{
    id: string | null;
    name: string;
    sex: string;
    hp: number;
    ivAttack: number;
    ivDefense: number;
    ivSpeAttack: number;
    ivSpeDefence: number;
    ivSpeed: number;

    /**
     * Constructor
     *
     * @param {string} id           - Identification
     * @param {string} name         - Nom du pokemon
     * @param {string} sex          - Sexe du pokemon
     * @param {number} hp:          - Point de vie
     * @param {number} ivAttack     - Iv de son attaque
     * @param {number} ivDefense    - Iv de sa défence
     * @param {number} ivSpeAttack: - PIv de son attaque spéciale
     * @param {number} ivSpeDefence - Iv de sa défence spécial
     * @param {number} ivSpeed:     - Iv de sa vitesse
     */
    constructor(
        id: string,
        name: string,
        sex: string,
        hp: number,
        ivAttack: number,
        ivDefense: number,
        ivSpeAttack: number,
        ivSpeDefence: number,
        ivSpeed: number
    )
    {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.hp = hp;
        this.ivAttack = ivAttack;
        this.ivDefense = ivDefense;
        this.ivSpeAttack = ivSpeAttack;
        this.ivSpeDefence= ivSpeDefence;
        this.ivSpeed = ivSpeed;
    }
}
