--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_fk1;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_fk0;
ALTER TABLE IF EXISTS ONLY public.supplier DROP CONSTRAINT IF EXISTS supplier_pk;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pk;
ALTER TABLE IF EXISTS ONLY public.category DROP CONSTRAINT IF EXISTS category_pk;
ALTER TABLE IF EXISTS public.supplier ALTER COLUMN "supplierId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.category ALTER COLUMN "categoryId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."supplier_supplierId_seq";
DROP TABLE IF EXISTS public.supplier;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."category_categoryId_seq";
DROP TABLE IF EXISTS public.category;
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    "categoryId" integer NOT NULL,
    "categoryName" text NOT NULL
);


--
-- Name: category_categoryId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."category_categoryId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: category_categoryId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."category_categoryId_seq" OWNED BY public.category."categoryId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    sku text NOT NULL,
    name text NOT NULL,
    qty integer NOT NULL,
    "supplierId" integer NOT NULL,
    "categoryId" integer NOT NULL,
    cost double precision NOT NULL,
    "shippingCost" double precision NOT NULL,
    size text NOT NULL,
    location text NOT NULL,
    color text NOT NULL,
    status boolean NOT NULL,
    "imageUrl" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: supplier; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier (
    "supplierId" integer NOT NULL,
    "supplierName" text NOT NULL
);


--
-- Name: supplier_supplierId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."supplier_supplierId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: supplier_supplierId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."supplier_supplierId_seq" OWNED BY public.supplier."supplierId";


--
-- Name: category categoryId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category ALTER COLUMN "categoryId" SET DEFAULT nextval('public."category_categoryId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Name: supplier supplierId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier ALTER COLUMN "supplierId" SET DEFAULT nextval('public."supplier_supplierId_seq"'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.category ("categoryId", "categoryName") FROM stdin;
1	Necklace
2	Packaging
3	Dog Tag
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", sku, name, qty, "supplierId", "categoryId", cost, "shippingCost", size, location, color, status, "imageUrl") FROM stdin;
1	NL01G	4 Side Bar Gold	345	1	1	7.5	0.149999999999999994	45x5mm 45+5mm	CDC5X3	gold	t	/images/NL01G.jpg
4	NL02R	Bar Rose Gold	4	1	1	7.70000000000000018	0.140000000000000013	40x7mm 40+5mm	MSC5D2	gold	t	/images/NL02R.jpg
5	NL02S	Bar Silver	1	1	1	4.20000000000000018	0.149999999999999994	40x7mm 40+5mm	SKO4C9	gold	t	/images/NL02S.jpg
6	NL03S	Cross Necklace Silver	435	1	1	4.90000000000000036	0.149999999999999994	40x7mm 40+5mm	SMI4C8	silver	t	/images/NL03S.jpg
7	NL04S	Compass Necklace Silver	23	1	1	4.79999999999999982	0.369999999999999996	40x7mm 40+5mm	SDC6E9	silver	t	/images/NL04S.jpg
8	P001	Black Jewelry Box	12	2	2	1.30000000000000004	0.149999999999999994	3.5inchx3.5inch	KSF9G4	black	t	/images/P001.jpg
9	PT01B	Black Bone Tag	6	3	3	2.54999999999999982	0.849999999999999978	40*22mm	KWG5C3	black	t	/images/PT01B.jpg
10	NL05W	Pearl Necklace	4	4	1	14	0.149999999999999994	8mm Dia 40+5mm	VAS3J9	white	t	/images/NL05W.jpeg
11	NL05P	Pearl Necklace	3	4	1	14	0.149999999999999994	8mm Dia 40+5mm	OWV3D9	pink	f	/images/NL05P.jpg
2	NL01R	4 Side Bar Rose Gold	234	1	1	8	0.149999999999999994	45x5mm 45+5mm	CFD2Q5	rose gold	t	/images/NL01R.jpg
3	NL02G	Bar Necklace Gold	2	1	1	6.90000000000000036	0.149999999999999994	40x7mm 40+5mm	XMD3G8	gold	t	/images/NL02G.jpg
55	PT04I	Sample Product 2	234	3	3	2.35000000000000009	0.149999999999999994	50*29mm	CLC5X4	gold	t	images/PT04I.jpg
56	PT04S	Sample Product 3	2	3	3	2.85000000000000009	0.149999999999999994	50*29mm	CLC5X5	rainbow	t	images/PT04S.jpg
54	PT04GE	Pink Dog Tag	345	3	3	2.85000000000000009	0.149999999999999994	50*29mm	CLC5X3	black	t	blob:http://localhost:3000/66a85125-6098-42af-b063-5cfb8eacbad1
51	BL05C	Moon Dog Tag	326	4	3	3.2200000000000002	0.5	4mmx2mmx2mm	CDS9X1	Silver	t	blob:http://localhost:3000/7f9f2cb0-0e04-472b-8271-08542008c885
\.


--
-- Data for Name: supplier; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.supplier ("supplierId", "supplierName") FROM stdin;
1	Yiwu Basic Stainless
2	jpb box & Zhihua Packaging
3	Jienuo Stainless
4	Lazy Cat Alex
\.


--
-- Name: category_categoryId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."category_categoryId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 56, true);


--
-- Name: supplier_supplierId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."supplier_supplierId_seq"', 1, false);


--
-- Name: category category_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pk PRIMARY KEY ("categoryId");


--
-- Name: products products_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pk PRIMARY KEY ("productId");


--
-- Name: supplier supplier_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pk PRIMARY KEY ("supplierId");


--
-- Name: products products_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_fk0 FOREIGN KEY ("supplierId") REFERENCES public.supplier("supplierId");


--
-- Name: products products_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_fk1 FOREIGN KEY ("categoryId") REFERENCES public.category("categoryId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

