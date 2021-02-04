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
  'seeding.certificates',
  'seeding.buyInvoice',
  'seeding.seedingTime',
  'seeding.farmLocation',
  'seeding.numberOfSeed',
  'seeding.landLot',
  'seeding.area',
  'seeding.temperature',
  'seeding.humidity',
  'seeding.porosity',
  'seeding.seedingImage',
  'seeding.landLotImage',
  'seeding.manager',
  'seeding.leader',
  'seeding.technical',
  'seeding.worker',
];

export const role_scope_planting = [
  'planting.numberOfPlants',
  'planting.planting.area',
  'planting.farmLocation',
  'planting.landLot',
  'planting.imageBefore',
  // 'planting.imageAfter',
  'planting.humidity',
  'planting.porosity',
  'planting.temperature',
  'planting.manager',
  'planting.leader',
  'planting.technical',
  'planting.worker',
];

export const role_scope_harvesting = [
  'harvesting.time',
  'harvesting.quantity',
  'harvesting.imageBefore',
  'harvesting.imageAfter',
  'harvesting.temperature',
  'harvesting.humidity',
  'harvesting.porosity',
  'harvesting.manager',
  'harvesting.leader',
  'harvesting.technical',
  'harvesting.worker',
];

export const role_scope_preliminary_treatment = [
  'preliminary_treatment.time',
  'preliminary_treatment.quantity',
  'preliminary_treatment.location',
  'preliminary_treatment.imageBefore',
  'preliminary_treatment.imageInProgress',
  'preliminary_treatment.imageAfter',
  'preliminary_treatment.manager',
  'preliminary_treatment.leader',
  'preliminary_treatment.technical',
  'preliminary_treatment.worker',
];

export const role_scope_cleaning = [
  'cleaning.time',
  'cleaning.quantity',
  'cleaning.location',
  'cleaning.imageBefore',
  'cleaning.imageInProgress',
  'cleaning.imageAfter',
  'cleaning.manager',
  'cleaning.leader',
  'cleaning.technical',
  'cleaning.worker',
];

export const role_scope_packing = [
  'packing.location',
  'packing.type',
  'packing.expiryDate',
  'packing.productImage',
  'packing.imageAfterPacking',
  'packing.scanAt',
  'packing.activeAt',
  'packing.activeBy',
  'packing.manager',
  'packing.leader',
  'packing.technical',
  // 'packing.worker',
];

export const role_scope_preservation = [
  'preserve.location',
  'preserve.temperature',
  'preserve.image',
  'preserve.technical',
  // 'preserve.leader',
  'preserve.worker',
];

export const role_scope_logistics = [
  'logistics.createdBy',
  'logistics.createdAt',
  'logistics.qrParent',
  'logistics.qrChildren',
];

export const role_scope_distribution = [
  "distribution.timeExportOrder",
  "distribution.locationExportOrder",
  "distribution.staffExportOrder",
  "distribution.shipper",
  "distribution.timeImportOrder",
  "distribution.locationImportOrder",
  "distribution.staffImportOrder",
  "distribution.imagePath",
];

export const role_scope_shipping = [
  'shipping.timeExportOrder',
  'shipping.locationExportOrder',
  'shipping.staffExportOrder',
  'shipping.shipper',
];

export const role_scope_status = [
  'status.status',
  'status.dateSale',
  'status.locationSale',
  'status.staffSale',
  'status.phoneCustomer',
];
