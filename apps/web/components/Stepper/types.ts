export type StepperProps = {
  steps: {
    text: string;
    [key: string]: any;
  }[];
  current?: number;
};
