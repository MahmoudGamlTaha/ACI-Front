import { SharedDialog } from "@/components/SharedDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SearchableSelect } from "@/components/CustomSelect";
import Table from "./ExporterDashboardTable";


import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useLoading } from "@/contexts/LoadingContext"
import { ICreateRequestPayload } from "@/models/createRequest";
import { createRequestApi } from "@/services/create-request/createRequestService";

interface Iprops {
  title: string;
  hr: React.ReactNode;
}

interface ICountry {
  id: number;      // ← ده اللي هيتبعت
  name: string;    // ← ده اللي هيظهر
  codeChar: string;
}

// export interface AddAciInput {
//     ChargerDocumentReference: string,
//     ShippingPort: string,
//     DischargingPort: string,
//     HSCode: string,
//     description: string,
//     Parcels: string,
//     ParcelsType: string,
//     grossweight: string,
//     netweight: string,
//     goodsValue: string,
//     shippingvalue: string,
//     insurancevalue: string,
//     importerBank: string,
//     bankReference: string,
//     importerSwift: string,
//     importerAccountNumber: string,
//     importerIBAN: string,
//     exporterBank: string,
//     exporterSWIFT: string,
//     exporterAccountNumber: string,
//     exporterIBAN: string,
//     picture: string

// }

const countries: ICountry[] = [
  { id: 1, name: "United States", codeChar: "us" },
  { id: 2, name: "United Kingdom", codeChar: "uk" },
  { id: 3, name: "Canada", codeChar: "ca" },
  { id: 4, name: "Australia", codeChar: "au" },
  { id: 5, name: "Germany", codeChar: "de" },
  { id: 6, name: "France", codeChar: "fr" },
  { id: 7, name: "Japan", codeChar: "jp" },
  { id: 8, name: "India", codeChar: "in" },
];


 






export default function ContentCard({ title,   hr }: Iprops) {
    const [formDialog, setFormDialog] = useState(false)
        // const [accountType, setAccountType] = useState<"source" | "importer">(
  //   "source"
  // );
  const { control, handleSubmit } = useForm<ICreateRequestPayload>();  
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
    const [showTable, setShowTable] = useState(false);
    const navigate = useNavigate();
    const { setLoading } = useLoading();


  const handleAddClause = () => {
    setShowTable(true);
    console.log('Add Clause clicked');
  };


          const handleCreateRequest = useCallback(async (data: ICreateRequestPayload) => {
              try {
                  setLoading(true);
                  const result = await createRequestApi(data);
                  if (result?.success) {
                      localStorage.setItem("token", result.payload?.token || "");
                      navigate("/");
                      setLoading(false);
                  } else {
                      setLoading(false);
                      toast.error(result?.error || '');
                  }
              } catch (errorMsg: any) {
                  setLoading(false);
                  toast.error(errorMsg?.error || 'Something went wrong');
              }
          }, [])
      
          const onSubmit = (data: ICreateRequestPayload) => {
              handleCreateRequest(data)
          }



  return (
    <div className="bg-white dark:bg-popover p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ">
      
      <div className="flex items-center justify-between">
        <h5
          style={{ color: "var(--color-neutral-500)", marginBottom: 0 }}
        >
          {title}
        </h5>

        <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <Button type="button" variant={"primary"} onClick={() => setFormDialog(true)}>{t("loggedInHome.newRequest")}</Button>
                <SharedDialog
                    open={formDialog}
                    onOpenChange={setFormDialog}
                    title={t('exporterDashboardAddAciRequestPopup.newAciRequest')}
                    // description="Fill in the details to create a new project"
                    size="lg"
                    footer={
                        <div className="flex w-full justify-end gap-2">
                            {/* <Button variant="ghost" onClick={() => setFormDialog(false)}>
                                Cancel
                            </Button> */}
                            <Button variant="primary" type="submit" >ارسال للموافقة</Button>
                        </div>
                    }
                >
                    {/* <div className="space-y-4">
                        <h4>Writing any jsx code</h4>
                        <p>Write any jsx code</p>
                    </div> */}
                   {/* add aci popup */}
                       <div>
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
                      {t("exporterDashboardAddAciRequestPopup.partners")}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-2 items-center justify-center gap-2">
                    <div className="flex flex-col gap-2 ">
                      {/* <label className="text-sm font-medium"> 
                      {t("exporterDashboardAddAciRequestPopup.importer")}
                        
                         *</label>
                      <SearchableSelect
                        inputClassName="min-w-sm"
                        displayKey={"name"}
                        valueKey={"codeChar"}
                        options={countries}
                        value={selectedCountry}
                        onChange={(st) => setSelectedCountry(st)}
                        placeholder={
                          t('exporterDashboardAddAciRequestPopup.select')
                        }
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
                      )} */}
                      <Controller
  name="toUserId"
  control={control}
  rules={{
    required: {
      value: true,
      message: t("auth.fieldRequired"),
    },
  }}
  render={({ field, fieldState }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        {t("exporterDashboardAddAciRequestPopup.importer")} *
      </label>

      <SearchableSelect
        inputClassName="min-w-sm"
        displayKey="name"
        valueKey="id"                 // ← أهم سطر
        options={countries}
        value={countries.find(c => c.id === field.value)}
        onChange={(option) => field.onChange(option?.id)}
        placeholder={t("exporterDashboardAddAciRequestPopup.select")}
        searchPlaceholder="Search..."
        emptyText="No data found"
      />

      {fieldState.error && (
        <p className="text-sm text-red-500">
          {fieldState.error.message}
        </p>
      )}
    </div>
  )}
/>

                    </div>
                    <div className="flex flex-col gap-2 ">
                                   <Controller
  name="fromUserId"
  control={control}
 
  render={({ field, fieldState }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        {t("exporterDashboardAddAciRequestPopup.exporter")} *
      </label>

      <SearchableSelect
      disabled
        inputClassName="min-w-sm"
        displayKey="name"
        valueKey="id"                 // ← أهم سطر
        options={countries}
        value={countries.find(c => c.id === field.value)}
        onChange={(option) => field.onChange(option?.id)}
        placeholder="manba alkaher (alqhadiahmed@gmail.com)"
        searchPlaceholder="Search..."
        emptyText="No data found"
      />

      {fieldState.error && (
        <p className="text-sm text-red-500">
          {fieldState.error.message}
        </p>
      )}
    </div>
  )}
/>
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
                    <p className="text-lg font-medium  py-1 w-fit rounded"> *
                      {t("exporterDashboardAddAciRequestPopup.shipmentDetails")}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-2 items-center justify-center gap-2">
                    <div className="flex flex-col gap-2 ">
                      {/* <label className="text-sm font-medium">
                        
                          *
                        {t("exporterDashboardAddAciRequestPopup.shipmentType")}
                      </label>
                      <SearchableSelect
                        inputClassName="min-w-sm"
                        displayKey={"name"}
                        valueKey={"codeChar"}
                        options={countries}
                        value={selectedCountry}
                        onChange={(st) => setSelectedCountry(st)}
                        placeholder=
                          {t('exporterDashboardAddAciRequestPopup.seashipment')}
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
                      )} */}
                                                         <Controller
  name="shipTypeId"
  control={control}
  rules={{
    required: {
      value: true,
      message: t("auth.fieldRequired"),
    },
  }}
  render={({ field, fieldState }) => (
    <div className="flex flex-col gap-2">
     <label className="text-sm font-medium">
                        
                          *
                        {t("exporterDashboardAddAciRequestPopup.shipmentType")}
                      </label>

      <SearchableSelect
        inputClassName="min-w-sm"
        displayKey="name"
        valueKey="id"                 // ← أهم سطر
        options={countries}
        value={countries.find(c => c.id === field.value)}
        onChange={(option) => field.onChange(option?.id)}
        placeholder=
                          {t('exporterDashboardAddAciRequestPopup.seashipment')}
                        searchPlaceholder="Search countries..."
        emptyText="No data found"
      />

      {fieldState.error && (
        <p className="text-sm text-red-500">
          {fieldState.error.message}
        </p>
      )}
    </div>
  )}
/>
                    </div>
                    <Controller
                      rules={{
                        required: {
                          message: t("auth.fieldRequired"),
                          value: true,
                        },
                      }}
                      name="referenceNumber"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="referenceNumber">
                               *
                            {t("exporterDashboardAddAciRequestPopup.shipmwntFileReview")}
                          </FieldLabel>
                          <Input
                            className="bg-white"
                            {...field}
                            error={fieldState.error?.message}
                            id="referenceNumber"
                            required
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="fromPortId"
                      rules={{
                        required: {
                          message: t("auth.fieldRequired"),
                          value: true,
                        },
                      }}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="fromPortId">
                            
                              *
                            {t("exporterDashboardAddAciRequestPopup.shipmentPort")}
                          </FieldLabel>
                          <Input
                            className="bg-white"
                            {...field}
                            error={fieldState.error?.message}
                            id="fromPortId"
                            value={field.value}
                            onChange={field.onChange}
                            required
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="toPortId"
                      control={control}
                      rules={{
                        required: {
                          message: t("auth.fieldRequired"),
                          value: true,
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="toPortId">
                            
                              *
                            {t("exporterDashboardAddAciRequestPopup.unloadingPort")}
                          </FieldLabel>
                          <Input
                            className="bg-white"
                            {...field}
                            error={fieldState.error?.message}
                            id="toPortId"
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
                      *
                      {t("exporterDashboardAddAciRequestPopup.cargoDetails")}
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
                        name="requestDetails.0.hsCode"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="requestDetails.0.hsCode">
                              HS Code *
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="requestDetails.0.hsCode"
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
                               *
                              {t("exporterDashboardAddAciRequestPopup.description")}
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
                        name="requestDetails.0.numberOfParcels"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="requestDetails.0.numberOfParcels"> *
                              {t("exporterDashboardAddAciRequestPopup.parcels")}
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="requestDetails.0.numberOfParcels"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              type="number"
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="requestDetails.0.parcelType"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="requestDetails.0.parcelType">
                                *
                              {t("exporterDashboardAddAciRequestPopup.parcelsType")}
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="requestDetails.0.parcelType"
                              value={field.value}
                              onChange={field.onChange}
                              required
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="requestDetails.0.grossWeight"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="requestDetails.0.grossWeight">
                           *
                              {t("exporterDashboardAddAciRequestPopup.grossWeight")}
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="requestDetails.0.grossWeight"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              type="number"
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="requestDetails.0.netWeight"
                        rules={{
                          required: {
                            message: t("auth.fieldRequired"),
                            value: true,
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="requestDetails.0.netWeight">
                              *
                              {t("exporterDashboardAddAciRequestPopup.netWeight")}
                            </FieldLabel>
                            <Input
                              className="bg-white"
                              {...field}
                              error={fieldState.error?.message}
                              id="requestDetails.0.netWeight"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              type="number"
                            />
                          </Field>
                        )}
                      />
                    </div>
                    <Button onClick={handleAddClause} variant="primary" type="button">
    + {t("exporterDashboardAddAciRequestPopup.addClause")}
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
                    {t("exporterDashboardAddAciRequestPopup.bankInfo")}
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
                                *
                              {t("exporterDashboardAddAciRequestPopup.goodsValue")}
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
                        <label className="text-sm font-medium"> 
                          
                         *
                         {t("exporterDashboardAddAciRequestPopup.coin")}
                         </label>
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
                               {t("exporterDashboardAddAciRequestPopup.shippingValue")}
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
                               {t("exporterDashboardAddAciRequestPopup.insuranceValue")}
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
                        {t("exporterDashboardAddAciRequestPopup.importerBankDetails")}
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
                                *
                              {t("exporterDashboardAddAciRequestPopup.importerBank")}
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
                                *
                                {t("exporterDashboardAddAciRequestPopup.bankReference")}
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
                              {t("exporterDashboardAddAciRequestPopup.importerSwift")}
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
                           {t("exporterDashboardAddAciRequestPopup.importerAccountNumber")}
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
                              {t("exporterDashboardAddAciRequestPopup.importerIBAN")}
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
{t("exporterDashboardAddAciRequestPopup.exporterBankDetails")}
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
                                *
                              {t("exporterDashboardAddAciRequestPopup.exporterBank")}
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
                              {t("exporterDashboardAddAciRequestPopup.exporterSwift")}
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
                              {t("exporterDashboardAddAciRequestPopup.exporterAccountNumber")}
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
                              {t("exporterDashboardAddAciRequestPopup.exporterIBAN")}
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
                {t("exporterDashboardAddAciRequestPopup.invoice")}
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
                      
{t("exporterDashboardAddAciRequestPopup.attachFile")}
                      &nbsp;

                       (PDF, JPG, PNG)
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
    
    </div>
                </SharedDialog>
      </form>          
        </div>
      </div>
      <div className="my-6">{hr}</div>

<Table />

    </div>
  );
}
