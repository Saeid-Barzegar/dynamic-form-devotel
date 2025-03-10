"use client"

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import get from "lodash/get";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import { SubmitHandler, useForm } from "react-hook-form";
import { inputDataMapper, insuranceTypesMapper, getDynamicFields, hasVisibilityCondition } from "@/utils/helpers";
import useFetch from "@/hooks/useFetch";
import { ENDPOINTS } from "@/constants/endpoints";
import { SubFieldType } from "@/types/formType";
import SelectInput from "@/components/SelectInput/Select";
import Input from "@/components/Input/Input";
import Radio from "@/components/Radio/Radio";
import DateInput from "@/components/DateInput/DateInput";
import Button from "@/components/Button/Button";
import CheckBoxGroup from "@/components/CheckBox/Checkbox";
import { MainContainer } from "@/components/Radio/radio.elements";
import { PageContainer } from "@/elements/comman.element";

export default function Home() {
  const API_BASE_URL = process.env.API_BASE_URL;
  const router = useRouter();
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

  const onSubmit: SubmitHandler<any> = async (data: FormData) => {
    const URL = `${API_BASE_URL}${ENDPOINTS.FORM_SUBMIT}`
    const response = await fetch(URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: data
    });

    console.log(">>>", { response })
    if (response.ok) {
      router.push('/submissions')
    }
  };

  const [dynamicField, setDynamicField] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const insuranceTypes = useMemo(() => Array.isArray(data) ? insuranceTypesMapper(data) : [], [data]);

  const { insuranceType, smoker, country } = watch();

  console.log({ insuranceType, smoker, country })

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
      setIsLoading(false)
    }
  }, [dynamicField]);

  useEffect(() => {
    if (dynamicField.length > 0) {
      setDynamicField([])
      setIsLoading(false)
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
      if (!isLoading && !isEmpty(watch(dependsOn)) && isEmpty(dynamicField)) {
        setIsLoading(true)
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
        {type === 'checkbox' && (
          <CheckBoxGroup
            label={label}
            options={inputDataMapper(options ?? [])}
            register={{ ...register(id, validationRules) }}
          />
        )}
      </div>
    );
  }

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h1>Oops! something went wrong</h1>;

  return (
    <PageContainer>
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
            <Button type="submit" className="mt-8">Submit</Button>
          )}
        </form>
      </div>
    </PageContainer>
  );
}
