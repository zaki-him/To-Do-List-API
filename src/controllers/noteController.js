import Note from "../modules/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, contents } = req.body;
    const newNote = new Note({
      title,
      contents,
      user: req.user.id,
    });

    await newNote.save();
    res.status(201).json({ message: "Note created successfully", Note: newNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ 
      user: req.user.id,
       _id: req.params.id 
    });

    if(!note){
      return res.status(404).json({ error: 'Note Not Found'})
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req , res) => {
  try {
    const { title , contents } = req.body

    const updatedNote = await Note.findOne({
      user: req.user.id,
      _id: req.params.id
    },)

    if(!updatedNote){
      return res.status(404).json({message:'Note Not Found'})
    }

    if(title) updatedNote.title = title
    if(contents) updatedNote.contents = contents

    await updatedNote.save()
    res.status(200).json({ message: 'Note Updated' , note: updatedNote})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const deleteNote = async (req , res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ user: req.user.id , _id: req.params.id})

    if(!deletedNote){
      return res.status(404).json({message: 'Note already does not exist'})
    }

    res.status(200).json({message: 'Note deleted successfully'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}