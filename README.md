<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
   
   
# API-PAGAMENTOS

## Sobre este projeto

Este projeto tem por principal objetivo o desenvolvimento de uma api de pagamentos que seráconsumida pelo front-emd commerce suite, disponivel em: https://github.com/matheusgit1/commerce-suit


## Autores

- [Matheus Alves Pereira](https://www.linkedin.com/in/matheus-alves-pereira-4b3781222/)

## Stack utilizada


**Back-end:**
Node,
Express,
nestjs,
typescript,
javascrip,
aws,
striper,
Sql,
banco de dados postgress

**Ferramentas de teste:**
jest, postman




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

no diretorio raíz copie e cole as chaves do arquivo ".env.example" em seu ".env" com os valores adequados

- exemplo
PORT = 3000



## Rodando localmente

### requisitos

nodejs na versao 15.x ou superior

pode ser baixado aqui: https://nodejs.org/pt-br/download/

verifique se o node foi instalado corretamente com o seguinte comendo no cmd ou powerShell

```bash
  node --version
```
#### em caso de comando não reconheciod, reinicie seu computador

#### baixe o aplicativo "expo" na playstore ou apple store.


####  (opcional) instale o yarn para o usar a cli do yarn
no seu cmd ou powerShell use o comando


```bash
  npm install yarn --global
```
verifique se o yarn foi instalado corretamente com o seguinte comendo no cmd ou powerShell

```bash
  yarn --version
```

Clone o projeto com o  seguinto comando no cmd, powerShell, wsl ou qualquer gerenciador
de sub sistemas de sua preferência


```bash
  git clone https://github.com/matheusgit1/api-pagamentos.git
```

Entre no diretório do projeto

```bash
  cd api-pagamentos
```

Instale as dependências

```bash
  yarn install
```

ou

```bash
  npm install
```

Inicie o servidor

```bash
  yarn start:dev
```
ou

```bash
  npm run yarn start:dev
```

## Condições iniciais

#### para o funcionamento adequado é necessario que suas variaveis de ambientes estejam corretas

# Documentação da api

a collection postman dessa api está idisponivel dentro desse repositório: em: https://github.com/matheusgit1/api-enderecos/blob/main/adress.api.docs

### variaveis

#### URL_API_PAGAMENTOS: variavel onde a api estará rodando localmente

#### TOKEN: token de auenticação (você só consegue ele na rota de login da api de dutenticação)

### Retornos padronizados

status 400 - Bad request

status 404 - Recurso não encontrado

status 500 - erro interno

stauts 200 - ok

## Rotas


#### Criar um novo recurso no contexto de pagamentos

```http
  POST /payments/create/payment
```

| Headers   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. token de autenticação - {Bearer token} |


| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `total` | `number` | **Obrigatório**. total da compra em centavos|
| `productId` | `string` | **Obrigatório**. id do produto|
| `adressId` | `string` | **Obrigatório**.  id de endereco|
| `creditCard` | `string` | **Obrigatório**.  number do cartão usado|
| `mouth` | `number` | **Obrigatório**.  mês de expiração do cartão |
| `expYear` | `number` | **Obrigatório**.  ano que o cartão expira |
| `cvc` | `number` | **Obrigatório**.  código do cartão |


#### Retorna status 201 caso tudo esteja no formato esperado e o seguinte objeto

```JSON
{
    "customer": {
        "id": "cus_MP8LMhRqNi9Qid",
        "object": "customer",
        "address": {
            "city": "linhares",
            "country": "BR",
            "line1": "avenida padre manoel da nobrega",
            "line2": "próximo ao casagrande",
            "postal_code": "29903118",
            "state": "espirito santo - ES"
        },
        "balance": 20000,
        "created": 1662779407,
        "currency": "brl",
        "default_source": null,
        "delinquent": false,
        "description": null,
        "discount": null,
        "email": "pereira.matheusalves@gmail.com",
        "invoice_prefix": "31AD25DE",
        "invoice_settings": {
            "custom_fields": null,
            "default_payment_method": null,
            "footer": null,
            "rendering_options": null
        },
        "livemode": false,
        "metadata": {},
        "name": "Matheus",
        "next_invoice_sequence": 1,
        "phone": null,
        "preferred_locales": [],
        "shipping": {
            "address": {
                "city": "linhares",
                "country": "BR",
                "line1": "avenida padre manoel da nobrega",
                "line2": "próximo ao casagrande",
                "postal_code": "29903118",
                "state": "espirito santo - ES"
            },
            "name": "Matheus",
            "phone": "27997822665"
        },
        "tax_exempt": "none",
        "test_clock": null
    },
    "payment": {
        "id": "pm_1LgK56EFSIGxbTU77vXqhIle",
        "object": "payment_method",
        "billing_details": {
            "address": {
                "city": "linhares",
                "country": "BR",
                "line1": "avenida padre manoel da nobrega",
                "line2": "próximo ao casagrande",
                "postal_code": "29903118",
                "state": "espirito santo - ES"
            },
            "email": "pereira.matheusalves@gmail.com",
            "name": "Matheus",
            "phone": "27997822665"
        },
        "card": {
            "brand": "mastercard",
            "checks": {
                "address_line1_check": "unchecked",
                "address_postal_code_check": "unchecked",
                "cvc_check": "unchecked"
            },
            "country": "IT",
            "exp_month": 3,
            "exp_year": 2028,
            "fingerprint": "IlKxc27hjHhTB2Ol",
            "funding": "prepaid",
            "generated_from": null,
            "last4": "9038",
            "networks": {
                "available": [
                    "mastercard"
                ],
                "preferred": null
            },
            "three_d_secure_usage": {
                "supported": true
            },
            "wallet": null
        },
        "created": 1662779408,
        "customer": null,
        "livemode": false,
        "metadata": {},
        "type": "card"
    }
}
```
