# Questioner

[![Build Status](https://travis-ci.org/toluola/Questioner.svg?branch=develop)](https://travis-ci.org/toluola/Questioner) [![Coverage Status](https://coveralls.io/repos/github/toluola/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/toluola/Questioner?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/812f8d070fb231024a58/maintainability)](https://codeclimate.com/github/toluola/Questioner/maintainability)

## Description

Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize
questions to be answered. Other users can vote on asked questions and they bubble to the top
or bottom of the log.

## Gh-pages Link

https://toluola.github.io/Questioner/UI/index.html

## Template Pages

-   /admin.html
-   /user.html

## Heroku Link

https://questioner03.herokuapp.com/api/v1

## API Routes

| HTTP VERB | ENDPOINT                 | FUCTIONALITY                 |
| --------- | ------------------------ | ---------------------------- |
| GET       | api/v1/meetups           | Get all meetups entries      |
| GET       | api/v1/meetups/:Id       | Get specific meetup entry    |
| POST      | api/v1/meetups           | Create a new meetup entry    |
| POST      | api/v1/meetups/:id/rsvps | Respond to a specific meetup |
| POST      | api/v1/questions         | Create a question entry      |
| PATCH     | api/v1/:id/upvote        | Upvote a specific question   |
| PATCH     | api/v1/:id/downvote      | Downvote a specific question |
| GET       | api/v1/meetups/upcomings | Get all upcoming meetups     |

# Author

Tolu' Olaniyan [@toluola](http://github.com/toluola)
