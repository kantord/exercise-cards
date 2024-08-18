'use client';

import { formatDayOfWeekOrToday } from '@/lib/utils';
import { useGroupedLog } from '../stores';
import { format } from 'date-fns';



export default function LogPage() {
  const log = useGroupedLog();

  return (
    <div className="px-8 py-6">
      {log.map(({ date, values }) => {
        return (
          <div key={date.toString()} className="mb-14">
            <h2 className="mb-4 text-4xl">{formatDayOfWeekOrToday(date, false)}</h2>
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
