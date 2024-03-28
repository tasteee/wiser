type TargetAndItemT = { target: any[]; item: any };

type TargetItemAndUniqueKeyT = {
  target: any[];
  item: AnyObjectT;
  uniqueKey: string;
};

export const removeItemFromArray = (input: TargetAndItemT) => {
  return input.target.filter((_value) => {
    return _value !== input.item;
  });
};

export const removeObjectItemFromArray = (input: TargetItemAndUniqueKeyT) => {
  return input.target.filter((item) => {
    return item[input.uniqueKey] !== input.item[input.uniqueKey];
  });
};

export const togglePrimitiveItemInArray = (input: TargetAndItemT) => {
  const isItemPresent = input.target.indexOf(input.item) >= 0;

  return isItemPresent
    ? removeItemFromArray(input)
    : [...input.target, input.item];
};

export const toggleObjectItemInArray = (input: TargetItemAndUniqueKeyT) => {
  const itemIndex = input.target.findIndex((item, index) => {
    return item[input.uniqueKey] === input.item[input.uniqueKey];
  });

  const isItemPresent = itemIndex >= 0;

  return isItemPresent
    ? removeObjectItemFromArray(input)
    : [...input.target, input.item];
};
