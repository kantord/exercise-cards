import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, Cell, LabelList, XAxis } from 'recharts';
import { reverse, sortBy } from 'lodash';
import { ExerciseGroupName, exerciseGroups, useGroupedLog } from '@/app/stores';
import { colorFromStringHash } from '@/lib/utils';

export default function SetsPerMuscleGroup() {
  const log = useGroupedLog();
  const setsPerDay = reverse(log.map(({ date, values }) => ({ date, count: values.length })));
  const config = {};
  const dataPerMuscleGroup: Record<ExerciseGroupName, number> = Object.fromEntries(
    exerciseGroups.map((group) => [group.name, 0]),
  );

  for (const { values } of log) {
    for (const logItem of values) {
      for (const group of logItem.card.groups) {
        dataPerMuscleGroup[group]++;
      }
    }
  }
  const unsortedData = Object.entries(dataPerMuscleGroup).map(([group, count]) => ({
    group,
    count,
  }));
  const data = sortBy(unsortedData, (item) => -item.count);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Sets per muscle group</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[1000px]">
          <BarChart data={data} layout="vertical" barSize={8} barGap={8}>
            <Bar dataKey="count">
              {data.map((item) => (
                <Cell key={item.group} fill={colorFromStringHash(item.group, 80)} />
              ))}
              <LabelList dataKey="count" position="right" fill="#000" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
