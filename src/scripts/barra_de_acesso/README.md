# Scripts da Barra de Acesso

Backup local dos scripts publicos hospedados originalmente em `https://twscripts.dev/scripts/`, com skin Akuma aplicada nas janelas e dependencias internas apontando para este repositorio.

Os creditos originais foram preservados nos cabecalhos dos arquivos. As versoes foram incrementadas com o sufixo `-akuma.1` para indicar a modificacao visual/local.

## Autores Identificados

- Nao informado no arquivo
- RedAlert

## Como Usar

Adicione a linha do script desejado na barra de acesso do Tribal Wars. Exemplo:

```js
javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/coinMintingCalculator.js');
```

Scripts com configuracao propria mantem a configuracao antes do `$.getScript`, como webhook do Discord, formato de etiqueta ou tropas para envio.

## Linhas Para Barra De Acesso

| Arquivo | Script | Linha |
| --- | --- | --- |
| `advancedReportFilters.js` | Advanced Report Filters | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/advancedReportFilters.js');` |
| `backtimesPlanner.js` | Backtimes Planner | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/backtimesPlanner.js');` |
| `barbsFinder.js` | Barbs Finder | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/barbsFinder.js');` |
| `bonusFinderEvolved.js` | Bonus Finder Evolved | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/bonusFinderEvolved.js');` |
| `buildingsUpgradeQueue.js` | Buildings Upgrade Queue | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/buildingsUpgradeQueue.js');` |
| `cancelSnipe.js` | Cancel Snipe Helper | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/cancelSnipe.js');` |
| `clearBarbarianWalls.js` | Clear Barbarian Walls | `javascript:var UNITS_TO_SEND={1:'&axe=60&ram=4&spy=1',2:'&axe=60&ram=7&spy=1',3:'&axe=60&ram=10&spy=1',4:'&axe=150&ram=15&spy=1',5:'&axe=150&ram=20&spy=1',6:'&axe=150&ram=25&spy=1',7:'&axe=250&ram=30&spy=1',8:'&axe=250&ram=38&spy=1',9:'&axe=500&ram=46&spy=1'};$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/clearBarbarianWalls.js');` |
| `coinMintingCalculator.js` | Coin Minting Calculator | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/coinMintingCalculator.js');` |
| `commandsOverview.js` | Commands Overview | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/commandsOverview.js');` |
| `commandTimer.js` | Command Timer | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/commandTimer.js');` |
| `commandTimer.min.js` | commandTimer.min | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/commandTimer.min.js');` |
| `constructionTimes.js` | Construction Times | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/constructionTimes.js');` |
| `convertTextToNote.js` | Convert Text to Village Note | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/convertTextToNote.js');` |
| `countHomeTroops.js` | Own Home Troops Count | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/countHomeTroops.js');` |
| `defenseHealthCheck.js` | Defense Health Check | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/defenseHealthCheck.js');` |
| `discordSupportTool.js` | Discord Support Tool | `javascript:var config={webhookURL:'',username:'Discord Support Tool',avatar:'https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/assets/tribal-wars-icon.png',colorCode:12690020};$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/discordSupportTool.js');` |
| `evolvedFakeTrain.js` | Evolved Fake Train | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/evolvedFakeTrain.js');` |
| `extendedPlayerInfo.js` | Extended Player Info | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/extendedPlayerInfo.js');` |
| `extendedTribeInfo.js` | Extended Tribe Info | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/extendedTribeInfo.js');` |
| `fakeScriptClient.js` | Fake Script Client | `javascript:var config={sendMode:'random',unitsAndAmounts:[],playersInput:'',tribesInput:'',continents:'',minCoord:'',maxCoord:'',distCenter:'',center:'',whatSend:'',excludedPlayers:'',enable20To1Limit:false,minPoints:'',maxPoints:''};$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/fakeScriptClient.js');` |
| `fakeScriptGenerator.js` | Fake Script Generator | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/fakeScriptGenerator.js');` |
| `farmingEfficiencyCalculator.js` | Farm Efficiency Calculator | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/farmingEfficiencyCalculator.js');` |
| `farmStatistics.js` | Farm Statistics | `javascript:var webhookURL='';$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/farmStatistics.js');` |
| `fillTroopsInSimulator.js` | Fill Troops in Simulator | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/fillTroopsInSimulator.js');` |
| `findFrontlineVillages.js` | Find Frontline Villages | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/findFrontlineVillages.js');` |
| `friendRequest.js` | Friend Request | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/friendRequest.js');` |
| `frontlineStacks.js` | Frontline Stacks Planner | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/frontlineStacks.js');` |
| `getIncsForPlayer.js` | Get Incs for Player | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/getIncsForPlayer.js');` |
| `importExportDynamicGroups.js` | Import/Export Dynamic Groups | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/importExportDynamicGroups.js');` |
| `incomingsOverview.js` | Incomings Overview | `javascript:var NOBLE_GAP=100;var FORMAT='%unit% \| %sent%';$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/incomingsOverview.js');` |
| `incommingPP.js` | Count Incoming PP | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/incommingPP.js');` |
| `inviteToTribe.js` | Invite to Tribe | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/inviteToTribe.js');` |
| `lastTimeAttacked.js` | Show Last Time Attacked | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/lastTimeAttacked.js');` |
| `lastVillageGrowth.js` | Last Village Growth | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/lastVillageGrowth.js');` |
| `localStorageManager.js` | localStorage Manager | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/localStorageManager.js');` |
| `loyaltyCalculator.js` | Loyalty Calculator | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/loyaltyCalculator.js');` |
| `mapBarbsOnly.js` | Map Barbs Only | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/mapBarbsOnly.js');` |
| `mapCoordPicker.js` | Map Coord Picker | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/mapCoordPicker.js');` |
| `massAttackPlanner.js` | Mass Attack Planner | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/massAttackPlanner.js');` |
| `massCommandTimer.js` | Mass Command Timer | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/massCommandTimer.js');` |
| `massSnipe.js` | Mass Snipe | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/massSnipe.js');` |
| `massUnlockScav.js` | Mass Scavenging Unlock | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/massUnlockScav.js');` |
| `mintHelper.js` | Mint Helper | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/mintHelper.js');` |
| `nobleCalculator.js` | Nobles Resource Calculator | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/nobleCalculator.js');` |
| `ownNotesManager.js` | Own Notes Manager | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/ownNotesManager.js');` |
| `playerFarmsFinder.js` | Player Farms Finder | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/playerFarmsFinder.js');` |
| `playerFinder.js` | Player Finder | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/playerFinder.js');` |
| `rankingGraphs.js` | Graphs on Ranking | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/rankingGraphs.js');` |
| `redirector.js` | Redirector | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/redirector.js');` |
| `reportsFilters.js` | Filter Reports | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/reportsFilters.js');` |
| `reportsOverviewHelper.js` | Reports Overview Helper | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/reportsOverviewHelper.js');` |
| `scriptsPack.js` | RedAlert's Scripts Pack | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/scriptsPack.js');` |
| `setVillageNotes.js` | Set/Get Village Notes | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/setVillageNotes.js');` |
| `singleVillagePlanner.js` | Single Village Planner | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/singleVillagePlanner.js');` |
| `singleVillageSnipe.js` | Single Village Snipe | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/singleVillageSnipe.js');` |
| `supportCounterEvolved.js` | Support Counter Evolved | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/supportCounterEvolved.js');` |
| `tribePlayersUnderAttack.js` | Tribe Players Under Attack | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/tribePlayersUnderAttack.js');` |
| `tribeStatsTool.js` | Tribe Stats Tools | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/tribeStatsTool.js');` |
| `troopsCounterFixed.js` | troopsCounterFixed | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/troopsCounterFixed.js');` |
| `troopTemplatesManager.js` | Troop Templates Manager | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/troopTemplatesManager.js');` |
| `villagesInRange.js` | Find Villages in Range | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/villagesInRange.js');` |
| `watchtowerEvolved.js` | WatchTower Evolved | `javascript:$.getScript('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/watchtowerEvolved.js');` |

## Creditos

| Arquivo | Script | Versao | Autor | Modificacao |
| --- | --- | --- | --- | --- |
| `advancedReportFilters.js` | Advanced Report Filters | v1.0.7-akuma.1 | RedAlert | Akuma |
| `backtimesPlanner.js` | Backtimes Planner | v1.2.3-akuma.1 | RedAlert | Akuma |
| `barbsFinder.js` | Barbs Finder | v2.0.3-akuma.1 | RedAlert | Akuma |
| `bonusFinderEvolved.js` | Bonus Finder Evolved | v2.1.4-akuma.1 | RedAlert | Akuma |
| `buildingsUpgradeQueue.js` | Buildings Upgrade Queue | v1.0.2-akuma.1 | RedAlert | Akuma |
| `cancelSnipe.js` | Cancel Snipe Helper | v1.0.4-akuma.1 | RedAlert | Akuma |
| `clearBarbarianWalls.js` | Clear Barbarian Walls | v1.6.2-akuma.1 | RedAlert | Akuma |
| `coinMintingCalculator.js` | Coin Minting Calculator | v1.0.2-akuma.1 | RedAlert | Akuma |
| `commandsOverview.js` | Commands Overview | v1.0.4-akuma.1 | RedAlert | Akuma |
| `commandTimer.js` | Command Timer | v1.1.3-akuma.1 | RedAlert | Akuma |
| `commandTimer.min.js` | commandTimer.min | Nao informado | Nao informado no arquivo | Akuma |
| `constructionTimes.js` | Construction Times | v1.0.2-akuma.1 | RedAlert | Akuma |
| `convertTextToNote.js` | Convert Text to Village Note | v1.0.6-akuma.1 | RedAlert | Akuma |
| `countHomeTroops.js` | Own Home Troops Count | v1.3.3-akuma.1 | RedAlert | Akuma |
| `defenseHealthCheck.js` | Defense Health Check | v1.2.3-akuma.1 | RedAlert | Akuma |
| `discordSupportTool.js` | Discord Support Tool | v1.1.1-akuma.1 | RedAlert | Akuma |
| `evolvedFakeTrain.js` | Evolved Fake Train | v1.1.3-akuma.1 | RedAlert | Akuma |
| `extendedPlayerInfo.js` | Extended Player Info | v1.1.3-akuma.1 | RedAlert | Akuma |
| `extendedTribeInfo.js` | Extended Tribe Info | v1.2.2-akuma.1 | RedAlert | Akuma |
| `fakeScriptClient.js` | Fake Script Client | v1.2.6-akuma.1 | RedAlert | Akuma |
| `fakeScriptGenerator.js` | Fake Script Generator | v3.2.3-akuma.1 | RedAlert | Akuma |
| `farmingEfficiencyCalculator.js` | Farm Efficiency Calculator | v2.0.4-akuma.1 | RedAlert | Akuma |
| `farmStatistics.js` | Farm Statistics | v1.0.3-akuma.1 | RedAlert | Akuma |
| `fillTroopsInSimulator.js` | Fill Troops in Simulator | v1.0.3-akuma.1 | RedAlert | Akuma |
| `findFrontlineVillages.js` | Find Frontline Villages | v1.1.5-akuma.1 | RedAlert | Akuma |
| `friendRequest.js` | Friend Request | v1.0.5-akuma.1 | RedAlert | Akuma |
| `frontlineStacks.js` | Frontline Stacks Planner | v1.0.4-akuma.1 | RedAlert | Akuma |
| `getIncsForPlayer.js` | Get Incs for Player | v1.5.8-akuma.1 | RedAlert | Akuma |
| `importExportDynamicGroups.js` | Import/Export Dynamic Groups | v1.0.4-akuma.1 | RedAlert | Akuma |
| `incomingsOverview.js` | Incomings Overview | v3.2.5-akuma.1 | RedAlert | Akuma |
| `incommingPP.js` | Count Incoming PP | v1.0.7-akuma.1 | RedAlert | Akuma |
| `inviteToTribe.js` | Invite to Tribe | v1.0-akuma.1 | RedAlert | Akuma |
| `lastTimeAttacked.js` | Show Last Time Attacked | v1.0.2-akuma.1 | RedAlert | Akuma |
| `lastVillageGrowth.js` | Last Village Growth | v1.0.8-akuma.1 | RedAlert | Akuma |
| `localStorageManager.js` | localStorage Manager | v1.0.5-akuma.1 | RedAlert | Akuma |
| `loyaltyCalculator.js` | Loyalty Calculator | v2.0.6-akuma.1 | RedAlert | Akuma |
| `mapBarbsOnly.js` | Map Barbs Only | v1.1.1-akuma.1 | RedAlert | Akuma |
| `mapCoordPicker.js` | Map Coord Picker | v2.2.2-akuma.1 | RedAlert | Akuma |
| `massAttackPlanner.js` | Mass Attack Planner | v1.1.9-akuma.1 | RedAlert | Akuma |
| `massCommandTimer.js` | Mass Command Timer | v3.2.3-akuma.1 | RedAlert | Akuma |
| `massSnipe.js` | Mass Snipe | v1.1.6-akuma.1 | RedAlert | Akuma |
| `massUnlockScav.js` | Mass Scavenging Unlock | v1.3.3-akuma.1 | RedAlert | Akuma |
| `mintHelper.js` | Mint Helper | v1.1.3-akuma.1 | RedAlert | Akuma |
| `nobleCalculator.js` | Nobles Resource Calculator | v1.0.2-akuma.1 | RedAlert | Akuma |
| `ownNotesManager.js` | Own Notes Manager | v1.0.6-akuma.1 | RedAlert | Akuma |
| `playerFarmsFinder.js` | Player Farms Finder | v1.3.2-akuma.1 | RedAlert | Akuma |
| `playerFinder.js` | Player Finder | v1.1.1-akuma.1 | RedAlert | Akuma |
| `rankingGraphs.js` | Graphs on Ranking | v1.1.2-akuma.1 | RedAlert | Akuma |
| `redirector.js` | Redirector | v1.3.4-akuma.1 | RedAlert | Akuma |
| `reportsFilters.js` | Filter Reports | v1.1.1-akuma.1 | RedAlert | Akuma |
| `reportsOverviewHelper.js` | Reports Overview Helper | v1.0-akuma.1 | RedAlert | Akuma |
| `scriptsPack.js` | RedAlert's Scripts Pack | v1.3.10-akuma.1 | RedAlert | Akuma |
| `setVillageNotes.js` | Set/Get Village Notes | v1.3.2-akuma.1 | RedAlert | Akuma |
| `singleVillagePlanner.js` | Single Village Planner | v2.1.3-akuma.1 | RedAlert | Akuma |
| `singleVillageSnipe.js` | Single Village Snipe | v2.3.6-akuma.1 | RedAlert | Akuma |
| `supportCounterEvolved.js` | Support Counter Evolved | v1.1.6-akuma.1 | RedAlert | Akuma |
| `tribePlayersUnderAttack.js` | Tribe Players Under Attack | v1.2.7-akuma.1 | RedAlert | Akuma |
| `tribeStatsTool.js` | Tribe Stats Tools | v1.0.5-akuma.1 | RedAlert | Akuma |
| `troopsCounterFixed.js` | troopsCounterFixed | Nao informado | Nao informado no arquivo | Akuma |
| `troopTemplatesManager.js` | Troop Templates Manager | v1.2.6-akuma.1 | RedAlert | Akuma |
| `villagesInRange.js` | Find Villages in Range | v1.1.2-akuma.1 | RedAlert | Akuma |
| `watchtowerEvolved.js` | WatchTower Evolved | v1.1.2-akuma.1 | RedAlert | Akuma |

## Dependencias Locais

Esses arquivos sao carregados por outros scripts e tambem foram copiados para reduzir dependencia da hospedagem original.

| Arquivo | Script | Versao | Autor |
| --- | --- | --- | --- |
| `attackPlannerHelper.js` | attackPlannerHelper | Nao informado | Nao informado no arquivo |
| `twSDK.js` | twSDK | Nao informado | Nao informado no arquivo |

## Tema Akuma

A skin adicionada usa base escura, bordas discretas, verde neon, azul eletrico, vermelho e laranja para aproximar as janelas da estetica futurista usada no perfil Akuma.

