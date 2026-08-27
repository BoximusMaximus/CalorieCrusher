# Backend for Calorie Crusher

## Overview
The backend will be made with Django and will consist of the following data:

|Tables| Description | Connected Tables|
|------|-------------|-----------------|
|Users|For all users and accounts|all tables|
|Food|Single Item Foods|None|
|Meal|collection of foods|Food|
|Day| collection of meals a user has eaten in a day|Meal|

## User
|Category|Type|Required|Notes|
|--------|----|--------|-----|
|username|charfield|True||
|email   |charfield|True||
|hieghtIn|integerfield|False|There will be a setting translating this to cm|
|weightIb|decimal  |False|There will be a setting translating this to Kg|
|goalweight|integer|false||


## Food
|Category|Type|Required|Notes|
|--------|----|--------|-----|
|type    |charfield|true|Vegetable, Fruit, Grain, Dairy, Protien, other|
|kcal|decimal|True|default 0 |
|saturatedfat|decimal|True|default 0 |
|transfat|decimal|True|default 0 |
|cholesterol|decimal|True|default 0 |
|dietary fiber|decimal|True|default 0 |
|totalsugars|decimal|True|default 0 |
|protein|decimal|True|default 0 |

## Meal
|Category|Type|Required|Notes|
|--------|----|--------|-----|
|food    |MtM |True    ||

## Day
|Category|Type|Required|Notes|
|--------|----|--------|-----|
|meal    |MtM |True    ||

## Functions:
    - Search through foods (must be logged in)
    - Add food to db (must be logged in)
    - Remove food from db (must be logged in and food owner)
    - Add meal to db (must be logged in)
    - Remove meal from db (must be logged in and meal owner)