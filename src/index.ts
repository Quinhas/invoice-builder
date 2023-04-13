import { InvoiceBuilder } from './builders/InvoiceBuilder';
import { Item } from './entities/Item';

/**
 * Cálculo de orçamento
 * @namespace Development and Design Patterns
 *
 * @author Felipe Amaral - 601101
 * @author Jose Vicente - 609684
 * @author Lucas Santana - 601314
 * @author Luis Fernando - 579017
 * @author Matheus Colombo - 609307
 */
async function app() {
  const invoiceBuilder = new InvoiceBuilder();

  const invoice = invoiceBuilder
    .toCompany('UNIVEM')
    .withCnpj('123.456.789/0001-10')
    .addItem(new Item({ desc: 'Item 1', value: 100 }))
    .addItem(new Item({ desc: 'Item 2', value: 200 }))
    .addItem(new Item({ desc: 'Item 3', value: 300 }))
    .withObservations('entregar nf pessoalmente')
    .onCurrentDate()
    .build();

    console.log(invoice);
}

app();
