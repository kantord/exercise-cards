import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, LabelList, XAxis } from 'recharts';
import { reverse } from 'lodash';
import { formatDayOfWeekOrToday } from '@/lib/utils';
import { useGroupedLog } from '@/app/stores';

export default function SetsPerDayChart() {
  const log = useGroupedLog();
  const setsPerDay = reverse(log.map(({ date, values }) => ({ date, count: values.length })));
  const config = {};

  return (
    <Card>
      <CardHeader>
        <CardDescription>Number of sets completed per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={setsPerDay}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => formatDayOfWeekOrToday(value, true)}
            />
            <Bar dataKey="count">
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
