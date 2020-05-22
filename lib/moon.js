import BN from 'bignumber.js';

const MOON_CYCLE_DURATION = new BN(29.530588); // days
const MOON_PHASES = 8;
const PHASE_DURATION = MOON_CYCLE_DURATION.div(MOON_PHASES);

const NEW_MOON_BASE = new Date(1587608820000); // 24 janvier 2020	22:44:11
// const NEW_MOON_BASE = new Date(1587608820000);    // 23 avril 2020	04:27:00

const DAYS_TO_MS = new BN(24).times(60).times(60).times(1000);

const MoonLib = {
  getState() {
    const diffNow = new BN(Date.now() - NEW_MOON_BASE);

    const daysSinceNew = diffNow.div(DAYS_TO_MS).modulo(MOON_CYCLE_DURATION);
    const currentPhase = daysSinceNew.div(PHASE_DURATION).integerValue(BN.ROUND_FLOOR);
    const startOffset = daysSinceNew.modulo(PHASE_DURATION);

    console.log(daysSinceNew.toFixed(), currentPhase.toFixed(), startOffset.toFixed());

    return {
      daysSinceNew,
      currentPhase,
      startOffset,
    };
  },
};

export default MoonLib;