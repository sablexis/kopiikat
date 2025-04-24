# KopiiKat
![alt-text](/media/kopii_cat_banner.png)
#### A Discord bot to quickly populate servers with a channel/category structure from a single command !
***
### T.O.C
- [KopiiKat](#kopiikat)
      - [A Discord bot to quickly populate servers with a channel/category structure from a single command !](#a-discord-bot-to-quickly-populate-servers-with-a-channelcategory-structure-from-a-single-command-)
    - [T.O.C](#toc)
  - [About Project](#about-project)
  - [Project Files Description](#project-files-description)
  - [Getting Started](#getting-started)
  - [How the command works](#how-the-command-works)
        - [Functionality](#functionality)
  - [Edge cases \&  how they're handled](#edge-cases---how-theyre-handled)
***

## About Project
Turning a 2 minute personal task into an overly complex discord bot so I can have it all done for me? Right up my alley! I've set up countless discord servers with a simmilar structure so often that I thought there must be a way to do this quicker & easier...thus came Kopiikat ! Rather than create channel organizers and subchannels yourself ask the cat to do it!
## Project Files Description
```
.
└── kopiikat
    └── .github/workflows // Azure Web App Hosting
    └── commands/utility // folder structure for bot commands
      └── createStructure.js // createStructure command 
    ├── .gitignore // git ignore files
    ├── deploy-commands.js // register commands created
    ├── index.html // user interface and OAuth data once logged in
    ├── index.js // start server and handle requests
    ├── package-lock.json // pkg & dependencies versions
    ├── package.json // project manifest
    └──  readME.md // project explanation 
    

```

## Getting Started
If you'd simply like to add kopiikat to your server [click here!](https://discord.com/oauth2/authorize?client_id=1308808583693074454) otherwise, fork this repository and run the following command in your terminal:

```
npm install discord js express undici
```

## How the command works
using the slash command structure the user provides a string where whatever is before a colon ':' is a Category label and whatever comes after is a channel label.
Categories and
```
/structure markdown: 'Test Category A' : 'channel-1', 'channel-2' | 'Test Category B' : 'channel-3', 'channel-4'
```

***
put a gif here
***

##### Functionality
- Split input by newlines
- Track indentation levels (spaces/tabs before -)
- Create categories first, store their IDs
- Create channels under parent categories based on indentation

## Edge cases &  how they're handled
- Permission errors (blocks entire operation)
  - 
- Invalid characters (causes creation failures)
  - 
- Discord limits (prevents excess channels)
  - 
- Missing quotes (parsing errors)
  - 
- Duplicate names (naming conflicts)
  - 

***
Made with 💛 by Sabrina Sandy