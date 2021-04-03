export const typeNames = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];

export const BOARD = // Defesa x Ataque (Linha x Coluna)
        [
    //normal fire water electric grass ice fighting poison ground flying psychic bug rock ghost dragon dark steel fairy  
            [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1], //None
            [  1,   1,   1,   1,   1,   1,   2,   1,   1,   1,   1,   1,   1,   0,   1,   1,   1,   1], //Normal
            [  1, 0.5,   2,   1, 0.5, 0.5,   1,   1,   2,   1,   1, 0.5,   2,   1,   1,   1, 0.5, 0.5], //Fire
            [  1, 0.5, 0.5,   2,   2, 0.5,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1, 0.5,   1], //Water
            [  1,   1,   1, 0.5,   1,   1,   1,   1,   2, 0.5,   1,   1,   1,   1,   1,   1, 0.5,   1], //Electric
            [  1,   2, 0.5, 0.5, 0.5,   2,   1,   2, 0.5,   2,   1,   2,   1,   1,   1,   1,   1,   1], //Grass
            [  1,   2,   1,   1,   1, 0.5,   2,   1,   1,   1,   1,   1,   2,   1,   1,   1,   2,   1], //Ice
            [  1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   2, 0.5, 0.5,   1,   1, 0.5,   1,   2], //Fighting
            [  1,   1,   1,   1, 0.5,   1, 0.5, 0.5,   2,   1,   2, 0.5,   1,   1,   1,   1,   1, 0.5], //Poison
            [  1,   1,   2,   0,   2,   2,   1, 0.5,   1,   1,   1,   1, 0.5,   1,   1,   1,   1,   1], //Ground
            [  1,   1,   1,   2, 0.5,   2, 0.5,   1,   0,   1,   1, 0.5,   2,   1,   1,   1,   1,   1], //Flying
            [  1,   1,   1,   1,   1,   1, 0.5,   1,   1,   1, 0.5,   2,   1,   2,   1,   2,   1,   1], //Psychic
            [  1,   2,   1,   1, 0.5,   1, 0.5,   1, 0.5,   2,   1,   1,   2,   1,   1,   1,   1,   1], //Bug
            [0.5, 0.5,   2,   1,   2,   1,   2, 0.5,   2, 0.5,   1,   1,   1,   1,   1,   1,   2,   1], //Rock
            [  0,   1,   1,   1,   1,   1,   0, 0.5,   1,   1,   1, 0.5,   1,   2,   1,   2,   1,   1], //Ghost
            [  1, 0.5, 0.5, 0.5, 0.5,   2,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1,   1,   2], //Dragon
            [  1,   1,   1,   1,   1,   1,   2,   1,   1,   1,   0,   2,   1, 0.5,   1, 0.5,   1,   2], //Dark
            [0.5,   2,   1,   1, 0.5, 0.5,   2,   0,   2, 0.5, 0.5, 0.5, 0.5,   1, 0.5,   1, 0.5, 0.5], //Steel
            [  1,   1,   1,   1,   1,   1, 0.5,   2,   1,   1,   1, 0.5,   1,   1,   0, 0.5,   2,   1] //Fairy
        ];

export const typesToInt = new Map<String, number>([
        ["none", 0], 
        ["normal", 1], 
        ["fire", 2], 
        ["water", 3], 
        ["electric", 4], 
        ["grass", 5], 
        ["ice", 6], 
        ["fighting", 7], 
        ["poison", 8], 
        ["ground", 9], 
        ["flying", 10], 
        ["psychic", 11], 
        ["bug", 12], 
        ["rock", 13], 
        ["ghost", 14], 
        ["dragon", 15], 
        ["dark", 16], 
        ["steel", 17], 
        ["fairy", 18]
]);
