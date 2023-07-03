# teste serviço do usuario adicionar Produto
# httpRequestMock = {
#     "params": "644afd0e97bc58e69c2e2f37",
#     "body": {
# 	    "description": "descrição de livro",
# 	    "name": "livro",
# 	    "price": 1.0,
# 	    "photo": "urldafoto.com",
# 	    "categories": ["644d5f3b1c35bb4cf61b0855"],
# 	    "type": "ebook"
#     }
# }

# teste serviço do usuário adicionar cartão
httpRequestMock = {
    "params": "6449c9872ae737b6a694a931",
    "body": {
		"owner_name": "Edinho",
		"card_number": "123456789",
		"expiration_date": "05/25"
    }
}

httpRequestMock_recoveryPassword = {
    "params": "6449c9872ae737b6a694a931",
    "body": {
		"email": "teste@gmail.com",
		"password": "MTIzNDY="
    }
}

httpRequestMock_confirmEmailAuthentication = {
    "query": {
		"email": "julio@gmail.com"
    }
}


# httpRequestMock_getInvoices = {
#     "params": "6449c9872ae737b6a694a931",
#
#     "query": {
# 		"id": "647d3268163e690aa33fcb18",
#         "user_id": "647d3268163e690aa33fcb18",
#         "order_id": "647d3268163e690aa33fcb18",
#         "type": "asfdasf",
#         "amount": 2,
#         "card_id": "647d3268163e690aa33fcb18",
#         "status": 'sadfdsf',
#         "created_at": "24/05/2023"
#     }
# }




# teste serviço do produto
# httpRequestMock = {
#     "query": {
#         "search": "livro"
#     }
# }
