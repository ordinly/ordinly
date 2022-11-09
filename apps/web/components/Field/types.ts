export type FieldValidator = (
  value: any,
  allValues: { [key: string]: any }
) => (undefined | string) | (Promise<undefined> | Promise<string>);

export type onChangeHandler = (value: any) => void;

export type FieldProps = {
  name: string;
  validate?: FieldValidator | FieldValidator[];
  component: any;
  onChange?: onChangeHandler;
  title?: string;
  inline?: boolean;
  initialValue?: any;
  type?: string;
  required?: boolean;
  helper?: string;
} & { [key: string]: any };
