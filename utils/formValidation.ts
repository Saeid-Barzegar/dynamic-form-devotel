import { FIELD_MESSAGE_MAPPER } from "@/constants/mappers";
import { CreateValidationRulesType } from "@/types/validation.types";

/**
 * creates validation rule for react hook form
 * @param fieldId field id **mandatory 
 * @param required field is required or not 
 * @param validation validation rules comes from api 
 * @returns validation schema
 */

export const createValidationRules: CreateValidationRulesType = ({
  fieldId,
  required,
  validation
}) => ({
  ...(required && { required: 'This field is required' }),
  ...(validation?.pattern && {
    pattern: {
      value: validation.pattern,
      message: FIELD_MESSAGE_MAPPER[fieldId]?.message,
    },
  }),
  ...(validation?.min && {
    min: {
      value: validation.min,
      message: `Minimum value is ${validation.min}`
    }
  }),
  ...(validation?.max && {
    max: {
      value: validation.max,
      message: `Maximum value is ${validation.max}`
    }
  }),
});