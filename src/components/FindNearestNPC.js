import npcInfo from '../../assets/npcInfo.json';

/**
 * List of divisions on the Map
 */
const npcList = ['Central Police Division','Clementi Police Division','Tanglin Police Division','Ang Mo Kio Police Division',
                'Bedok Police Division','Jurong Police Division','Woodlands Police Division']
         
/**
 * Filters data to obtain the coordinates of the desired division.
 * @param {*} division - The name of the police division. 
 */
const ProcessInfo = ({division, output}) => {
    const divisionFilter = npcInfo.filter(item => {return(item.division === division)});
    try{
        switch(output){
            case "dLatitude":{
                return(divisionFilter[0].coordinates.latitude);
            }
            case "dLongitude":{
                return(divisionFilter[0].coordinates.longitude);
            }
            
            default: return null
        }
    }catch(err){
        console.log(err)
        return null
    }
}

/**
 * Converts degrees to radians
 */
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

/**
 * Calculates the distance from current location to target location. 
 * @param {*} currentLat - Current location's latitude
 * @param {*} currentLon - Current location's longitute
 * @param {*} targetLat - Nearest police centre's latitude from current location
 * @param {*} targetLon - Nearest police centre's longitute from current location
 */
const findDistance = ({currentLat, currentLon, targetLat, targetLon}) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(targetLat-currentLat);  // deg2rad below
    var dLon = deg2rad(targetLon-currentLon); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(currentLat)) * Math.cos(deg2rad(targetLat)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

/**
 * Locates the nearest police center from current location.
 * @param {*} latitude - Current location's latitude
 * @param {*} longitude - Current location's longitute
 */
const findNearestNPC = ({latitude, longitude}) => {
    var nearestDist = findDistance({currentLat: latitude, currentLon: longitude,
        targetLat: ProcessInfo({division: npcList[0], output: 'dLatitude'}),
        targetLon: ProcessInfo({division: npcList[0], output: 'dLongitude'})});
    var nearestNPC = 0;

    for (var i = 1; i < 7; i++){
        var npc = npcList[i];
        var dist = findDistance({currentLat: latitude, currentLon: longitude,
                                    targetLat: ProcessInfo({division: npc, output: 'dLatitude'}),
                                    targetLon: ProcessInfo({division: npc, output: 'dLongitude'})})
        
        if (dist < nearestDist) {
            nearestDist = dist
            nearestNPC = i
        }
    }

    return npcList[nearestNPC];
}


export default findNearestNPC;