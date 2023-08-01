interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['App Owner'],
  customerRoles: [],
  tenantRoles: ['App Owner', 'App Administrator', 'Driver', 'Customer Support Representative'],
  tenantName: 'Company',
  applicationName: 'Sv Travels',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
