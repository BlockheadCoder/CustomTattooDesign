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
