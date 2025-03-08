"use client"

import { ChangeEvent, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { inputDataMapper, insuranceTypesMapper } from "@/utils/helpers";
import { ENDPOINTS } from "@/constants/endpoints";
import SelectInput from "@/components/SelectInput";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import { FieldType, SubFieldType, DynamicOptionsType } from "@/types/formType";
import { get } from "lodash";
import { COUNTRY_MAPPER } from "../constants/mappers";
import Input from "@/components/Input";
import Radio from "@/components/Radio";
import DateInput from "@/components/DateInput";
import Button from "@/components/Button";


export default function Home() {
  const API_BASE_URL = process.env.API_BASE_URL;
  const { error, isPending, data } = useFetch(ENDPOINTS.FORMS);

  const [formState, setFormState] = useState<any>({
    insuranceType: "",
    country: "",
    birthDate: "",
  });

  const insuranceTypes = useMemo(() => {
    if (!isEmpty(data) && isArray(data)) {
      return insuranceTypesMapper(data)
    }
    return [];
  }, [data]);

  const formData = useMemo(() => {
    if (isArray(data) && !isEmpty(formState.insuranceType)) {
      const filtered = data.filter(form => form.formId === formState.insuranceType)[0];
      return filtered;
    }
    return {};
  }, [formState.insuranceType]);

  const hasVisibilityCondition = (subField: SubFieldType): boolean => {
    const visibility = subField.visibility;
    if (!visibility) return true;

    const { dependsOn, condition, value } = visibility;
    const dependencyValue = formState[dependsOn]?.toLowerCase();
    const targetValue = value.toLowerCase();

    return condition === "equals" ? dependencyValue === targetValue : false;
  };

  const handleDynamicOption = async (subField: SubFieldType) => {
    // dynamicOptions : {dependsOn: 'country', endpoint: '/api/getStates', method: 'GET'}
    if (!subField.dynamicOptions) return;

    const dynamicOptions: DynamicOptionsType = subField.dynamicOptions;
    const { dependsOn, endpoint, method } = dynamicOptions;
    if (formState[dependsOn]) {
      let query = '';
      if (dependsOn === 'country') {
        const countryName = COUNTRY_MAPPER[formState.country]
        query = `?country=${countryName}`;
      }

      const dynamicData = await fetch(`/api/proxy?url=${API_BASE_URL}${endpoint}${query}`, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
      });

      const dynamicValue = await dynamicData.json();
      console.log({ dynamicValue })
    }
  }


  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h1>Oops! something went wrong</h1>;

  return (
    <div className="w-full flex flex-col px-6 pt-28 pb-18 jusify-center items-center">
      <div className="w-1/2">
        {(insuranceTypes.length > 0) && (
          <SelectInput
            className="w-1/2"
            label="Select Insurance Type"
            value={formState.insuranceType}
            options={insuranceTypes}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setFormState({ ...formState, insuranceType: event.target.value });
            }}
          />
        )}
        {!isEmpty(formData) && (
          <section className="">
            <h3 className="text-2xl font-bold mb-6 mt-8">{formData.title}</h3>
            {formData.fields.map((field: FieldType) => {
              const subfields: any = get(field, 'fields', []);
              return (
                <div key={field.id} className="mt-8">
                  {field.type === 'group' && (
                    <>
                      <h4 className="text-xl font-bold mb-4">{field.label}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subfields.map((subField: SubFieldType) => {
                          console.log({ subField, type: subField.type });
                          const isSubfieldVisible = hasVisibilityCondition(subField);
                          if (subField.dynamicOptions) {
                            handleDynamicOption(subField);
                          }
                          return (
                            <div key={subField.id}>
                              {!["text", "number", "select", "radio", 'date'].includes(subField.type) && (
                                <label className="text-slate-400" htmlFor="">{`${subField.label} (${subField.type})`}</label>
                              )}
                              {isSubfieldVisible && (subField.type === "text" || subField.type === "number") && (
                                <Input
                                  label={subField.label}
                                  type={subField.type}
                                  name={subField.id}
                                  value={formState[subField.id] || ""}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setFormState({
                                      ...formState,
                                      [subField.id]: event.target.value
                                    });
                                  }}
                                />
                              )}
                              {isSubfieldVisible && (subField.type === "select" && !isEmpty(subField.options) && isArray(subField.options)) && (
                                <SelectInput
                                  label={subField.label}
                                  name={subField.id}
                                  value={formState[subField.id]}
                                  options={inputDataMapper(subField.options)}
                                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                    setFormState({
                                      ...formState,
                                      [subField.id]: event.target.value
                                    });
                                  }}
                                />
                              )}
                              {isSubfieldVisible && (subField.type === "radio" && !isEmpty(subField.options) && isArray(subField.options)) && (
                                <Radio
                                  label={subField.label}
                                  name={subField.id}
                                  data={inputDataMapper(subField.options)}
                                  selectedItem={formState[subField.id]}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    console.log({ value: event.target.value })
                                    setFormState({
                                      ...formState,
                                      [subField.id]: event.target.value
                                    });
                                  }}
                                />
                              )}
                              {subField.type === 'date' && (
                                <DateInput
                                  label="Date Of Birth"
                                  date={formState.birthDate}
                                  onSelect={date => {
                                    console.log("onSelect", { date });
                                    setFormState({
                                      ...formState,
                                      birthDate: date
                                    });
                                  }}
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </section>
        )}
        <Button className="mt-4" onClick={() => { }}>Submit</Button>
      </div>
    </div>
  );
}
