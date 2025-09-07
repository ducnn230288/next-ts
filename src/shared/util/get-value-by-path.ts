export const getValueByPath = ({
  obj,
  path,
  backStep = 0,
}: {
  obj: Record<string, unknown>;
  path: string;
  backStep?: number;
}): unknown => {
  const keys = path
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.');

  const finalKeys = backStep > 0 ? keys.slice(0, -backStep) : keys;

  return finalKeys.reduce<unknown>(
    (acc, key) =>
      acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined,
    obj,
  );
};
