export const role_scope_enterprise = [
  'enterprise.name',
  'enterprise.taxId',
  'enterprise.address',
  'enterprise.phone',
  'enterprise.presentedBy',
  'enterprise.gln',
];

export const role_scope_species = ['species.name', 'species.barcode'];

export const role_scope_seeding = [
  'productPlan.seeding.certificates',
  'productPlan.seeding.buyInvoice',
  'productPlan.seeding.seedingTime',
  'productPlan.seeding.farmLocation',
  'productPlan.seeding.expectedQuantity',
  'productPlan.seeding.numberOfSeed',
  'productPlan.seeding.landLot',
  'productPlan.seeding.area',
  'productPlan.seeding.temperature',
  'productPlan.seeding.humidity',
  'productPlan.seeding.porosity',
  'productPlan.seeding.seedingImage',
  'productPlan.seeding.landLotImage',
  'productPlan.seeding.manager',
  'productPlan.seeding.leader',
  'productPlan.seeding.technical',
  'productPlan.seeding.worker',
];

export const role_scope_planting = [
  'productPlan.planting.numberOfPlants',
  'productPlan.planting.area',
  'productPlan.planting.farmLocation',
  'productPlan.planting.landLot',
  'productPlan.planting.imageBefore',
  'productPlan.planting.imageAfter',
  'productPlan.planting.humidity',
  'productPlan.planting.porosity',
  'productPlan.planting.temperature',
  'productPlan.planting.manager',
  'productPlan.planting.leader',
  'productPlan.planting.technical',
  'productPlan.planting.worker',
];

export const role_scope_harvesting = [
  'productPlan.harvesting.startTime',
  'productPlan.harvesting.endTime',
  'productPlan.harvesting.quantity',
  'productPlan.harvesting.imageBefore',
  'productPlan.harvesting.imageInProgress',
  'productPlan.harvesting.imageAfter',
  'productPlan.harvesting.temperature',
  'productPlan.harvesting.humidity',
  'productPlan.harvesting.porosity',
  'productPlan.harvesting.manager',
  'productPlan.harvesting.leader',
  'productPlan.harvesting.technical',
  'productPlan.harvesting.worker',
];

export const role_scope_preliminary_treatment = [
  'productPlan.preliminaryTreatment.startTime',
  'productPlan.preliminaryTreatment.endTime',
  'productPlan.preliminaryTreatment.estimatedTime',
  'productPlan.preliminaryTreatment.estimatedQuantity',
  'productPlan.preliminaryTreatment.quantity',
  'productPlan.preliminaryTreatment.location',
  'productPlan.preliminaryTreatment.imageBefore',
  'productPlan.preliminaryTreatment.imageInProgress',
  'productPlan.preliminaryTreatment.imageAfter',
  'productPlan.preliminaryTreatment.manager',
  'productPlan.preliminaryTreatment.leader',
  'productPlan.preliminaryTreatment.technical',
  'productPlan.preliminaryTreatment.worker',
];

export const role_scope_cleaning = [
  'productPlan.cleaning.startTime',
  'productPlan.cleaning.endTime',
  'productPlan.cleaning.estimatedTime',
  'productPlan.cleaning.estimatedQuantity',
  'productPlan.cleaning.quantity',
  'productPlan.cleaning.location',
  'productPlan.cleaning.imageBefore',
  'productPlan.cleaning.imageInProgress',
  'productPlan.cleaning.imageAfter',
  'productPlan.cleaning.manager',
  'productPlan.cleaning.leader',
  'productPlan.cleaning.technical',
  'productPlan.cleaning.worker',
];

export const role_scope_packing = [
  'productPlan.packing.location',
  'productPlan.packing.type',
  'productPlan.packing.expiryDate',
  'productPlan.packing.productImage',
  'productPlan.packing.imageAfterPacking',
  'productPlan.packing.scanAt',
  'productPlan.packing.activeAt',
  'productPlan.packing.activeBy',
  'productPlan.packing.manager',
  'productPlan.packing.leader',
  'productPlan.packing.technical',
];

export const role_scope_preservation = [
  'productPlan.preservation.location',
  'productPlan.preservation.temperature',
  'productPlan.preservation.image',
  'productPlan.preservation.manager',
  'productPlan.preservation.technical',
  'productPlan.preservation.worker',
];

export const role_scope_logistics = [
  'logistics.createdBy',
  'logistics.createdAt',
  'logistics.qrParent',
  'logistics.qrChildren',
];

export const role_scope_distribution = [
  'distribution.timeExportOrder',
  'distribution.locationExportOrder',
  'distribution.staffExportOrder',
  'distribution.shipper',
  'distribution.timeImportOrder',
  'distribution.locationImportOrder',
  'distribution.staffImportOrder',
  'distribution.imagePath',
];

export const role_scope_shipping = [
  'shipping.timeExportOrder',
  'shipping.locationExportOrder',
  'shipping.staffExportOrder',
  'shipping.shipper',
];

export const role_scope_status = [
  'retailInfo.isSold',
  'retailInfo.soldDate',
  'retailInfo.soldAt',
  'retailInfo.soldBy',
  'retailInfo.buyer',
];
