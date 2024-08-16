import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { LucideProps } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  icon: React.ComponentType<LucideProps>;
};

export default function DropdownMenuLabelWithIcon({ icon, children }: Props) {
  const IconComponent = icon;

  return (
    <DropdownMenuLabel>
      <div className="flex items-center">
        <div>
          <IconComponent className="mr-2 h-3 w-3" />
        </div>
        <div>{children}</div>
      </div>
    </DropdownMenuLabel>
  );
}
