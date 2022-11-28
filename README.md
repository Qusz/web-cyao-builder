# web-cyao-builder
A web Choose Your Own Adventure builder. 

## Introduction
This is a simple no dependencies 'just-add-water' CYAO game builder. 

## Usage
- Clone the repo
- Populate data.js with your story (refer to the schema below).
- Note that there's mock data in data.js left as an example. Don't forget to remove it.
- Deploy anywhere.
- Share with friends :)

## Usage dev

- Clone the repo
- Run ``` $ npm install ```
- Run ``` $ npm run start ```

## data.js schema
data.js is an array or objects. Each object is a block containing:

### id
Current block id.

### body
A chunk of text for the current block.

### options
An object containing options available to the player in the current block. The key represents the option id and the value is the text for that option.

### gameOver
A boolean value indicating if the current block ends the game.

### option_id
A foreign key. An array of option_id values from previous blocks that lead the story to this block.



