const express = require("express");
const { route } = require("./auth");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//get all note
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
  res.json(Note);
});

//post note
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charcters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//update note

router.put(
  "/updateNote/:id",
  fetchUser,
  [
    // body("title", "Enter a valid name").isLength({ min: 3 }),
    // body("description", "Description must be atleast 5 charcters").isLength({
    //   min: 5,
    // }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find note to be updated
    // const note=Note.findByIdAndUpdate()
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(400).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  }
);

//delete note

router.delete(
  "/deleteNote/:id",
  fetchUser,
  [
    // body("title", "Enter a valid name").isLength({ min: 3 }),
    // body("description", "Description must be atleast 5 charcters").isLength({
    //   min: 5,
    // }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    // const newNote = {};
    // if (title) {
    //   newNote.title = title;
    // }
    // if (description) {
    //   newNote.description = description;
    // }
    // if (tag) {
    //   newNote.tag = tag;
    // }

    //find note to be updated
    // const note=Note.findByIdAndUpdate()
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(400).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    console.log("Deleted");
    res.json({
      success: `Note with id ${req.params.id} has been deleted succesfully`,
    });
  }
);

module.exports = router;
