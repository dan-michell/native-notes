export class Networking {
  async getNotes(userId: string, sort: string, favorites: boolean) {
    try {
      const response = await fetch(
        `https://us-central1-minimal-notes-10eed.cloudfunctions.net/app/api/notes/${userId}?sort=${sort}&favorites=${favorites}`
      );
      const notesData = await response.json();
      if (response.status >= 400) throw new Error(notesData);
      return notesData;
    } catch (error) {
      console.log(error);
    }
  }

  async createNote(note: string, createdAt: number, userId: string) {
    const noteData = { note, createdAt };
    try {
      const response = await fetch(
        `https://us-central1-minimal-notes-10eed.cloudfunctions.net/app/api/notes/${userId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(noteData),
        }
      );
      const responseMessage = await response.json();
      if (response.status >= 400) throw new Error(responseMessage);
      return responseMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNote(noteId: string) {
    try {
      const response = await fetch(
        `https://us-central1-minimal-notes-10eed.cloudfunctions.net/app/api/notes/${noteId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );
      const responseMessage = await response.json();
      if (response.status >= 400) throw new Error(responseMessage);
      return responseMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async updateNote(noteId: string, updatedNoteContent: string) {
    const noteData = { note: updatedNoteContent };
    try {
      const response = await fetch(
        `https://us-central1-minimal-notes-10eed.cloudfunctions.net/app/api/notes/${noteId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(noteData),
        }
      );
      const responseMessage = await response.json();
      if (response.status >= 400) throw new Error(responseMessage);
      return responseMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async updateFavorite(noteId: string, favorite: boolean) {
    try {
      const response = await fetch(
        `https://us-central1-minimal-notes-10eed.cloudfunctions.net/app/api/notes/favorite/${noteId}?favorite=${favorite}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PATCH",
        }
      );
      const responseMessage = await response.json();
      if (response.status >= 400) throw new Error(responseMessage);
      return responseMessage;
    } catch (error) {
      console.log(error);
    }
  }
}
