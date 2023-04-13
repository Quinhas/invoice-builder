import { Item } from 'src/entities/Item';

import { Replace } from 'src/utils/Replace';

interface InvoiceProps {
  companyName: string;
  cnpj: string;
  issueDate: Date;
  grossValue: number;
  taxesValue: number;
  items: Item[];
  observations?: string;
}

class Invoice {
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
}

export class InvoiceBuilder {
  private companyName?: string;
  private cnpj?: string;
  private issueDate?: Date;
  private grossValue = 0;
  private taxesValue = 0;
  private items: Item[] = [];
  private observations?: string;

  public toCompany(companyName: string) {
    this.companyName = companyName;
    return this;
  }

  public withCnpj(cnpj: string) {
    this.cnpj = cnpj;
    return this;
  }

  public addItem(item: Item) {
    this.items.push(item);
    this.grossValue += item.value;
    this.taxesValue += item.value * 0.05;
    return this;
  }

  public withObservations(observations: string) {
    this.observations = observations;
    return this;
  }

  public onCurrentDate() {
    this.issueDate = new Date();
    return this;
  }

  public build() {
    if (!this.companyName) {
      throw new Error('Company name is required.');
    }

    if (!this.cnpj) {
      throw new Error('CNPJ is required.');
    }

    const invoice = new Invoice({
      cnpj: this.cnpj,
      companyName: this.companyName,
      grossValue: this.grossValue,
      issueDate: this.issueDate,
      items: this.items,
      observations: this.observations,
      taxesValue: this.taxesValue,
    });

    return invoice;
  }
}
