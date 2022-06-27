/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
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
  query: { sort: string; favorite: string; favorites: string };
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
      favorite: false,
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
  const { sort, favorites } = req.query;

  const sortArray = sort.split(" ");
  const sortBy: string = sortArray[0];
  const sortDirection: string = sortArray[1];

  try {
    const notes: EntryType[] = [];
    let query = db.collection("notes").where("userId", "==", `${userId}`);
    query = sortDirection === "asc" ? query.orderBy(sortBy, "asc") : query.orderBy(sortBy, "desc");
    query = favorites === "true" ? query.where("favorite", "==", true) : query;
    const querySnapshot = await query.get();
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
      favorite: currentData.favorite,
      createdAt: new Date().getTime(),
    };

    await noteEntry.set(noteObject).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "entry updated successfully",
      data: noteObject,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateFavorite = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { favorite } = req.query;

  try {
    const noteEntry = db.collection("notes").doc(noteId);
    const currentData = (await noteEntry.get()).data() || {};
    const noteObject = {
      id: currentData.id,
      note: currentData.note,
      userId: currentData.userId,
      favorite: favorite === "true" ? true : false,
      createdAt: currentData.createdAt,
    };

    await noteEntry.set(noteObject).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

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

export { addNote, getNotes, updateNote, updateFavorite, deleteNote };
