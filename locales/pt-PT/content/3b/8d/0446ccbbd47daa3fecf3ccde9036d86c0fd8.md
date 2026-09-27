# Anexo às instruções

## Implementação

Implementa os métodos `get` e `post` da classe `RestAPI`.

Deves escrever apenas as funções de tratamento, sem implementar um servidor HTTP real.
Podes simular a base de dados com um objeto em memória que vai conter todos os utilizadores armazenados.
O construtor da classe `RestAPI` deve aceitar uma instância desta base de dados como argumento (e definir um valor predefinido para ela se não for passado nenhum argumento).

Para esta implementação, no caso de um pedido `GET`, a carga útil deve fazer parte do URL e deve ser tratada como parâmetros de consulta, por exemplo `/users?users=Adam,Bob`.
