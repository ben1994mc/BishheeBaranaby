create schema hotelbooking;
set schema 'hotelbooking';

create table customer (
	c_no integer not null,
	c_name varchar(80) not null,
	c_email varchar(60) not null,
	c_address varchar(200) not null,
	c_cardtype varchar(2),
	check (c_cardtype in ('V', 'MC', 'A')),
	c_cardexp char(5) not null,
	c_cardno char(16) not null,
	primary key (c_no),
	CONSTRAINT expiry_format_check CHECK(c_cardexp LIKE '%_/_%'),
	CONSTRAINT email_format_check CHECK(c_email LIKE '%__@__%')
);

create table room (
	r_no integer unique not null,
	r_class char(5) not null,
	check (r_class in ('std_d', 'std_t', 'sup_d', 'sup_t')),
	r_status char(1) default 'A',
	check (r_status in ('O', 'C', 'A', 'X')),
	r_notes varchar(300),
	primary key (r_no)
);

create table rates (
	r_class char(5) unique not null,
	price decimal(6,2)
);

create table booking (
	b_ref integer unique not null,
	c_no integer,
	b_cost decimal(6,2),
	b_outstanding decimal(6,2),
	b_notes varchar(300),
	primary key (b_ref),
	CONSTRAINT c_no FOREIGN KEY (c_no) REFERENCES customer
);

create table roombooking (
	r_no integer references room,
	b_ref integer references booking,
	checkin date not null,
	checkout date not null,
	primary key (r_no, b_ref),
	CONSTRAINT b_ref FOREIGN KEY (b_ref) REFERENCES booking,
	CONSTRAINT dates_check CHECK (checkin < checkout)
);

