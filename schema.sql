DROP TABLE IF EXISTS saved-books;
CREATE TABLE saved-books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  authors VARCHAR(255),
  description TEXT,
  imageUrl VARCHAR(2083)
);

INSERT INTO saved-books (title, authors, description, imageURL) saved-books
VALUES(`The Time Machine`,`H. G. Wells`,`The Time Traveller, a mysterious and brilliant inventor, makes a journey to the year 802,701 AD. Earth is a lush paradise inhabited by two humanoid species—the Eloi and the Morlocks. But he soon realizes that this seeming utopia hides darker secrets. The Eloi are peaceful, but apathetic and frail; the monstrous Morlocks live underground and hunt the Eloi by night. This bleak glimpse of the future forces the Time Traveller to reexamine Victorian England's beliefs about progress and inequality. When the Morlocks steal his time machine, will the Time Traveller ever make it back to his own time? Written by British author H. G. Wells and first published in 1895, this is an unabridged version of the science fiction adventure that first introduced the concept of a time machine.`,`https://books.google.com/books/content?id=n8o5DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`);