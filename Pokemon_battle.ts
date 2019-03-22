//1. You have encounter your opponent Mr Mine.
//2. You send in Gengar.
//3. You can choose one of Gengar's skills
//3. Gengar use shadow ball. Shadow Ball hits for 50 DMG. 
//4. Critical Hit. Enemy fainted because health reduced to 0/
//5. You have earned experience points.
//6. if your pokemon levels up, might learn new skills.

let myPokemon = 'Pikachu'
let myOpponent = 'Meow'
let myPokemonHP = 100
let myOppHP = 80
let myPokemonSkill = 'ThunderBolts'
let myOpponentSkill = 'Meows'
let myPokemonDmg = 10;  
let myOpponentDmg = 8;  
let myPokemenExp = 50
let myOppExp = 30
let isMyTurn = true


//1. You have encounter your opponent.
console.log("You have encounter your opponent " + myOpponent)

//2. You send in your pokemon.
console.log("I send you " + myPokemon)

console.log(myPokemon + ' has ' + myPokemonHP + ' HP')
console.log(myOpponent + ' has ' + myOppHP + ' HP')

//3. You can choose one of Pokemon Skill

// the game continues while either pokemon has more than 0 HP
// as long as my HP is more than 0 and opponent HP is more than 50
// if myHP goes below 0, stop
// if oppHP goes below 0, stop

// myHP >0 || oppHP > 0
// my HP goes below 0, but opponent HP is above 0, continue
// opponent HP goes below 0, but my HP is above 0, continue
// my HP is below 0 and opponent HP is below 0, stop
while (myPokemonHP > 0 && myOppHP > 0) {
  console.log('------------------------------')
  let attackerName = isMyTurn ? myPokemon : myOpponent
  let defenderName = isMyTurn ? myOpponent : myPokemon
  let attackerSkill = isMyTurn ? myPokemonSkill : myOpponentSkill
  let attackerDmg = isMyTurn ? myPokemonDmg : myOpponentDmg
  // first pokemon attacks
  console.log(attackerName + " use " + attackerSkill)
  console.log(attackerSkill + " deal " + attackerDmg + " damage")

  if (isMyTurn) {
    myOppHP = myOppHP - myPokemonDmg
    console.log(defenderName + "'s health is reduced to " + myOppHP)
  } else {
    myPokemonHP = myPokemonHP - myOpponentDmg
    console.log(defenderName + "'s health is reduced to " + myPokemonHP)
  }

  // TODO: switch turns
  isMyTurn = !isMyTurn
}

if (myOppHP <= 0) {
    console.log(myOpponent + ' faints')
    console.log(myPokemon + ' has gained 50 exp')
  } else if (myPokemonHP <= 0) {
    console.log(myPokemon + ' faints')
    console.log('GAME OVER')
  }

  
  
