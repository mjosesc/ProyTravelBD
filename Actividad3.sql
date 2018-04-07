use Actividad3;
create table usuarios (
	id integer auto_increment,
    usuario varchar(30),
    email varchar(50),
    password varchar(50),
    admin tinyint default 0,
primary key (id)
);
drop table destinos;

create table destinos (
	id integer auto_increment,
    viaje varchar(30),
    precio integer,
    descripcion varchar (200),
    fecha_sal varchar(15),
    fecha_vuel varchar(15),
    imagen varchar(50),
    activo tinyint,
    primary key (id)
);
INSERT INTO destinos (id, viaje, descripcion, fecha_sal, fecha_vuel, imagen, activo)
VALUES (1, "Malta preciosa", 450, "Una de las mejores playas del Mediterraneo, Malta, en pensión completa con vuelos incluídos", "15-Abril", "25-Abril", "malta.jpg",1),
(2, "Malta preciosa", 450, "Una de las mejores playas del Mediterraneo, Malta, en pensión completa con vuelos incluídos", "15-Abril", "25-Abril", "malta.jpg",1),
(3, "Malta preciosa", 450, "Una de las mejores playas del Mediterraneo, Malta, en pensión completa con vuelos incluídos", "15-Abril", "25-Abril", "malta.jpg",0);