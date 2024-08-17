import { LucideProps } from 'lucide-react';
import Link from 'next/link';

type Props = {
  title: string;
  active: boolean;
  icon: React.ComponentType<LucideProps>;
  href: string;
};

export default function NavBarItem({ title, icon, href, active }: Props) {
  const IconComponent = icon;
  const activeClasses = active ? 'text-gray-800' : 'text-gray-400'

  return (
    <Link href={href}>
      <div className={` w-14 flex flex-col items-center h-14 justify-center p-2 rounded-sm ${activeClasses}`}>
        <div>
          <IconComponent />
        </div>
        <div>{title}</div>
      </div>
    </Link>
  );
}
