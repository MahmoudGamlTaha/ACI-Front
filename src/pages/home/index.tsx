import ForwhoSection from "./ForWhoSection";
import ForWhoTitle from "./ForWhoTitle";
import GlobalTradeSection from "./GlobalTradeSection";
import GlobalTradeTitle from "./GlobalTradeTitle";
import Header from "./Header";
import Poster from "./Poster";
import SectionTitles from "./SectionTitles";
import SystemWork from "./SystemWork";
import VervicationSection from "./VervicationSection";
import { SharedTable, TableAction, TableColumn } from "@/components/SharedTabel";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { SharedDialog } from "@/components/SharedDialog";
import { SearchableSelect } from "@/components/CustomSelect";
import { Edit, Eye, Trash2 } from "lucide-react";

interface User {
    id: number
    name: string
    email: string
    role: string
    status: "active" | "inactive"
    joinedDate: string
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
]

const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "angular", label: "Angular" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "nuxt", label: "Nuxt.js" },
]
interface ICountry {
    name: string;
    codeChar: string;
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
]

export default function Home() {
    const { t } = useTranslation()
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [formDialog, setFormDialog] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState<ICountry>()

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
            render: (user) => <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>,
        },
        {
            key: "status",
            header: "Status",
            sortable: true,
            render: (user) => <Badge variant={user.status === "active" ? "default" : "outline"}>{user.status}</Badge>,
        },
        {
            key: "joinedDate",
            header: "Joined Date",
            sortable: true,
        },
    ]

    const actions: TableAction<User>[] = [
        {
            key: "view",
            label: "View",
            icon: <Eye className="h-3 w-3" />,
            onClick: (user) => {
                setSelectedUser(user)
                alert(`Viewing user: ${user.name}`)
            },
            className: "hover:bg-primary-50 hover:text-primary-500",
        },
        {
            key: "edit",
            label: "Edit",
            icon: <Edit className="h-3 w-3" />,
            onClick: (user) => {
                alert(`Editing user: ${user.name}`)
            },
            condition: (user) => user.status === "active",
        },
        {
            key: "delete",
            label: "Delete",
            icon: <Trash2 className="h-3 w-3" />,
            onClick: (user) => {
                if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                    alert(`Deleted user: ${user.name}`)
                }
            },
            className: "hover:bg-red-50 hover:text-red-600",
            disabled: (user) => user.role === "Admin",
        },
    ]

    return (
        <div>
            <div className="bg-background p-2 rounded-lg my-4 shadow-lg">
                <Button variant={"primary"} onClick={() => setFormDialog(true)}>Create New Project</Button>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-medium">Select Country</label>
                    <SearchableSelect
                        inputClassName="min-w-sm"
                        displayKey={"name"}
                        valueKey={"codeChar"}
                        options={countries}
                        value={selectedCountry}
                        onChange={(st) => setSelectedCountry(st)}
                        placeholder="Choose a country..."
                        searchPlaceholder="Search countries..."
                        emptyText="No country found."
                    />
                    {selectedCountry && (
                        <p className="text-sm text-muted-foreground">
                            Selected: <span className="font-medium text-foreground">{selectedCountry.name}</span>
                        </p>
                    )}
                </div>
                <SharedDialog
                    open={formDialog}
                    onOpenChange={setFormDialog}
                    title="Create New Project"
                    description="Fill in the details to create a new project"
                    size="md"
                    footer={
                        <div className="flex w-full justify-end gap-2">
                            <Button variant="ghost" onClick={() => setFormDialog(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => setFormDialog(false)}>Create Project</Button>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        <h4>Writing any jsx code</h4>
                        <p>Write any jsx code</p>
                    </div>
                </SharedDialog>
                <SharedTable
                    data={sampleData}
                    columns={columns}
                    actions={actions}
                    searchable={true}
                    searchPlaceholder="Search by name, email, role, status..."
                    showRowNumbers={true}
                    onRowClick={(user) => console.log("Row clicked:", user)}
                    emptyText="No users found"
                />
            </div>

            <Poster />
            <Header />
            <SectionTitles />
            <SystemWork />
            <GlobalTradeTitle />
            <GlobalTradeSection />
            <ForWhoTitle />
            <ForwhoSection />
            <VervicationSection />
        </div>
    );
}