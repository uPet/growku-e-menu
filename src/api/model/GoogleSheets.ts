import { Option } from "../../model/configurations";

export type SheetsResponse = {
  range: string;
  majorDimension: string;
  values: Option[][];
};
