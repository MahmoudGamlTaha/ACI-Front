import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SearchableSelect } from "@/components/CustomSelect";

interface ICountry {
  name: string;
  codeChar: string;
}
export interface AddAciInput {
    ChargerDocumentReference: string,
    ShippingPort: string,
    DischargingPort: string,
    HSCode: string,
    description: string,
    Parcels: string,
    ParcelsType: string,
    grossweight: string,
    netweight: string,
    goodsValue: string,
    shippingvalue: string,
    insurancevalue: string,
    importerBank: string,
    bankReference: string,
    importerSwift: string,
    importerAccountNumber: string,
    importerIBAN: string,
    exporterBank: string,
    exporterSWIFT: string,
    exporterAccountNumber: string,
    exporterIBAN: string,
    picture: string

}

const countries: ICountry[] = [
  { name: "United States", codeChar: "us" },
  { name: "United Kingdom", codeChar: "uk" },
  { name: "Canada", codeChar: "ca" },
  { name: "Australia", codeChar: "au" },
  { name: "Germany", codeChar: "de" },
  { name: "France", codeChar: "fr" },
  { name: "Japan", codeChar: "jp" },
  { name: "India", codeChar: "in" },
];
export default function AddAciPopup() {
  const [accountType, setAccountType] = useState<"source" | "importer">(
    "source"
  );
  const { control, handleSubmit } = useForm<AddAciInput>();
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();

  const onSubmit = (data: AddAciInput) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-full ">
          <div className=" mx-auto">
            {/* Timeline Container */}
            <div className="relative mb-5 p-4 border rounded-lg">
              {/* Timeline items */}
              <div className="space-y-10">
                <div className="relative ">
                  {/* Date */}
                  <div className="mb-3">
                    <p className="text-lg font-medium  py-1 w-fit rounded">
                      الاطراف
                    </p>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-2 items-center justify-center gap-2">
                    <div className="flex flex-col gap-2 ">
                      <label className="text-sm font-medium"> مستورد *</label>
                      <SearchableSelect
                        inputClassName="min-w-sm"
                        displayKey={"name"}
                        valueKey={"codeChar"}
                        options={countries}
                        value={selectedCountry}
                        onChange={(st) => setSelectedCountry(st)}
                        placeholder="اختر..."
                        searchPlaceholder="Search countries..."
                        emptyText="No country found."
                      />
                      {selectedCountry && (
                        <p className="text-sm text-muted-foreground">
                          Selected:{" "}
                          <span className="font-medium text-foreground">
                            {selectedCountry.name}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <label className="text-sm font-medium">مصدر *</label>
                      <SearchableSelect
                        disabled
                        inputClassName="min-w-sm"
                        displayKey={"name"}
                        valueKey={"codeChar"}
                        options={countries}
                        value={selectedCountry}
                        onChange={(st) => setSelectedCountry(st)}
                        placeholder="manba alkaher (alqhadiahmed@gmail.com)"
                        searchPlaceholder="Search countries..."
                        emptyText="No country found."
                      />
                      {selectedCountry && (
                        <p className="text-sm text-muted-foreground">
                          Selected:{" "}
                          <span className="font-medium text-foreground">
                            {selectedCountry.name}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mb-5 p-4 border rounded-lg">
              {/* Timeline items */}
              <div className="space-y-10">
                <div className="relative ">
                  {/* Date */}
                  <div className="mb-3">
                    <p className="text-lg font-medium  py-1 w-fit rounded">
                      تفاصيل الشحنة
                    </p>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-2 items-center justify-center gap-2">
                    <div className="flex flex-col gap-2 ">
                      <label className="text-sm font-medium">
                        {" "}
                        نوع الشحنة *
                      </label>
                      <SearchableSelect
                        inputClassName="min-w-sm"
                        displayKey={"name"}
                        valueKey={"codeChar"}
                        options={countries}
                        value={selectedCountry}
                        onChange={(st) => setSelectedCountry(st)}
                        placeholder="بحري (حاوية كاملة)"
                        searchPlaceholder="Search countries..."
                        emptyText="No country found."
                      />
                      {selectedCountry && (
                        <p className="text-sm text-muted-foreground">
                          Selected:{" "}
                          <span className="font-medium text-foreground">
                            {selectedCountry.name}
                          </span>
                        </p>
                      )}
                    </div>
                    <Controller
                      rules={{
                        required: {
                          message: t("auth.fieldRequired"),
                          value: true,
                        },
                      }}
                      name="ChargerDocumentReference"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="ChargerDocumentReference">
                            مرجع مستند الشاحن *
                          </FieldLabel>
                          <Input
                            className="bg-white"
                            {...field}
                            error={fieldState.error?.message}
                            id="ChargerDocumentReference"
                            required
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="ShippingPort"
                      rules={{
                        required: {
                          message: t("auth.fieldRequired"),
                          value: true,
                        },
                      }}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="ShippingPort">
                            ميناء الشحن *
                          </FieldLabel>
                          <Input
                            className="bg-white"
                            {...field}
                            error={fieldState.error?.message}
                            id="ShippingPort"
                            value={field.value}
                            onChange={field.onChange}
                            required
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="DischargingPort"
                      control={control}
                      rules={{
                        required: {
                          message: t("auth.fieldRequired"),
                          value: true,
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="DischargingPort">
                            ميناء التفريغ
                          </FieldLabel>
                          <Input
                            className="bg-white"
                            {...field}
                            error={fieldState.error?.message}
                            id="DischargingPort"
                            value={field.value}
                            onChange={field.onChange}
                            required
                          />
                        </Field>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mb-5 p-4 border rounded-lg">
              {/* Timeline items */}
              <div className="space-y-10">
                <div className="relative ">
                  {/* Date */}
                  <div className="mb-3">
                    <p className="text-lg font-medium  py-1 w-fit rounded">
                      تفاصيل البضاعة
                    </p>
                  </div>

                  {/* Content */}
                  <div
                    style={{ background: "var(--color-neutral-50)" }}
                    className="items-center justify-center   p-4 rounded-md border space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="HSCode"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="HSCode">
                              HS Code *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="HSCode"
                              required
                            />
                          </Field>
                        )}
                      />
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="description"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="description">
                              الوصف *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="description"
                              required
                            />
                          </Field>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <Controller
                        name="Parcels"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="Parcels">الطرود *</FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="Parcels"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              type="number"
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="ParcelsType"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="ParcelsType">
                              نوع الطرد *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="ParcelsType"
                              value={field.value}
                              onChange={field.onChange}
                              required
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="grossweight"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="grossweight">
                              الوزن القائم (كغ) *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="grossweight"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              type="number"
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="netweight"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="netweight">
                              الوزن الصافي (كغ) *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="netweight"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              type="number"
                            />
                          </Field>
                        )}
                      />
                    </div>
                    <Button variant="primary" type="submit">
                      + اضفة بند{" "}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mb-5 p-4 border rounded-lg">
              {/* Timeline items */}
              <div className="space-y-10">
                <div className="relative ">
                  {/* Date */}
                  <div className="mb-3">
                    <p className="text-lg font-medium  py-1 w-fit rounded">
                      المعلومات المالية والبنكية
                    </p>
                  </div>

                  {/* Content */}
                  <div className="items-center justify-center   space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                      <Controller
                        name="goodsValue"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="goodsValue">
                              قيمة البضاعة *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="goodsValue"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              type="number"
                            />
                          </Field>
                        )}
                      />

                      <div className="flex flex-col gap-2 ">
                        <label className="text-sm font-medium"> العملة *</label>
                        <SearchableSelect
                          inputClassName="min-w-sm"
                          displayKey={"name"}
                          valueKey={"codeChar"}
                          options={countries}
                          value={selectedCountry}
                          onChange={(st) => setSelectedCountry(st)}
                          placeholder="USD"
                          searchPlaceholder="Search countries..."
                          emptyText="No country found."
                        />
                        {selectedCountry && (
                          <p className="text-sm text-muted-foreground">
                            Selected:{" "}
                            <span className="font-medium text-foreground">
                              {selectedCountry.name}
                            </span>
                          </p>
                        )}
                      </div>

                      <Controller
                        name="shippingvalue"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="shippingvalue">
                              قيمة الشحن
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="shippingvalue"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              type="number"
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="insurancevalue"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="insurancevalue">
                              قيمة التامين
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="insurancevalue"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              type="number"
                            />
                          </Field>
                        )}
                      />
                    </div>
                    <hr />
                    <div className="mb-3">
                      <p className="text-lg font-medium  py-1 w-fit rounded">
                        تفاصيل بنك المستورد
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="importerBank"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="importerBank">
                              بنك المستورد *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="importerBank"
                              required
                            />
                          </Field>
                        )}
                      />
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="bankReference"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="bankReference">
                              المرجع البنكي *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="bankReference"
                              required
                            />
                          </Field>
                        )}
                      />
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="importerSwift"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="importerSwift">
                              رمز سويفت/BIC للمستورد
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="importerSwift"
                              required
                            />
                          </Field>
                        )}
                      />
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="importerAccountNumber"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="importerAccountNumber">
                              رقم حساب المستورد
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="importerAccountNumber"
                              required
                            />
                          </Field>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="importerIBAN"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="importerIBAN">
                              IBAN المستورد
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="importerIBAN"
                              required
                            />
                          </Field>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <p className="text-lg font-medium  py-1 w-fit rounded">
                        تفاصيل بنك المصدر
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="exporterBank"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="exporterBank">
                              بنك المصدر *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="exporterBank"
                              required
                            />
                          </Field>
                        )}
                      />
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="exporterSWIFT"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="exporterSWIFT">
                              رمز سويفت/BIC للمصدر
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="exporterSWIFT"
                              required
                            />
                          </Field>
                        )}
                      />
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="exporterAccountNumber"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="exporterAccountNumber">
                              رقم حساب المصدر
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="exporterAccountNumber"
                              required
                            />
                          </Field>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <Controller
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        name="exporterIBAN"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="exporterIBAN">
                              IBAN المصدر
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="exporterIBAN"
                              required
                            />
                          </Field>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg false">
              <h4 className="font-semibold mb-3 ">
                فاتورة مبدئية
              </h4>

              <Controller
                rules={{
                  required: { message: t("auth.fieldRequired"), value: true },
                }}
                name="picture"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="picture">
                      إرفاق ملف (PDF, JPG, PNG)
                    </FieldLabel>
                    <Input
                      {...field}
                      error={fieldState.error?.message}
                      id="picture"
                      required
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="block w-full text-sm
          file:mr-4 file:py-2 
         file:px-4 file:rounded-full file:border-0
         cursor-pointer border-0
            file:bg-cyan-100  
             "
                    />
                  </Field>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
