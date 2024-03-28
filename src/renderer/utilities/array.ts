type TargetAndItemT = { target: any[]; item: any };

type TargetAndKeyValueMatchT = {
  target: any[];
  matchValue: any;
  matchKey: string;
};

type ToggleInputT = TargetAndKeyValueMatchT & {
  item: any;
};

export const removeItemFromArray = (input: TargetAndItemT) => {
  return input.target.filter((_value) => {
    return _value !== input.item;
  });
};

export const removeObjectItemFromArray = (input: TargetAndKeyValueMatchT) => {
  return input.target.filter((item) => {
    return item[input.matchKey] !== input.matchValue;
  });
};

export const togglePrimitiveItemInArray = (input: TargetAndItemT) => {
  const isItemPresent = input.target.indexOf(input.item) >= 0;

  return isItemPresent
    ? removeItemFromArray(input)
    : [...input.target, input.item];
};

export const toggleObjectItemInArray = (input: ToggleInputT) => {
  const itemIndex = input.target.findIndex((item, index) => {
    return item[input.matchKey] === input.matchValue;
  });

  const isItemPresent = itemIndex >= 0;

  return isItemPresent
    ? removeObjectItemFromArray(input)
    : [...input.target, input.item];
};
