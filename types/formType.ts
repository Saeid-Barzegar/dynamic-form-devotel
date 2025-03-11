export type ApiCallMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type InputType = "radio" | "checkbox" | "select" | "text" | "number" | "group" | "date";

export type FiledDataItemType = {
  id: number;
  label: string;
  value: string;
}

export type VisibilityType =  {
  dependsOn: string;
  condition: string;
  value: string;
}

export interface DynamicOptionsType {
  dependsOn: string;
  endpoint: string;
  method: ApiCallMethodType;
}

export interface FieldType {
  id: string;
  label: string;
  type: InputType;
  required: boolean;
  options?: string[];
  visibility?: VisibilityType;
  dynamicOptions?: DynamicOptionsType,
  validation: {
    max?: number;
    min?: number;
    pattern?: RegExp;
  };
  fields?: FieldType[]
}

export interface FormDataItemType {
  formId: string;
  title: string;
  fields: FieldType[];
}

export interface FormStatType {
    insuranceType: string;
    personal_info?: string;
    country?: string;
    state?: string;
    address?: string;
    health_info?: string;
    home_owner?: string;
    property_type?: string;
    home_value?: string;
    has_security_system?: string;
    security_system_type?: string;
    fire_safety?: string;
    home_address?: string;
    insurance_coverage?: string;
    car_owner?: string;
    vehicle_info?: string;
    driving_record?: string;
    insurance_history?: string;
    desired_coverage?: string;
    roadside_assistance?: string;
}
