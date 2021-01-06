// Including porosity, temperature, area, number of plant, 
// time

export const planSeeding = {
  estimatedPlantingTime: new Date(),
  seedingTime: new Date(),
  landLot: {
    code: 'A23',
    lot: 'A',
    subLot: '23',
  },
  area: 42,
  numberOfSeed: 175,
  expectedQuantity: 160,
  temperature: 20,
  humidity: 42,
  porosity: 13,
  // Redundant species field
  species: {
    _id: 'mongoid@qprtmzfaw24a4hfharftwbe',
    name: 'Rau muống',
    barcode: 'GTIN@123456',
    seedingDays: 10,
    plantingDays: 4,
    expiryDays: 2,
    code: 'RM01'
  },
};

export const planPlanting = {
  estimatedPlantingTime: new Date(),
  estimatedHarvestTime: new Date(),
  area: 42,
  numberOfPlants: 150,
  expectedQuantity: 135,
  temperature: 26,
  humidity: 31,
  porosity: 5,
  landLot: 'A34',

  // Redundant field
  species: {
    _id: 'mongoid@qprtmzfaw24a4hfharftwbe',
    name: 'Rau muống',
    barcode: 'GTIN@123456',
    seedingDays: 10,
    plantingDays: 4,
    expiryDays: 2,
    code: 'RM01'
  },
};

export const planHarvesting = {
  // estimatedPlantingTime: new Date(),
  // estimatedHarvestTime: new Date(),
  code: '234112e',
  area: 42,
  // numberOfPlants: 150,
  // expectedQuantity: 135,
  realQuantity: 135,
  temperature: 26,
  humidity: 31,
  porosity: 5,
  landLot: 'A34',
  startTime: new Date(),
  endTime: new Date(),
};

export const planPreliminary = {
  startTime: new Date(),
  endTime: new Date(),
  realQuantity: 11,
};

export const planCleaning = {
  startTime: new Date(),
  endTime: new Date(),
  realQuantity: 11,
};

export const planPacking = {

};

export const planPreservation = {

};

