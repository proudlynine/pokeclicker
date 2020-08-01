///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>

// Note that baby Pokemon cannot use this evolution as the devolution map cannot be properly inverted.
class TimedStoneEvolution extends StoneEvolution {

    stone: GameConstants.StoneType;
    timeData: TimedStoneData[];
    defaultEvolution: string;

    constructor(basePokemon: string, timeData: TimedStoneData[], defaultEvolution: string, stone: GameConstants.StoneType) {
        super(basePokemon, defaultEvolution, stone);
        this.timeData = timeData;
        this.stone = stone;
        this.defaultEvolution = defaultEvolution;
    }

    isSatisfied(): boolean {
        return true;
    }

    getEvolvedPokemon(): string {
        const currentHour = new Date().getHours();

        for (const timeData of this.timeData) {
            if (currentHour >= timeData.startHour && currentHour <= timeData.endHour) {
                return timeData.evolvedPokemon;
            }
        }
        return this.defaultEvolution;
    }
}

class TimedStoneData {
    // Inclusive
    startHour: number
    // Inclusive
    endHour: number
    evolvedPokemon: string


    constructor(startHour: number, endHour: number, evolvedPokemon: string) {
        this.startHour = startHour;
        this.endHour = endHour;
        this.evolvedPokemon = evolvedPokemon;
    }
}