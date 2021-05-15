create database db_SiteOng;
/*drop database db_siteong;*/
use db_SiteOng;

/*Criação das tabelas*/
create table tb_Usuario (
idUser int(3),
emailUser varchar(255),
cpf varchar(255)unique not null,
nome varchar(255) unique not null,
senha varchar(255),
useradmin boolean not null default false
);

/*Alteração das primary key*/
alter table tb_Usuario add constraint PK_TB_Usuario primary key(idUser,emailUser,cpf);

create table tb_Categoria (
idCategoria int(3),
nomeCategoria varchar(255)
);

/*Alteração das primary key*/
alter table tb_Categoria add constraint PK_TB_Categoria primary key(idCategoria);

create table tb_Ong(
idOng int(3) not null,
emailOng varchar(255) not null,
cnpj varchar(255) not null,
nome varchar(255) not null unique,
descricao varchar(255),
estado varchar(255),
cidade varchar(255),
rua varchar(255),
cep varchar(10),
FK_CategoriaID int(3),
foreign key (FK_CategoriaID) references tb_Categoria (idCategoria)
);

/*Alteração das primary key*/
alter table tb_Ong add constraint PK_TB_Ong primary key(idOng, nome, cnpj);

create table tb_Doacao(
idDoacao bigint(3),
FK_nomeCliente varchar(255),
FK_nomeOng varchar(255),
valor bigint(12),
foreign key(FK_nomeCliente) references tb_Usuario (nome),
foreign key(FK_nomeOng) references tb_Ong (nome)
);

/*Alteração das primary key*/
alter table tb_Doacao add constraint PK_TB_Doacao primary key(idDoacao);


/*Inserção de dados Tabela Usuario*/
insert into tb_Usuario (idUser,emailUser,cpf,nome,senha) values (001,"artur@gmail.com","468.752.344-99","Artur Alves","1234");
insert into tb_Usuario (idUser,emailUser,cpf,nome,senha) values (002,"fernanda@gmail.com","458.658.965-77","Fernanda de Souza","1234");
insert into tb_Usuario (idUser,emailUser,cpf,nome,senha) values (003,"fabio@gmail.com","598.547.778-02","Fabio Vinicios","1234");
insert into tb_Usuario (idUser,emailUser,cpf,nome,senha,useradmin) values (004,"icaroduarte@gmail.com","598.594.478-88","Ícaro Durte","1234", 1);
select * from tb_Usuario;

/*Inserção de dados Tabela Categoria*/
insert into tb_Categoria (idCategoria,nomeCategoria) values (1,"Acabe com a Fome");
insert into tb_Categoria (idCategoria,nomeCategoria) values (2,"Acabe com o Frio");
insert into tb_Categoria (idCategoria,nomeCategoria) values (3,"Orfanatos");
select * from tb_Categoria;

/*Inserção de dados tabela ONG*/
insert into tb_Ong (idOng,emailOng,cnpj,nome,descricao,estado,cidade,rua,cep,FK_CategoriaID)
values (001,"ongsemfome@gmail.com","124536520001-56","Ong sem Fome",
"Essa é uma ong que destina alimentos para aqueles que mais precisam","SP","São Paulo","Rua da Esperança nº33",
"07154-890",1);
insert into tb_Ong (idOng,emailOng,cnpj,nome,descricao,estado,cidade,rua,cep,FK_CategoriaID)
values (002,"cobertadobem@gmail.com","124536520001-56","Coberta do Bem",
"Essa é uma ong que destina roupas e cobertores para aqueles que mais precisam","SP","São Paulo","Rua da Esperança nº35",
"07154-890",1);
insert into tb_Ong (idOng,emailOng,cnpj,nome,descricao,estado,cidade,rua,cep,FK_CategoriaID)
values (003,"OrfanatoSP@gmail.com","124536520001-56","Orfanato São Paulo",
"Essa é uma ong que destina carinho e amor para as nossas crianças, doem brinquedos e venham nos visitar","SP","São Paulo","Rua da Esperança nº39",
"07154-890",1);
select * from tb_Ong;
select * from tb_Usuario;
select * from tb_categoria;
select * from tb_doacao;