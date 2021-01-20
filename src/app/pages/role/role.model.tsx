import { ManagementOrganizationModel } from "../management-organization/management-organization.model";

export type RoleModel = {
  _id?: string;
  parent?: string;
  name: string;
  // managementUnit: {
  //   _id?: string;
  //   code?: string;
  //   level?: number;
  //   parent?: string;
  // } | string | undefined;
  scopes: string[];
  status: string;
  managementUnit?: Partial<ManagementOrganizationModel> | string | undefined;
}