-- Used to generate tables in PostgreSQL


CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    email VARCHAR NOT NULL,
    encrypted_password VARCHAR(70) NOT NULL,
    role VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    override_job_limit int,
    override_job_limit_expires timestamp without time zone,
    average_time_to_completion double precision,
    average_time_to_introduction double precision,
    sign_in_count integer NOT NULL,
    max_job_value integer NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL,
    user_id int NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    paypal_email VARCHAR,
    PRIMARY KEY (id),
    CONSTRAINT fk_users
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);


INSERT INTO users 
    (id, email, encrypted_password, role, state, override_job_limit, override_job_limit_expires, 
        average_time_to_completion, average_time_to_introduction, sign_in_count, max_job_value)
    
    VALUES 
        (1,	'boftx@att.net', 'tJ8ZY31n0nefxUaPKa0JOaRWetPU59sS8MZyvVqSMoMrLdE39C2WQDt1eZZGgqwN', 'admin', 'active', 8, null, 245617.9858, 87201.17176, 22, 29),
        (2,	'markjugg@yahoo.com', 'SSAhWo1X3KuFpidBUHFleoPLwgyylQR1t9TYBE0WdEcXYIK7MyLvquiI5S7pvSCW', 'manager', 'active', 14, null, 146969.364, 142618.8139, 9, 9),
        (3,	'floxy@mac.com', 'VQJ9ynutTBukpHY6wEFTw8RHkrIOfF8TPN6ytxBFe4eEnayfztMNu7UZ7VFPGn0w', 'designer', 'inactive', 10, null, 210479.1431, 140765.3185, 5, 5),
        (4,	'tedrlord@hotmail.com', 'BNt6XApXVzYNRFi5ar7KYgJ9nPvqFhMKM5Bxvnp3BOUtk4syhqkbRY29uJjIQlKq', 'designer', 'active', 16, null, 196552.9714, 74717.33498, 28, 19),
        (5,	'ozawa@msn.com', 'MaRIZ21vQqz9wTARhiU1NBHphCVIkGNHaDWw4H9dGMr8VQutPr8Q4p5SYktoo1cN', 'designer', 'inactive', 15, null, 144598.9032, 93680.27285, 0, 11),
        (6,	'ournews@icloud.com', 'HTqQyDV3Io1VArcAAMHXMNobhzDIThzLC2tKWNsB2eBi1QVvBiczS274RYcftS5l', 'designer', 'active', 18, null, 255614.2588, 146145.4528, 20, 27),
        (7,	'bhtower@icloud.com', 'zihxENcHIPENluFfNBtyaQcSPsEw0usPxJqjwB8pbrNmffqqH8UfGbLmfeOnSahk', 'designer', 'active', 3, null, 199256.6704, 53680.45706, 30, 0),
        (8,	'sarahs@msn.com', 'LQgBwrV6ZVsqwH47BHf6xX19VfeFhhIvX9I2TDTgvuqVOoDDAbtI8HGQjWyeXu0V', 'designer', 'inactive', 7, null, 148273.425, 120310.1383, 26, 2),
        (9,	'rnewman@hotmail.com', 'ptpQJU8vcgIjb928CnpgGE7vYjAevfJKOz2fKvnR9Dfms3sIrnsu6wPSU42v1UsX', 'designer', 'active', 17, null, 217551.4374, 123696.9548, 0, 22),
        (10, 'denton@verizon.net', 'qdGOzdDZfjmCWRQ2YjjDaU82Pu7y3YHeU2UTa8lIDqSJp6TTC4AhPNRxl9CrvcY5', 'designer', 'inactive', 10, null, 294460.884, 125808.2269, 26, 9),
        (11, 'smeier@hotmail.com', 'ApRU5ZVvriN6zQbWcq6ir9GVzdcWhBSKdtodNLrDQQO5qSXTzp7iWTAm5FYVqOy5', 'designer', 'active', 20, null, 278439.7538, 72128.06401, 2, 11),
        (12, 'nasarius@yahoo.com', 'Inr0g4DGYwvIAuUjOFbCIzg5Zazt1jEHh2R9iT47zb6eYrbJnNiLgu6Gdu4SMXMM', 'designer', 'active', 13, null, 185119.2852, 141268.1541, 5, 20),
        (13, 'hahiss@aol.com', 'POuQXO5gxGrGPs5F2lgMUeZDKxZ2RRoePkLjxciiiqS6zZCzhBiJ5lLwljBDCq0D', 'designer', 'inactive', 5, null, 280595.6018, 69301.90892, 18, 6),
        (14, 'rgiersig@aol.com', 'SOY8riXRYeNaQa4naFew87jeHcvKJ8MGQJFlpJ2gxblJvEaDBduSVpIdRdvE8eht', 'designer', 'active', 15, null, 205091.2244, 112799.418, 8, 21),
        (15, 'lauronen@mac.com', 'tyKQrrEWaSFtrhSKYQtcA5qqUxh8qHmKm3UUQGP75OF3Qzq4uJvkgLcCSDFZ3wFN', 'designer', 'inactive', 1, null, 177489.8858, 80169.18092, 1, 15); 


INSERT INTO user_profiles 
    (id, user_id, first_name, last_name, paypal_email)

    VALUES
        (1, 15, 'Etta', 'Blake', 'denton@verizon.net'),
        (2, 14, 'Paisley', 'Hills', 'okroeger@me.com'),
        (3, 13, 'Nathanael', 'Marin', 'adillon@optonline.net'),
        (4, 12, 'Junayd', 'Ponce', 'dwsauder@hotmail.com'),
        (5, 11, 'Lola', 'Rose', 'isorashi@icloud.com'),
        (6, 10, 'Hollie', 'Cruz', 'schwaang@live.com'),
        (7, 9, 'Suman', 'Cresswell', 'wayward@optonline.net'),
        (8, 8, 'Yusef', 'Burt', 'singh@live.com'),
        (9, 7, 'Hanna', 'Burton', 'oracle@sbcglobal.net'),
        (10, 6, 'Kay', 'Fenton', 'fraterk@verizon.net'),
        (11, 5, 'Huda', 'Giles', 'sriha@optonline.net'),
        (12, 4, 'Sannah', 'Barry', 'luvirini@sbcglobal.net'),
        (13, 3, 'Aayush', 'Dean', 'matsn@optonline.net'),
        (14, 2, 'Micah', 'Oakley', 'ryanshaw@gmail.com'),
        (15, 1, 'Cameron', 'Ratcliffe', 'morain@verizon.net');



-- Table: public.jobs

-- DROP TABLE public.jobs;


CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL,
    user_id int NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    paypal_email VARCHAR,
    PRIMARY KEY (id),
    CONSTRAINT fk_users
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS jobs
(
    id SERIAL,
	
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    tattoo_position VARCHAR NOT NULL,
	
    price NUMERIC NOT NULL,
	commission NUMERIC NOT NULL,
	state VARCHAR NOT NULL,
	
	user_id INTEGER, 
	claimed_at TIMESTAMP,
	bounty NUMERIC,
	
	introduction_sent_at TIMESTAMP,
	approved_at TIMESTAMP,
	featured BOOLEAN,
	
	access_token VARCHAR,

	designs_count INTEGER NOT NULL,
	
	last_customer_comment_at TIMESTAMP,
	last_design_sent_at TIMESTAMP,
	
	deleted_at TIMESTAMP,
	state_changed_at TIMESTAMP,
	final_payment_at TIMESTAMP,
	abandonded_at TIMESTAMP,
	canceled_at TIMESTAMP,
	forfeited_at TIMESTAMP,
	last_featured_at TIMESTAMP,
	
	customer VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	phone VARCHAR NOT NULL,
	tip NUMERIC,
	style VARCHAR NOT NULL,
	size VARCHAR NOT NULL,
	color boolean NOT NULL,
	
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP,
	
	
	PRIMARY KEY (id),
    CONSTRAINT fk_users
        FOREIGN KEY(user_id)
            REFERENCES users(id)

);


CREATE TABLE IF NOT EXISTS session_tokens
(
	id SERIAL,
	session_token VARCHAR NOT NULL,
	user_id INT NOT NULL,
	expires_date TIMESTAMP NOT NULL,
	
	PRIMARY KEY (id),
    CONSTRAINT fk_users
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);

INSERT INTO jobs
    (id, title, description, tattoo_position, price, commission, state, user_id, claimed_at, bounty, introduction_sent_at, approved_at, featured, access_token, designs_count, last_customer_comment_at, last_design_sent_at, deleted_at, state_changed_at, final_payment_at, abandonded_at, canceled_at, forfeited_at, last_featured_at, customer, email, phone, tip, style, size, color, created_at, updated_at) 
    VALUES      
    (293,'KOtbYmuDJphAdr','cebNQlLfOdTw','Other',630.4908107236835,341.05375046995533,'abandoned',1,'2021-04-12 20:43:22',7,'2021-05-11 13:59:33','2021-09-12 08:49:53',false,'Pp9d6Oxley8AUHBVgwZ9iyeNhjpRsdPQ',3,'2021-11-18 20:56:24','2021-12-03 20:40:35','2021-03-13 05:25:51','2021-05-18 23:08:13','2021-08-04 10:12:36','2021-08-12 09:42:10','2021-12-20 12:18:15','2021-03-12 17:51:07','2021-01-02 00:46:39','Stella Beach','yUzSdvUWRqaoA@bzrveMMPEUajgUHNajG.ca',6135497086,50,'Watercolor','Extra Large',true,'2021-04-20 14:47:10','2021-03-18 13:56:41'),
    (2829,'IyVguLDBVysgxVdyvzMC','psVcWdSoigg','Lower Arm',138.22354680989298,110.87166600816879,'phase_one',3,'2021-09-04 22:29:14',30,'2021-05-17 19:20:12','2021-11-15 02:10:32',false,'pjOTUxPiqzAHDXIeNbkXJW0VlRcBmE0mSHUYB',0,'2021-02-04 21:23:13','2021-09-08 08:55:52','2021-07-18 20:20:36','2021-03-17 23:09:06','2021-01-04 09:35:16','2021-11-19 11:34:26','2021-09-03 14:50:36','2021-02-20 23:55:18','2021-02-15 09:27:28','Michael Housel','kxjenorYJulqNg@QLoZifi.com',1089364159,11,'Blackwork','Medium',true,'2021-04-16 17:21:50','2021-04-01 07:52:52'),
    (1501,'YwZDngO','ROhgQLFOcUiioRMiDoEm','Wrist',995.7323099413186,487.8487364488683,'abandoned',5,'2021-09-05 01:42:56',32,'2021-12-15 03:26:52','2021-01-16 04:12:21',true,'B7uQtRGIUdLoKL',6,'2021-01-13 16:40:26','2021-09-11 06:21:53','2021-06-15 20:38:18','2021-04-09 16:46:19','2021-03-14 07:45:38','2021-02-08 22:43:51','2021-12-15 20:34:49','2021-04-20 16:51:10','2021-06-12 21:10:26','James James','wcczzCdykQH@IVztAMIEgTUaSXI.net',3825472103,15,'Blackwork','Extra Large',true,'2021-08-07 00:31:50','2021-03-13 02:59:01'),
    (8510,'ksOLalQBmtXQaYX','YDrqN','Ankle',266.2343692592093,880.2366826966953,'canceled',8,'2021-11-12 14:13:09',27,'2021-01-11 03:41:08','2021-02-18 04:37:28',false,'vQTIUIYlvVuoroOYqtGNKJVreg91',3,'2021-01-05 17:28:45','2021-02-18 04:59:55','2021-12-05 00:08:57','2021-04-04 07:37:44','2021-09-03 23:54:08','2021-10-13 22:19:48','2021-09-07 04:36:25','2021-02-05 18:02:54','2021-07-07 13:21:05','George Brown','POmiaDJgoSw@kXhoxS.net',8590584720,28,'Watercolor','Extra Large',true,'2021-09-16 16:34:00','2021-12-04 20:08:58'),
    (5425,'GDTrmVNzd','vKgmFJj','Fore Arm',590.8816813381311,908.2673420142285,'phase_one',8,'2021-11-08 07:03:36',32,'2021-06-08 21:30:32','2021-01-19 02:08:40',false,'i1qze3TeXc',6,'2021-06-06 19:59:36','2021-06-19 18:45:14','2021-08-07 02:17:13','2021-03-20 04:32:06','2021-05-15 09:54:22','2021-11-06 11:14:47','2021-11-17 01:05:15','2021-03-05 16:17:59','2021-10-02 00:08:26','Christina Murphy','GxuzLkVCLPmMAEU@VsiyzvcfxnvSrK.ca',1733152188,44,'Watercolor','Medium',false,'2021-04-10 08:34:18','2021-03-18 06:56:16'),
    (2504,'RGZfQvUroi','INFDyuxJmWOc','Full Back',141.31632552882667,804.241342206947,'phase_one',1,'2021-04-09 18:10:54',29,'2021-02-05 02:55:03','2021-11-18 21:38:41',false,'vB3N6wcEaym99F3HErUVBJMoZj3u5oZs85NllvQqN',0,'2021-01-06 06:18:44','2021-02-18 02:53:34','2021-08-07 11:06:23','2021-05-20 00:10:40','2021-12-15 22:18:11','2021-09-14 18:38:19','2021-07-20 03:23:50','2021-09-15 13:33:49','2021-04-07 01:52:28','Ernest Guilliam','ZtBDQTuCDyBYHfR@CelOJyVqeJ.ca',8058199446,24,'Realistic','Medium',false,'2021-05-10 23:12:09','2021-09-06 03:09:37'),
    (3887,'EgjFCBnAfbuEklJq','qnQWCiXPbEtHXElciB','Wrist',238.73379416791073,393.7044745078191,'draft',1,'2021-04-08 03:19:42',7,'2021-11-18 12:27:00','2021-02-13 14:24:02',false,'mAzADzDyHXY9nibXOOlZVrpxb20pndgPFxGWnUIcMzYs5Gf8t9',7,'2021-02-20 21:52:40','2021-02-06 10:00:39','2021-05-08 08:54:48','2021-01-20 03:11:42','2021-05-06 09:36:48','2021-04-05 20:54:11','2021-09-02 12:31:20','2021-12-07 02:35:29','2021-10-10 08:44:00','Gina Hamilton','DkNHOZep@OCyDdTnCe.net',5131769663,16,'Dont Know / Other','Large',true,'2021-01-17 11:48:46','2021-07-17 12:05:42'),
    (6171,'rfsrB','wuwDyoyQeJmh','Ribs',774.6985994841191,652.0756604632536,'draft',13,'2021-01-12 18:15:57',37,'2021-12-05 00:45:31','2021-03-07 20:17:12',false,'csXcqRghKA',5,'2021-10-08 20:15:19','2021-01-15 19:31:58','2021-04-15 07:11:40','2021-07-14 11:14:30','2021-11-17 23:53:46','2021-05-05 03:13:45','2021-11-06 20:50:13','2021-09-01 12:44:16','2021-12-05 13:55:45','James Herrera','UaPuMHISuIoddkMp@CbpswjYRAdAvqAfHXlay.net',7983840013,13,'Realistic','Large',false,'2021-05-15 13:26:18','2021-02-03 03:48:59'),
    (6637,'jkhosSSE','ctRIYIbFJJBWVyFdjj','Forearm',562.1456130630605,290.9305259699404,'draft',15,'2021-11-07 02:48:25',40,'2021-11-06 11:10:58','2021-09-20 06:12:24',true,'O539djWJxl8CaH8',2,'2021-08-17 01:29:37','2021-03-14 01:58:17','2021-06-15 13:25:09','2021-10-04 16:13:42','2021-10-16 13:47:39','2021-01-05 09:24:03','2021-06-02 14:15:06','2021-11-07 07:21:09','2021-04-14 05:06:47','Jesse Cerda','WkeuvDPhYeAxuyQ@oPBPkMKixDuzgMyHBrU.ca',5338669818,30,'New School','Medium',true,'2021-05-03 09:03:52','2021-10-09 13:26:19'),
    (1421,'YSJUaHNcb','bNPDHoZnJjxqchT','Half Sleeve',932.9888774068493,883.5241675785247,'abandoned',8,'2021-07-12 19:53:19',48,'2021-06-09 15:59:09','2021-05-04 14:27:11',false,'eFXCYePDaWEGetPaUKI2orJsmFm0gm5ZFcDW',1,'2021-08-09 10:28:57','2021-10-01 20:22:31','2021-03-15 00:00:52','2021-01-03 19:57:36','2021-10-16 08:57:35','2021-08-20 08:32:34','2021-01-15 14:06:35','2021-12-07 18:55:05','2021-06-14 04:19:21','Dot Shields','faGZUfiKyEGG@LrrDjj.ca',6982164524,29,'Illustrative','Medium',true,'2021-06-05 02:29:01','2021-05-09 22:30:29'),
    (6271,'qgWVShmp','vKdEpuVHRyhDvkkOlBd','Lower Arm',553.0092622483799,901.5957013730565,'abandoned',14,'2021-03-14 05:30:18',9,'2021-07-03 21:10:57','2021-03-09 11:03:44',false,'HL6Rvknt6ofXsuzA2S2dUgdsTIBnMba6jGM6tD13',6,'2021-09-06 05:09:47','2021-07-17 03:46:14','2021-09-03 14:47:40','2021-06-06 12:49:11','2021-07-11 12:09:57','2021-11-06 06:51:22','2021-12-06 08:39:52','2021-12-08 14:09:16','2021-04-13 00:48:31','Steven Corlew','HXdni@QiZrLZlOtGlJ.com',5010750765,49,'Traditional','Extra Small',false,'2021-03-10 11:14:03','2021-09-16 10:26:23'),
    (2306,'KPqXZtdmvpj','IdwIBQowh','Foot',307.42085353134235,737.162536910869,'forfeit',2,'2021-11-07 15:35:54',44,'2021-08-17 11:22:10','2021-11-07 21:34:01',false,'7j2UIUaNun1FqbNniM7uRcn5',7,'2021-12-19 01:03:18','2021-02-15 10:06:19','2021-10-05 20:12:25','2021-02-05 23:30:39','2021-05-07 03:46:34','2021-10-01 09:23:35','2021-01-01 08:01:53','2021-07-05 08:12:59','2021-10-12 05:01:42','Joseph Webb','mRyIaCYDIaqVEUc@ASTeLRvIKs.com',4599233293,10,'Blackwork','Half Sleeve',true,'2021-08-06 18:58:00','2021-07-13 15:08:11'), 
    (2307,'QXdjhed','gxLmSPskr','Calf',202.58713350277785,121.74375424133355,'draft',13,'2021-06-17 14:02:37',43,'2021-01-02 23:19:59','2021-12-17 11:08:54',false,'6IDismzYqT1snOirbP2AXAQm6lc0u3H3j5BwzXISih6B3Q',5,'2021-04-13  11:35:30','2021-10-12 14:31:58','2021-07-15 03:55:15','2021-01-19 17:46:42','2021-09-12 00:12:59','2021-09-07 14:57:29','2021-04-19 23:35:16','2021-09-16 01:17:53','2021-11-13 01:14:04','Ramon Tucker','sZarP@elqhDjUcKNjzDzjU.net',8286980246,4,'Japanese','Extra Large',false,'2021-01-10 22:02:04','2021-10-16 20:58:51'),
    (9327,'JHVmcytVKBdqnEpqGdNR','LulCZagjdjuHVoQHQ','Calf',424.0556524629572,397.2922205833119,'draft',6,'2021-02-08 07:24:32',23,'2021-04-10 14:49:16','2021-11-05 03:01:39',true,'b06niHtvai1I43OqwK2WIhChFIHnwINvwN',3,'2021-09-14 20:01:05','2021-05-11 20:31:57','2021-07-14 12:02:18','2021-01-09 17:04:07','2021-03-14 02:04:00','2021-05-17 00:40:32','2021-05-20 17:40:36','2021-05-17 23:25:08','2021-01-17 11:26:15','Joseph Warren','gAnheMvPLVPsWQwStz@IBjCmXbDdcxuqeQaYDAp.ca',9206586149,36,'Realistic','Medium',false,'2021-01-04 02:30:04','2021-05-05 08:35:54'),
    (3333,'VThtIAZgSSeChBUG','woTuhRMubHauEcxCbvI','Half Sleeve',217.53595380833613,717.6605055217964,'phase_one',4,'2021-02-10 01:15:44',35,'2021-12-11 15:50:30','2021-12-06 08:59:36',true,'H9MMjbKCTsMTcvn6tBu65c6Qap9HEk',1,'2021-09-19 03:23:47','2021-08-07 01:30:44','2021-03-04 06:41:55','2021-10-11 22:32:15','2021-01-14 13:17:25','2021-05-17 17:56:40','2021-05-09 13:08:46','2021-01-09 21:45:25','2021-08-13 00:55:47','Jennifer Eastham','VtTldQCtXSMqx@zUefVtLKKSXxk.com',8625116475,31,'Dont Know / Other','Large',false,'2021-08-04 18:47:56','2021-04-06 17:12:13'),
    (7176,'jWSnSuQvgESwhpI','ejvojYpJuQGJyRJsKekL','Forearm',297.96451376990854,862.5834406827062,'draft',12,'2021-07-19 12:28:36',35,'2021-10-08 13:21:33','2021-10-02 07:05:14',false,'tyXi4wGNpFmycUEQ4goRHIgmq5M4LQ6R3Wn',10,'2021-11-05 19:07:07','2021-11-10 20:20:41','2021-09-18 17:25:36','2021-02-10 00:06:03','2021-06-16 23:24:11','2021-09-04 02:22:50','2021-07-02 16:06:52','2021-09-10 04:57:41','2021-09-04 17:01:05','David Schreiber','KSWLyxRd@mZSlNu.ca',2132392374,47,'Watercolor','Half Sleeve',false,'2021-10-18 09:19:18','2021-07-12 14:38:43'),
    (3150,'zLpcnOFULsDMMR','DsPSTkpkH','Lower Arm',848.2438964593923,123.34968379778938,'paid',4,'2021-02-02 09:48:49',2,'2021-10-04 14:42:13','2021-09-01 21:11:37',false,'PJhBg3X9A7',6,'2021-08-08 02:42:18','2021-07-17 22:26:21','2021-01-16 19:04:50','2021-07-08 20:12:55','2021-02-05 04:46:31','2021-07-10 21:43:37','2021-10-05 21:22:07','2021-03-19 00:24:44','2021-11-19 22:06:54','Beulah Hodgson','DNtJGhXtQMlftefU@onFFPmvFEqctVxGQTTfG.net',8820739901,28,'Custom Script','Medium',false,'2021-08-08 10:57:07','2021-07-20 18:01:00'),
    (2584,'qvXHIdHoaAccEFsjP','qNlrqovqX','Upper Arm',930.682811964772,448.8679432730881,'paid',2,'2021-11-01 08:08:51',33,'2021-05-04 09:42:27','2021-10-19 21:02:10',true,'1RrcF72otJbXCCS',4,'2021-01-01 23:52:41','2021-02-17 06:55:42','2021-01-09 08:23:11','2021-01-20 22:14:50','2021-07-01 20:22:34','2021-11-04 00:24:00','2021-05-15 12:11:51','2021-11-17 05:12:04','2021-03-03 10:57:31','Colleen Randall','bLTzqzEzKADuFjMEJUAH@eRtKXBoHisRDSLlKKp.ca',4939007314,37,'Japanese','Extra Large',true,'2021-12-19 18:49:42','2021-05-06 15:09:47'),
    (907,'LfOpARvMQYvLmrl','rRwkUVEJHyuRKeJIxyL','Full Sleeve',156.28442128496644,462.8432030056835,'phase_one',8,'2021-06-18 13:48:24',14,'2021-02-16 05:34:49','2021-09-06 00:53:15',true,'s3G5P5b9U0WoAg',2,'2021-11-14 00:51:02','2021-08-07 14:36:26','2021-08-03 22:28:59','2021-03-02 05:09:03','2021-10-19 18:23:17','2021-11-11 01:30:22','2021-01-02 18:09:32','2021-04-11 23:06:13','2021-06-11 21:42:20','Emily Summerville','lEURdMgCAX@TNfNVIMrqFpheNSsC.ca',2911217788,0,'Realistic','Half Sleeve',true,'2021-01-01 02:41:49','2021-06-15 11:05:07'),
    (6794,'GpKKDrSPh','QWhAbWCGKxyPTKvUp','Chest',424.9297136327043,815.8770657511529,'draft',15,'2021-05-20 10:19:55',46,'2021-01-15 08:54:01','2021-12-03 07:25:44',true,'g3eD7RJblQLrHpUSLQR73jJPCg',3,'2021-05-06 09:40:04','2021-09-04 08:01:32','2021-02-09 05:39:49','2021-06-02 15:06:47','2021-12-16 13:38:08','2021-11-20 04:18:35','2021-01-02 13:15:49','2021-08-09 16:41:08','2021-02-09 12:53:47','Dane Alloway','uZiyMWqYqy@bAUBaEBIkLKS.net',3048005497,16,'Custom Script','Extra Small',false,'2021-11-12 15:13:14','2021-06-20 00:37:14');



-- Sprint 2. Validate tokens

CREATE OR REPLACE FUNCTION valid_token(_email varchar, _tokn varchar) 
	RETURNS BOOLEAN
	AS
    $$
	DECLARE
		validTimestamp boolean default FALSE;
	BEGIN		
		validTimestamp := (
			SELECT COUNT(users.id) 
			FROM users 
            LEFT OUTER JOIN session_tokens ON (users.id = session_tokens.user_id) 
			WHERE expires_date >= CURRENT_TIMESTAMP 
			AND users.email = _email
			AND session_tokens.session_token = _tokn
			) = 1;
			
		if not validTimestamp then
 			DELETE FROM session_tokens WHERE session_token = _tokn; 
		else
			
		end if;
		return validTimestamp;
		
	END
	$$ LANGUAGE 'plpgsql';

    

-- Trigger for setting session expirys


CREATE OR REPLACE FUNCTION set_session_expiry()
	RETURNS trigger AS
$$
BEGIN
	new.expires_date = CURRENT_TIMESTAMP + interval '30' day;
	return new;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER session_trigger 
	BEFORE UPDATE OR INSERT ON "session_tokens"
		FOR EACH ROW
		EXECUTE PROCEDURE set_session_expiry();








-- Get jobs for an artist based off token and email

CREATE OR REPLACE FUNCTION get_artist_jobs(_email varchar, _tokn varchar) 
	RETURNS TABLE(
		id INTEGER,
		state VARCHAR,
		title VARCHAR,
		customer VARCHAR,
		tattoo_position VARCHAR,
		size VARCHAR,
		style VARCHAR,
		color boolean,
		commission NUMERIC,
		description VARCHAR
	)
	as
    $BODY$
	BEGIN		
			
		if valid_token(_email,_tokn) then
		 	return QUERY 
				select 
					jobs.id,
					jobs.state,
					jobs.title,
					jobs.customer,
					jobs.tattoo_position,
					jobs.size,
					jobs.style,
					jobs.color,
					jobs.commission,
					jobs.description
				from 
					jobs
                    LEFT OUTER JOIN users ON (users.id = jobs.user_id) 
				WHERE 
					users.email = _email;
		else
			RAISE 'Not Authorized';
		end if;

	END
	$BODY$ 
	LANGUAGE 'plpgsql';
	


-- Getting artist info

CREATE OR REPLACE FUNCTION get_artist_info(_email varchar, _tokn varchar) 
	RETURNS TABLE(
        user_id integer,
		first_name VARCHAR,
    	last_name VARCHAR,
		role VARCHAR,
		paypal_email VARCHAR,
		override_job_limit int,
		max_job_value integer,
		average_time_to_completion double precision,
    	average_time_to_introduction double precision,
        jobs_taken_last_30_days integer,
        jobs_taken_lifetime integer,
        refunds_last_30_days integer,
        refunds_lifetime integer,
        earnings_lifetime numeric

	)
	as
    $BODY$
	BEGIN		
			
		if valid_token(_email,_tokn) then
		 	return QUERY 
				select 
                    users.id,
                    user_profiles.first_name,
					user_profiles.last_name,
					users.role,
					user_profiles.paypal_email,
					users.override_job_limit,
					users.max_job_value,
					users.average_time_to_completion,
					users.average_time_to_introduction,
                    i.jobs_taken_last_30_days::integer,
                    j.jobs_taken_lifetime::integer,
                    k.refunds_last_30_days::integer,
                    l.refunds_lifetime::integer,
                    m.earnings_lifetime
                from users
                    LEFT JOIN user_profiles ON (users.id = user_profiles.user_id)
                    
                    LEFT JOIN (
                        select designer_id as i_id, count(designer_id) as jobs_taken_last_30_days
                        from claims
                        where 
                            claims.updated_at > CURRENT_TIMESTAMP - interval '30' day
                        group by designer_id
                    ) as i ON (i_id = users.id)

                    LEFT JOIN (
                        select designer_id as j_id, count(designer_id) as jobs_taken_lifetime
                        from claims
                        group by designer_id
                    ) as j ON (j_id = users.id)

                    LEFT JOIN (
                        select designer_id as k_id, count(designer_id) as refunds_last_30_days
                        from claims
                        WHERE
                                claims.updated_at > CURRENT_TIMESTAMP - interval '30' day
                        AND     claims.state = 'refunded' 
                        group by designer_id
                    ) as k ON (k_id = users.id)

                    LEFT JOIN (
                        select designer_id as l_id, count(designer_id) as refunds_lifetime
                        from claims
                        WHERE
                                claims.state = 'refunded' 
                        group by designer_id
                    ) as l ON (l_id = users.id)

                    LEFT JOIN (
                        select 
                            designer_id as m_id,
                            (sum(jobs.price) - sum(jobs.commission))::numeric as earnings_lifetime
                        from claims
                            LEFT JOIN jobs on (claims.job_id = jobs.id)
                        where claims.state = 'completed'
                        group by designer_id
                    ) as m ON (m_id = users.id)
    
				WHERE 
					user_profiles.user_id = users.id AND
					users.email = _email;
		else
			RAISE 'Not Authorized';
		end if;

	END
	$BODY$ 
	LANGUAGE 'plpgsql';









CREATE OR REPLACE FUNCTION insert_update_token(_email varchar, _tokn varchar) 
	RETURNS boolean
	as
    $BODY$
	DECLARE
		token_exists boolean default FALSE;
		_user_id integer;
	BEGIN		
	
		token_exists := (
			SELECT COUNT(users.id) 
			FROM users 
            LEFT OUTER JOIN session_tokens ON (users.id = session_tokens.user_id) 
			WHERE users.email = _email
			AND session_tokens.session_token = _tokn
			) > 0;
			
		_user_id := (
				SELECT users.id
				FROM users
				WHERE users.email = _email
			);

		if not token_exists then
			
			
			
			
 			INSERT INTO 
				session_tokens (session_token, user_id)
				VALUES (_tokn, _user_id);
				
			token_exists = TRUE;
		else
			UPDATE session_tokens
				SET 
					session_token = _tokn,
					expires_date = CURRENT_TIMESTAMP + interval '30' day 
				WHERE user_id = _user_id;
			
		end if;
		return token_exists;
	END
	$BODY$ 
	LANGUAGE 'plpgsql';




CREATE TABLE IF NOT EXISTS claims(
    id SERIAL NOT NULL,
    designer_id integer,
    job_id integer,
    state VARCHAR,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    completed_at timestamp without time zone,
    time_to_introduction double precision,
    time_to_completion double precision,
    is_excluded_from_grade boolean DEFAULT false,
    deleted_at timestamp without time zone,
    CONSTRAINT claims_pkey PRIMARY KEY (id),
    CONSTRAINT fk_jobs_key FOREIGN KEY (job_id)
        REFERENCES jobs (id),
    CONSTRAINT fk_artist_key FOREIGN KEY (designer_id)
        REFERENCES users (id)
);



CREATE OR REPLACE FUNCTION set_claims_created_time()
	RETURNS trigger AS
$$
BEGIN
	new.created_at = CURRENT_TIMESTAMP;
	new.updated_at = CURRENT_TIMESTAMP;
	return new;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER claims_created_trigger 
	BEFORE UPDATE OR INSERT ON "claims"
		FOR EACH ROW
		EXECUTE PROCEDURE set_claims_created_time();


INSERT INTO claims
(id, designer_id, job_id, state)
VALUES
	(1, 14, 6271, 'completed'),
	(2, 14, 6171, 'completed'),
	(3, 14, 2307, 'refunded'),
	(4, 15, 6794, 'refunded'),
	(5, 15, 6637, 'completed');

CREATE OR REPLACE PROCEDURE remove_token(_user_id int, _tokn varchar)
    AS
    $$
    BEGIN
		delete from session_tokens 
            WHERE session_token = _tokn AND user_id = _user_id;
    END
    $$ LANGUAGE 'plpgsql';

testsetsets
create sequence claims_id;
ALTER TABLE claims
ALTER COLUMN id set default nextval('claims_id');


CREATE OR REPLACE FUNCTION claim_job(_email varchar, _tokn varchar, _job_id integer) 
	RETURNS BOOLEAN
	AS
    $$
	DECLARE
		claim_succesful boolean default FALSE;
        job_claimed boolean default FALSE;
        _des_id integer default 0;
	BEGIN		
        if valid_token(_email,_tokn) then
            if not exists(select 1 from jobs where id=_job_id) then
                RAISE 'Job Does Not Exist';
            else
                
            _des_id := (select users.id as designer_id from users where users.email = _email limit 1);

                job_claimed := (
                    SELECT COUNT(id) 
                    FROM claims 
                    WHERE claims.job_id = _job_id
                    ) > 0;

                if job_claimed then
                    return FALSE;
                else
                    insert into claims (id, designer_id, job_id, state) VALUES (
                        
                            nextval('claims_id'),
                            _des_id,
                            _job_id,
                            'active'
                        );

                    update jobs set 
                        state='claimed',
                        user_id = _des_id
                        where jobs.id = _job_id;

                    return TRUE;
                end if;

            end if;
        else
            RAISE 'Not Authorized';
		end if;

        return claim_succesful;

	END
	$$ LANGUAGE 'plpgsql';