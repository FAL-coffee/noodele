set client_encoding = 'UTF8';

create table users(
    id serial primary key,
    name varchar not null,
    age integer not null
)