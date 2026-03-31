export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
export const listToUUID = (list: string[]) => {
  return list.map((v) => ({
    item: v,
    UUID: generateUUID()
  }))
}
export const UUIDToItem = (UUID: string, list: ReturnType<typeof listToUUID>) => {
  const r = list.find((v) => v.UUID === UUID)?.item
  if (r)
    return r;
  else
    return ''
}
