import { FieldType } from "@/types/formType";

export interface DynamicFieldInputTypes {
  field: FieldType,
  watch: (key: string) => string;
  callback: (data: string[]) => void;
}

export interface VisibilityConditionInputTypes {
  field: FieldType,
  watch: (key: string) => string;
}

export interface DynamicFieldInputTypes extends VisibilityConditionInputTypes {
  callback: (data: string[]) => void;
}