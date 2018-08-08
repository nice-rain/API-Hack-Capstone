//Use Strict
"use strict";

//=======================================================
// Global Variables
//=======================================================

//Object that stores player 1's JSON Data
const PLAYER_ONE_STATS = {};

//Object that stores player 2's JSON Data
const PLAYER_TWO_STATS = {};

//Base URL for private fortnite API provided by y3n (not using Epic Game's due to auth requirement)
const BASE_FORTNITE_API_PLAYER_URL = "https://fortnite.y3n.co/v2/player/"

//API Key
const API_KEY = "O0gepvKFlLkth2F1kLqP";


//=======================================================
// DOM Functions
//=======================================================

//Small function for displaying an error in our js-error span
function jsError(message)
{
    $('.js-error').html(message).show().fadeOut(2000);
}

//Calculates the difference, determines if it is positive or negative, and returns the <td> element with the correct coloring
function buildDifferenceCell(stat1, stat2, bPercent = false, bFloat = false)
{
    console.log("Function: buildDifferenceCell");
    console.log(`stat1: ${stat1}`);
    console.log(`stat2: ${stat2}`);
    console.log(`bPercent: ${bPercent}`);
    console.log(`bFloat: ${bFloat}`);

    let colorString = "";
    let newCell = "";

    //Calculate the difference between the two stats
    let diff = stat1-stat2;
    
    if(diff < 0)
    {
        //Set color string to negative
        colorString = "class=\"color-negative table-stats-compare\"";
    }
    else if(diff > 0)
    {
        //set color string to positive
        colorString = "class=\"color-positive table-stats-compare\"";
    }
    else
    {
        //Difference of 0 means we are even
        colorString = "class=\"color-even table-stats-compare\"";
    }
    
    //If we have a float, chop it at 2 values
    if(bFloat)
    {
        newCell = `<td ${colorString}>${diff.toFixed(2)}`;
    }
    else
    {
        newCell = `<td ${colorString}>${diff}`;
    }

    //If we have a percent, add it (only for win rate)
    if(bPercent)
    {
        newCell+= "%";
    }
    
    //cap our element
    newCell+="</td>";

    return newCell;
}

//Returns a given table row for our compare tables
function buildCompareTableRow(statTitle, stat1, stat2, bPercent = false, bFloat = false)
{
    console.log("Function: buildCompareTableRow");
    console.log(`statTitle: ${statTitle}`);
    console.log(`stat1: ${stat1}`);
    console.log(`stat2: ${stat2}`);
    console.log(`bPercent: ${bPercent}`);
    console.log(`bFloat: ${bFloat}`);

    let tableRow = "";
    let fixedStat1 = stat1;
    let fixedStat2 = stat2;

    //If we have a float, limit it to 2 places
    if(bFloat)
    {
        fixedStat1 = stat1.toFixed(2);
        fixedStat2 = stat2.toFixed(2);
    }

    //Add percent sign if we have a percent
    if(bPercent)
    {
        fixedStat1 += "%";
        fixedStat2 += "%";
    }

    //Build our string so that we may return it.
     tableRow = `<tr><td>${statTitle}: </td><td class=\"table-stats-compare\">${fixedStat1}</td><td class=\"table-stats-compare\">${fixedStat2}</td>` + buildDifferenceCell(stat1, stat2, bPercent, bFloat) + `</tr>`;
    return tableRow;
}


//Returns a table built for comparing two player's solo stats
function buildTableCompareSolo()
{
    console.log("Function: buildTableCompareSolo");

    //Add our table's title
    //let newTable = `<h2 class="table-title">Solo</h2>`;

    //Calculate our float values (these should be 3 spaces max)
    let winRateDifference = PLAYER_ONE_STATS.stats.pc.solo.winRate - PLAYER_TWO_STATS.stats.pc.solo.winRate;
    let kdDifference = PLAYER_ONE_STATS.stats.pc.solo.kpd - PLAYER_TWO_STATS.stats.pc.solo.kpd;
    let kpmDifference = PLAYER_ONE_STATS.stats.pc.solo.kpm - PLAYER_TWO_STATS.stats.pc.solo.kpm;
    let p1ScorePerMatch = PLAYER_ONE_STATS.stats.pc.solo.score / PLAYER_ONE_STATS.stats.pc.solo.matchesPlayed;
    let p2ScorePerMatch = PLAYER_TWO_STATS.stats.pc.solo.score / PLAYER_TWO_STATS.stats.pc.solo.matchesPlayed;
    let spmDifference = p1ScorePerMatch - p2ScorePerMatch;

    //Add our table element
    let newTable = `<table>
    <tr><th>Stats</th><th class=\"table-stats-compare\">P1</th><th class=\"table-stats-compare\">P2</th><th class=\"table-stats-compare\">Diff.</th></tr>` + 

    buildCompareTableRow("Matches Played", PLAYER_ONE_STATS.stats.pc.solo.matchesPlayed, PLAYER_TWO_STATS.stats.pc.solo.matchesPlayed) +
    buildCompareTableRow("Wins", PLAYER_ONE_STATS.stats.pc.solo.wins, PLAYER_TWO_STATS.stats.pc.solo.wins) +
    buildCompareTableRow("Win Rate", PLAYER_ONE_STATS.stats.pc.solo.winRate, PLAYER_TWO_STATS.stats.pc.solo.winRate, true, true) +
    buildCompareTableRow("Kills", PLAYER_ONE_STATS.stats.pc.solo.kills, PLAYER_TWO_STATS.stats.pc.solo.kills) +
    buildCompareTableRow("Kill/Death", PLAYER_ONE_STATS.stats.pc.solo.kpd, PLAYER_TWO_STATS.stats.pc.solo.kpd, false, true) +
    buildCompareTableRow("Kills Per Match", PLAYER_ONE_STATS.stats.pc.solo.kpm, PLAYER_TWO_STATS.stats.pc.solo.kpm, false, true) +
    buildCompareTableRow("Score", PLAYER_ONE_STATS.stats.pc.solo.score, PLAYER_TWO_STATS.stats.pc.solo.score) +
    buildCompareTableRow("Score Per Match", p1ScorePerMatch, p2ScorePerMatch, false, true) +
    buildCompareTableRow("Top 10", PLAYER_ONE_STATS.stats.pc.solo.top10, PLAYER_TWO_STATS.stats.pc.solo.top10) +
    buildCompareTableRow("Top 25", PLAYER_ONE_STATS.stats.pc.solo.top25, PLAYER_TWO_STATS.stats.pc.solo.top25) +
    `</table>`;

    return newTable;
}

//Returns a table built for comparing two player's duo stats
function buildTableCompareDuo()
{
    console.log("Function: buildTableCompareDuo");

    //Add our table's title
    //let newTable = `<h2 class="table-title">Duo</h2>`;

    //Calculate our float values (these should be 3 spaces max)
    let winRateDifference = PLAYER_ONE_STATS.stats.pc.duo.winRate - PLAYER_TWO_STATS.stats.pc.duo.winRate;
    let kdDifference = PLAYER_ONE_STATS.stats.pc.duo.kpd - PLAYER_TWO_STATS.stats.pc.duo.kpd;
    let kpmDifference = PLAYER_ONE_STATS.stats.pc.duo.kpm - PLAYER_TWO_STATS.stats.pc.duo.kpm;
    let p1ScorePerMatch = PLAYER_ONE_STATS.stats.pc.duo.score / PLAYER_ONE_STATS.stats.pc.duo.matchesPlayed;
    let p2ScorePerMatch = PLAYER_TWO_STATS.stats.pc.duo.score / PLAYER_TWO_STATS.stats.pc.duo.matchesPlayed;
    let spmDifference = p1ScorePerMatch - p2ScorePerMatch;

    //Add our table element
    let newTable = `<table>
    <tr><th>Stats</th><th class=\"table-stats-compare\">P1</th><th class=\"table-stats-compare\">P2</th><th class=\"table-stats-compare\">Diff.</th></tr>` +

    buildCompareTableRow("Matches Played", PLAYER_ONE_STATS.stats.pc.duo.matchesPlayed, PLAYER_TWO_STATS.stats.pc.duo.matchesPlayed) +
    buildCompareTableRow("Wins", PLAYER_ONE_STATS.stats.pc.duo.wins, PLAYER_TWO_STATS.stats.pc.duo.wins) +
    buildCompareTableRow("Win Rate", PLAYER_ONE_STATS.stats.pc.duo.winRate, PLAYER_TWO_STATS.stats.pc.duo.winRate, true, true) +
    buildCompareTableRow("Kills", PLAYER_ONE_STATS.stats.pc.duo.kills, PLAYER_TWO_STATS.stats.pc.duo.kills) +
    buildCompareTableRow("Kill/Death Ratio", PLAYER_ONE_STATS.stats.pc.duo.kpd, PLAYER_TWO_STATS.stats.pc.duo.kpd, false, true) +
    buildCompareTableRow("Kills Per Match", PLAYER_ONE_STATS.stats.pc.duo.kpm, PLAYER_TWO_STATS.stats.pc.duo.kpm, false, true) +
    buildCompareTableRow("Score", PLAYER_ONE_STATS.stats.pc.duo.score, PLAYER_TWO_STATS.stats.pc.duo.score) +
    buildCompareTableRow("Score Per Match", p1ScorePerMatch, p2ScorePerMatch, false, true) +
    buildCompareTableRow("Top 10", PLAYER_ONE_STATS.stats.pc.duo.top5, PLAYER_TWO_STATS.stats.pc.duo.top5) +
    buildCompareTableRow("Top 25", PLAYER_ONE_STATS.stats.pc.duo.top12, PLAYER_TWO_STATS.stats.pc.duo.top12) +

    `</table>`;

    return newTable;
}

//Returns a table built for comparing two player's squad stats
function buildTableCompareSquad()
{
    console.log("Function: buildTableCompareSquad");

    //Add our table's title
    //let newTable = `<h2 class="table-title">Squad</h2>`;

    //Calculate our float values (these should be 3 spaces max)
    let winRateDifference = PLAYER_ONE_STATS.stats.pc.squad.winRate - PLAYER_TWO_STATS.stats.pc.squad.winRate;
    let kdDifference = PLAYER_ONE_STATS.stats.pc.squad.kpd - PLAYER_TWO_STATS.stats.pc.squad.kpd;
    let kpmDifference = PLAYER_ONE_STATS.stats.pc.squad.kpm - PLAYER_TWO_STATS.stats.pc.squad.kpm;
    let p1ScorePerMatch = PLAYER_ONE_STATS.stats.pc.squad.score / PLAYER_ONE_STATS.stats.pc.squad.matchesPlayed;
    let p2ScorePerMatch = PLAYER_TWO_STATS.stats.pc.squad.score / PLAYER_TWO_STATS.stats.pc.squad.matchesPlayed;
    let spmDifference = p1ScorePerMatch - p2ScorePerMatch;

    //Add our table element
    let newTable = `<table>
    <tr><th>Stats</th><th class=\"table-stats-compare\">P1</th><th class=\"table-stats-compare\">P2</th><th class=\"table-stats-compare\">Diff.</th></tr>` +

    buildCompareTableRow("Matches Played", PLAYER_ONE_STATS.stats.pc.squad.matchesPlayed, PLAYER_TWO_STATS.stats.pc.squad.matchesPlayed) +
    buildCompareTableRow("Wins", PLAYER_ONE_STATS.stats.pc.squad.wins, PLAYER_TWO_STATS.stats.pc.squad.wins) +
    buildCompareTableRow("Win Rate", PLAYER_ONE_STATS.stats.pc.squad.winRate, PLAYER_TWO_STATS.stats.pc.squad.winRate, true, true) +
    buildCompareTableRow("Kills", PLAYER_ONE_STATS.stats.pc.squad.kills, PLAYER_TWO_STATS.stats.pc.squad.kills) +
    buildCompareTableRow("Kill/Death Ratio", PLAYER_ONE_STATS.stats.pc.squad.kpd, PLAYER_TWO_STATS.stats.pc.squad.kpd, false, true) +
    buildCompareTableRow("Kills Per Match", PLAYER_ONE_STATS.stats.pc.squad.kpm, PLAYER_TWO_STATS.stats.pc.squad.kpm, false, true) +
    buildCompareTableRow("Score", PLAYER_ONE_STATS.stats.pc.squad.score, PLAYER_TWO_STATS.stats.pc.squad.score) +
    buildCompareTableRow("Score Per Match", p1ScorePerMatch, p2ScorePerMatch, false, true) +
    buildCompareTableRow("Top 10", PLAYER_ONE_STATS.stats.pc.squad.top3, PLAYER_TWO_STATS.stats.pc.squad.top3) +
    buildCompareTableRow("Top 25", PLAYER_ONE_STATS.stats.pc.squad.top6, PLAYER_TWO_STATS.stats.pc.squad.top6) +

    `</table>`;

    return newTable;
}

//Returns a table built for comparing two player's lifetime stats
function buildTableCompareLifetime()
{
    console.log("Function: buildTableCompareLifetime");

    //Add our table's title
    //let newTable = `<h2 class="table-title">Lifetime</h2>`;

    //Calculate our float values (these should be 3 spaces max)
    let winRateDifference = PLAYER_ONE_STATS.stats.pc.all.winRate - PLAYER_TWO_STATS.stats.pc.all.winRate;
    let kdDifference = PLAYER_ONE_STATS.stats.pc.all.kpd - PLAYER_TWO_STATS.stats.pc.all.kpd;

    //Add our table element
    let newTable = `<table>
    <tr><th>Stats</th><th class=\"table-stats-compare\">P1</th><th class=\"table-stats-compare\">P2</th><th class=\"table-stats-compare\">Diff.</th></tr>` +

    buildCompareTableRow("Matches Played", PLAYER_ONE_STATS.stats.pc.all.matchesPlayed, PLAYER_TWO_STATS.stats.pc.all.matchesPlayed) +
    buildCompareTableRow("Wins", PLAYER_ONE_STATS.stats.pc.all.wins, PLAYER_TWO_STATS.stats.pc.all.wins) +
    buildCompareTableRow("Win Rate", PLAYER_ONE_STATS.stats.pc.all.winRate, PLAYER_TWO_STATS.stats.pc.all.winRate, true, true) +
    buildCompareTableRow("Kills", PLAYER_ONE_STATS.stats.pc.all.kills, PLAYER_TWO_STATS.stats.pc.all.kills) +
    buildCompareTableRow("Kill/Death Ratio", PLAYER_ONE_STATS.stats.pc.all.kpd, PLAYER_TWO_STATS.stats.pc.all.kpd, false, true) +
   
    `</table>`;

    return newTable;
}

//Returns a table built for a single player's solo stats
function buildTablePlayerOneSolo()
{
    console.log("Function: buildTablePlayerOneSolo");
    //let newTable =`<h2 class="table-title">Solo</h2>`;

    let scorePerMatch = PLAYER_ONE_STATS.stats.pc.solo.score / PLAYER_ONE_STATS.stats.pc.solo.matchesPlayed;

    let newTable = `<table>
    <tr><td>Matches Played: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.solo.matchesPlayed}</td></tr>
    <tr><td>Wins: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.solo.wins}</td></tr>
    <tr><td>Win Rate: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.solo.winRate}%</td></tr>
    <tr><td>Kills: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.solo.kills}</td></tr>
    <tr><td>Kill/Death Ratio: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.solo.kpd}</td></tr>
    <tr><td>Kills Per Match: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.solo.kpm}</td></tr>
    <tr><td>Score: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.solo.score}</td></tr>
    <tr><td>Score Per match: </td><td class="table-stats-single">${scorePerMatch.toFixed(3)}</td></tr>
    <tr><td>Top 10: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.solo.top10}</td></tr>
    <tr><td>Top 25: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.solo.top25}</td></tr>
    </table>`;

    return newTable;
}

//Returns a table built for a single player's duo stats
function buildTablePlayerOneDuo()
{
    console.log("Function: buildTablePlayerOneDuo");
    //let newTable =`<h2 class="table-title">Duo</h2>`;

    let scorePerMatch = PLAYER_ONE_STATS.stats.pc.duo.score / PLAYER_ONE_STATS.stats.pc.duo.matchesPlayed;

    let newTable = `<table>
    <tr><td>Matches Played: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.duo.matchesPlayed}</td></tr>
    <tr><td>Wins: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.duo.wins}</td></tr>
    <tr><td>Win Rate: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.duo.winRate}%</td></tr>
    <tr><td>Kills: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.duo.kills}</td></tr>
    <tr><td>Kill/Death Ratio: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.duo.kpd}</td></tr>
    <tr><td>Kills Per Match: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.duo.kpm}</td></tr>
    <tr><td>Score: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.duo.score}</td></tr>
    <tr><td>Score Per match: </td><td class="table-stats-single">${scorePerMatch.toFixed(3)}</td></tr>
    <tr><td>Top 5: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.duo.top5}</td></tr>
    <tr><td>Top 12: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.duo.top12}</td></tr>
    </table>`;

    return newTable;
}

//Returns a table built for a single player's squad stats
function buildTablePlayerOneSquad()
{
    console.log("Function: buildTablePlayerOneSquad");
    //let newTable =`<h2 class="table-title">Squad</h2>`;

    let scorePerMatch = PLAYER_ONE_STATS.stats.pc.squad.score / PLAYER_ONE_STATS.stats.pc.squad.matchesPlayed;

    let newTable = `<table>
    <tr><td>Matches Played: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.squad.matchesPlayed}</td></tr>
    <tr><td>Wins: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.squad.wins}</td></tr>
    <tr><td>Win Rate: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.squad.winRate}%</td></tr>
    <tr><td>Kills: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.squad.kills}</td></tr>
    <tr><td>Kill/Death Ratio: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.squad.kpd}</td></tr>
    <tr><td>Kills Per Match: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.squad.kpm}</td></tr>
    <tr><td>Score: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.squad.score}</td></tr>
    <tr><td>Score Per match: </td><td class="table-stats-single">${scorePerMatch.toFixed(3)}</td></tr>
    <tr><td>Top 3: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.squad.top3}</td></tr>
    <tr><td>Top 6: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.squad.top6}</td></tr>
    </table>`;

    return newTable;
}

//Returns a table built for a single player's lifetime stats
function buildTablePlayerOneLifetime()
{
    console.log("Function: buildTablePlayerOneLifetime");

    //Start by building our table's header
    //let newTable = `<h2 class="table-title">Lifetime</h2>`;

    let newTable = "<table>";
    //Add our table element and fill it in
    newTable += `
    <tr><td>Matches Played: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.all.matchesPlayed}</td></tr>
    <tr><td>Wins: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.all.wins}</td></tr>
    <tr><td>Win Rate: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.all.winRate}</td></tr>
    <tr><td>Kills: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.all.kills}</td></tr>
    <tr><td>Kill/Death Ratio: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.pc.all.kpd}</td></tr>
    </table>`;

    return newTable;
}

//Returns a form that allows the user to enter a player 2 to compare stats to.
function buildCompareForm()
{
    console.log("Function: buildCompareForm");

    //open our fieldset
    let newForm = "<fieldset>"

    //add our legend
    newForm += "<legend>Compare player stats:</legend>";

    //Add our player 1 name (due to 1 refresh per second, we can't refresh player 1 at this point)
    newForm += `<p class=\"player-one-name\">Player 1 Name:\n ${PLAYER_ONE_STATS.displayName}</p>`;

    //Add our player 2 name entry
    newForm += `<label for=\"Player2Name\">Player 2 Name:</label><input type=\"text\" id=\"Player2Name\" required>`;

    //Add our error div
    newForm += `<div class=\"error\"><span class=\"js-error\"></span></div>`;

    //close our fieldset tag
    newForm += "</fieldset>";

    //Add our submit button (this will only refresh/change player 2's stats at this point)
    newForm += "<button type=\"submit\" class=\"js-player2-submit\">Submit</button>";

    //Add our horizontal rule
    newForm += "<hr>";

    return newForm;
}


//Returns our form that will be used to add another player (or update match mode data)
function buildAddPlayer2Form()
{
    console.log("Function: buildAddPlayer2Form");

    //Add our opening fieldset tag
    let newForm = "<fieldset>";

    //add our legend
    newForm += "<legend>Look up player stats:</legend>";

    //Add our player 1 name entry
    newForm += `<label for=\"Player1Name\">Player 1 Name:</label><input type=\"text\" id=\"Player1Name\" value=\"${PLAYER_ONE_STATS.displayName}\"required>`;

    //Add our link for adding a new player [this may be better as a button - I am not sure if semantic, but it looks 'normal' here]
    newForm += "<a href=\"#\" class=\"js-compare-link\">+ Player to Compare</a>";

    //Add our select mode dropdown
    //newForm += "<label for=\"ModeSelect\">Select Mode:</label><select name=\"GameMode\" id=\"ModeSelect\"><option value=\"lifetime\">All Modes</option><option value=\"Solo\">Solo</option><option value=\"Duo\">Duo</option><option value=\"Squads\">Squads</option></select>";

    //Close our fieldset
    newForm += "</fieldset>"

    //Add our submit button (allows us to still change player 1 until Player to Compare is clicked)
    newForm += "<button type=\"submit\" class=\"js-single-submit\">Submit</button>";

    //Add our horizontal rule
    newForm += "<hr>";

    return newForm;
}

//Refreshes DOM and adds our new table
function refreshStatsTable(newTable)
{
    console.log("Function: refreshStatsTable");
    console.log(`newTable: ${newTable}`);

    //Fetch our table div
    $('.js-stats-table').html(newTable);
}

//Refreshes DOM and updates our duo table
function refreshDuoTable(newTable)
{
    console.log("Function: refreshDuoTable");
    console.log(`newTable: ${newTable}`);

    //Update our solo table
    $('.js-duo-table').html(newTable);
}

//Refreshes DOM and updates our squad table
function refreshSquadTable(newTable)
{
    console.log("Function: refreshSquadTable");
    console.log(`newTable: ${newTable}`);

    //Update our squad table
    $('.js-squad-table').html(newTable);
}

//Refreshes DOM and updates our solo table
function refreshSoloTable(newTable)
{
    console.log("Function: refreshSoloTable");
    console.log(`newTable: ${newTable}`);

    //Update our solo table
    $('.js-solo-table').html(newTable);
}

//Refreshes DOM and adds our new form
function refreshPlayerInfoForm(newForm)
{
    console.log("Function: refreshPlayerInfoForm");
    console.log(`newTable: ${newForm}`);

    //Fetch our form div and update it
    $('.form-player-info').html(newForm);
}

//=======================================================
// AJAX/JSON Functions
//=======================================================

//Small function used to store player stats in their respective object.
//Returns true if are able to store player stats
//The reason we are storing the JSON request is that we can only do 1 request per second.
//We will not need to request player 1 again.
function savePlayerStats(msg, playerNumber)
{
    console.log("Function: savePlayerStats");
    console.log(`Player Number${playerNumber}\n: AJAX Response:`);
    console.log(msg);

    //Check to see if we have BR Stats.
    //If we have stats, return true, otherwise return false
    if(!$.isEmptyObject(msg.br.stats))
    {
        //check our player number to determine which stats object to update
        if(playerNumber === 1)
        {
            PLAYER_ONE_STATS.userID = msg.userID;
            PLAYER_ONE_STATS.displayName = msg.displayName;
            PLAYER_ONE_STATS.stats = msg.br.stats;
            return true;
        }
        else if(playerNumber === 2)
        {
            PLAYER_TWO_STATS.userID = msg.userID;
            PLAYER_TWO_STATS.displayName = msg.displayName;
            PLAYER_TWO_STATS.stats = msg.br.stats;
            return true;
        }
        else{
            //Log to console when we submit a number that isn't 1 or 2
            console.log("ERROR: Player number is not 1 or 2");

        }
    }
    else
    {
        //Error handling when we have no battle royale stats.
        console.log("ERROR: The player has no BR stats.");
        jsError("Player has no stats");

    }

    return false;        
}


//Called when we have a success. Receives JSON Object and stores stats in the player's stats object.
//Once our stats are stored, calls DOM updates
function updatePlayerStats(msg, playerNumber)
{
    console.log("Function: updatePlayerStats");
    //Log our parameters
    console.log("AJAX Response:");
    console.log(msg);
    console.log("Player Number:");
    console.log(playerNumber);

    //Make sure we can save our stats before updating DOM
    if(savePlayerStats(msg, playerNumber))
    {       
        //We have already checked playerNumber, we can assume it's valid
        if(playerNumber === 1)
        {
            //Refresh our stats table with our player 1 table
            refreshStatsTable(buildTablePlayerOneLifetime());

            //Refresh our solo table with our player 1 table
            refreshSoloTable(buildTablePlayerOneSolo());

            //Refresh our duo table with our player 1 table
            refreshDuoTable(buildTablePlayerOneDuo());

            //Refresh our squads table with our player 1 table
            refreshSquadTable(buildTablePlayerOneSquad());
            
            //Update form:
            refreshPlayerInfoForm(buildAddPlayer2Form());
        }
        else if(playerNumber === 2)
        {
            //Create a compare table
            refreshStatsTable(buildTableCompareLifetime());
            refreshSoloTable(buildTableCompareSolo());
            refreshDuoTable(buildTableCompareDuo());
            refreshSquadTable(buildTableCompareSquad());
        }
    }
    else{
        console.log("Stat save failed");
    }


}


//Function that requests a player's stats given their name (Using AJAX call). 
//Upon success, it will call updatePlayerStats to save the stats.
//We need to pass the playerNumber to know which player object to 
//save the stats to and which DOM update function to call.
function fortniteGetPlayerStats(playerName, playerNumber)
{
    console.log("Function: fortniteGetPlayerStats")
    console.log(`Player Name: ${playerName}\nPlayer Number:`)
    console.log(playerNumber);

        //AJAX Request (we can't use headers with JSON request)
        const requestSettings = 
        {
            url: BASE_FORTNITE_API_PLAYER_URL + playerName,
            type: 'GET',
            dataType: 'json',
            headers: {
                //'User-Agent': 'nodejs request',
                'X-Key': API_KEY
            }
        };

        //Send our ajax request
        let ajaxRequest = $.ajax(requestSettings);

        //Called on success
        ajaxRequest.done(function(data){
            updatePlayerStats(data, playerNumber);
        });

        ajaxRequest.fail(function(data){
            console.log('request failed');
            jsError("Player has no stats");
        });
}



//=======================================================
// Event Bindings For Submit Buttons
//=======================================================

//Event listener that is called when the player clicks the "Compare" submit button (added when we click Add Player 2)
function bindCompareSubmit()
{
    $('.js-player-info-form').on('click', '.js-player2-submit', function(event)
    {
        event.preventDefault();
        console.log("Player clicked the player2 submit button.")

        //Store our parent
        let parent = $(this).parent();

        //Submit AJAX Call/Update Function
        //fortniteGetPlayerStats(parent.find('#Player2Name').val(), 2);

        if(parent.find('#Player2Name').val())
        {
            //Submit AJAX Call/Update Function
            fortniteGetPlayerStats(parent.find('#Player2Name').val(), 2);
        }
        else{
            //$('.js-error').html("Player Name is Required").show().fadeOut(2000);
            jsError("Player 2 Name is Required.");
        }
    });
}


//Event listener that is called when the player clicks the "Add Player 2" button (button added after default clicked)
function bindAddPlayerSubmit()
{
    $('.js-player-info-form').on('click', '.js-compare-link', function(event)
    {
        //Stop the default behavior
        event.preventDefault();

        console.log("Player Clicked Add Player Button");

        //Refresh our form after we remove the player entry and insert a player 2 entry.
        refreshPlayerInfoForm(buildCompareForm);

    });
}


//Event listener that will be called when the player clicks the Single Player Submit button (default button)
function bindSinglePlayerSubmit()
{
    $('.js-player-info-form').on('click', '.js-single-submit', function(event)
    {
        //Stop the default behavior
        event.preventDefault();
        console.log("Player Clicked Single-Player Submit Button.");

        //Store our parent
        let parent = $(this).parent();

        if(parent.find('#Player1Name').val())
        {
            //Submit AJAX Call/Update Function
            fortniteGetPlayerStats(parent.find('#Player1Name').val(), 1);
        }
        else{
            //$('.js-error').html("Player Name is Required").show().fadeOut(2000);
            jsError("Player Name is Required.");
        }
    });
}

//=======================================================
// Initialize Script
//=======================================================

//Function to load all of our event listeners
function loadBindings()
{
    console.log("loadBindings");

    bindSinglePlayerSubmit();
    bindAddPlayerSubmit();
    bindCompareSubmit();
}


//Call to load all of our event listeners 
$(loadBindings());