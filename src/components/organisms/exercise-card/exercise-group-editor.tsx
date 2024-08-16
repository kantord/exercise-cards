import { Card, useCardStore, useExerciseGroups } from '@/app/stores';
import DropdownMenuLabelWithIcon from '@/components/structures/DropdownMenuLabelWithIcon';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { colorFromStringHash } from '@/lib/utils';
import { BicepsFlexed, Heart, MoveHorizontal, Pencil } from 'lucide-react';

type ExerciseGroupLabelProps = {
  value: string;
};

function ExerciseGroupLabel({ value }: ExerciseGroupLabelProps) {
  switch (value) {
    case 'cardio':
      return <DropdownMenuLabelWithIcon icon={Heart}>Cardio</DropdownMenuLabelWithIcon>;
    case 'muscle':
      return (
        <DropdownMenuLabelWithIcon icon={BicepsFlexed}>Muscle building</DropdownMenuLabelWithIcon>
      );
    case 'stretching':
      return (
        <DropdownMenuLabelWithIcon icon={MoveHorizontal}>Stretching</DropdownMenuLabelWithIcon>
      );
    default:
      throw new Error(`unknown exercise group '${value}'`);
  }
}

type Props = {
  card: Card;
};

export default function ExerciseGroupEditor({ card }: Props) {
  const { toggleGroupInCard } = useCardStore();
  const exerciseGroups = useExerciseGroups();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-wrap gap-2">
          {card.groups.length > 0 ? (
            card.groups.sort().map((tag) => (
              <div
                className="rounded-lg px-2 py-1 text-white"
                style={{
                  backgroundColor: colorFromStringHash(tag, 30),
                }}
                key={tag}
              >
                {tag}
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 rounded-lg border-2 border-gray-500 px-2 py-1 text-gray-500">
              Add muscle groups
              <Pencil size={16} />
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Edit muscle groups</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[200px]">
          {exerciseGroups.map(({ type, items }) => (
            <>
              <ExerciseGroupLabel value={type} />
              {items.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item.name}
                  checked={card.groups.includes(item.name)}
                  onCheckedChange={() => toggleGroupInCard(card.id, item.name)}
                >
                  {item.name}
                </DropdownMenuCheckboxItem>
              ))}
            </>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
