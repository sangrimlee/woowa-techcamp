const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_DAY * 365;

export function elapsedTime(date: string | Date) {
  const diff = timeDiff(new Date(date), new Date());

  const times = [
    { label: '년', ms: ONE_YEAR },
    { label: '개월', ms: ONE_MONTH },
    { label: '일', ms: ONE_DAY },
    { label: '시간', ms: ONE_HOUR },
    { label: '분', ms: ONE_MINUTE },
  ];

  for (const { label, ms } of times) {
    const betweenTime = Math.floor(diff / ms);

    if (0 < betweenTime) {
      return `${betweenTime}${label} 전`;
    }
  }

  return '방금 전';
}

export function timeDiff(startDate: Date, endDate: Date) {
  return endDate.getTime() - startDate.getTime();
}
