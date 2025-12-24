import { Button } from "@/components/ui/button";

export type TabStatus = "ISSUED" | "PENDING" | "APPROVED" | "REJECTED" | "DRAFT" | "USERS" | "ACI_TABLE";


export type DrawerMenuItem = {
  key: TabStatus;
  label: string;
  icon: React.ReactNode;
  hidden?: boolean;
};

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  hidden?: boolean;
};

function TabButton({ label, isActive, onClick, icon, hidden = false }: TabButtonProps) {
  if (hidden) return null;

  return (
    <li className="w-full list-none">
      <Button
        className="w-full justify-start"
        onClick={onClick}
        variant={
          isActive
            ? "primary"
            : "ghost"
        }
      >
        {icon}
        {label}
      </Button>
    </li>
  );
}

export default TabButton;