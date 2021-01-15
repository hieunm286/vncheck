import { role_scope_enterprise, role_scope_harvesting, role_scope_planting, role_scope_preliminary_treatment, role_scope_seeding, role_scope_species } from "./role_scope";
import { createIntl, createIntlCache, IntlShape } from 'react-intl';
import { useLang } from "../../../layout/i18n/Metronici18n";
import { allMessages } from "../../../layout/i18n/I18nProvider";

const locale = 'vi'
const messages = allMessages.vi
const cache = createIntlCache();
const intl = createIntl({ locale: locale, messages: messages }, cache)

export type RoleScopeData = {
    label: string;
    value: string;
    disabled?: boolean;
}

export const ConvertRoleScope = (scope: string[], intl?: IntlShape) => {
    const cvArr :RoleScopeData[] = [];

    scope.forEach(item => {
        const element = { label: intl ? intl.formatMessage({ id: item.toUpperCase() }) : item.toUpperCase(), value: item }
        cvArr.push(element)
    })

    return cvArr;
}

export const enterpriseScope = ConvertRoleScope(role_scope_enterprise)
export const speciesScope = ConvertRoleScope(role_scope_species)
export const seedingScope = ConvertRoleScope(role_scope_seeding)
export const plantingScope = ConvertRoleScope(role_scope_planting)
export const harvestingScope = ConvertRoleScope(role_scope_harvesting)
export const preliminaryTreatmentScope = ConvertRoleScope(role_scope_preliminary_treatment)