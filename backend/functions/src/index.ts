/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
import * as functions from "firebase-functions";
import * as express from "express";
import { addNote, getNotes, updateNote, updateFavorite, deleteNote } from "./entryController";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hello There."));
app.get("/api/notes/:userId", getNotes);
app.post("/api/notes/:userId", addNote);
app.patch("/api/notes/:noteId", updateNote);
app.patch("/api/notes/favorite/:noteId", updateFavorite);
app.delete("/api/notes/:noteId", deleteNote);

exports.app = functions.https.onRequest(app);
