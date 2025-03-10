import { SubFieldType } from "@/types/formType";

export interface DynamicFieldInputTypes {
  field: SubFieldType,
  watch: (key: string) => string;
  callback: (data: string[]) => void;
}

export interface VisibilityConditionInputTypes {
  field: SubFieldType,
  watch: (key: string) => string;
}

export interface DynamicFieldInputTypes extends VisibilityConditionInputTypes {
  callback: (data: string[]) => void;
}