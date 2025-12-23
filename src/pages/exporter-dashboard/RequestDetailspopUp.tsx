import { SharedDialog } from "@/components/SharedDialog";
import { Button } from "@/components/ui/button";
import { Archive, ArrowLeft, Check, FileSpreadsheet, House, Network, Paperclip } from "lucide-react";
import { ICreateRequestPayload } from "@/models/createRequest";
import { useTranslation } from "react-i18next";

interface Iprops {
    formDialog: boolean;
    setFormDialog: (value: boolean) => void;
    requestData: ICreateRequestPayload | null;
}

export default function RequestDetailspopUp({ formDialog, setFormDialog, requestData }: Iprops) {
    const { t } = useTranslation();

    if (!requestData) return null;

    return (
        <SharedDialog
            open={formDialog}
            onOpenChange={setFormDialog}
            title={`${t("exporterDashboard.appNumber")}: ${requestData.referenceNumber}`}
            size="lg"
            footer={
                <div className="flex w-full justify-end gap-2">
                    <Button variant="primary" onClick={() => setFormDialog(false)}>
                        {t("common.close") || "إغلاق"}
                    </Button>
                </div>
            }
        >
            <div className="mt-4 max-h-[70vh] flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 space-y-4">
                    <div style={{ background: 'var(--bg-gray-50)' }} className=" p-4 rounded-lg">
                        <h5 >{t("exporterDashboard.status")}</h5>
                        <span style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-600)' }} className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ">
                            {t(`common.${requestData.status}`)}
                        </span>
                    </div>
                    <div className="py-4 border-b last:border-b-0">
                        <h5 className=" mb-3 flex items-center">
                            <span className=" me-2">
                                <Network />
                            </span>
                            مراحل العملية
                        </h5>
                        <div className="p-4">
                            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                                <li className="mb-10 ltr:ml-6 rtl:mr-6">
                                    <span style={{ background: 'var(--color-neutral-300)' }} className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 -right-3 ring-8 ring-white ">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </span>
                                    <h5 >
                                        موافقة المستورد
                                    </h5>
                                    <p style={{ color: 'var(--text-gray-500)' }} className="text-sm ">
                                        يقوم المستورد بمراجعة طلب ACI الكامل والموافقة عليه.
                                    </p>
                                </li>
                                <li className="mb-10 ltr:ml-6 rtl:mr-6">
                                    <span style={{ background: 'var(--color-neutral-300)' }} className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 -right-3 ring-8 ring-white ">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </span>
                                    <h5 >
                                        مراجعة الجمارك
                                    </h5>
                                    <p style={{ color: 'var(--text-gray-500)' }} className="text-sm ">
                                        تراجع الجمارك الطلب وتصدر رقم ACI النهائي.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-2/3 max-h-[65vh] overflow-y-auto pr-4 space-y-4">
                    <div className="py-4 border-b last:border-b-0">
                        <h5 className=" mb-3 flex items-center">
                            <span className=" me-2">
                                <FileSpreadsheet />
                            </span>
                            بيانات عامة
                        </h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <p>
                                <strong>{t("exporterDashboard.exporter")}:</strong> {requestData.fromUserId}
                            </p>
                            <p>
                                <strong>{t("exporterDashboard.importer")}:</strong> {requestData.toUserId}
                            </p>
                            <p>
                                <strong>{t("exporterDashboard.shipmentType")}:</strong> {requestData.shipTypeId}
                            </p>
                            <p>
                                <strong>{t("exporterDashboard.appNumber")}:</strong> {requestData.referenceNumber}
                            </p>
                            <p>
                                <strong>{t("exporterDashboard.aciNumber")}:</strong>{" "}
                                <span className="font-mono">{(requestData as any).aciNumber || "---"}</span>
                            </p>
                            <p>
                                <strong>{t("exporterDashboard.shipmentPort")}:</strong> {requestData.fromPortId}
                            </p>
                            <p>
                                <strong>{t("exporterDashboard.unloadingPort")}:</strong> {requestData.toPortId}
                            </p>
                        </div>
                    </div>
                    <div className="py-4 border-b last:border-b-0">
                        <h5 className=" mb-3 flex items-center">
                            <span className=" me-2">
                                <Archive />
                            </span>
                            تفاصيل البضاعة
                        </h5>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead style={{ background: 'var(--bg-gray-50)' }}>
                                    <tr>
                                        <th className="p-2 ltr:text-left rtl:text-right">
                                            {t("exporterDashboard.hsCode")}
                                        </th>
                                        <th className="p-2 ltr:text-left rtl:text-right">
                                            {t("exporterDashboard.description")}
                                        </th>
                                        <th className="p-2 text-right">{t("exporterDashboard.parcels")}</th>
                                        <th className="p-2 text-right">{t("exporterDashboard.grossWeight")}</th>
                                        <th className="p-2 text-right">{t("exporterDashboard.netWeight")}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {requestData.requestDetails?.map((detail, index) => (
                                        <tr key={index}>
                                            <td className="p-2 font-mono">{detail.hsCode}</td>
                                            <td className="p-2">{detail.productDescription}</td>
                                            <td className="p-2 text-right">{detail.numberOfParcels} {detail.parcelType}</td>
                                            <td className="p-2 text-right font-mono">{detail.grossWeight} {detail.unitOfWeight}</td>
                                            <td className="p-2 text-right font-mono">{detail.netWeight} {detail.unitOfWeight}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="py-4 border-b last:border-b-0">
                        <h5 className=" mb-3 flex items-center">
                            <span className=" me-2">
                                <House />
                            </span>
                            البيانات المالية والبنكية
                        </h5>
                        <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <p>
                                    <strong>{t("exporterDashboard.goodsValue")}:</strong>{" "}
                                    <span className="font-mono">{(requestData as any).goodsValue || "---"} {(requestData as any).currency}</span>
                                </p>
                                <p>
                                    <strong>{t("exporterDashboard.shippingValue")}:</strong>{" "}
                                    <span className="font-mono">{(requestData as any).shippingValue || "---"}</span>
                                </p>
                                <p>
                                    <strong>{t("exporterDashboard.insuranceValue")}:</strong>{" "}
                                    <span className="font-mono">{(requestData as any).insuranceValue || "---"}</span>
                                </p>
                                <p>
                                    <strong>{t("exporterDashboard.bankReference")}:</strong>{" "}
                                    <span className="font-mono">{(requestData as any).bankReference || "---"}</span>
                                </p>
                            </div>
                            {/* Bank details would go here if available in the payload */}
                        </div>
                    </div>
                    <div className="py-4 border-b last:border-b-0">
                        <h5 className=" mb-3 flex items-center">
                            <span className=" me-2">
                                <Paperclip />
                            </span>
                            المستندات المرفقة
                        </h5>
                        <ul className="list-disc ltr:pl-5 rtl:pr-5 space-y-2">
                            <li style={{ color: 'var(--text-gray-500)' }} >لا توجد مستندات مرفقة.</li>
                        </ul>
                    </div>
                    <div className="py-4 border-b last:border-b-0">
                        <h5 className=" mb-3 flex items-center">
                            <span className=" me-2">
                                <ArrowLeft />
                            </span>
                            سجل الإجراءات
                        </h5>
                        <div className="flow-root">
                            <ul className="-mb-8">
                                <li>
                                    <div className="relative pb-8">
                                        <div className="relative flex space-x-3 ltr:space-x-reverse">
                                            <div>
                                                <span style={{ background: 'var(--color-primary-600)' }} className="h-8 w-8 rounded-full  flex items-center justify-center ring-8 ring-white">
                                                    <span className=" text-base text-white">
                                                        <Check />
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between flex-wrap gap-2">
                                                <div>
                                                    <p style={{ color: 'var(--color-neutral-800)' }} className="text-sm  font-semibold">
                                                        تم إنشاء الطلب
                                                    </p>
                                                    <p style={{ color: 'var(--text-gray-500)' }} className="text-xs">
                                                        بواسطة: {requestData.fromUserId}
                                                    </p>
                                                </div>
                                                <div style={{ color: 'var(--text-gray-500)' }} className="text-sm shrink-0">
                                                    <time dateTime={(requestData as any).createdAt}>
                                                        {(requestData as any).createdAt ? new Date((requestData as any).createdAt).toLocaleDateString() : ""}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </SharedDialog>
    );
}