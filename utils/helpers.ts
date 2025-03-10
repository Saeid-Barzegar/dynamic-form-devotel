import get from 'lodash/get'
import { FormDataItemType } from "../types/formType";
import {  VisibilityConditionInputTypes, DynamicFieldInputTypes} from "@/types/helpers.type";
import { COUNTRY_MAPPER } from "../constants/mappers";

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

export const hasVisibilityCondition: (data: VisibilityConditionInputTypes) => boolean = ({
  field,
  watch
}) => {
  const visibility = field.visibility;
  if (!visibility) return true;

  const { dependsOn, condition, value } = visibility;
  const dependencyValue = watch(dependsOn)?.toLowerCase();
  const targetValue = value.toLowerCase();

  return condition === "equals" ? dependencyValue === targetValue : false;
};

export const getDynamicFields: (data: DynamicFieldInputTypes) => Promise<void> = async ({
  field,
  watch,
  callback
}) => {
  const API_BASE_URL = process.env.API_BASE_URL;
  const { dynamicOptions } = field;

  if (!dynamicOptions) return;

  const { dependsOn, endpoint, method } = dynamicOptions;
  const dependentValue = watch(dependsOn);

  if (!dependentValue) return;

  try {
    let query = "";
    if (dependsOn === "country") {
      const countryName = get(COUNTRY_MAPPER, dependentValue, "");
      if (!countryName) return; // Prevent unnecessary API calls
      query = `?country=${encodeURIComponent(countryName)}`;
    }
    const dynamicFieldUrl = `/api/proxy?url=${API_BASE_URL}${endpoint}${query}`;
    const headers = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(dynamicFieldUrl, headers);

    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

    const data = await response.json();

    if (data && dependsOn === "country") {
      callback(data.states);
    }
  } catch (error) {
    console.error("Error fetching dynamic field data:", error);
  }
};

export const mapCulumnsToShowInTable = (columnVisibility: Record<string, boolean>) => {
  const newList = []
  for (let item in columnVisibility) {
    if (columnVisibility[item] === true) {
      newList.push(item)
    }
  }
  return newList;
}