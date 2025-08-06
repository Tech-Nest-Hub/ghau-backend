const ROLES = {
  MAFIA: ['Godfather', 'Mafia', 'Framer', 'Bomber'],
  TOWN: ['Doctor', 'Detective', 'Villager', 'Vigilante', 'Mayor', 'PI', 'Spy'],
  NEUTRAL: ['Executioner', 'Jester', 'Distractor', 'Baiter', 'Hacker']
};

export const assignRoles = (room) => {
  const { players } = room;
  const playerCount = players.length;
  const roles = [];
  
  // Basic role distribution (you can customize this)
  if (playerCount >= 5 && playerCount < 8) {
    roles.push(...ROLES.MAFIA.slice(0, 1));
    roles.push(...ROLES.TOWN.slice(0, playerCount - 1));
  } else if (playerCount >= 8 && playerCount < 12) {
    roles.push(...ROLES.MAFIA.slice(0, 2));
    roles.push(...ROLES.TOWN.slice(0, playerCount - 2));
  } else {
    roles.push(...ROLES.MAFIA.slice(0, 3));
    roles.push(...ROLES.TOWN.slice(0, playerCount - 4));
    roles.push(...ROLES.NEUTRAL.slice(0, 1));
  }

  // Shuffle roles
  const shuffledRoles = [...roles].sort(() => Math.random() - 0.5);
  
  // Assign to players
  players.forEach((player, index) => {
    player.assignRole(shuffledRoles[index]);
  });
};