import Table from "./ExporterDashboardTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SharedDialog } from "@/components/SharedDialog";
import { useTranslation } from "react-i18next";
import AddAciPopup from "./ExporterDashboardAddAciPopup";




interface Iprops {
  title: string;
  hr: React.ReactNode;
}

export default function ContentCard({ title,   hr }: Iprops) {
    const [formDialog, setFormDialog] = useState(false)
        const {t} = useTranslation()
    

  return (
    <div className="bg-white dark:bg-popover p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ">
      
      <div className="flex items-center justify-between">
        <h5
          style={{ color: "var(--color-neutral-500)", marginBottom: 0 }}
        >
          {title}
        </h5>

        <div>
            <Button variant={"primary"} onClick={() => setFormDialog(true)}>{t("loggedInHome.newRequest")}</Button>
                <SharedDialog
                    open={formDialog}
                    onOpenChange={setFormDialog}
                    title="طلب ACI جديد"
                    // description="Fill in the details to create a new project"
                    size="lg"
                    footer={
                        <div className="flex w-full justify-end gap-2">
                            {/* <Button variant="ghost" onClick={() => setFormDialog(false)}>
                                Cancel
                            </Button> */}
                            <Button variant="primary" onClick={() => setFormDialog(false)}>ارسال للموافقة</Button>
                        </div>
                    }
                >
                    {/* <div className="space-y-4">
                        <h4>Writing any jsx code</h4>
                        <p>Write any jsx code</p>
                    </div> */}
                    <AddAciPopup />
                </SharedDialog>
        </div>
      </div>
      <div className="my-6">{hr}</div>

<Table />

    </div>
  );
}
