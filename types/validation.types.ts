interface ValidationRulesInputType {
  fieldId: string;
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    min?: number;
    max?: number;
  }
};

export type CreateValidationRulesType = (args: ValidationRulesInputType) => Record<string, unknown>