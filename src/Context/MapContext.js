import React, {useState} from 'react';
import Data from '../../assets/Data.json';

/**
 * Context allows a value to be passed deep into the component tree 
 * without explicitly threading it through every component.
 * Create a context for map.
 */
const MapContext = React.createContext();

/**
 * Processes data on crimes reported in different police division.
 * @param {*} year - The year of the crimes displayed.
 * @param {*} npc - The name of the police division. 
 */
const Processing = ({year, npc}) => {
    const filtered = Data.filter(item => {return(item.year === year && item.level_1 === npc)});
    return(filtered[0].value);
}

/**
 * Updates total number of crimes reported in different police divison in year 2020.
 */
export const MapProvider = ({children}) => {
    const [centralCases, setCentralCases] = useState(Processing({year:2020,npc:'Central Police Division - Total'}));
    const [clementiCases, setClementiCases] = useState(Processing({year:2020,npc:'Clementi Police Division - Total'}));
    const [tanglinCases, setTanglinCases] = useState(Processing({year:2020,npc:'Tanglin Police Division - Total'}));
    const [amkCases, setAmkCases] = useState(Processing({year:2020,npc:'Ang Mo Kio Police Division - Total'}));
    const [bedokCases, setBedokCases] = useState(Processing({year:2020,npc:'Bedok Police Division - Total'}));
    const [jurongCases, setJurongCases] = useState(Processing({year:2020,npc:'Jurong Police Division - Total'}));
    const [woodlandsCases, setWoodlandsCases] = useState(Processing({year:2020,npc:'Woodlands Police Division - Total'}));

    const addCase = ({npc}) => {
        switch (npc){
            case 'Central Police Division': {
                setCentralCases(centralCases + 1)
                break;
            }
            case 'Clementi Police Division': {
                setClementiCases(clementiCases + 1)
                break;
            }
            case 'Tanglin Police Division': {
                setTanglinCases(tanglinCases + 1)
                break;
            }
            case 'Ang Mo Kio Police Division': {
                setAmkCases(amkCases + 1)
                break;
            }
            case 'Bedok Police Division': {
                setBedokCases(bedokCases + 1)
                break;
            }
            case 'Jurong Police Division': {
                setJurongCases(jurongCases + 1)
                break;
            }
            case 'Woodlands Police Division': {
                setWoodlandsCases(woodlandsCases + 1)
                break;
            }
            default: {
                break;
            }
        }
    }

    return <MapContext.Provider value = {{mapData: [centralCases, clementiCases, tanglinCases, 
                                        amkCases, bedokCases, jurongCases, woodlandsCases], addCase}}>
        {children}
    </MapContext.Provider>;
};

export default MapContext;