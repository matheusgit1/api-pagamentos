import {
  IsCreditCard,
  IsNumber,
  IsString,
  Length,
  IsUUID,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNumber({}, { message: 'total deve ser um valor numérico' })
  total: number;

  @IsUUID('all', { message: 'id de produto deve ser um formato valido' })
  productId: string;

  @IsUUID('all', { message: 'id de endereçamento deve ser um formato valido' })
  adressId: string;

  @IsCreditCard({ message: 'cartão de crédito deve ser um valor válido' })
  creditCard: string;

  @IsNumber(
    { allowInfinity: false },
    { message: 'mês de validade deve ser um valor válido' },
  )
  mouth: number;

  @IsNumber(
    { allowInfinity: false },
    { message: 'ano de validade deve ser um valor válido' },
  )
  expYear: number;

  @IsNumber({}, { message: 'cvc de validade deve ser um valor numérico' })
  cvc: number;
}
