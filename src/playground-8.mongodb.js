// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Tp14");

db.Tp14.updateOne({_id:1},{$set:{dateNaissance:("2000-02-02")}})

db.Tp14.find({})

db.Tp14.updateOne({_id:1},{$set:{notes:[11,20,20,19]}})




db.Tp14.updateOne({_id:1},{$set:{"notes.1":0}})

db.Tp14.updateOne({_id:1},{$set:{"parent.pere":"Amine"}})
