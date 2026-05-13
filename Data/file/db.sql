create database	formulaTiket;
use formulaTiket;

create table color (
 id_color int auto_increment primary key,
 color varchar(20) not null
);
create table gradas (
	id_grada int auto_increment primary key,
    grada varchar(50) not null
);

create table lugar(
	id_lugar int auto_increment primary key,
    pais_evento varchar(100) not null,
    pista_carrera varchar(200) not null
);

create table administrator(
	id_admin int auto_increment primary key,
    nombre_admin  varchar(70) not null,
    password_admin varchar(256) not null
);


create table gran_premio(
	id_gp int auto_increment primary key,
    nombre_gp varchar(100) not null,
    id_lugar int not null,
    fecha_evento date not null,
    hora_evento time not null,
    foreign key(id_lugar) references lugar(id_lugar)
    
);

create table boleto(
	id_boleto int auto_increment primary key,
    precio decimal(10,2) not null,
    id_color int not null,
    id_grada int not null,
    id_gp  int not null,
    foreign key(id_color) references color(id_color),
    foreign key(id_grada) references gradas(id_grada),
    foreign key(id_gp) references gran_premio(id_gp)
);