type AnyObjectT = {
  [key: string]: any;
};

type AnyObjectOrT<ObjectT> =
  | ObjectT
  | {
      [key: string]: any;
    };

type AnyObjectOrNullT = AnyObjectT | null;
type AnyObjectOrNullOrT<ObjectT> = AnyObjectOrT<ObjectT> | null;

type AnyFunctionT = (...args: any[]) => any;
