import { Archive, Check, Edit, Eye, FileSpreadsheet, House, Paperclip, Trash2 , History } from "lucide-react";
import {
  SharedTable,
  TableAction,
  TableColumn,
} from "@/components/SharedTabel";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SharedDialog } from "@/components/SharedDialog";
import { Network } from 'lucide-react';


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinedDate: string;
}
interface TableWrapperProps {
  searchable?: boolean;
}
const sampleData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    joinedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    joinedDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Moderator",
    status: "inactive",
    joinedDate: "2024-03-10",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    status: "active",
    joinedDate: "2024-04-05",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "inactive",
    joinedDate: "2024-05-12",
  },
];

export default function Table({ searchable = true }: TableWrapperProps) {
  const { t } = useTranslation();
  const [formDialog, setFormDialog] = useState(false);

  const columns: TableColumn<User>[] = [
    {
      key: "name",
      header: t("header.commercialGate"),
      sortable: true,
      className: "font-medium",
    },
    {
      key: "email",
      header: t("auth.email"),
      sortable: true,
    },
    {
      key: "role",
      header: t("role"),
      sortable: true,
      render: (user) => (
        <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
          {user.role}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (user) => (
        <Badge variant={user.status === "active" ? "default" : "outline"}>
          {user.status}
        </Badge>
      ),
    },
    {
      key: "joinedDate",
      header: "Joined Date",
      sortable: true,
    },
  ];

  const actions: TableAction<User>[] = [
    {
      key: "view",
      label: "View",
      icon: <Eye className="h-3 w-3" />,
      onClick: () => setFormDialog(true),
      className: "hover:bg-primary-50 hover:text-primary-500",
    },
    {
      key: "edit",
      label: "Edit",
      icon: <Edit className="h-3 w-3" />,
      onClick: (user) => {
        alert(`Editing user: ${user.name}`);
      },
      condition: (user) => user.status === "active",
    },
    {
      key: "delete",
      label: "Delete",
      icon: <Trash2 className="h-3 w-3" />,
      onClick: (user) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
          alert(`Deleted user: ${user.name}`);
        }
      },
      className: "hover:bg-red-50 hover:text-red-600",
      disabled: (user) => user.role === "Admin",
    },
  ];

  return (
    <div>
      <SharedTable
        data={sampleData}
        columns={columns}
        actions={actions}
        searchable={searchable}
        searchPlaceholder="Search by name, email, role, status..."
        showRowNumbers={true}
        onRowClick={(user) => console.log("Row clicked:", user)}
        emptyText="No users found"
      />
      <SharedDialog
        open={formDialog}
        onOpenChange={setFormDialog}
        title="تفاصيل الطلب ACI-2025-0029"
        // description="Fill in the details to create a new project"
        size="lg"
        footer={
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" onClick={() => setFormDialog(false)}>
              Cancel
            </Button>
          </div>
        }
      >
        <div className="mt-4 max-h-[70vh] flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4">
            <div style={{background:'var(--bg-gray-50)'}} className=" p-4 rounded-lg">
              <h5 >الحالة الحالية</h5>
              <span style={{background:'var(--color-primary-100)', color:'var(--color-primary-600)'}} className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ">
                بانتظار موافقة المستورد
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
                    <span style={{background:'var(--color-neutral-300)'}} className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 -right-3 ring-8 ring-white ">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </span>
                    <h5 >
                      موافقة المستورد
                    </h5>
                    <p style={{color:'var(--text-gray-500)'}} className="text-sm ">
                      يقوم المستورد بمراجعة طلب ACI الكامل والموافقة عليه.
                    </p>
                  </li>
                  <li className="mb-10 ltr:ml-6 rtl:mr-6">
                    <span style={{background:'var(--color-neutral-300)'}} className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 -right-3 ring-8 ring-white ">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </span>
                    <h5 >
                      مراجعة الجمارك
                    </h5>
                    <p style={{color:'var(--text-gray-500)'}} className="text-sm ">
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
                  <strong>مصدر:</strong> manba alkaher
                </p>
                <p>
                  <strong>مستورد:</strong> ramez
                </p>
                <p>
                  <strong>نوع الشحنة:</strong> FCL
                </p>
                <p>
                  <strong>مرجع مستند الشاحن:</strong> 77466464
                </p>
                <p>
                  <strong>رقم ACI:</strong>{" "}
                  <span className="font-mono">---</span>
                </p>
                <p>
                  <strong>ميناء الشحن:</strong> ميناء عدن{" "}
                </p>
                <p>
                  <strong>ميناء التفريغ:</strong> بنغازي
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
                  <thead style={{background:'var(--bg-gray-50)'}}>
                    <tr>
                      <th className="p-2 ltr:text-left rtl:text-right">
                        HS Code
                      </th>
                      <th className="p-2 ltr:text-left rtl:text-right">
                        الوصف
                      </th>
                      <th className="p-2 text-right">الطرود</th>
                      <th className="p-2 text-right">الوزن القائم (كغ)</th>
                      <th className="p-2 text-right">الوزن الصافي (كغ)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-2 font-mono">6666.8</td>
                      <td className="p-2">مواد غذائية </td>
                      <td className="p-2 text-right">1 CTN</td>
                      <td className="p-2 text-right font-mono">222 KG</td>
                      <td className="p-2 text-right font-mono">222 KG</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">2222</td>
                      <td className="p-2">3333</td>
                      <td className="p-2 text-right">1 CTN</td>
                      <td className="p-2 text-right font-mono">333 KG</td>
                      <td className="p-2 text-right font-mono">333 KG</td>
                    </tr>
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
                    <strong>قيمة البضاعة:</strong>{" "}
                    <span className="font-mono">44,444 USD</span>
                  </p>
                  <p>
                    <strong>قيمة الشحن:</strong>{" "}
                    <span className="font-mono">444 USD</span>
                  </p>
                  <p>
                    <strong>قيمة التأمين:</strong>{" "}
                    <span className="font-mono">44 USD</span>
                  </p>
                  <p>
                    <strong>المرجع البنكي:</strong>{" "}
                    <span className="font-mono">CBOL/LC/1111</span>
                  </p>
                </div>
                <div style={{background:'var(--bg-gray-50)'}} className=" p-3 rounded border">
                  <h4 className="mb-2">
                    تفاصيل بنك المستورد:{" "}
                    <span className="font-normal">الراية للاموال</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs">
                    <p>
                      <strong>رمز سويفت/BIC:</strong>{" "}
                      <span className="font-mono">xxxxxxx</span>
                    </p>
                    <p>
                      <strong>رقم الحساب:</strong>{" "}
                      <span className="font-mono">33444</span>
                    </p>
                    <p>
                      <strong>رقم الحساب المصرفي الدولي (IBAN):</strong>{" "}
                      <span className="font-mono">3444555</span>
                    </p>
                  </div>
                </div>
                <div style={{background:'var(--bg-gray-50)'}} className=" p-3 rounded border">
                  <h4 className=" mb-2">
                    تفاصيل بنك المصدر:{" "}
                    <span className="font-normal">ACB BANK</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs">
                    <p>
                      <strong>رمز سويفت/BIC:</strong>{" "}
                      <span className="font-mono">acbxxxx</span>
                    </p>
                    <p>
                      <strong>رقم الحساب:</strong>{" "}
                      <span className="font-mono">555443</span>
                    </p>
                    <p>
                      <strong>رقم الحساب المصرفي الدولي (IBAN):</strong>{" "}
                      <span className="font-mono">44444</span>
                    </p>
                  </div>
                </div>
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
                <li style={{color:'var(--text-gray-500)'}} >لا توجد مستندات مرفقة.</li>
              </ul>
            </div>
            <div className="py-4 border-b last:border-b-0">
              <h5 className=" mb-3 flex items-center">
                <span className=" me-2">
                        <History />
                </span>
                سجل الإجراءات
              </h5>
              <div className="flow-root">
                <ul className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      <div className="relative flex space-x-3 ltr:space-x-reverse">
                        <div>
                          <span style={{background:'var(--color-primary-600)'}} className="h-8 w-8 rounded-full  flex items-center justify-center ring-8 ring-white">
                            <span className=" text-base text-white">
                                  <Check />
                            </span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between flex-wrap gap-2">
                          <div>
                            <p style={{color:'var(--color-neutral-800)'}} className="text-sm  font-semibold">
                              تم إنشاء الطلب من قبل المصدر وإرساله إلى المستورد.
                            </p>
                            <p style={{color:'var(--text-gray-500)'}} className="text-xs">
                              بواسطة: manba alkaher
                            </p>
                          </div>
                          <div style={{ color: 'var(--text-gray-500)' }} className="text-sm shrink-0">
                            <time dateTime="2025-10-29T11:48:47.654793+00:00">
                              Oct 29, 2025, 2:48 PM
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
    </div>
  );
}
