\echo 'Drop and create preplist database?'
\prompt '//[RETURN] YES // [CTRL + C] CANCEL//' foo

DROP DATABASE preplist;
CREATE DATABASE preplist;
\connect preplist;

\i preplist-schema.sql
\i preplist-seed.sql

