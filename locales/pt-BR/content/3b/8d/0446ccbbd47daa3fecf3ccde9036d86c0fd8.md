# Anexo às instruções

## Implementação

Implemente os métodos `get` e `post` da classe `RestAPI`.

Você deve escrever apenas as funções handler, sem implementar um servidor HTTP de verdade.
Você pode simular o banco de dados com um objeto em memória que vai conter todos os usuários armazenados.
O construtor da classe `RestAPI` deve aceitar uma instância desse banco de dados como argumento (e definir um valor padrão para ela caso nenhum argumento seja passado).

Para esta implementação, no caso de uma requisição `GET`, o payload deve fazer parte da URL e deve ser tratado como parâmetros de consulta, por exemplo `/users?users=Adam,Bob`.
