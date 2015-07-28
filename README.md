### Character Spreadsheet

---
Basic character spreadsheet, based on rules of Shadowrun 4th Ed.

This application was created for the learning purposes, and was build on top of Kefir.js framework.

doT.js is used as a template engine.

---
Install dependencies from bower:

```
bower install
```

Optionally, you can install and run local http server:

```
$ npm install http-server
$ hs -p 8080
```

And open in browser `http://localhost:8080/`

---
This spreadsheet is loosely based on rules of 4th Ed for Shadowrun RPG, and is used to generate character.

Player starts with 200 points and uses them to adjust 8 basic abilities (4 physical and 4 mental). For simplicity, it is assumed that `Human` metatype was selected, so the rules for ranges of attributes values and costs for each adjustment are applied, based on this metatype.

In general, each attribute has minimum value 1 and can be adjusted to 6 for 10 points per 1 attribute point. Adjusting attribute, starting from 7, will cost 25 points per attribute point. The value 9 is a maximum. For example, to increase BODY attribute from 1 to 5 will cost 40 BP (+4 * 10BP).