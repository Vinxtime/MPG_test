## Presentation

This mini app includes a table  of football players. Each row is pressable and leads to given player's detail a regards football current season.

### Information displayed
#### Main table
Data have been selected from the general players pool.

#### Detail screen
Data are diplayed according to the championship where a given player's played this season.

 - All of the key seasons data are displayed within a same array.

 - This array puts into perspective absolute amounts and ranks in percentages.

- Below this array, there is another array showing detailed stats for each game he played in the given championship.

### To be noticed
- 'APP' field in main table reveals the following : (TOTAL_PLAYED_MATCHES)(TOTAL_MATCHES_WHERE_HE_ENTERED_DURING_THE GAME)

- A color palette (cf ./utils/position.js) is used for each player position.
It greatly enhances visiblity

## Technical discussion
- TypeChecking is made with Typescript.
- The project makes use of React Navigation (v6) to handle switching from playes table screen to specific player screen.
- The players list is included into a FlatList RN component. It makes use of its very preciou attributes (progressive scrolling display for instance), to improves app perfomance (as there are thousand of players.)
- All urls are set from a dedicated file (utils folder).
- Eslint is included into the project. It reveals this mini-app's developer's favorite syntaxic rules :)










