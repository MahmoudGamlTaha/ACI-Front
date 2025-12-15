import { CircleCheck, Info, X } from "lucide-react";
import toast, { LoaderIcon, resolveValue, Toaster } from "react-hot-toast";

export default function ToasterUi() {
    return (
        <Toaster
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                position: "bottom-center",
                // default style
                className: "text-white rounded-md",
                error: {
                    className: "bg-red-600 text-white text-sm",
                },
                success: {
                    className: "bg-green-600 text-white text-sm",
                },
                loading: {
                    className: "bg-blue-600 text-white text-sm",
                },
                // add warning
                custom: {
                    className: "bg-orange-600 text-white text-sm",
                },
            }}
        >
            {(t) => (
                <div
                    className={`flex items-center justify-center gap-3 rounded-md px-3 py-2
        ${t.type === "error" ? "bg-error text-white text-sm" : ""}
        ${t.type === "success" ? "bg-success text-white text-sm" : ""}
        ${t.type === "custom" ? "bg-warning text-white text-sm" : ""}
        ${t.type === "loading" ? "bg-info text-white text-sm" : ""}`}
                    style={{
                        opacity: t.visible ? 1 : 0,
                    }}
                >
                    {resolveValue(t.message, t)}
                    {t.type === "error" ? (
                        <X className="size-6 text-white-500" />
                    ) : t.type === "custom" ? (
                        <Info className="size-6 text-white-500" /> // pick any warning icon
                    ) : t.type === "loading" ? (
                        <LoaderIcon className="size-6 text-white-500 animate-spin" />
                    ) : (
                        <CircleCheck className="size-6 text-white-500" />
                    )}
                </div>
            )}
        </Toaster>
    );
}