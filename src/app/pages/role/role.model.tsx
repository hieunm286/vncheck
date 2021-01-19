import { ManagementOrganizationModel } from "../management-organization/management-organization.model";

export type RoleModel = {
  _id: string;
  managementUnit?: Partial<ManagementOrganizationModel>;
}