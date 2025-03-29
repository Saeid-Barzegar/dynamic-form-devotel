

import { InputType, FieldType, FormDataItemType } from "@/types/formType";
import { getDynamicFields, hasVisibilityCondition, inputDataMapper, insuranceTypesMapper, mapColumnsToShowInTable } from "./helpers"
import { useForm } from "react-hook-form";

// Mock useForm globally
jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

describe("Helper functions:", () => {
  test("inputDataMapper", () => {
    const result = inputDataMapper(["item 1", "item 2", "item 3"]);
    expect(result).toEqual([
      { id: 0, label: "item 1", value: "item_1" },
      { id: 1, label: "item 2", value: "item_2" },
      { id: 2, label: "item 3", value: "item_3" },
    ]);
  });

  test("insuranceTypesMapper", () => {
    const mockData: FormDataItemType[] = [
      {
        formId: "form_id_1",
        title: "Form Title 1",
        fields: [
          {
            id: "personal_info",
            label: "Personal Information",
            type: "group",
            fields: [
              {
                id: "first_name",
                label: "First Name",
                type: "text",
                required: true
              },
            ],
          },
        ],
      },
      {
        formId: "form_id_2",
        title: "Form Title 2",
        fields: [
          {
            id: "personal_info",
            label: "Personal Information",
            type: "group",
            fields: [
              {
                id: "first_name",
                label: "First Name",
                type: "text",
                required: true
              },
            ],
          },
        ],
      },
    ];

    const result = insuranceTypesMapper(mockData);
    expect(result).toEqual([
        { id: 0, label: 'Form Title 1', value: 'form_id_1' },
        { id: 1, label: 'Form Title 2', value: 'form_id_2' }
      ]);
  });

});

describe("hasVisibilityCondition", () => {
  let mockWatch: any;
  beforeEach(() => {
    mockWatch = jest.fn().mockReturnValue("test value");
    (useForm as jest.Mock).mockReturnValue({
      watch: mockWatch,
      register: jest.fn(),
      handleSubmit: jest.fn(),
      setValue: jest.fn(),
      formState: { errors: {} },
    });
  });
  
  test("returns true when visibility is not defined", () => {
    const field = {
      id: "personal_info",
      label: "Personal Information",
      type: "group",
      fields: [
        {
          id: "first_name",
          label: "First Name",
          type: "text",
          required: true
        },
      ],
    } as FieldType;

    console.log("Field visibility:", field.visibility);

    const result = hasVisibilityCondition({
      field,
      watch: mockWatch,
    });


    expect(result).toBe(true);
  });

  test("returns true ", () => {
    const result = hasVisibilityCondition({
      field: {
        id: "personal_info",
        label: "Personal Information",
        type: "group",
        fields: [
          {
            id: "smoking_frequency",
            label: "How often do you smoke?",
            type: "select",
            options: [
                "Occasionally",
                "Daily",
                "Heavy"
            ],
            required: true,
            visibility: {
              dependsOn: "smoker",
              condition: "equals",
              value: "Yes"
            }
          }
        ],
      },
      watch: mockWatch,
    });
    expect(result).toBeTruthy();
  });
});

describe("getDynamicFields", () => {
  let mockFetch: any;
  let mockWatch: any;
  beforeEach(() => {
    process.env.API_BASE_URL = "http://localhost";
    mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'mocked response' }),
        headers: new Headers(),
        redirected: false,
        statusText: "OK",
        type: "basic",
        url: "",
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
      } as unknown as Response)
    );
    
    global.fetch = mockFetch;

    (useForm as jest.Mock).mockReturnValue({
      watch: mockWatch,
      register: jest.fn(),
      handleSubmit: jest.fn(),
      setValue: jest.fn(),
      formState: { errors: {} },
    });
  });

  test("should call fetch with the correct URL and headers", async () => {
    mockWatch = jest.fn().mockReturnValue("germany");

    const field: FieldType = {
      id: "state",
      label: "State",
      type: "select" as InputType,
      required: true,
      dynamicOptions: {
        dependsOn: "country",
        endpoint: "/api/endpoint",
        method: "GET",
      },
    };

    await getDynamicFields({
      field,
      watch: mockWatch,
      callback: jest.fn(),
    });

    expect(mockFetch).toHaveBeenCalled();
  });

  test("should NOT call fetch when 'dynamicOptions' is empty", async () => {
    mockWatch = jest.fn().mockReturnValue("germany");

    const field: FieldType = {
      id: "state",
      label: "State",
      type: "select" as InputType,
      required: true,
    };

    await getDynamicFields({
      field,
      watch: mockWatch,
      callback: jest.fn(),
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  test("should NOT call fetch when 'dependsOn' is empty", async () => {
    const field: FieldType = {
      id: "state",
      label: "State",
      type: "select" as InputType,
      required: true,
      dynamicOptions: {
        dependsOn: "",
        endpoint: "/api/endpoint",
        method: "GET",
      },
    };
    mockWatch = jest.fn().mockReturnValue("");

    await getDynamicFields({
      field,
      watch: mockWatch,
      callback: jest.fn(),
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  test("should NOT call fetch when wrong country name passed", async () => {
    const field: FieldType = {
      id: "state",
      label: "State",
      type: "select" as InputType,
      required: true,
      dynamicOptions: {
        dependsOn: "country",
        endpoint: "/api/endpoint",
        method: "GET",
      },
    };
    mockWatch = jest.fn().mockReturnValue("Japan");

    await getDynamicFields({
      field,
      watch: mockWatch,
      callback: jest.fn(),
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  test("should handle fetch failure", async () => {
    const field: FieldType = {
      id: "state",
      label: "State",
      type: "select" as InputType,
      required: true,
      dynamicOptions: {
        dependsOn: "country",
        endpoint: "/api/endpoint",
        method: "GET",
      },
    };

    mockWatch = jest.fn().mockReturnValue("germany");

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        json: () => Promise.resolve({ error: "server error" }),
      } as unknown as Response)
    );

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await getDynamicFields({
      field,
      watch: mockWatch,
      callback: jest.fn(),
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching dynamic field data:",
      expect.any(Error) // Ensures an error is logged
    );

    consoleErrorSpy.mockRestore(); // Restore console.error
  });
});

describe('mapColumnsToShowInTable', () => {
    test('should return an array of keys with true values', () => {
      const columnVisibility = {
        name: true,
        age: false,
        address: true,
        phone: false,
      };

      const result = mapColumnsToShowInTable(columnVisibility);
      expect(result).toEqual(['name', 'address']);
    });

    test('should return an empty array if all values are false', () => {
      const columnVisibility = {
        name: false,
        age: false,
        address: false,
      };

      const result = mapColumnsToShowInTable(columnVisibility);
      expect(result).toEqual([]);
    });

    test('should return all keys if all values are true', () => {
      const columnVisibility = {
        name: true,
        age: true,
        address: true,
      };

      const result = mapColumnsToShowInTable(columnVisibility);
      expect(result).toEqual(['name', 'age', 'address']);
    });

    test('should return an empty array for an empty input object', () => {
      const columnVisibility = {};
      const result = mapColumnsToShowInTable(columnVisibility);
      expect(result).toEqual([]);
    });
  });




