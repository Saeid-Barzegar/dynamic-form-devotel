"use client"

import { useMemo, useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { inputDataMapper, insuranceTypesMapper } from "@/utils/helpers";
import { ENDPOINTS } from "@/constants/endpoints";
import SelectInput from "@/components/SelectInput";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import { SubFieldType } from "@/types/formType";
import { get } from "lodash";
import { COUNTRY_MAPPER } from "../constants/mappers";
import Input from "@/components/Input";
import Radio from "@/components/Radio";
import DateInput from "@/components/DateInput";
import Button from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";



export default function Home() {
  const API_BASE_URL = process.env.API_BASE_URL;
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

  const insuranceTypes = useMemo(() => Array.isArray(data) ? insuranceTypesMapper(data) : [], [data]);

  const insuranceType = watch("insuranceType");

  const formData = useMemo(() => {
    if (isArray(data) && !isEmpty(insuranceType)) {
      reset({ insuranceType });
      setDynamicField([])
      return data.filter(form => form.formId === insuranceType)[0];
    }
    return {};
  }, [insuranceType]);

  const hasVisibilityCondition = (subField: SubFieldType): boolean => {
    const visibility = subField.visibility;
    if (!visibility) return true;

    const { dependsOn, condition, value } = visibility;
    const dependencyValue = watch(dependsOn)?.toLowerCase();
    const targetValue = value.toLowerCase();

    return condition === "equals" ? dependencyValue === targetValue : false;
  };

  const getDynamicFields = async (subField: SubFieldType) => {
    if (!subField.dynamicOptions) return;

    const { dependsOn, endpoint, method } = subField.dynamicOptions;
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
        setDynamicField(data.states);
      }
    } catch (error) {
      console.error("Error fetching dynamic field data:", error);
    }
  };

  useEffect(() => {
    if (isEmpty() || watch("smoker") === 'no') {
      unregister('smoking_frequency')
    }
  }, [watch("smoker")]);

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
      isFieldVisible = hasVisibilityCondition(field);
    };

    if (dynamicOptions) {
      const dependsOn = get(field, 'dynamicOptions.dependsOn', '');
      if (!isEmpty(watch(dependsOn)) && isEmpty(dynamicField)) {
        getDynamicFields(field);
      } else {
        isFieldVisible = !isEmpty(dynamicField)
      }
    };

    const dateOfBirthChangedHandler = (date: Date | null) => {
      setValue("dob", date);
    };

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
          && (
            type === "select"
            && (
              dynamicOptions
                ? !isEmpty(dynamicField)
                : isArray(options))
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
    <div className="w-full flex flex-col px-6 pt-28 pb-18 jusify-center items-center">
      <div className="w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {insuranceTypes.length > 0 && (
            <SelectInput
              id="insurance_type"
              className="w-1/2"
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

                console.log({ field })
                return isEmpty(subfields)
                  ? renderFormField(field)
                  : (
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
          <Button type="submit" className="mt-8">Submit</Button>
        </form>
      </div>
    </div>
  );
}
