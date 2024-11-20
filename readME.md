# KopiiKat
#### A Discord bot to quickly populate servers with a channel/category structure from a single command !

## How the command works

```
/structure markdown:"- 'Category A'
  - 'Channel 1'
  - 'Channel 2'
- 'Category B'
  - 'Channel 3'
```
##### Functionality
- Split input by newlines
- Track indentation levels (spaces/tabs before -)
- Create categories first, store their IDs
- Create channels under parent categories based on indentation

##### Edge cases &  how they're handled
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