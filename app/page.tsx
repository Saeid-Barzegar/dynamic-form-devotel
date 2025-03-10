"use client"

import { useMemo, useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { inputDataMapper, insuranceTypesMapper, getDynamicFields, hasVisibilityCondition } from "@/utils/helpers";
import { ENDPOINTS } from "@/constants/endpoints";
import SelectInput from "@/components/SelectInput";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import { SubFieldType } from "@/types/formType";
import { get } from "lodash";
import Input from "@/components/Input";
import Radio from "@/components/Radio";
import DateInput from "@/components/DateInput";
import Button from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";



export default function Home() {
  const { error, isPending, data } = useFetch(ENDPOINTS.FORMS);
  const {
    reset,
    register,
    unregister,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    delete data.insuranceType
    console.log("onSubmit", { data, errors })
  };

  const [dynamicField, setDynamicField] = useState<string[]>([]);
  const [dynamicFieldIsPending, setDynamicFieldIsPending] = useState<boolean>(false);

  const insuranceTypes = useMemo(() => Array.isArray(data) ? insuranceTypesMapper(data) : [], [data]);

  const { insuranceType, smoker, country } = watch();

  const formData = useMemo(() => {
    if (isArray(data) && !isEmpty(insuranceType)) {
      reset({ insuranceType });
      setDynamicField([])
      return data.filter(form => form.formId === insuranceType)[0];
    }
    return {};
  }, [insuranceType]);

  useEffect(() => {
    if (isEmpty() || smoker === 'no') {
      unregister('smoking_frequency')
    }
  }, [smoker]);

  useEffect(() => {
    if (dynamicField.length > 0) {
      setDynamicFieldIsPending(false)
    }
  }, [dynamicField]);

  useEffect(() => {
    if (dynamicField.length > 0) {
      setDynamicField([])
    }
  }, [country]);

  const renderFormField = (field: SubFieldType) => {
    let isFieldVisible = true;

    const {
      id,
      type,
      label,
      visibility,
      options,
      dynamicOptions,
      required,
      validation
    } = field;

    const validationRules = {
      required,
      ...(validation?.pattern && { pattern: validation.pattern }),
      ...(validation?.min && { min: validation.min }),
      ...(validation?.max && { max: validation.max }),
    };

    if (visibility) {
      isFieldVisible = hasVisibilityCondition({ field, watch });
    };

    if (dynamicOptions) {
      const dependsOn = get(field, 'dynamicOptions.dependsOn', '');
      if (!dynamicFieldIsPending && !isEmpty(dependsOn) && isEmpty(dynamicField)) {
        setDynamicFieldIsPending(true)
        getDynamicFields({
          field,
          watch,
          callback: setDynamicField
        });
      } else {
        isFieldVisible = !isEmpty(dynamicField)
      }
    };

    const dateOfBirthChangedHandler = (date: Date | null) => setValue("dob", date);

    return (
      <div key={id}>
        {isFieldVisible && (type === "text" || type === "number") && (
          <Input
            className="mt-6"
            label={label}
            type={type}
            name={id}
            required={required}
            register={{ ...register(id, { required }) }}
          />
        )}
        {isFieldVisible
          && (type === "select"
            && (dynamicOptions ? !isEmpty(dynamicField) : isArray(options))
          ) && (
            <SelectInput
              id={id}
              className="mt-4"
              label={label}
              options={inputDataMapper(dynamicOptions ? dynamicField : options || [])}
              register={{ ...register(id, validationRules) }}
            />
          )}
        {isFieldVisible && (type === "radio" && isArray(options)) && (
          <Radio
            id={id}
            label={label}
            name={id}
            data={inputDataMapper(options)}
            register={{ ...register(id, validationRules) }}
            error={get(errors, `${id}.message`, "") as string}
          />
        )}
        {type === 'date' && (
          <DateInput
            id={id}
            label="Date Of Birth"
            date={watch("dob")}
            onSelect={dateOfBirthChangedHandler}
          />
        )}
      </div>
    );
  }

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h1>Oops! something went wrong</h1>;

  return (
    <div className="w-full flex flex-col px-6 pt-36 md:pt-28 pb-18 jusify-center items-center">
      <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {insuranceTypes.length > 0 && (
            <SelectInput
              id="insurance_type"
              className="w-full md:w-1/2"
              label="Select Insurance Type"
              options={insuranceTypes}
              register={register("insuranceType", { required: true })}
            />
          )}
          {!isEmpty(formData) && (
            <section className="">
              <h3 className="text-2xl font-bold mb-6 mt-8">{formData.title}</h3>
              {formData.fields.map((field: SubFieldType) => {
                const subfields: any = get(field, 'fields', []);
                return isEmpty(subfields) ? renderFormField(field) : (
                  <div key={field.id} className="mt-8">
                    {field.type === 'group' && (
                      <>
                        <h4 className="text-xl font-bold mb-4">{field.label}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {subfields.map((field: any) => renderFormField(field))}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </section>
          )}
          {watch('insuranceType') && (
            <Button
              type="submit"
              className="mt-8"
            >Submit</Button>
          )}
        </form>
      </div>
    </div>
  );
}
