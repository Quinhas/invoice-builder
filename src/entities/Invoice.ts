import { Replace } from 'src/utils/Replace';
import { Item } from './Item';

interface InvoiceProps {
  companyName: string;
  cnpj: string;
  issueDate: Date;
  grossValue: number;
  taxesValue: number;
  items: Item[];
  observations?: string;
}

export class Invoice {
  private readonly props: InvoiceProps;

  constructor(
    props: Replace<
      InvoiceProps,
      {
        issueDate?: Date;
        items?: Item[];
        grossValue?: number;
        taxesValue?: number;
      }
    >
  ) {
    this.props = {
      ...props,
      grossValue: props.grossValue ?? 0,
      taxesValue: props.taxesValue ?? 0,
      items: props.items ?? [],
      issueDate: props.issueDate ?? new Date(),
    };
  }

  get companyName(): string {
    return this.props.companyName;
  }

  get cnpj(): string {
    return this.props.cnpj;
  }

  get issueDate(): Date {
    return this.props.issueDate;
  }

  get grossValue(): number {
    return this.props.grossValue;
  }

  get taxesValue(): number {
    return this.props.taxesValue;
  }

  get items(): Item[] {
    return this.props.items;
  }

  get observations(): string | undefined {
    return this.props.observations;
  }
}
