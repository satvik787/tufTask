CREATE TABLE submission (
id int auto_increment primary key,
userName varchar(50) not null,
code MEDIUMTEXT not null,
language varchar(15) not null,
stdin TEXT not null,
output TEXT,
submittedOn TIMESTAMP default now()
);