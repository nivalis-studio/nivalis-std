export const truncate = (
  str: string,
  max?: number,
  end = '...' as string,
): string => {
  if (max === 0) {
    return end;
  }

  if (!max || str.length <= max) {
    return str;
  }

  if (max <= end.length) {
    return end;
  }

  return str.slice(0, max - end.length) + end;
};

const maxChars = 2;

export const truncateMiddle = (
  str: string,
  max?: number,
  end = '...' as string,
): string => {
  if (max === 0) {
    return end;
  }

  if (!max || str.length <= max) {
    return str;
  }

  if (max <= end.length) {
    return end;
  }

  return (
    str.slice(0, Math.round((max - end.length) / maxChars)) +
    end +
    str.slice(str.length - Math.floor((max - end.length) / maxChars))
  );
};
