/* eslint-disable linebreak-style */
import pool from "./dbSetup";

const Migration = {
  async migrate() {
    try {
      /* eslint-disable no-console */

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
        topic text not null,
        happening_on text not null,
        status text default 'active'::text,
        created_on timestamp default now() not null
      );
   `);

      console.log("Creating table questions");
      await pool.query(`drop table if exists questions; create table if not exists  questions(
        id serial not null constraint questions_pkey primary key,
        createdby_id integer REFERENCES profiles(id) ON DELETE CASCADE,
        meetup_id integer REFERENCES meetups(id) ON DELETE CASCADE,
        title text,
        body text,
        votes integer not null,
        created_on timestamp default now() not null);
    `);

      console.log("Creating table upcomings");
      await pool.query(`drop table if exists upcomings; create table if not exists  upcomings(
        id serial not null,
        user_id integer REFERENCES profiles(id) ON DELETE CASCADE,
        meetup_id integer REFERENCES meetups(id) ON DELETE CASCADE,
        response text not null,
        PRIMARY KEY (user_id, meetup_id));
    `);

      console.log("Creating table comments");
      await pool.query(`drop table if exists comments; create table if not exists  comments(
        id serial constraint comments_pkey primary key not null,
        question_id integer REFERENCES questions(id) ON DELETE CASCADE,
        title text not null,
        body text not null,
        comment text not null);
    `);

      process.exit(0);
    } catch (e) {
      console.log("Caught: ", e.message);
    }
  }
};

export default Migration;

Migration.migrate();
