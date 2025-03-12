"use client"
// libraries
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import get from "lodash/get";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import useFetch from "@/hooks/useFetch";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// constants
import { ENDPOINTS } from "@/constants/endpoints";
// types
import { FieldType } from "@/types/formType";
// components
import SelectInput from "@/components/SelectInput/Select";
import Input from "@/components/Input/Input";
import Radio from "@/components/Radio/Radio";
import DateInput from "@/components/DateInput/DateInput";
import Button from "@/components/Button/Button";
import CheckBoxGroup from "@/components/CheckBox/Checkbox";
import Loading from "@/components/Loading/Loading";
import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";
// helper functions
import { inputDataMapper, insuranceTypesMapper, getDynamicFields, hasVisibilityCondition } from "@/utils/helpers";
import { createValidationRules } from "@/utils/formValidation";
// elements
import { PageContainer } from "@/elements/common.element";
import { Content, FormGroup, FormSection, FormTitle, GroupContainer, GroupLabel } from "@/elements/homepage.elements";

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

  const onSubmit: SubmitHandler<FieldValues> = async (data: Record<string, string>) => {
    // stops the form from submitting if there are errors
    if (!isEmpty(errors)) {
      alert("There is some errors to check");
      return;
    }
    try {
      setIsLoading(true);
      const URL = `${API_BASE_URL}${ENDPOINTS.FORM_SUBMIT}`
      const response = await fetch(URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      /**
       * if response status is successful
       * set isLoading to false
       * show alert message to the user
       * and redirect to submissions page
       */
      if (response.ok) {
        setIsLoading(false);
        alert("Form submitted successfully");
        router.push('/submissions')
      }
    } catch (error) {
      throw new Error("Error while submitting the form", { cause: error });
    }
  };

  const [dynamicField, setDynamicField] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const insuranceTypes = useMemo(
    () => Array.isArray(data) ? insuranceTypesMapper(data) : []
    , [data]);

  const { insuranceType, smoker, country } = watch();

  /**
   * formData calculation based on the insuranceType changes
   * @returns {} || calculated formData
   */
  const formData = useMemo(() => {
    // check if data is an array and insuranceType is not empty
    if (isArray(data) && !isEmpty(insuranceType)) {
      // reset the form values for the new insuranceType form
      reset({ insuranceType });
      // clear the dynamicField
      setDynamicField([])
      // return the formData based on the insuranceType
      return data.filter(form => form.formId === insuranceType)[0];
    }
    return {};
  }, [data, insuranceType]);

  useEffect(() => {
    /**
     * smoking_frequency is dependent on the smoker field
     * if smoker is no, then smoking_frequency is not required
     * so we unregister the smoking_frequency field
     */
    if (isEmpty(smoker) || smoker === 'no') {
      unregister('smoking_frequency')
    }
  }, [smoker]);

  useEffect(() => {
    /**
     * check dynamicField and if it's not empty, 
     * means data already fetched and no need to fetch again
     * so we set isLoading to false if it's true
     */
    if (dynamicField && dynamicField.length > 0) {
      setIsLoading(false)
    }
  }, [dynamicField]);

  useEffect(() => {
    /**
     * if country changes, dynamicField will be cleared
     * to don't effect on other forms
     */
    if (dynamicField && dynamicField.length > 0) {
      setDynamicField([])
    }
  }, [country]);

  /**
   * render the form field dynamically based on the field's 
   * type, visibility, dynamicOptions, required, validation rules
   * @param field field details
   * @returns form field
   */
  const renderFormField = (field: FieldType) => {
    /**
     * get the field details
     */
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

    /**
     * create the validation rules for each field
     */
    const validationRules = createValidationRules({
      fieldId: id,
      required,
      validation
    });

    /**
     * field is visible by default
     * it can be changed based on the visibility condition
     * coming from api response after checking the form items dependency
     */
    let isFieldVisible = true;
    /**
      * check if visibility object is in field properties
      * and shows the field based on the visibility condition
      */
    if (visibility) {
      isFieldVisible = hasVisibilityCondition({ field, watch });
    };

    /**
     * some incoming fields has dynamicOptions
     * so we need to fetch the dynamic fields with an api call
     * and show the field based on the dynamicOptions condition
     * came from api response
     * if dynamicOptions is there we check the dependsOn field
     * it it has a value in form values we will call the api and set the 
     * dynamic field values to show
     */
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

    /**
     * date of birth changed handler
     * @param date date of birth in date format
     */
    const dateOfBirthChangedHandler = (date: Date | null) => setValue("dob", date);
    // get the error message for the field
    const errorMessage = get(errors, `${id}.message`, "") as string;

    return (
      <div key={id}>
        {isFieldVisible && (type === "text" || type === "number") && (
          <Input
            className="mt-6"
            label={label}
            type={type}
            name={id}
            required={required}
            register={{ ...register(id, validationRules) }}
            error={errorMessage}
          />
        )}
        {/* 
          because of api data issue in Home insurance application ty[e]
          we can't show the select input field for state because it depends on
          country field, and because country field is not in the fields list
          it doesn't show state field 
          it doesn't make sense to show states without country
          then you can't see the state fields in this insurance type
          if api includes this field it will show the state field
        */}
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
              error={errorMessage}
            />
          )}
        {isFieldVisible && (type === "radio" && isArray(options)) && (
          <Radio
            id={id}
            label={label}
            name={id}
            data={inputDataMapper(options)}
            register={{ ...register(id, validationRules) }}
            error={errorMessage}
          />
        )}
        {type === 'date' && (
          <DateInput
            className="mt-4"
            id={id}
            label="Date Of Birth"
            date={watch("dob")}
            onSelect={dateOfBirthChangedHandler}
            required={required}
            error={errorMessage}
          />
        )}
        {type === 'checkbox' && (
          <CheckBoxGroup
            label={label}
            options={inputDataMapper(options ?? [])}
            register={{ ...register(id, validationRules) }}
            error={errorMessage}
          />
        )}
      </div>
    );
  }

  if (isPending) return <Loading isLoading={isPending} />
  if (error) return <ErrorComponent />;

  return (
    <PageContainer>
      <Content>
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
            <FormSection>
              <FormTitle>{formData.title}</FormTitle>
              {formData.fields.map((field: FieldType) => {
                const subfields: FieldType[] = get(field, 'fields', []);
                return isEmpty(subfields) ? renderFormField(field) : (
                  <FormGroup key={field.id}>
                    {field.type === 'group' && (
                      <>
                        <GroupLabel>{field.label}</GroupLabel>
                        <GroupContainer>
                          {subfields.map((field: FieldType) => renderFormField(field))}
                        </GroupContainer>
                      </>
                    )
                    }
                  </FormGroup>
                )
              })}
            </FormSection>
          )}
          {watch('insuranceType') && (
            <Button type="submit" className="mt-8">Submit</Button>
          )}
        </form>
      </Content>
      {isLoading && <Loading isLoading={isLoading} />}
    </PageContainer >
  );
}
