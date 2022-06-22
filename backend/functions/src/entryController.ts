/* eslint-disable object-curly-spacing */
import { Response } from "express";
import { db } from "./config/firebase";

type EntryType = {
  note: string;
  createdAt: string;
};

type Request = {
  body: EntryType;
  params: { noteId: string };
};

const addNote = async (req: Request, res: Response) => {
  const { note, createdAt } = req.body;
  try {
    const noteEntry = db.collection("notes").doc();
    const entryObject = {
      id: noteEntry.id,
      note,
      createdAt,
    };

    noteEntry.set(entryObject);

    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: entryObject,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getNotes = async (req: Request, res: Response) => {
  try {
    const notes: EntryType[] = [];
    const querySnapshot = await db.collection("notes").get();
    querySnapshot.forEach((doc: any) => notes.push(doc.data()));
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateNote = async (req: Request, res: Response) => {
  const {
    body: { note },
    params: { noteId },
  } = req;

  try {
    const noteEntry = db.collection("notes").doc(noteId);
    const currentData = (await noteEntry.get()).data() || {};
    const noteObject = {
      id: currentData.id,
      note: note || currentData.note,
      createdAt: currentData.createdAt,
    };

    try {
      await noteEntry.set(noteObject);
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "entry updated successfully",
      data: noteObject,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;

  try {
    const noteEntry = db.collection("entries").doc(noteId);

    try {
      await noteEntry.delete();
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "entry deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { addNote, getNotes, updateNote, deleteNote };
