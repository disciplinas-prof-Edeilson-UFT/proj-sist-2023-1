Essa é a documentação oficial para acessar as rotas da api.

## Url Base

```
https://lisense-api.onrender.com
```

## Rotas de Autenticação

### Sign-up
---
- rota: /authentication/signup
- método: POST
- body:

```json
{
	"fist_name": "John",
	"last_name": "Doe",
	"email": "johndoe@mail.com",
	"password": "johndoepassword"
}
```

- Response em caso de sucesso:

```json
{
	"message": "user created successfully"
}
```

- Caso já exista uma conta com aquele email:

```json
{
	"message": "email already used"
}
```

### Confirmação de email
---
Após a criação da conta, em caso de sucesso, mande uma requisição para a rota de confirmação de email:
- rota: /authentication/email
- método: POST
- body:

```json
{
	"email": "johndoe@mail.com"
}
```

- Response:

```json
{
	"message": "received"
}
```

Você receberá um link no seu email para acessar. Após clicar no link, em caso de sucesso, você receberá a mensagem "email successfully verified". Em caso de erro, receberá "a error occurred".

### Sign-in
---
- rota: /authentication/signin
- método: POST
- body:

```json
{
	"email": "johndoe@mail.com",
	"password": "johndoepassword"
}
```

- Response em caso de sucesso:

```json
{
	"email": "johndoe@mail.com",
	"first_name": "John",
	"id": "641e3a4c6f968499d9d7e2d6",
	"is_verified": true,
	"last_name": "Doe",
	"document_type": "cpf",
	"is_seller": true,
	"products": [
		{
			"description": "descrição de livro",
			"id": "6449ccdb4dca0c0e2ee21fe8",
			"name": "pitomba",
			"price": 1.0
		}
	],
	"social_name": "John empresas",
	"user_document": "12345678910"
}
}
```

- Response em caso de erro:

```json
{
	"message": "invalid login credentials"
}
```

### Recuperação de senha
---
Em um primeiro momento, vai ser enviado um email de confirmação:
- rota: /authentication/email/recovery
- método: POST
- body:

```json
{
	"email": "johndoe@mail.com"
}
```

- Response:

```json
{
	"message": "received"
}
```

Clicando no link passado para o email (um link que vai direcionar para uma página do front-end), mandar as novas informações para a rota:
- rota: /authentication/recovery
- método: POST
- body:

```json
{
	"email": "johndoe@mail.com",
	"password": "newpassword"
}
```

- Response em caso de sucesso:

```json
{
	"message": "updated with success"
}
```

- Response em caso de erro:

```json
{
	"message": "user not found"
}
```

## Rotas de Usuário

### Atualizar um usuário
---
- rota: /users/<id-do-usuário>
- método: PATCH
- body:

```json
{
	"first_name": "Maria",
	"last_name": "Laste",
	"email": "marialaste@email.com"
}
```

Response em caso de sucesso:

```json
{
	"message": "updated with success"
}
```

Response em caso de usuário não encontrado:

```json
{
	"message": "not found"
}
```

### Adicionar um cartão de um usuário
---
- rota: /users/<id-do-usuário>/cards
- método: POST
- body:

```json
{
	"owner_name": "John Doe",
	"card_number": "123456789",
	"expiration_date": "05/25"
}
```

Response em caso de sucesso:

```json
{
	"message": "card added successfully"
}
```

Response em caso de usuário não encontrado:

```json
{
	"message": "not found"
}
```

### Se tornar usuário vendedor
---
- rota: /users/<id-do-usuário>/seller
- método: POST
- body:

```json
{
	"social_name": "John empresas",
	"user_document": "12345678910",
	"document_type": "cpf"
}
```

- O document type pode ser o cpf ou cnpj do usuário

- Response em caso de sucesso:

```json
{
	"message": "updated with success"
}
```

- Response em caso de usuário não existente:

```json
{
	"message": "not found"
}
```

### Adicionar produto
---
- rota: /users/<id-do-usuário>/products
- método: POST
- body:

```json
{
	"description": "descrição de livro",
	"name": "livro",
	"price": 1.0,
	"photo": "urldafoto.com",
	"categories": [
		"6465115c53048c186d1cc919"
	],
	"type": "document"
}
```

- Reponse em caso de sucesso:

```json
{
	"message": "product added successfully"
}
```

- Response em caso de usuário não existente:

```json
{
	"message": "not found"
}
```

- Response em caso de usuário não vendedor:

```json
{
	"message": "not allowed"
}
```

### Adicionar ao carrinho
---
- rota: /users/<id-do-usuário>/cart
- método: PATCH
- body:

```json
{
	"products": [
		"646511c19a42b4ad61547aa3"
	]
}
```

- Reponse em caso de sucesso:

```json
{
	"message": "created successfully"
}
ou
{
	"message": "added successfully"
}
```

- Response em caso de usuário não existente:

```json
{
	"message": "not found"
}
```

### Ver cateira do usuário (cartões na plataforma)
---
- rota: /users/{id-do-usuário}/cards
- método: GET

- Reponse em caso de sucesso:

```json
[
	{
		"card_number": "6789 - os 4 últimos números do cartão",
		"expiration_date": "05/25",
		"id": "6465293780418a261eccd079",
		"owner_name": "Edinho"
	}
]
```

- Response em caso de usuário não existente:

```json
{
	"message": "user not found"
}
```

### Ver histórico de pagamento
---
- rota: /users/{id-do-usuário}/invoices
- método: GET

- Reponse em caso de sucesso:

```json
[
	{
		"amount": 1.0,
		"card_id": "None",
		"created_at": "2023-05-17T15:59:32",
		"id": "64652414d33faea46875b7a4",
		"order_id": "64652414d33faea46875b7a4",
		"status": "created",
		"type": "pix",
		"user_id": "64650d33b66a76b9b33be7f1"
	}
]
```

- Response em caso de usuário não existente:

```json
{
	"message": "user not found"
}
```

## Rotas de Produto

### Buscar produtos
---
- rota: /products
- método: GET
- query param: ?search=<característica-que-deseja-buscar>
	- ex: /products?search=livro

Response:

```json
[
	{
		"description": "descrição de livro",
		"id": "64333dc72e1521220339c950",
		"name": "livro",
		"price": 1.0
	},
	{
		"description": "descrição de livro 2",
		"id": "64333df02e1521220339c951",
		"name": "livro 2",
		"price": 1.0
	}
]
```

Caso a response seja um array vazio, não houve nenhum registro encontrado com as características enviadas.

### Editar produto
---
- rota: /products/{id-do-produto}
- método: PATCH
- body

```json
{
	"description": "descrição de livro",
	"name": "livro",
	"price": 1.0,
	"photo": "urldafoto.com"
}
```

- Response em caso de sucesso:

```json
{
	"message": "updated with success"
}
```

- Response em caso de produto não existente:

```json
{
	"message": "not found"
}
```

## Rotas de Pagamento
---
Todo sistema de pagamento segue um fluxo:
- Os produtos são adicionados ao carrinho;
- É feito um "pedido" com base no carrinho, onde é somado os produtos;
- É feito uma "fatura" com base no pedido;
- Por fim, a fatura é atualizada para ser paga;

### Criar um pedido
---
- rota: /orders/{id-do-carrinhodecompra}
- método: POST

- Response em caso de sucesso:

```json
{
	"order_id": "6465130d3430798f39ddd5d3"
}
```

- Response em caso de carrinho não existente:

```json
{
	"message": "cart not found"
}
```

### Criar uma fatura
---
- rota: /invoices
- método: POST
- body:

```json
{
	"user_id": "64650d33b66a76b9b33be7f1",
	"order_id": "6465130d3430798f39ddd5d3",
	"type": "pix" ou "card" ou "billet"
}
```

- Response em caso de sucesso:

```json
{
	"amount": 1.0,
	"created_at": "2023-05-17T15:59:32",
	"id": "64652414d33faea46875b7a4",
	"order_id": "6465130d3430798f39ddd5d3",
	"pix": {
		"br_code": "",
		"id": "64652414d33faea46875b7a3"
	},
	"status": "created",
	"type": "pix",
	"user_id": "64650d33b66a76b9b33be7f1"
}
```

- Response em caso de pedido não existente:

```json
{
	"message": "order not found"
}
```

### Atualizar uma fatura (pagar fatura)
---
- rota: /invoices/{id-da-fatura}
- método: GET

- Response em caso de sucesso:

```json
{
	"message": "updated with success"
}
```

- Response em caso de fatura não existente:

```json
{
	"message": "not found"
}
```

## Rotas da carteira

### Editar cartão
---
- rota: /cards/{id-do-cartão}
- método: PATCH
- body:

```json
{
	"owner_name": "Ed",
	"expiration_date": "12/29",
	"card_number": "123456789"
}
```

- Response em caso de sucesso:

```json
{
	"message": "updated with success"
}
```

- Response em caso de cartão não existente:

```json
{
	"message": "not found"
}
```

### Deletar cartão
---
- rota: /cards/{id-do-cartão}
- método: DELETE

- Response em caso de sucesso:

```json
{
	"message": "deleted successfully"
}
```

- Response em caso de cartão não existente:

```json
{
	"message": "not found"
}
```

## Rotas de categoria

### Criar categoria
---
- rota: /categories
- método: POST
- body:

```json
{
	"name": "saúde"
}
```

- Response em caso de sucesso:

```json
{
	"message": "category created successfully"
}
```

### Buscar categorias
---
- rota: /categories
- método: GET

- Response em caso de sucesso:

```json
[
	{
		"id": "6465115c53048c186d1cc919",
		"name": "saúde"
	}
]
```