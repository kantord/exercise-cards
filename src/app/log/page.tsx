'use client';

import { groupBy, reverse, sortBy } from 'lodash';
import { useExerciseLog } from '../stores';
import { format, isToday, isYesterday, sub } from 'date-fns';

function formatDate(date: Date) {
  if (isToday(date)) {
    return 'Today';
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return format(date, 'EEEE');
}

export default function LogPage() {
  const log = useExerciseLog(1000);
  const datesToDisplay = [0, 1, 2, 3, 4, 5, 6].map((days) => sub(new Date(), { days }));

  const dateKeys = datesToDisplay.map((item) => format(item, 'MM/dd/yyyy'));

  const logByDay = groupBy(log, (item) => {
    const formattedDate = format(item.created, 'MM/dd/yyyy');

    return formattedDate;
  });

  return (
    <div className="px-8 py-6">
      {dateKeys.map((key, i) => {
        const values = reverse(sortBy(logByDay[key] ?? [], (item) => item.created));

        return (
          <div key={key} className="mb-14">
            <h2 className="mb-4 text-4xl">{formatDate(datesToDisplay[i])}</h2>
            <div>
              {values.length > 0 ? (
                values.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>{format(item.created, 'kk:mm')}</div>
                    <div>{item.card.title}</div>
                  </div>
                ))
              ) : (
                <div>No activity</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
