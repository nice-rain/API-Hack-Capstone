//Use Strict
"use strict";

//=======================================================
// Global Variables
//=======================================================

//Object that stores player 1's JSON Data
const PLAYER_ONE_STATS = {};

//Object that stores player 2's JSON Data
const PLAYER_TWO_STATS = {};

//API Key
const API_KEY = "b3d6318487f34d5b2681e3931b134589";


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
    //console.log(statTitle);
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
    //Calculate our float values (these should be 3 spaces max)
    //let winRateDifference = PLAYER_ONE_STATS.stats.winrate_solo - PLAYER_TWO_STATS.stats.winrate_solo;
    //let kdDifference = PLAYER_ONE_STATS.stats.kd_solo - PLAYER_TWO_STATS.stats.kd_solo;
    //let kpmDifference = PLAYER_ONE_STATS.stats.pc.solo.kpm - PLAYER_TWO_STATS.stats.pc.solo.kpm;
    let p1ScorePerMatch = PLAYER_ONE_STATS.stats.score_solo / PLAYER_ONE_STATS.stats.matchesplayed_solo;
    let p2ScorePerMatch = PLAYER_TWO_STATS.stats.score_solo / PLAYER_TWO_STATS.stats.matchesplayed_solo;

    let p1killsPerMatch = PLAYER_ONE_STATS.stats.kills_solo / PLAYER_ONE_STATS.stats.matchesplayed_solo;
    let p2killsPerMatch = PLAYER_TWO_STATS.stats.kills_solo / PLAYER_TWO_STATS.stats.matchesplayed_solo;

    //let spmDifference = p1ScorePerMatch - p2ScorePerMatch;

    //Add our table element
    let newTable = `<table>
    <tr><th>Stats</th><th class=\"table-stats-compare\">P1</th><th class=\"table-stats-compare\">P2</th><th class=\"table-stats-compare\">Diff.</th></tr>` + 

    buildCompareTableRow("Matches Played", PLAYER_ONE_STATS.stats.matchesplayed_solo, PLAYER_TWO_STATS.stats.matchesplayed_solo) +
    buildCompareTableRow("Wins", PLAYER_ONE_STATS.stats.placetop1_solo, PLAYER_TWO_STATS.stats.placetop1_solo) +
    buildCompareTableRow("Win Rate", PLAYER_ONE_STATS.stats.winrate_solo, PLAYER_TWO_STATS.stats.winrate_solo, true, true) +
    buildCompareTableRow("Kills", PLAYER_ONE_STATS.stats.kills_solo, PLAYER_TWO_STATS.stats.kills_solo) +
    buildCompareTableRow("Kill/Death", PLAYER_ONE_STATS.stats.kd_solo, PLAYER_TWO_STATS.stats.kd_solo, false, true) +
    buildCompareTableRow("Kills Per Match", p1killsPerMatch, p2killsPerMatch, false, true) +
    buildCompareTableRow("Score", PLAYER_ONE_STATS.stats.score_solo, PLAYER_TWO_STATS.stats.score_solo) +
    buildCompareTableRow("Score Per Match", p1ScorePerMatch, p2ScorePerMatch, false, true) +
    buildCompareTableRow("Top 10", PLAYER_ONE_STATS.stats.placetop10_solo, PLAYER_TWO_STATS.stats.placetop10_solo) +
    buildCompareTableRow("Top 25", PLAYER_ONE_STATS.stats.placetop25_solo, PLAYER_TWO_STATS.stats.placetop25_solo) +
    `</table>`;

    return newTable;
}

//Returns a table built for comparing two player's duo stats
function buildTableCompareDuo()
{
    //Calculate our float values (these should be 3 spaces max)
    //let winRateDifference = PLAYER_ONE_STATS.stats.pc.duo.winRate - PLAYER_TWO_STATS.stats.pc.duo.winRate;
    //let kdDifference = PLAYER_ONE_STATS.stats.pc.duo.kpd - PLAYER_TWO_STATS.stats.pc.duo.kpd;
    //let kpmDifference = PLAYER_ONE_STATS.stats.pc.duo.kpm - PLAYER_TWO_STATS.stats.pc.duo.kpm;
    let p1ScorePerMatch = PLAYER_ONE_STATS.stats.score_duo / PLAYER_ONE_STATS.stats.matchesplayed_duo;
    let p2ScorePerMatch = PLAYER_TWO_STATS.stats.score_duo / PLAYER_TWO_STATS.stats.matchesplayed_duo;

    let p1killsPerMatch = PLAYER_ONE_STATS.stats.kills_duo / PLAYER_ONE_STATS.stats.matchesplayed_duo;
    let p2killsPerMatch = PLAYER_TWO_STATS.stats.kills_duo / PLAYER_TWO_STATS.stats.matchesplayed_duo;

    //let spmDifference = p1ScorePerMatch - p2ScorePerMatch;

    //Add our table element
    let newTable = `<table>
    <tr><th>Stats</th><th class=\"table-stats-compare\">P1</th><th class=\"table-stats-compare\">P2</th><th class=\"table-stats-compare\">Diff.</th></tr>` +

    buildCompareTableRow("Matches Played", PLAYER_ONE_STATS.stats.matchesplayed_duo, PLAYER_TWO_STATS.stats.matchesplayed_duo) +
    buildCompareTableRow("Wins", PLAYER_ONE_STATS.stats.placetop1_duo, PLAYER_TWO_STATS.stats.placetop1_duo) +
    buildCompareTableRow("Win Rate", PLAYER_ONE_STATS.stats.winrate_duo, PLAYER_TWO_STATS.stats.winrate_duo, true, true) +
    buildCompareTableRow("Kills", PLAYER_ONE_STATS.stats.kills_duo, PLAYER_TWO_STATS.stats.kills_duo) +
    buildCompareTableRow("Kill/Death Ratio", PLAYER_ONE_STATS.stats.kd_duo, PLAYER_TWO_STATS.stats.kd_duo, false, true) +
    buildCompareTableRow("Kills Per Match", p1killsPerMatch, p2killsPerMatch, false, true) +
    buildCompareTableRow("Score", PLAYER_ONE_STATS.stats.score_duo, PLAYER_TWO_STATS.stats.score_duo) +
    buildCompareTableRow("Score Per Match", p1ScorePerMatch, p2ScorePerMatch, false, true) +
    buildCompareTableRow("Top 10", PLAYER_ONE_STATS.stats.placetop5_duo, PLAYER_TWO_STATS.stats.placetop5_duo) +
    buildCompareTableRow("Top 25", PLAYER_ONE_STATS.stats.placetop12_duo, PLAYER_TWO_STATS.stats.placetop12_duo) +

    `</table>`;

    return newTable;
}

//Returns a table built for comparing two player's squad stats
function buildTableCompareSquad()
{
    //Calculate our float values (these should be 3 spaces max)
    //let winRateDifference = PLAYER_ONE_STATS.stats.pc.squad.winRate - PLAYER_TWO_STATS.stats.pc.squad.winRate;
    //let kdDifference = PLAYER_ONE_STATS.stats.pc.squad.kpd - PLAYER_TWO_STATS.stats.pc.squad.kpd;
    //let kpmDifference = PLAYER_ONE_STATS.stats.pc.squad.kpm - PLAYER_TWO_STATS.stats.pc.squad.kpm;
    let p1ScorePerMatch = PLAYER_ONE_STATS.stats.score_squad / PLAYER_ONE_STATS.stats.matchesplayed_squad;
    let p2ScorePerMatch = PLAYER_TWO_STATS.stats.score_squad / PLAYER_TWO_STATS.stats.matchesplayed_squad;
    let p1killsPerMatch = PLAYER_ONE_STATS.stats.kills_squad / PLAYER_ONE_STATS.stats.matchesplayed_squad;
    let p2killsPerMatch = PLAYER_TWO_STATS.stats.kills_squad / PLAYER_TWO_STATS.stats.matchesplayed_squad;


    //let spmDifference = p1ScorePerMatch - p2ScorePerMatch;

    //Add our table element
    let newTable = `<table>
    <tr><th>Stats</th><th class=\"table-stats-compare\">P1</th><th class=\"table-stats-compare\">P2</th><th class=\"table-stats-compare\">Diff.</th></tr>` +

    buildCompareTableRow("Matches Played", PLAYER_ONE_STATS.stats.matchesplayed_squad, PLAYER_TWO_STATS.stats.matchesplayed_squad) +
    buildCompareTableRow("Wins", PLAYER_ONE_STATS.stats.placetop1_squad, PLAYER_TWO_STATS.stats.placetop1_squad) +
    buildCompareTableRow("Win Rate", PLAYER_ONE_STATS.stats.winrate_squad, PLAYER_TWO_STATS.stats.winrate_squad, true, true) +
    buildCompareTableRow("Kills", PLAYER_ONE_STATS.stats.kills_squad, PLAYER_TWO_STATS.stats.kills_squad) +
    buildCompareTableRow("Kill/Death Ratio", PLAYER_ONE_STATS.stats.kd_squad, PLAYER_TWO_STATS.stats.kd_squad, false, true) +
    buildCompareTableRow("Kills Per Match", p1killsPerMatch, p2killsPerMatch, false, true) +
    buildCompareTableRow("Score", PLAYER_ONE_STATS.stats.score_squad, PLAYER_TWO_STATS.stats.score_squad) +
    buildCompareTableRow("Score Per Match", p1ScorePerMatch, p2ScorePerMatch, false, true) +
    buildCompareTableRow("Top 10", PLAYER_ONE_STATS.stats.placetop3_squad, PLAYER_TWO_STATS.stats.placetop3_squad) +
    buildCompareTableRow("Top 25", PLAYER_ONE_STATS.stats.placetop6_squad, PLAYER_TWO_STATS.stats.placetop6_squad) +

    `</table>`;

    return newTable;
}

//Returns a table built for comparing two player's lifetime stats
function buildTableCompareLifetime()
{
    //Calculate our float values (these should be 3 spaces max)
    //let winRateDifference = PLAYER_ONE_STATS.stats.winrate - PLAYER_TWO_STATS.stats.winrate;
    //let kdDifference = PLAYER_ONE_STATS.stats.kd - PLAYER_TWO_STATS.stats.kd;

    //Add our table element
    let newTable = `<table>
    <tr><th>Stats</th><th class=\"table-stats-compare\">P1</th><th class=\"table-stats-compare\">P2</th><th class=\"table-stats-compare\">Diff.</th></tr>` +

    buildCompareTableRow("Matches Played", PLAYER_ONE_STATS.totals.matchesplayed, PLAYER_TWO_STATS.totals.matchesplayed) +
    buildCompareTableRow("Wins", PLAYER_ONE_STATS.totals.wins, PLAYER_TWO_STATS.totals.wins) +
    buildCompareTableRow("Win Rate", PLAYER_ONE_STATS.totals.winrate, PLAYER_TWO_STATS.totals.winrate, true, true) +
    buildCompareTableRow("Kills", PLAYER_ONE_STATS.totals.kills, PLAYER_TWO_STATS.totals.kills) +
    buildCompareTableRow("Kill/Death Ratio", PLAYER_ONE_STATS.totals.kd, PLAYER_TWO_STATS.totals.kd, false, true) +
   
    `</table>`;

    return newTable;
}

//Returns a table built for a single player's solo stats
function buildTablePlayerOneSolo()
{
    let scorePerMatch = PLAYER_ONE_STATS.stats.score_solo / PLAYER_ONE_STATS.stats.matchesplayed_solo;
    let killsPerMatch = PLAYER_ONE_STATS.stats.kills_solo / PLAYER_ONE_STATS.stats.matchesplayed_solo;

    let newTable = `<table>
    <tr><td>Matches Played: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.matchesplayed_solo}</td></tr>
    <tr><td>Wins: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.placetop1_solo}</td></tr>
    <tr><td>Win Rate: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.winrate_solo}%</td></tr>
    <tr><td>Kills: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.kills_solo}</td></tr>
    <tr><td>Kill/Death Ratio: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.kd_solo}</td></tr>
    <tr><td>Kills Per Match: </td><td class="table-stats-single">${killsPerMatch.toFixed(3)}</td></tr>
    <tr><td>Score: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.score_solo}</td></tr>
    <tr><td>Score Per match: </td><td class="table-stats-single">${scorePerMatch.toFixed(3)}</td></tr>
    <tr><td>Top 10: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.placetop10_solo}</td></tr>
    <tr><td>Top 25: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.placetop25_solo}</td></tr>
    </table>`;

    return newTable;
}

//Returns a table built for a single player's duo stats
function buildTablePlayerOneDuo()
{
    let scorePerMatch = PLAYER_ONE_STATS.stats.score_duo / PLAYER_ONE_STATS.stats.matchesplayed_duo;
    let killsPerMatch = PLAYER_ONE_STATS.stats.kills_duo / PLAYER_ONE_STATS.stats.matchesplayed_duo;


    let newTable = `<table>
    <tr><td>Matches Played: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.matchesplayed_duo}</td></tr>
    <tr><td>Wins: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.placetop1_duo}</td></tr>
    <tr><td>Win Rate: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.winrate_duo}%</td></tr>
    <tr><td>Kills: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.kills_duo}</td></tr>
    <tr><td>Kill/Death Ratio: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.kd_duo}</td></tr>
    <tr><td>Kills Per Match: </td><td class="table-stats-single">${killsPerMatch.toFixed(3)}</td></tr>
    <tr><td>Score: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.score_duo}</td></tr>
    <tr><td>Score Per match: </td><td class="table-stats-single">${scorePerMatch.toFixed(3)}</td></tr>
    <tr><td>Top 5: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.placetop5_duo}</td></tr>
    <tr><td>Top 12: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.placetop12_duo}</td></tr>
    </table>`;

    return newTable;
}

//Returns a table built for a single player's squad stats
function buildTablePlayerOneSquad()
{
    let scorePerMatch = PLAYER_ONE_STATS.stats.score_squad / PLAYER_ONE_STATS.stats.matchesplayed_squad;
    let killsPerMatch = PLAYER_ONE_STATS.stats.kills_squad / PLAYER_ONE_STATS.stats.matchesplayed_squad;

    let newTable = `<table>
    <tr><td>Matches Played: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.matchesplayed_squad}</td></tr>
    <tr><td>Wins: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.placetop1_squad}</td></tr>
    <tr><td>Win Rate: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.winrate_squad}%</td></tr>
    <tr><td>Kills: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.kills_squad}</td></tr>
    <tr><td>Kill/Death Ratio: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.kd_squad}</td></tr>
    <tr><td>Kills Per Match: </td><td class="table-stats-single">${killsPerMatch.toFixed(3)}</td></tr>
    <tr><td>Score: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.score_squad}</td></tr>
    <tr><td>Score Per match: </td><td class="table-stats-single">${scorePerMatch.toFixed(3)}</td></tr>
    <tr><td>Top 3: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.placetop3_squad}</td></tr>
    <tr><td>Top 6: </td><td class="table-stats-single">${PLAYER_ONE_STATS.stats.placetop6_squad}</td></tr>
    </table>`;

    return newTable;
}

//Returns a table built for a single player's lifetime stats
function buildTablePlayerOneLifetime()
{
    let newTable = "<table>";
    //Add our table element and fill it in
    newTable += `
    <tr><td>Matches Played: </td><td class="table-stats-single">${PLAYER_ONE_STATS.totals.matchesplayed}</td></tr>
    <tr><td>Wins: </td><td class="table-stats-single">${PLAYER_ONE_STATS.totals.wins}</td></tr>
    <tr><td>Win Rate: </td><td class="table-stats-single">${PLAYER_ONE_STATS.totals.winrate}</td></tr>
    <tr><td>Kills: </td><td class="table-stats-single">${PLAYER_ONE_STATS.totals.kills}</td></tr>
    <tr><td>Kill/Death Ratio: </td><td class="table-stats-single">${PLAYER_ONE_STATS.totals.kd}</td></tr>
    </table>`;

    return newTable;
}

//Returns a form that allows the user to enter a player 2 to compare stats to.
function buildCompareForm()
{
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
    //Add our opening fieldset tag
    let newForm = "<fieldset>";

    //add our legend
    newForm += "<legend>Look up player stats:</legend>";

    //Add our player 1 name entry
    newForm += `<label for=\"Player1Name\">Player 1 Name:</label><input type=\"text\" id=\"Player1Name\" value=\"${PLAYER_ONE_STATS.displayName}\"required>`;

    //Add our link for adding a new player [this may be better as a button - I am not sure if semantic, but it looks 'normal' here]
    newForm += "<a href=\"#\" class=\"js-compare-link\">+ Player to Compare</a>";

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
    //Fetch our table div
    $('.js-stats-table').html(newTable);
}

//Refreshes DOM and updates our duo table
function refreshDuoTable(newTable)
{
    //Update our solo table
    $('.js-duo-table').html(newTable);
}

//Refreshes DOM and updates our squad table
function refreshSquadTable(newTable)
{
    //Update our squad table
    $('.js-squad-table').html(newTable);
}

//Refreshes DOM and updates our solo table
function refreshSoloTable(newTable)
{
    //Update our solo table
    $('.js-solo-table').html(newTable);
}

//Refreshes DOM and adds our new form
function refreshPlayerInfoForm(newForm)
{
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
    //console.log("save player stats");

    //Check to see if we have BR Stats.
    //If we have stats, return true, otherwise return false
    if(!$.isEmptyObject(msg.stats))
    {
        //check our player number to determine which stats object to update
        if(playerNumber === 1)
        {
            PLAYER_ONE_STATS.userID = msg.uid;
            PLAYER_ONE_STATS.displayName = msg.username;
            PLAYER_ONE_STATS.stats = msg.stats;
            PLAYER_ONE_STATS.totals = msg.totals;
            //console.log(msg.stats);
            return true;
        }
        else if(playerNumber === 2)
        {
            PLAYER_TWO_STATS.userID = msg.uid;
            PLAYER_TWO_STATS.displayName = msg.username;
            PLAYER_TWO_STATS.stats = msg.stats;
            PLAYER_TWO_STATS.totals = msg.totals;
            return true;
        }
        else{

        }
    }
    else
    {
        jsError("Player has no stats");
    }

    return false;        
}


//Called when we have a success. Receives JSON Object and stores stats in the player's stats object.
//Once our stats are stored, calls DOM updates
function updatePlayerStats(msg, playerNumber)
{
    //console.log("update player stats");

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
    }


}


//Function that requests a player's stats given their name (Using AJAX call). 
//Upon success, it will call updatePlayerStats to save the stats.
//We need to pass the playerNumber to know which player object to 
//save the stats to and which DOM update function to call.
function fortniteGetPlayerStats(userID, playerNumber)
{
    var form = new FormData();
    form.append("user_id", userID);
    form.append("platform", "pc");
    form.append("window", "alltime");
    
    //AJAX Request (we can't use headers with JSON request)
        const requestSettings = 
        {
            "async": true,
            "crossDomain": true,
            "url": "https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats",
            "xhrFields": {
                "withCredentials": true
             },
            "method": "POST",
            "headers": {
              "Authorization": API_KEY
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
          }

        //Send our ajax request
        let ajaxRequest = $.ajax(requestSettings);

        //Called on success
        ajaxRequest.done(function(data){
           //console.log(data);
           data = $.parseJSON(data);
           
           //Pass our user data to our update
            updatePlayerStats(data, playerNumber);
        });

        ajaxRequest.fail(function(data){
            jsError("Player has no stats");
        });
}


//Test Stats
function fortniteGetPlayerID(playerName, playerNumber)
{
    var form = new FormData();
    form.append("username", playerName);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fortnite-public-api.theapinetwork.com/prod09/users/id",
        "method": "POST",
        "headers": {
            "Authorization": API_KEY,
            "authorization": API_KEY
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
    }

    $.ajax(settings).done(function (response) {
        
        //Parse our given response
        //console.log(response);

        response = $.parseJSON(response);

        //pass our user ID to get player stats request
        fortniteGetPlayerStats(response.uid, playerNumber);
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
        //Store our parent
        let parent = $(this).parent();

        if(parent.find('#Player2Name').val())
        {
            //Submit AJAX Call/Update Function
            fortniteGetPlayerID(parent.find('#Player2Name').val(), 2);
            //fortniteGetPlayerStats(parent.find('#Player2Name').val(), 2);
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

        //Store our parent
        let parent = $(this).parent();

        if(parent.find('#Player1Name').val())
        {
            //Submit AJAX Call/Update Function(pass name and player number)
            fortniteGetPlayerID(parent.find('#Player1Name').val(), 1);
            
            //fortniteGetPlayerStats(parent.find('#Player1Name').val(), 1);
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
    bindSinglePlayerSubmit();
    bindAddPlayerSubmit();
    bindCompareSubmit();
}


//Call to load all of our event listeners 
$(loadBindings());