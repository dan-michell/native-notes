export class Networking {
  async getNotes(userId: string) {
    try {
      const response = await fetch(
        `https://us-central1-minimal-notes-10eed.cloudfunctions.net/app/api/notes/${userId}`
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
    console.log("ran");
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
      console.log(responseMessage);
      if (response.status >= 400) throw new Error(responseMessage);
      return responseMessage;
    } catch (error) {
      console.log(error);
    }
  }
}
