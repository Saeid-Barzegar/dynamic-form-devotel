import { FormDataItemType } from "../types/formType";

export const inputDataMapper = (data: string[]) => data.map((item, index) => ({
  id: index,
  label: item,
  value: item.toLowerCase().replace(/\s+/g, "_"),
}));

export const insuranceTypesMapper = (data: FormDataItemType[]) => data.map((item, index) => ({
  id: index,
  label: item.title,
  value: item.formId,
}));