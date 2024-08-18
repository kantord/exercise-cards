import { ChartSpline, Logs, MessageCircleQuestion, Rows4 } from 'lucide-react';
import NavBarItem from './navbar-item';

type Props = {
  active: 'cards' | 'log' | 'stats' | 'help';
};

export default function NavBar({ active }: Props) {
  return (
    <div className="fixed bottom-0 h-16 w-full border-t-2 bg-white">
      <div className="mx-auto max-w-[800px]">
        <div className="flex flex-row gap-2 px-8 py-1 justify-between">
          <NavBarItem icon={Rows4} title="Cards" active={active === 'cards'} href="/" />
          <NavBarItem icon={Logs} title="Log" active={active === 'log'} href="/log" />
          <NavBarItem icon={ChartSpline} title="Stats" active={active === 'stats'} href="/stats" />
          <NavBarItem icon={MessageCircleQuestion} title="Help" active={active === 'help'} href="/help" />
        </div>
      </div>
    </div>
  );
}
