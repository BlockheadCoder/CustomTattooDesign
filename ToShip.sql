-- Tables

CREATE TABLE public.claims
(
    id integer NOT NULL DEFAULT nextval('claims_id'::regclass),
    designer_id integer,
    job_id integer,
    state character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    completed_at timestamp without time zone,
    time_to_introduction double precision,
    time_to_completion double precision,
    is_excluded_from_grade boolean DEFAULT false,
    deleted_at timestamp without time zone,
    CONSTRAINT claims_pkey PRIMARY KEY (id),
    CONSTRAINT fk_artist_key FOREIGN KEY (designer_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_jobs_key FOREIGN KEY (job_id)
        REFERENCES public.jobs (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)





-- New Coloumn. has_been_read boolean

CREATE TABLE public.comments
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 0 MAXVALUE 9876543 CACHE 1 ),
    design_id integer,
    body text COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    designer_id integer,
    job_id integer,
    comment_picture character varying COLLATE pg_catalog."default",
    has_been_read boolean,
    CONSTRAINT comments_pkey PRIMARY KEY (id)
)



CREATE TABLE public.designs
(
    id integer NOT NULL,
    job_id integer,
    user_id integer,
    access_token character varying COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    revision_number integer,
    updated_at timestamp without time zone,
    customer_comments_count integer,
    rejected_at timestamp without time zone,
    aasm_state character varying COLLATE pg_catalog."default",
    CONSTRAINT designs_pkey PRIMARY KEY (id)
)

CREATE TABLE public.jobs
(
    id integer NOT NULL DEFAULT nextval('jobs_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    tattoo_position character varying COLLATE pg_catalog."default",
    price numeric,
    commission numeric,
    state character varying COLLATE pg_catalog."default",
    user_id integer,
    claimed_at timestamp without time zone,
    bounty numeric,
    introduction_sent_at timestamp without time zone,
    approved_at timestamp without time zone,
    featured boolean,
    access_token character varying COLLATE pg_catalog."default",
    designs_count integer,
    last_customer_comment_at timestamp without time zone,
    last_design_sent_at timestamp without time zone,
    deleted_at timestamp without time zone,
    state_changed_at timestamp without time zone,
    final_payment_at timestamp without time zone,
    abandonded_at timestamp without time zone,
    canceled_at timestamp without time zone,
    forfeited_at timestamp without time zone,
    last_featured_at timestamp without time zone,
    customer character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    tip numeric,
    style character varying COLLATE pg_catalog."default",
    size character varying COLLATE pg_catalog."default",
    color boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT jobs_pkey PRIMARY KEY (id),
    CONSTRAINT fk_users FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE public.requests
(
    id integer NOT NULL,
    first_name character varying COLLATE pg_catalog."default" DEFAULT ''::character varying,
    last_name character varying COLLATE pg_catalog."default" DEFAULT ''::character varying,
    email character varying COLLATE pg_catalog."default",
    is_first_time boolean,
    gender character varying COLLATE pg_catalog."default",
    has_color boolean,
    has_cover_up boolean,
    "position" character varying COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    estimate_size character varying COLLATE pg_catalog."default",
    style character varying COLLATE pg_catalog."default",
    CONSTRAINT requests_pkey PRIMARY KEY (id)
)


CREATE TABLE public.session_tokens
(
    id integer NOT NULL DEFAULT nextval('session_tokens_id_seq'::regclass),
    session_token character varying COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL,
    expires_date timestamp without time zone NOT NULL,
    CONSTRAINT session_tokens_pkey PRIMARY KEY (id),
    CONSTRAINT fk_users FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)



CREATE TABLE public.user_profiles
(
    id integer NOT NULL DEFAULT nextval('user_profiles_id_seq'::regclass),
    user_id integer NOT NULL,
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    paypal_email character varying COLLATE pg_catalog."default",
    CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
    CONSTRAINT fk_users FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)




CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying COLLATE pg_catalog."default" NOT NULL,
    encrypted_password character varying(70) COLLATE pg_catalog."default" NOT NULL,
    role character varying COLLATE pg_catalog."default" NOT NULL,
    state character varying COLLATE pg_catalog."default" NOT NULL,
    override_job_limit integer,
    override_job_limit_expires timestamp without time zone,
    average_time_to_completion double precision,
    average_time_to_introduction double precision,
    sign_in_count integer NOT NULL,
    max_job_value integer NOT NULL,
    session_token character varying COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)








-- Trigger Functions

CREATE FUNCTION public.set_session_expiry()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	new.expires_date = CURRENT_TIMESTAMP + interval '30' day;
	return new;
END;
$BODY$;


CREATE FUNCTION public.set_claims_created_time()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	new.created_at = CURRENT_TIMESTAMP;
	new.updated_at = CURRENT_TIMESTAMP;
	return new;
END;
$BODY$;






-- Procedures

CREATE OR REPLACE PROCEDURE public.remove_token(
	_user_id integer,
	_tokn character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
		delete from session_tokens 
            WHERE session_token = _tokn AND user_id = _user_id;
    END
$BODY$;







-- Functions


CREATE OR REPLACE FUNCTION public.claim_job(
	_email character varying,
	_tokn character varying,
	_job_id integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
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
$BODY$;



CREATE OR REPLACE FUNCTION public.customer_access(
	_job_id integer)
    RETURNS SETOF jobs 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
begin
		return query SELECT * from jobs where jobs.id = _job_id;
	end
$BODY$;



CREATE OR REPLACE FUNCTION public.customer_access(
	accesstoken character varying)
    RETURNS SETOF jobs 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
begin
		return query SELECT * from jobs where jobs.access_token = accessToken;
	end
$BODY$;



CREATE OR REPLACE FUNCTION public.fetch_job_messages(
	jobid integer)
    RETURNS SETOF comments 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
SELECT id, design_id, body, created_at, updated_at, designer_id, job_id, comment_picture, has_been_read FROM comments WHERE job_id = jobId;
$BODY$;



CREATE OR REPLACE FUNCTION public.fetch_unread_job_messages(
	jobid integer)
    RETURNS SETOF comments 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
SELECT * FROM comments WHERE job_id = jobId and has_been_read = FALSE;
$BODY$;



CREATE OR REPLACE FUNCTION public.get_artist_info(
	_email character varying,
	_tokn character varying)
    RETURNS TABLE(user_id integer, first_name character varying, last_name character varying, role character varying, paypal_email character varying, override_job_limit integer, max_job_value integer, average_time_to_completion double precision, average_time_to_introduction double precision, jobs_taken_last_30_days integer, jobs_taken_lifetime integer, refunds_last_30_days integer, refunds_lifetime integer, earnings_lifetime numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
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
$BODY$;



CREATE OR REPLACE FUNCTION public.get_artist_jobs(
	_email character varying,
	_tokn character varying)
    RETURNS TABLE(id integer, state character varying, title character varying, customer character varying, tattoo_position character varying, size character varying, style character varying, color boolean, commission numeric, description character varying, user_id integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
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
					jobs.description,
					jobs.user_id
				from 
					jobs
                    LEFT OUTER JOIN users ON (users.id = jobs.user_id) 
				WHERE 
					users.email = _email;
		else
			RAISE 'Not Authorized';
		end if;

	END
$BODY$;



CREATE OR REPLACE FUNCTION public.job_conversation(
	jobid integer)
    RETURNS SETOF comments 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
SELECT * FROM comments WHERE comments.job_id = jobId;
$BODY$;



CREATE OR REPLACE FUNCTION public.job_conversation(
	jobid integer)
    RETURNS SETOF comments 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
SELECT * FROM comments WHERE comments.job_id = jobId;
$BODY$;



CREATE OR REPLACE FUNCTION public.job_conversation(
	jobid integer,
	stringmessage character varying,
	sessiontoken character varying)
    RETURNS record
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN

		
		END;
$BODY$;



CREATE OR REPLACE FUNCTION public.record_design_draft(
	_design_id integer,
	_job_id integer,
	_image_name character varying,
	_session_token character varying)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
		insert_successful boolean default TRUE;
		session_record record;
		
	BEGIN		
		
		if (select count(id) from designs where id = _design_id) > 0 then
			RAISE EXCEPTION 'design id duplicated'; 
		end if;
		
		if _session_token = '' then
			insert into designs (id, 	  job_id,  image, 		access_token, created_at, customer_comments_count, rejected_at, revision_number, updated_at, user_id, aasm_state) VALUES
				(_design_id, _job_id, _image_name, 'defaultDesignAccessToken', CURRENT_TIMESTAMP, 0, NULL, 0, CURRENT_TIMESTAMP, NULL, 'submitted');
	
			return TRUE;
		end if;
		
		SELECT user_id, session_token, expires_date
			INTO session_record
			FROM session_tokens
			WHERE session_tokens.session_token = _session_token;

		
		if EXISTS(SELECT user_id, session_token, expires_date FROM session_tokens WHERE session_tokens.session_token = _session_token) then
			
			if session_record.expires_date >= CURRENT_TIMESTAMP then
				insert into designs (id, 	  job_id,  image, 		access_token, created_at, customer_comments_count, rejected_at, revision_number, updated_at, user_id, aasm_state) VALUES
					(_design_id, _job_id, _image_name, 'defaultDesignAccessToken', CURRENT_TIMESTAMP, 0, NULL, 0, CURRENT_TIMESTAMP, session_record.user_id, 'submitted');
					return TRUE;
			else
				RAISE EXCEPTION 'Expired Session Token';
				return FALSE;
			end if;
			
		else
			RAISE EXCEPTION 'Invalid session token';
			return FALSE;
		end if;		

		return insert_successful;
	END
$BODY$;



CREATE OR REPLACE FUNCTION public.record_design_request_image(
	_design_id integer,
	_job_id integer,
	_image_name character varying)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
		insert_successful boolean default TRUE;
	BEGIN		
	
		if _design_id <0 then
			return FALSE;
		end if;
		
		if (SELECT COUNT(id) from designs where id=_design_id) > 0 then
			return FALSE;
		end if;

		insert into designs (id, 	  job_id,  image, 		access_token, created_at, customer_comments_count, rejected_at, revision_number, updated_at, user_id, aasm_state) VALUES
							(_design_id, _job_id, _image_name, 'defaultDesignAccessToken', CURRENT_TIMESTAMP, 0, NULL, 0, CURRENT_TIMESTAMP, NULL, 'submitted');

		return insert_successful;
	END
$BODY$;



CREATE OR REPLACE FUNCTION public.send_string_message(
	jobid integer,
	stringmessage character varying,
	sessiontoken character varying)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
			ses_id integer;
			shouldInsert boolean default FALSE;
			
        BEGIN
			
			
			
			if sessionToken = '' then 
				shouldInsert = TRUE; 
			else
				shouldInsert := (SELECT EXISTS(SELECT user_id from session_tokens WHERE session_tokens.session_token = sessionToken));
			end if;
			
			
			if shouldInsert then
				
				ses_id := (SELECT user_id from session_tokens WHERE session_tokens.session_token = sessionToken);
				
				INSERT INTO comments VALUES
					(DEFAULT, NULL, stringMessage, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ses_id, jobId, NULL);
			end if;
			
			return shouldInsert;
		
		END;
$BODY$;



CREATE OR REPLACE FUNCTION public.submit_design_request(
	_first_name character varying,
	_last_name character varying,
	_email character varying,
	_gender character varying,
	_first_tattoo boolean,
	_has_color boolean,
	_has_cover_up boolean,
	_style character varying,
	_estimate_size character varying,
	_description character varying,
	_position character varying)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
		new_job_id integer default -1;
	BEGIN		
        
-- 	--TEMP create and add data to jobs --userId = null, state = queued
-- 	create and add data to requests
		
		new_job_id = nextval('jobs_id_seq');
		
		insert into jobs (
			id,title,description,tattoo_position,price,commission,state,user_id,claimed_at,
			bounty,introduction_sent_at,approved_at,featured,access_token,designs_count,
			last_customer_comment_at,last_design_sent_at,deleted_at,state_changed_at,
			final_payment_at,abandonded_at,canceled_at,forfeited_at,last_featured_at,
			customer,email,phone,tip,style,size,color,created_at,updated_at)
			VALUES ( 
				new_job_id, 'default_title','default_description','default_position',
				1.1,1.2,'queued',NULL,NULL,1.3,CURRENT_TIMESTAMP,
				CURRENT_TIMESTAMP,FALSE,'default_access_token',1.4,
				CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,
				CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,
				CURRENT_TIMESTAMP,CONCAT(_first_name,' ', _last_name),_email,'default_phone',1.5,
				_style,'default_size',_has_color,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
		
		
		insert into requests 
		(id,		first_name, 	last_name, 	email, 	gender, 	is_first_time, has_color,  has_cover_up, 	style, 	estimate_size, 	description, position) values 
		(nextval('requests_id_seq'), 	_first_name, 	_last_name, _email, _gender, 	_first_tattoo, _has_color, _has_cover_up,	_style,	_estimate_size,	_description, _position);
		
        return new_job_id;

	END
$BODY$;



CREATE OR REPLACE FUNCTION public.valid_token(
	_email character varying,
	_tokn character varying)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
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
$BODY$;






-- Sequences

CREATE SEQUENCE public.requests_id_seq
    INCREMENT 1
    START 15000
    MINVALUE 0
    MAXVALUE 21000000
    CACHE 1;


CREATE SEQUENCE public.jobs_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;


CREATE SEQUENCE public.user_profiles_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;


CREATE SEQUENCE public.session_tokens_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
