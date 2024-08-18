'use client';

import SetsPerDayChart from './components/sets-per-day';
import SetsPerMuscleGroup from './components/sets-per-muscle-group';

export default function StatsPage() {
  return (
    <div className="px-8 py-6 gap-4 flex flex-col">
      <SetsPerDayChart />
      <SetsPerMuscleGroup />
    </div>
  );
}
