--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 9.6.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: __prisma_migrations; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public.__prisma_migrations (
    id character varying(1) DEFAULT NULL::character varying,
    checksum character varying(1) DEFAULT NULL::character varying,
    finished_at character varying(1) DEFAULT NULL::character varying,
    migration_name character varying(1) DEFAULT NULL::character varying,
    logs character varying(1) DEFAULT NULL::character varying,
    rolled_back_at character varying(1) DEFAULT NULL::character varying,
    started_at character varying(1) DEFAULT NULL::character varying,
    applied_steps_count character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public.__prisma_migrations OWNER TO rebasedata;

--
-- Name: _house; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._house (
    houseid character varying(1) DEFAULT NULL::character varying,
    street character varying(1) DEFAULT NULL::character varying,
    city character varying(1) DEFAULT NULL::character varying,
    squarefootage character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._house OWNER TO rebasedata;

--
-- Name: _issue; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._issue (
    issueid character varying(1) DEFAULT NULL::character varying,
    title character varying(1) DEFAULT NULL::character varying,
    description character varying(1) DEFAULT NULL::character varying,
    created_at character varying(1) DEFAULT NULL::character varying,
    updated_at character varying(1) DEFAULT NULL::character varying,
    status character varying(1) DEFAULT NULL::character varying,
    priority character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._issue OWNER TO rebasedata;

--
-- Name: _label; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._label (
    labelid character varying(1) DEFAULT NULL::character varying,
    name character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._label OWNER TO rebasedata;

--
-- Name: _labelsonissues; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._labelsonissues (
    issueid character varying(1) DEFAULT NULL::character varying,
    labelid character varying(1) DEFAULT NULL::character varying,
    assignedat character varying(1) DEFAULT NULL::character varying,
    assignedby character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._labelsonissues OWNER TO rebasedata;

--
-- Name: _maintenancetask; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._maintenancetask (
    taskid character varying(1) DEFAULT NULL::character varying,
    taskname character varying(1) DEFAULT NULL::character varying,
    description character varying(1) DEFAULT NULL::character varying,
    frequency character varying(1) DEFAULT NULL::character varying,
    importance character varying(1) DEFAULT NULL::character varying,
    season character varying(1) DEFAULT NULL::character varying,
    timeestimate character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._maintenancetask OWNER TO rebasedata;

--
-- Name: _room; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._room (
    roomid character varying(1) DEFAULT NULL::character varying,
    name character varying(1) DEFAULT NULL::character varying,
    notes character varying(1) DEFAULT NULL::character varying,
    houseid character varying(1) DEFAULT NULL::character varying,
    shortname character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._room OWNER TO rebasedata;

--
-- Name: _roomsontasks; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._roomsontasks (
    taskid character varying(1) DEFAULT NULL::character varying,
    roomid character varying(1) DEFAULT NULL::character varying,
    assignedat character varying(1) DEFAULT NULL::character varying,
    assignedby character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._roomsontasks OWNER TO rebasedata;

--
-- Name: _taskhistory; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._taskhistory (
    historyid character varying(1) DEFAULT NULL::character varying,
    dateperformed character varying(1) DEFAULT NULL::character varying,
    notes character varying(1) DEFAULT NULL::character varying,
    taskid character varying(1) DEFAULT NULL::character varying,
    monthperformed character varying(1) DEFAULT NULL::character varying,
    status character varying(1) DEFAULT NULL::character varying,
    yearperformed character varying(1) DEFAULT NULL::character varying,
    userperformedid character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._taskhistory OWNER TO rebasedata;

--
-- Name: _taskschedule; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._taskschedule (
    scheduleid character varying(1) DEFAULT NULL::character varying,
    taskid character varying(1) DEFAULT NULL::character varying,
    nextduedate character varying(1) DEFAULT NULL::character varying,
    lastcompleteddate character varying(1) DEFAULT NULL::character varying,
    status character varying(1) DEFAULT NULL::character varying,
    notes character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._taskschedule OWNER TO rebasedata;

--
-- Name: _user; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._user (
    id character varying(1) DEFAULT NULL::character varying,
    email character varying(1) DEFAULT NULL::character varying,
    followers character varying(1) DEFAULT NULL::character varying,
    isactive character varying(1) DEFAULT NULL::character varying,
    registeredat character varying(1) DEFAULT NULL::character varying,
    lastname character varying(1) DEFAULT NULL::character varying,
    firstname character varying(1) DEFAULT NULL::character varying,
    password character varying(1) DEFAULT NULL::character varying,
    role character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._user OWNER TO rebasedata;

--
-- Data for Name: __prisma_migrations; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public.__prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.


--
-- Data for Name: _house; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._house (houseid, street, city, squarefootage) FROM stdin;
\.


--
-- Data for Name: _issue; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._issue (issueid, title, description, created_at, updated_at, status, priority) FROM stdin;
\.


--
-- Data for Name: _label; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._label (labelid, name) FROM stdin;
\.


--
-- Data for Name: _labelsonissues; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._labelsonissues (issueid, labelid, assignedat, assignedby) FROM stdin;
\.


--
-- Data for Name: _maintenancetask; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._maintenancetask (taskid, taskname, description, frequency, importance, season, timeestimate) FROM stdin;
\.


--
-- Data for Name: _room; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._room (roomid, name, notes, houseid, shortname) FROM stdin;
\.


--
-- Data for Name: _roomsontasks; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._roomsontasks (taskid, roomid, assignedat, assignedby) FROM stdin;
\.


--
-- Data for Name: _taskhistory; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._taskhistory (historyid, dateperformed, notes, taskid, monthperformed, status, yearperformed, userperformedid) FROM stdin;
\.


--
-- Data for Name: _taskschedule; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._taskschedule (scheduleid, taskid, nextduedate, lastcompleteddate, status, notes) FROM stdin;
\.


--
-- Data for Name: _user; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._user (id, email, followers, isactive, registeredat, lastname, firstname, password, role) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

