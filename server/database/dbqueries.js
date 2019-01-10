/* eslint-disable linebreak-style */
import pool from "./dbSetup";

const Migration = {
  async migrate() {
    try {
      /* eslint-disable no-console */
      console.log("Creating table questions");
      await pool.query(`drop table if exists questions; create table if not exists  questions(
        id serial not null constraint questions_pkey primary key,
        created_by integer not null,
        meetup integer not null,
        title text,
        body text,
        votes integer not null,
        created_on timestamp default now() not null);
    `);

      console.log("Creating table profiles");
      await pool.query(`drop table if exists profiles; create table profiles(
        id serial not null constraint profiles_pkey primary key,
        firstname text,
        lastname text,
        email text not null,
        role text default 'user'::text,
        password text not null
      ); create unique index profiles_email_uindex on profiles (email);
     `);

      console.log("Creating table meetups");
      await pool.query(`drop table if exists meetups; create table meetups(
        id serial not null constraint meetups_pkey primary key,
        location text not null,
        images text[],
        tags text[],
        response text,
        topic text not null,
        happening_on text not null,
        created_on timestamp default now() not null
      );
   `);
      await process.exit(0);
    } catch (e) {
      console.log("Caught: ", e.message);
    }
  }
};

export default Migration;

Migration.migrate();