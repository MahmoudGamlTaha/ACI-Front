import { Button } from "@/components/ui/button";

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
};

function TabButton({ label, isActive, onClick , icon }: TabButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={
        isActive
          ? "default"
          : "ghost"
      }

    >
      {icon}
      {label}
    </Button>
  );
}

export default TabButton;