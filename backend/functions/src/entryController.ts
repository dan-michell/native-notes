/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { Response } from "express";
import { db } from "./config/firebase";

type EntryType = {
  note: string;
  userId: string;
  createdAt: string;
};

type Request = {
  body: EntryType;
  params: { noteId: string; userId: string };
};

const addNote = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { note, createdAt } = req.body;
  try {
    const noteEntry = db.collection("notes").doc();
    const entryObject = {
      id: noteEntry.id,
      note,
      userId,
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
  const { userId } = req.params;

  try {
    const notes: EntryType[] = [];
    // eslint-disable-next-line max-len
    const querySnapshot = await db
      .collection("notes")
      .where("userId", "==", `${userId}`)
      .orderBy("createdAt", "desc")
      .get();
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
      userId: currentData.userId,
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
    await db
      .collection("notes")
      .doc(noteId)
      .delete()
      .catch((error) => {
        return res.status(400).json({
          status: "error",
          message: error.message,
        });
      });
    return res.status(200).json({
      status: "success",
      message: "entry deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { addNote, getNotes, updateNote, deleteNote };
