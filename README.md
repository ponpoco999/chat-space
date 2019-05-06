# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true, null:false, unique:true|
|mail|string|null: false|

### Association
- has_many :messages, through: :groups
- has_many :groups


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|string|null:false|
|image|string|null: false|

### Association
- has_many :users, through: :groups
- has_many :groups



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer null: false, foreign_key: true|
|group_id|integer null: false, foreign_key: true|

### Association
- belongs_to :message
- belongs_to :group


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

