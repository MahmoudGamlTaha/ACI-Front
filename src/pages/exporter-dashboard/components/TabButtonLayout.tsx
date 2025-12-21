import { Button } from "@/components/ui/button";

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
};

function TabButton({ label, isActive, onClick, icon }: TabButtonProps) {
  return (
    <Button
      // className="w-full"
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
  );
}

export default TabButton;