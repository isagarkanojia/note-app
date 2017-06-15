const fs=require('fs');
const notes=require('./notes.js');
const _=require('lodash');
const yargs=require('yargs')
const titleOptions={
  describe:'Title of note',
  demand:true,
  alias:'t'
};
const bodyOptions={
  describe:'Body of the note',
  demand:true,
  alias:'b'
};
var argv=yargs
.command('add','Add a new note',{
  title:titleOptions,
  body:bodyOptions
})
.command('get','Get a note',{
  title:titleOptions
})
.command('remove','Remove a note',{
  title:titleOptions
})
.command('list','List all notes')
.help()
.argv;


var command=argv._[0];

if(command ==='add'){
  var note=notes.addNote(argv.title,argv.body);
  if(note){
    console.log("Note Created");
    notes.logNote(note);
  }else{
    console.log("Note already taken");
  }
}else if(command==='list'){
  var allNotes=notes.getAllNotes();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note)=> notes.logNote(note));
}else if(command==='remove'){
  var noteRemoved=notes.removeNotes(argv.title);
  var message=noteRemoved ? 'Note was removed':'Note not found';
  console.log(message);
}else if(command==='get'){
  var note=notes.getNote(argv.title);
  if(note){
    console.log("Here is the note");
    notes.logNote(note);
  }else {
    console.log("Note not found");
  }
}
else{
  console.log("Please use '--help' to read about available options.");
}
